import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { rnd, shuffle, signal, zignal } from "./utils/old-bird-soft";
import { gameLoop, gameSetup, randomDeck, freshState } from "./core-game";
import { FortyTwo } from "./utils/UniversalHarmonyNumber";

globalThis.gameTest =  (speed = FortyTwo, pAmunt = 20, qAmount = 25) => {
  const state = freshState();
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
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
});
