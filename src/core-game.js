import { dealToPlayer, dealToQuest, origo, POS, dropTo, move, MFRAG, pickUpPlayerDrop, reshufflePlayerCardToDeck } from "./deal-animations";
import { delay, rnd, shuffle, signal } from "./utils/old-bird-soft";
import { FortyTwo } from "./utils/UniversalHarmonyNumber";

/**
 * ```javascript
 * stop = setInterval(_ => {if (st.phase == "THE_END") clearInterval(stop);run()},200);
 * ```
 */

/**
 * @typedef {{
 *  x: number
 *  y: number
 *  z: number
 *  rX: number
 *  rY: number
 *  rZ: number
 *  zoom: number
 *  isQ: boolean
 * }} Pos3D
 */

/**
  *  @typedef {{
  *   id: string
  *   value: number
  *   name?: string
  *   description?: string
  *   skill?: string
  *   place?: Partial<Pos3D>
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
  *  baseDeck: SingleCard[]
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
  baseDeck: [],
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
  baseDeck: [],
};

/** @type {(amount:number) => SingleCard[]} */
export const randomDeck = (amount) => Array(amount)
  .fill()
  .map((_,idx) => ({
      id:"crd-" + Math.random().toString(36).slice(-7),
      value: rnd(FortyTwo + 1) - (FortyTwo / 2),
      ...origo,
      ...POS.sky
  }));

/** @type {keyof Phases} */
let phase;

/** @template {string} T @typedef {{ [K in T]: K }} Label */

/**
  * @typedef { Label<
  * "SETUP" |
  * "READY" |
  * "PLAYER_DRAW" |
  * "QUEST_DRAW_WITH_END_CHECK" |
  * "START_PLAY" |
  * "PLAY_MORE" |
  * "PROBLEM_CHECK" |
  * "REVENGE_BEGIN" |
  * "REVENGE" |
  * "ANTY_PAIR" |
  * "THE_END" |
  * "ESCAPE_CHECK" |
  * "SOLVE_QUEST" |
  * "FAIL_QUEST" |
  * "MATCH" |
  * "SHODOWN"
  * >} Phases
  */

/** @typedef {keyof Phases} PhasesKey */

/** @type {(st: State, a:PhasesKey, b:PhasesKey) => PhasesKey} */
export const fluctual = (state, a, b) => state.phase === a ? b : a ;

/** @typedef {{phase:keyof Phases, player: Entity, quest: Entity}} State */

/** @type {(st:State) => Promise<keyof Phases>} */
export const gameLoop = async (st, ...foo) => {
  switch (st.phase) {
    case "SETUP": {
      st.player.deck = st.player.baseDeck;
      st.quest.deck = st.quest.baseDeck;
      console.log(JSON.stringify(st.player.deck.map(({value})=>value)))
      console.log(JSON.stringify(st.quest.deck.map(({value})=>value)))
      return st.phase = "READY";
    }

    case "READY": {
      await delay(2000);
      return st.phase = "PLAYER_DRAW";
    }

    case "PLAYER_DRAW": {
      if (st.player.deck.length + st.player.hand.length < 4) {
        await pickUpPlayerDrop(st);
        st.player.deck = [...st.player.deck, ...st.player.drop].sort(shuffle);
        await reshufflePlayerCardToDeck(st);
        st.player.drop = [];
      }
      while (st.player.hand.length < 4) {
        const crd = st.player.deck.pop();
        await dealToPlayer(st, crd);
        st.player.hand.push(crd);
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
      const crd1 = st.quest.deck.pop()
      await dealToQuest(st, crd1);
      st.quest.hand.push(crd1);

      if (st.quest.deck.length > 0) {
        const crd2 = st.quest.deck.pop()
        await dealToQuest(st, crd2);
        st.quest.hand.push(crd2);
      }

      return st.phase = st.quest.hand.length >= 4
        ? "REVENGE_BEGIN"
        : "START_PLAY"
        ;
    }

    case "PROBLEM_CHECK": return;

    case "PLAY_MORE":
    case "START_PLAY": {
      let possibleMoves = allPossibleMoves(st.player, st.quest)
        .filter(({ kind }) => kind !== "FAIL");
      // return st.phase = "PROBLEM_CHECK";
      if (possibleMoves.length < 1) {
        return st.phase = "PLAYER_DRAW";
      }
      const result = await bestScoreInteraction(possibleMoves);
      console.log(` (${result?.a?.value}) ---> (${result?.b?.value}) `);

      move(result.a, POS.pToPair);
      await delay(MFRAG * 4);
      move(result.b, POS.qToPair);
      await delay(MFRAG * 4);

      st.player.hand = st.player.hand.filter(card => card !== result.a);
      st.quest.hand = st.quest.hand.filter(card => card !== result.b);
      st.player.drop.push(result.a);
      await dropTo(result.a, POS.pDrop, st.player.drop);
      st.quest.drop.push(result.b);
      await dropTo(result.b, POS.qDrop, st.quest.drop);
      st.player.score += result.score;
      return st.phase = possibleMoves.length > 1
        ? fluctual(st, "START_PLAY", "PLAY_MORE")
        : "PLAYER_DRAW"
        ;
    }

    case "SHODOWN": { return st.phase = "ESCAPE_CHECK" }

    case "REVENGE":
    case "REVENGE_BEGIN": {
      const possibleMoves = allPossibleMoves(st.quest, st.player)
        .filter(({kind}) => kind !== "FAIL");
      if (possibleMoves.length < 1) {
        while (st.quest.hand.length) {
          const toDrop = st.quest.hand.shift();
          st.quest.score += Math.abs(toDrop.value);
          await dropTo(toDrop, POS.qDrop, st.quest.drop);
          st.quest.drop.push(toDrop);
        }
        return st.phase = possibleMoves.length > 1
          ? fluctual(st, "REVENGE_BEGIN", "REVENGE")
          : "PLAYER_DRAW"
          ;
      }
      const result = await bestScoreInteraction(possibleMoves);
      console.log(` <${result?.a?.value}> ---> <${result?.b?.value}> `);
      st.quest.hand = st.quest.hand.filter(card => card !== result.a);
      st.player.hand = st.player.hand.filter(card => card !== result.b);
      await dropTo(result.a, POS.qDrop, st.quest.drop);
      st.quest.drop.push(result.a);
      await dropTo(result.b, POS.pDrop, st.player.drop);
      st.player.drop.push(result.b);
      st.player.score += result.score;
      return st.phase = fluctual(st, "REVENGE_BEGIN", "REVENGE")
    }

    case "SOLVE_QUEST": { return st.phase = "THE_END" } // ending action
    case "FAIL_QUEST": { return st.phase = "THE_END" } // ending action
  }
};

/** @type {(matchResults: MatchResult[]) => Promise<MatchResult>} */
export const bestScoreInteraction = async (matchResults) =>
  matchResults
    .sort((alfa, beta) => alfa.score - beta.score)
    .pop()
  ;

/** @typedef {Label<"POSITIVE" | "NEGATIVE" | "ZERO" | "INVERZIT" | "FAIL">} MatchKind */

/** @typedef {{score: number, kind:keyof MatchKind, a:SingleCard, b:SingleCard}} MatchResult */

const NONE = Symbol('NONE');

/** @type {(a:SingleCard, b:SingleCard) => MatchResult } */
export const cardMatcher = (a, b) => {
  const av = a?.value ?? FortyTwo;
  const bv = b?.value ?? FortyTwo;
  switch (true) {
    case av > 0 && bv > 0 && av % 2 !== bv % 2:
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

/** @type {(st:State) => any} */
export const logger = (st) => {
  try {
    console.log(`${st.phase} :: ${summ(st.player)} :: ${summ(st.quest)} (${st.player.score}/${st.quest.score})`);
  } catch (err) { console.warn(st) }
}

/** @type {(render:(state:State)=>any) => State} */
export const freshState = (render) => signal(render)({phase, player, quest});

/** @type {(st:State, p: SingleCard[], q: SingleCard[]) => any} */
export const gameSetup = (state, playerDeck, questDeck) => {
  state.player.baseDeck = playerDeck;
  state.quest.baseDeck = questDeck;
  state.phase = "SETUP";
}
