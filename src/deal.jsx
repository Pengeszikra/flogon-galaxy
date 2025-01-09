import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { rnd, shuffle } from "./utils/old-bird-soft";

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
  description: "save the word",
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
      value: rnd(41) - 21,
      ...origo
  }));

quest.deck = randomDeck(20);
player.deck = randomDeck(20);

/** @template {string} T @typedef {{ [K in T]: K }} Label */

/**
  * @typedef { Label<
  * "SETUP" | "PLAYER_DRAW" | "QUEST_DRAW_WITH_END_CHECK" | "START_PLAY" |
  * "PROBLEM_CHECK" | "REVENGE_BEGIN" | "ANTY_PAIR" |
  * "ESCAPE_CHECK" | "SOLVE_QUEST" | "FAIL_QUEST" | "MATCH" | "SHODOWN"
  * >} Phases
  */

/** @type {(phase:keyof Phases, pCard:number, aCard:number) => Promise<keyof Phases>} */
export const gameLoop = async (phase, pCard, aCard) => {
  switch (phase) {
    case "SETUP": {
      player.deck = randomDeck(20);
      quest.deck = randomDeck(25);
      return "PLAYER_DRAW";
    }

    case "PLAYER_DRAW": {
      if (player.deck.length + player.hand.length < 4) {
        player.deck = [...player.deck, ...player.drop].sort(shuffle);
        player.drop = [];
      }
      while (player.hand.length < 4) {
        player.hand.push(player.deck.pop());
      }
      return "QUEST_DRAW_WITH_END_CHECK"
    }

    case "QUEST_DRAW_WITH_END_CHECK": {
      if (quest.deck.length < 1) {
        return player.score > quest.score
          ? "SOLVE_QUEST"
          : "FAIL_QUEST"
          ;
      }

      quest.hand.push(quest.deck.pop());
      quest.hand.push(quest.deck.pop());

      return quest.hand.length >= 4
        ? "REVENGE_BEGIN"
        : "START_PLAY"
        ;
    }

    case "START_PLAY": {
      const possibleMoves = allPossibleMoves(player, quest)
        .filter(({kind}) => kind !== "FAIL");
      if (possibleMoves.length < 1) {
        return "PLAYER_DRAW";
      }
      // const { a:play, b:target } = await playerInteraction();
      // const result = cardMatcher(play, target);
      const result = await playerInteraction();
      player.score += result.score;
      return "PLAYER_DRAW";
    }

    // case "MATCH": { return phase }

    case "SHODOWN": { return phase }

    case "REVENGE_BEGIN": { return "REVENGE_BEGIN" }

    case "ANTY_PAIR": { return "ESCAPE_CHECK" }

    case "ESCAPE_CHECK": { return "PLAYER_DRAW" }

    // case "SOLVE_QUEST": { return } // ending action
    // case "FAIL_QUEST ": { return } // ending action
  }
};

/** @type {() => Promise<MatchResult>} */
export const playerInteraction = async () =>
  allPossibleMoves(player, quest)
    .sort((a,b) => a.score - b.score)
    .pop()
  ;

/** @type {} */
export const questInteraction = async () => {};

/** @typedef {Label<"POSITIVE" | "NEGATIVE" | "ZERO" | "INVERZIT" | "FAIL">} MatchKind */

/** @typedef {{score: number, kind:keyof MatchKind, a:number, b:number}} MatchResult */

/** @type {(a:number, b:number) => MatchResult } */
export const cardMatcher = (a, b) => {
  switch (true) {
    case a > 0 && b > 0 && a % 2 !== b % 2:
      return { kind: "POSITIVE", score: a + b, a, b };
    case a < 0 && b < 0 && a % 2 === b % 2:
      return { kind: "NEGATIVE", score: Math.abs(a) + Math.abs(b), a, b };
    case a === 0 || b === 0 && a + b !== 0:
      return { kind: "ZERO", score: Math.abs(a + b) * 3, a, b };
    case a === Math.abs(b):
      return { kind: "INVERZIT", score: Math.abs(a) * 4, a, b };
    default:
      return { kind: "FAIL", score: 0, a, b, };
  }
};

/** @type {(solver: Entity, problem: Entity) => MatchResult[]} */
export const allPossibleMoves = (solver, problem) =>
  solver
    .hand
    .map(play => problem
      .hand
      .map(target => cardMatcher(play.value, target.value))
    ).flat();

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
