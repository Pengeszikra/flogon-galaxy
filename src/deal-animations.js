import { delay, pick } from "./utils/old-bird-soft";


/** @typedef {import('./core-game').Pos3D} Pos3D */
/** @typedef {import('../src/core-game').State} MissionState */
/** @typedef {import("./core-game").SingleCard} SingleCard */

/** @type {Pos3D} */
export const origo = {
  x:0, y:0, z:0,
  rX: 0, rY:0, rZ: 0,
  zoom: 1, isQ: false,
};

export const SKY = 30;
export const FLOOR = 5;
export const SIZE = 2.5;
export const MFRAG = 150;
export const UP = 20;

// --- A possible 3D position
/** @typedef {Record<string, Partial<Pos3D>>} Positions */
/** @type {Positions} */
export const POS = {
  sky: { ...origo, zoom: SIZE, z: SKY, x: Math.random() > .5 ? 30 : -30 },

  qDeck:  { x: -26, z: FLOOR, isQ: true, y: -10, zoom: SIZE },
  qHand1: { x: -13, z: FLOOR, isQ: true },
  qHand2: { x:   0, z: FLOOR, isQ: true },
  qHand3: { x:  13, z: FLOOR, isQ: true },
  qHand4: { x:  26, z: FLOOR, isQ: true },
  qDrop:  { x:  39, z: FLOOR, isQ: true, y: -10, rX: 0 },

  pToPair: { z: FLOOR + 13, y: 3, x: -3, rX:-25 },
  qToPair: { z: FLOOR + 13, y: 3, x: 10, rX:-25 },

  pDeck:  { x: -26, z: FLOOR, y: 10, zoom: SIZE },
  pHand1: { x: -13, z: FLOOR },
  pHand2: { x:   0, z: FLOOR },
  pHand3: { x:  13, z: FLOOR },
  pHand4: { x:  26, z: FLOOR },
  pDrop:  { x:  39, z: FLOOR, y: 10, rX: 0 },
};


/** @type {Partial<Pos3D>[]} */
export const pHandList = [POS.pHand1, POS.pHand2, POS.pHand3, POS.pHand4];
/** @type {Partial<Pos3D>[]} */
export const qHandList = [POS.qHand2, POS.qHand3, POS.qHand1, POS.qHand4];

/** @type {(crd:SingleCard, pos:Partial<Pos3D>, extra?:Partial<Pos3D>) => SingleCard} */
export const move = (crd, pos, extra = {}) => {
  Object.assign(crd, { ...pos, ...extra });
  crd.place = pos;
  return crd;
};

/** @template {Array} T @type {(all:T[], exist:T[]) => T[]} */
export const unFind = (all, exist) => all.reduce(
  (co, itm) => exist.includes(itm) ? co : [...co, itm]
  , []
);

/** @type {(st:MissionState, crd:SingleCard) => Promise<void>} */
export const dealToPlayer = async (st, crd) => {
  /** @type {Partial<Pos3D>} */
  const emptyPlace = pick(unFind(qHandList, st.quest.hand.map(card => card.place)));
  await delay(MFRAG); crd.z = UP;
  await delay(MFRAG); move(crd, emptyPlace);
};

/** @type {(st:MissionState, crd:SingleCard) => Promise<void>} */
export const dealToQuest = async (st, crd) => {
  /** @type {Partial<Pos3D>} */
  const emptyPlace = pick(unFind(pHandList, st.player.hand.map(card => card.place)));
  await delay(MFRAG); crd.z = UP;
  await delay(MFRAG); move(crd, emptyPlace);
};

/** @type {(card:SingleCard, position: Partial<Pos3D>) => Promise<void>} */
export const moveTo = async (card, position) => {
  await delay(MFRAG); card.z = UP;
  await delay(MFRAG); move(card, position);
}

/** @type {(card:SingleCard, position: Partial<Pos3D>, drop:SingleCard[]) => Promise<void>} */
export const dropTo = async (card, position, drop) => {
  await delay(MFRAG); card.z = UP;
  await delay(MFRAG); move(card, position, {z: drop.length / 3 + FLOOR});
}

/** @type {(st:MissionState) => Promise<void>} */
export const pickUpPlayerDrop = async ({player}) => {
  for (let i = player.drop.length - 1; i >= 0; i--) {
    await delay(MFRAG / 2); move(player.drop[i], POS.sky, {x: i % 2 ? -30 : 10});
  }
  await delay(MFRAG);
}
/** @type {(st:MissionState) => Promise<void>} */
export const reshufflePlayerCardToDeck = async ({player}) => {
  for (let i = 0; i < player.deck.length ; i++) {
    await delay(MFRAG); move(player.deck[i], POS.pDeck, {z: i / 3 + FLOOR});
  }
  await delay(MFRAG);
}

/*
--- A possible moves
buildDeck ( from above )
dealCardToPlayer
flipDealedCard
dealCardToQuest
selectCardOnPlayerHand
selectCardOnQuestHand
pairPlayerCard
pairQuestCard
pairGoDrop
handGoDrop
dropShuffleToDeck
*/
