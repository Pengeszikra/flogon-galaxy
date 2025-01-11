import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { pick, rnd, shuffle, signal, zignal } from "./utils/old-bird-soft";
import { gameLoop, gameSetup, randomDeck, freshState, logger } from "./core-game";
import { FortyTwo } from "./utils/UniversalHarmonyNumber";
import { transform } from "typescript";

globalThis.gameTest =  (speed = FortyTwo, pAmunt = 20, qAmount = 25) => {
  const state = freshState(logger);
  gameSetup(state, randomDeck(pAmunt), randomDeck(qAmount));
  globalThis.run = () => gameLoop(state);
  const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); run() }, speed);
};

// ------------------------- 3D ----------------------------------

const allCard = randomDeck(FortyTwo);

/** @type {(props: { id: string, value: number, style:object }) => HTMLElement} */
const Card = ({id, value, style}) => (
  <div
    style={style}
    id={id}
    class="
      card
      absolute top-0 left-0
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
          translateX(${idx%2==0?-13:0}rem)
          translateY(${idx%2==0?-10:10}rem)
          translateZ(${idx/10 + 50}rem)
          scale(2.5)
        `}}/>
      ))}
    </section>
  </GalaxyRoute>
).then(() => {
  const [galaxy] = routeController("screen");
  galaxy.ySpeed = (Math.random() - .5) / .3;
  galaxy.xSpeed = (Math.random() - .5) / .3;
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
  }

  allCard.map(({id}, idx) => {
    /** @type {HTMLElement} */ const card = document.querySelector(`#${id}`);
    setTimeout(() => card.style.transform = `
      translateX(${idx%2==0?-13:0}rem)
      translateY(${idx%2==0?-10:10}rem)
      translateZ(${idx/10 + 10}rem)
      scale(2.5)
    `, idx * 10 + (idx%2 * 1000));

  })

  const state = freshState(render);
  gameSetup(state, randomDeck(12), randomDeck(21));
  const flow = () => gameLoop(state);
  const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); flow() }, FortyTwo);
});

/*

--- A possible 3D position

qDeck
qHand1
qHand2
qHand3
qHand4
qDrop

pToPair
qToPair

pDeck
pHand1
pHand2
pHand3
pHand4
pDrop

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
