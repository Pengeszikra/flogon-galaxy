import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { delay, pick, rnd, shuffle, signal, zignal } from "./utils/old-bird-soft";
import { gameLoop, gameSetup, randomDeck, freshState, logger, origo } from "./core-game";
import { FortyTwo } from "./utils/UniversalHarmonyNumber";

/** @typedef {import('../src/core-game').State} MissionState */
/** @typedef {import('../src/core-game').SingleCard} SingleCard */

globalThis.gameTest =  (speed = FortyTwo, pAmunt = 20, qAmount = 25) => {
  const state = freshState(logger);
  gameSetup(state, randomDeck(pAmunt), randomDeck(qAmount));
  globalThis.run = () => gameLoop(state);
  const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); run() }, speed);
};

// ------------------------- 3D ----------------------------------

const allCard = randomDeck(FortyTwo * 2);

const SKY = 50;
const FLOOR = 10;
const SIZE = 2.5;
const MFRAG = 150;
const UP = 30;

export const POS = {
  sky: { ...origo, zoom: SIZE, z: SKY },

  qDeck:  { x: -26, z: FLOOR, y: -10, zoom: SIZE },
  qHand1: { x: -13, z: FLOOR },
  qHand2: { x:   0, z: FLOOR },
  qHand3: { x:  13, z: FLOOR },
  qHand4: { x:  26, z: FLOOR },
  qDrop:  { x:  39, z: FLOOR },

  pToPair: { x: -26, z: FLOOR },
  qToPair: { x: -26, z: FLOOR },

  pDeck:  { x: -26, z: FLOOR, y: 10, zoom: SIZE },
  pHand1: { x: -13, z: FLOOR },
  pHand2: { x:   0, z: FLOOR },
  pHand3: { x:  13, z: FLOOR },
  pHand4: { x:  26, z: FLOOR },
  pDrop:  { x:  39, z: FLOOR },
};

export const move = Object.assign;

/** @type {(props: { id: string, value: number, style:object }) => HTMLElement} */
const Card = ({id, value, style}) => (
  <div
    style={style}
    id={id}
    class="
      card
      absolute top-8 left-0;
      scale-[3.2]
      transition-all duration-500
      pointer-events-auto
      --hover:scale-[5]
    ">
    <Sprite
      {...pick(assetList)}
      class="rounded-xl outline outline-1 outline-zinc-900">
    </Sprite>
    <div class="
      text-neutral-700
      text-[.7rem]
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
    <figure class="
      --hidden
      aspect-video
      min-w-full
      absolute top-0 left-0
      bg-[url(../sheets/bridge-4400.png)]
      bg-cover
    "></figure>

    <section id="score-board" class="
      absolute top-0 left-0
      min-w-full
      bg-black/45 text-orange-300
      flex gap-2 p-4
      text-3xl
      justify-evenly
      select-none
    ">
      <p>player score: <span id="p-score" class="text-orange-600">200</span></p>
      <p>quest score: <span id="q-score" class="text-orange-600">200</span></p>
    </section>
    <section id="desk" class="
      absolute top-[60%] left-[50%]
      w-[0] h-[0]
      --grid --grid-cols-4 gap-x-[2rem] gap-y-[17rem]
      place-items-center
      --bg-black/75
    "
    >
      {allCard.map(({value,id}, idx) => (
        <Card id={id} value={value} style={{transform:`
          translateX(${idx%2==0?30:-30}rem)
          translateY(${idx%2==0?-10:10}rem)
          translateZ(${idx/10 + SKY}rem)
          scale(${SIZE})
        `}}/>
      ))}
    </section>
  </GalaxyRoute>
).then((page) => {
  const [galaxy] = routeController("screen");
  // galaxy.ySpeed = (Math.random() - .5) / .3;
  // galaxy.xSpeed = (Math.random() - .5) / .3;
  useKeyboardCurse(galaxy);

  /** @type {HTMLElement} */ const pScore = document.querySelector('#p-score');
  /** @type {HTMLElement} */ const qScore = document.querySelector('#q-score');
  /** @type {HTMLElement} */ const deck = document.querySelector('#deck');

  /** @typedef {import('./core-game').State} State */
  /** @type {(st:State) => any} */
  const render = (st) => {
    pScore.innerText = st?.player?.score?.toString() ?? "0";
    qScore.innerText = st?.quest?.score?.toString() ?? "0";
    logger(st);
    if (st.phase === "READY") {
      state.player.deck.map((crdState, idx) =>
        setTimeout(
          () => move(crdState, {...POS.pDeck, z: idx / 3 + FLOOR})
          , idx * 20
        )
      );

      setTimeout(() =>
        state.quest.deck.map((crdState, idx) =>
          setTimeout(
            () => move(crdState, {...POS.qDeck, z: idx / 3 + FLOOR})
            , idx * 20
          )
        ), 1000);
    }

    if (st.phase === "PLAYER_DRAW") dealToPlayer(st);

    if (st.phase === "QUEST_DRAW_WITH_END_CHECK") dealToQuest(st);
  }

  /** @type {(info:SingleCard) => any} */
  const newOrder = (info) => {
    const {id, x,y,z,rX,rY,rZ,zoom} = info;
    /** @type {HTMLElement} */ const card = page.querySelector(`#${id}`); // TODO
    card.style.transition = `transform 300ms linear`;
    card.style.transform = `
      translateX(${x}rem)
      translateY(${y}rem)
      translateZ(${z}rem)
      rotateX(${rX}deg)
      rotateY(${rY}deg)
      rotateZ(${rZ}deg)
      scale(${zoom})
    `;
    // console.log(card, info);
  }

  const state = freshState(render);
  globalThis.st = state; // TODO
  const movingCards = allCard.map(card => signal(newOrder)(card));
  gameSetup(state, movingCards.slice(0,12), movingCards.slice(12, 12 + 21));
  const flow = () => gameLoop(state);

  // const stop = setInterval(_ => { if (state.phase == "READY") clearInterval(stop); flow() }, FortyTwo);
  const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); flow() }, FortyTwo * 10);

});

/** @type {(st:MissionState) => Promise<void>} */
export const dealToPlayer = async (st) => {
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
  const { deck } = st.quest;
  await delay(MFRAG); deck.at(-1).z = UP;
  await delay(MFRAG); move(deck.at(-1), POS.qHand2);

  await delay(MFRAG); deck.at(-2).z = UP;
  await delay(MFRAG); move(deck.at(-2), POS.qHand3);
};


/*

--- A possible 3D position

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
