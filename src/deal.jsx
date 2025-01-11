import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { rnd, shuffle, signal, zignal } from "./utils/old-bird-soft";
import { gameLoop, gameSetup, randomDeck, freshState, logger } from "./core-game";
import { FortyTwo } from "./utils/UniversalHarmonyNumber";

globalThis.gameTest =  (speed = FortyTwo, pAmunt = 20, qAmount = 25) => {
  const state = freshState(logger);
  gameSetup(state, randomDeck(pAmunt), randomDeck(qAmount));
  globalThis.run = () => gameLoop(state);
  const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); run() }, speed);
};

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
    <section id="score-board" class="
      min-w-full
      bg-black/45 text-orange-300
      flex gap-2 p-4
      text-4xl
      justify-evenly
    ">
      <figure class="
        hidden
        aspect-video
        min-w-full
        absolute top-0 left-0
        bg-[url(../sheets/bridge-4400.png)]
        bg-cover
      "></figure>
      <p>player score: <span id="p-score" class="text-orange-600">200</span></p>
      <p>quest score: <span id="q-score" class="text-orange-600">200</span></p>
    </section>
    <section id="desk" class="
      w-[100vw] h-[56vw]
      grid grid-cols-4 gap-x-[1rem] gap-y-[10rem]
      place-items-center
      bg-black/75
    "
    >
      {assetList.slice(0,8).map((_, idx) => <Card id={idx} value={idx - 11} />)}
    </section>
  </GalaxyRoute>
).then(() => {
  const [galaxy] = routeController("screen");
  galaxy.ySpeed = (Math.random() - .5) / 3;
  galaxy.xSpeed = (Math.random() - .5) / 3;
  useKeyboardCurse(galaxy);

  /** @type {HTMLElement} */ const pScore = document.querySelector('#p-score');
  /** @type {HTMLElement} */ const qScore = document.querySelector('#q-score');

  /** @typedef {import('./core-game').State} State */
  /** @type {(st:State) => any} */
  const render = (st) => {
    pScore.innerText = st?.player?.score?.toString() ?? "0";
    qScore.innerText = st?.quest?.score?.toString() ?? "0";
    logger(st);
  }

  const state = freshState(render);
  gameSetup(state, randomDeck(12), randomDeck(21));
  const flow = () => gameLoop(state);
  const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); flow() }, FortyTwo);
});
