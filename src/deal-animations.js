import { delay } from "./utils/old-bird-soft";

/** @type {import('./core-game').Pos3D} */
export const origo = {x:0, y:0, z:0, rX: 0, rY:0, rZ: 0, zoom: 1};

/** @typedef {import('../src/core-game').State} MissionState */

export const SKY = 50;
export const FLOOR = 10;
export const SIZE = 2.5;
export const MFRAG = 150;
export const UP = 30;

// --- A possible 3D position
export const POS = {
  sky: { ...origo, zoom: SIZE, z: SKY },

  qDeck:  { x: -26, z: FLOOR, y: -10, zoom: SIZE },
  qHand1: { x: -13, z: FLOOR },
  qHand2: { x:   0, z: FLOOR },
  qHand3: { x:  13, z: FLOOR },
  qHand4: { x:  26, z: FLOOR },
  qDrop:  { x:  39, z: FLOOR },

  pToPair: { z: FLOOR },
  qToPair: { z: FLOOR },

  pDeck:  { x: -26, z: FLOOR, y: 10, zoom: SIZE },
  pHand1: { x: -13, z: FLOOR },
  pHand2: { x:   0, z: FLOOR },
  pHand3: { x:  13, z: FLOOR },
  pHand4: { x:  26, z: FLOOR },
  pDrop:  { x:  39, z: FLOOR },
};

export const move = Object.assign;

/** @type {(st:MissionState) => Promise<void>} */
export const dealToPlayer = async (st) => {
  console.log('--- deal to player ---')
  const { deck } = st.player;
  await delay(MFRAG); deck.at(-1).z = UP;
  await delay(MFRAG); move(deck.at(-1), POS.pHand1);

  await delay(MFRAG); deck.at(-2).z = UP;
  await delay(MFRAG); move(deck.at(-2), POS.pHand2);

  await delay(MFRAG); deck.at(-3).z = UP;
  await delay(MFRAG); move(deck.at(-3), POS.pHand3);

  await delay(MFRAG); deck.at(-4).z = UP;
  await delay(MFRAG); move(deck.at(-4), POS.pHand4);
};

/** @type {(st:MissionState) => Promise<void>} */
export const dealToQuest = async (st) => {
  console.log('-=- deal to quest -=-')
  const { deck } = st.quest;
  await delay(MFRAG); deck.at(-1).z = UP;
  await delay(MFRAG); move(deck.at(-1), POS.qHand2);

  await delay(MFRAG); deck.at(-2).z = UP;
  await delay(MFRAG); move(deck.at(-2), POS.qHand3);
};

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
