import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";

/** @type {(props: { id: number, value: number }) => HTMLElement} */
const Card = ({id, value}) => (
  <div class="relative">
    <Sprite {...assetList[id]}
      class="
        rounded-xl outline outline-1 outline-zinc-900
        hover:scale-[1.5]
        transition-all
        duration-500
      ">
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

/** @type {(props: { id: number }) => HTMLElement} */
const Test = ({ id }) => <div class="bg-rose-700 w-10 h-10 grid place-items-center text-white">{id}</div>;

const [gAlfa, gBeta] = galaxyTextureList();

/** @typedef {import('../src/utils/fencer').SpriteProps} SpriteProps */
/** @type {(props:{card: SpriteProps}) => HTMLElement | DocumentFragment} */

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <section class="w-[100vw] grid grid-cols-6 gap-x-[1rem] gap-y-[1rem] p-[2rem] bg-zinc-700/70">
      {assetList.map((_, idx) => <Card id={idx} value={idx} />)}
      {flogons.map((_, idx) => <Test id={idx} />)}
    </section>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("screen");
  useKeyboardCurse(state);
});
