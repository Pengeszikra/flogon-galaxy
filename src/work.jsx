import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assets } from "./throw/asset";
import { assetList } from "./throw/shoot";
import { scifiUI } from "./throw/ui-elements";

const [gAlfa, gBeta] = galaxyTextureList();

/** @typedef {import('../src/utils/fencer').SpriteProps} SpriteProps */
/** @type {(props:{card: SpriteProps}) => HTMLElement | DocumentFragment} */

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <figure class="
      aspect-video
      min-w-full
      absolute top-0 left-0
      bg-[url(../sheets/bridge-4400.png)]
      bg-cover
    "></figure>
    <Sprite {...assetList[7]} class="scale-[x1.x4] bottom-[50%] absolute left-[28%] rounded-xl outline outline-1 outline-zinc-900 hover:scale-[1.5]"></Sprite>
    <Sprite {...assetList[10]} class="scale-[x1.x4] bottom-[60%] absolute left-[48%] rounded-xl outline outline-1 outline-zinc-900 hover:scale-[1.5]"></Sprite>
    <Sprite {...assetList[4]} class="scale-[x1.x4] bottom-[50%] absolute left-[68%] rounded-xl outline outline-1 outline-zinc-900 hover:scale-[1.5]"></Sprite>

    <Sprite {...scifiUI[10]} class="scale-[2] mix-blend-screen pointer-events-none"></Sprite>
    <Sprite {...assets[18]} class="scale-[3] bottom-[20%] absolute left-[44%]"></Sprite>
  </GalaxyRoute>
).then(() => {
  // color-dodge ->
  const [state] = routeController("color-dodge");
  // initial vector
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
});
