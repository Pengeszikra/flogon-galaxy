import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { rnd, shuffle, signal, zignal } from "./utils/old-bird-soft";

/**
 * @typedef {{
 *  x: number
 *  y: number
 *  z: number
 *  rX: number
 *  rY: number
 *  rZ: number
 * }} Pos3D
 */


/** @type {Pos3D} */
const origo = {x:0, y:0, z:0, rX: 0, rY:0, rZ: 0};

/**
  *  @typedef {{
  *   id: string
  *   value: number
  *   name?: string
  *   description?: string
  *   skill?: string
  * }} CardInfo
  */

/** @typedef {CardInfo & Pos3D} SingleCard */

/**
  * @typedef {{
  *  whoyou: string
  *  description?: string
  *  deck: SingleCard[]
  *  hand: SingleCard[]
  *  drop: SingleCard[]
  *  select: SingleCard | null
  *  play: SingleCard | null
  *  target: SingleCard | null
  *  score: number
  * }} Entity
  */


/** @type {Entity} */
const player = {
  whoyou: "player",
  description: "save the word",
  score: 0,
  deck: [],
  hand: [],
  drop: [],
  select: null,
  play: null,
  target: null,
};

/** @type {Entity} */
const quest = {
  whoyou: "quest",
  score: 0,
  deck: [],
  hand: [],
  drop: [],
  select: null,
  play: null,
  target: null,
};

/** @type {(amount:number) => SingleCard[]} */
export const randomDeck = (amount) => Array(amount)
  .fill()
  .map((_,idx) => ({
      id:idx.toString(),
      value: rnd(42 + 1) - 21,
      ...origo
  }));

// quest.deck = randomDeck(20);
// player.deck = randomDeck(20);
/** @type {keyof Phases} */
let phase;

/** @template {string} T @typedef {{ [K in T]: K }} Label */

/**
  * @typedef { Label<
  * "SETUP" | "PLAYER_DRAW" | "QUEST_DRAW_WITH_END_CHECK" | "START_PLAY" |
  * "PROBLEM_CHECK" | "REVENGE_BEGIN" | "ANTY_PAIR" | "THE_END" |
  * "ESCAPE_CHECK" | "SOLVE_QUEST" | "FAIL_QUEST" | "MATCH" | "SHODOWN"
  * >} Phases
  */

/** @typedef {{phase:keyof Phases, player: Entity, quest: Entity}} State */

/** @type {(st:State) => Promise<keyof Phases>} */
export const gameLoop = async (st) => {
  // logger(st);
  switch (st.phase) {
    case "SETUP": {
      st.player.deck = randomDeck(20);
      st.quest.deck = randomDeck(25);
      return st.phase = "PLAYER_DRAW";
    }

    case "PLAYER_DRAW": {
      if (st.player.deck.length + st.player.hand.length < 4) {
        st.player.deck = [...st.player.deck, ...st.player.drop].sort(shuffle);
        st.player.drop = [];
      }
      while (st.player.hand.length < 4) {
        st.player.hand.push(st.player.deck.pop());
      }
      return st.phase = "QUEST_DRAW_WITH_END_CHECK"
    }

    case "QUEST_DRAW_WITH_END_CHECK": {
      if (st.quest.deck.length < 1) {
        return st.phase = st.player.score > st.quest.score
          ? "SOLVE_QUEST"
          : "FAIL_QUEST"
          ;
      }

      st.quest.hand.push(st.quest.deck.pop());
      st.quest.hand.push(st.quest.deck.pop());

      return st.phase = st.quest.hand.length >= 4
        ? "REVENGE_BEGIN"
        : "START_PLAY"
        ;
    }

    case "START_PLAY": {
      let possibleMoves = allPossibleMoves(st.player, st.quest)
        .filter(({ kind }) => kind !== "FAIL");
      console.log(possibleMoves);
      if (possibleMoves.length < 1) {
        return st.phase = "PLAYER_DRAW";
      }
      const result = await playerInteraction();
      st.player.hand = st.player.hand.filter(card => card !== result.a);
      st.quest.hand = st.quest.hand.filter(card => card !== result.b);
      st.player.drop.push(result.a);
      st.quest.drop.push(result.b);
      st.player.score += result.score;
      return st.phase = possibleMoves.length > 1
        ? "START_PLAY"
        : "PLAYER_DRAW"
        ;
    }

    case "SHODOWN": { return st.phase = "ESCAPE_CHECK" }

    case "REVENGE_BEGIN": {
      const possibleMoves = allPossibleMoves(st.quest, st.player)
        .filter(({kind}) => kind !== "FAIL");
      if (possibleMoves.length < 1) {
        while (st.quest.hand.length) {
          const toDrop = st.quest.hand.shift();
          st.quest.score += Math.abs(toDrop.value);
          st.quest.drop.push(toDrop);
        }
        return st.phase = possibleMoves.length > 1
          ? "REVENGE_BEGIN"
          : "PLAYER_DRAW"
          ;
      }
      const result = await questInteraction(st);
      st.quest.hand = st.quest.hand.filter(card => card !== result.a);
      st.player.hand = st.player.hand.filter(card => card !== result.b);
      st.quest.drop.push(result.a);
      st.player.drop.push(result.b);
      st.player.score += result.score;
      return st.phase = "REVENGE_BEGIN";
    }

    // case "ANTY_PAIR": { return st.phase = "ESCAPE_CHECK" }
    // case "ESCAPE_CHECK": { return st.phase = "PLAYER_DRAW" }

    case "SOLVE_QUEST": { return st.phase = "THE_END" } // ending action
    case "FAIL_QUEST": { return st.phase = "THE_END" } // ending action
  }
};

/** @type {() => Promise<MatchResult>} */
export const playerInteraction = async () =>
  allPossibleMoves(player, quest)
    .sort((alfa, beta) => alfa.score - beta.score)
    .pop()
  ;

// /** @type {(st:State) => MatchResult} */
export const questInteraction = async (st) =>
  allPossibleMoves(st.quest, st.player)
    .sort((alfa, beta) => alfa.score - beta.score)
    .pop()
  ;

/** @typedef {Label<"POSITIVE" | "NEGATIVE" | "ZERO" | "INVERZIT" | "FAIL">} MatchKind */

/** @typedef {{score: number, kind:keyof MatchKind, a:SingleCard, b:SingleCard}} MatchResult */

const NONE = Symbol('NONE');

/** @type {(a:SingleCard, b:SingleCard) => MatchResult } */
export const cardMatcher = (a, b) => {
  const av = a?.value ?? 42;
  const bv = b?.value ?? 42;
  switch (true) {
    case av > 0 && bv > 0 && av % 2 !== b % 2:
      return { kind: "POSITIVE", score: av + bv, a, b };
    case av < 0 && bv < 0 && av % 2 === bv % 2:
      return { kind: "NEGATIVE", score: Math.abs(av) + Math.abs(bv), a, b };
    case av === 0 || bv === 0 && av + bv !== 0:
    return { kind: "ZERO", score: Math.abs(av + bv) * 3, a, b };
    case av === Math.abs(bv):
      return { kind: "INVERZIT", score: Math.abs(av) * 4, a, b };
    default:
      return { kind: "FAIL", score: 0, a, b };
  }
};

/** @type {(solver: Entity, problem: Entity) => MatchResult[]} */
export const allPossibleMoves = (solver, problem) =>
  solver
    .hand
    .map(play => problem
      .hand
      .map(target => cardMatcher(play, target))
    ).flat();

/** @type {(who: Entity) => string} */
const summ = (who) => {
  const { whoyou, hand, deck, drop } = who ?? {};
  return whoyou
    ? `${whoyou} [${hand.map(({value})=>value).join(',')}]  [${deck.length}][${drop.length}]`
    : "- - -";
}

const logger = (st) => {
  try {
    console.log(`${st.phase} :: ${summ(st.player)} :: ${summ(st.quest)} (${st.player.score}/${st.quest.score})`);
  } catch (err) { console.warn(st) }
}


/** @type {{phase:keyof Phases, player: Entity, quest: Entity}} */
const state = signal(logger)({phase, player, quest});

globalThis.st = state;

globalThis.run = () => {
  gameLoop(st);
};

st.phase = "SETUP";

// ------------------------- 3D ----------------------------------

/** @type {(props: { id: number, value: number }) => HTMLElement} */
const Card = ({id, value}) => (
  <div class="
    relative
    scale-[4]
    transition-all duration-500
    pointer-events-auto
    hover:scale-[5]
  ">
    <Sprite
      {...assetList[id]}
      class="rounded-xl outline outline-1 outline-zinc-900">
    </Sprite>
    <div class="
      text-neutral-700
      text-[1rem]
      absolute
      top-2
      left-2
      bg-white/40
      rounded-full
      w-[2rem]
      text-center
      select-none
    ">{value}</div>
  </div>
);

/** @type {(props: { id: number }) => HTMLElement} */
const Flogon = ({id}) => <Sprite {...flogons[id]} class="
  hover:scale-[1.5]
  transition-all
  duration-500
  "
></Sprite>;

const [gAlfa, gBeta] = galaxyTextureList();

/** @typedef {import('../src/utils/fencer').SpriteProps} SpriteProps */
/** @type {(props:{card: SpriteProps}) => HTMLElement | DocumentFragment} */

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <section id="desk" class="
      w-[100vw] h-[100vw]
      grid grid-cols-4 gap-x-[1rem] gap-y-[10rem]
      place-items-center
      bg-yellow-700
    "
    >
      {assetList.slice(0,8).map((_, idx) => <Card id={idx} value={idx - 11} />)}
    </section>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("screen");
  useKeyboardCurse(state);
});
