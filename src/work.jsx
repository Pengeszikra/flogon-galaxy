import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController } from "./GalaxyRoute";
import { assets } from "./throw/asset";

const [gAlfa, gBeta] = galaxyTextureList();

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
    <Sprite {...assets[18]}></Sprite>
  </GalaxyRoute>
).then(() => {
  // color-dodge ->
  const [state] = routeController("color-dodge");
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;

  document.addEventListener("keydown",
    /** @type {(event:KeyboardEvent) => any} */
    (event) => {
      const { key } = event;
      switch (key) {
        case "a": return state.xSpeed -= .1;
        case "d": return state.xSpeed += .1;
        case "w": return state.ySpeed -= .1;
        case "s": return state.ySpeed += .1;
        case " ": {
          state.xSpeed = 0;
          state.ySpeed = 0;
          state.zSpeed = 0;
          return;
        };
      }
    }
  );
});
