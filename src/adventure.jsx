import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    // front={`https://cdn.midjourney.com/7d495377-bc4b-4d88-b30a-663048b682ac/0_3.png`}
    // front={`https://cdn.midjourney.com/cf0c1c6c-af2e-429d-9c0a-6ae74a856b82/0_2.png`}
    // front={`https://cdn.midjourney.com/2d61d37e-c402-4916-884b-790313208edc/0_2.png`}
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
    // back={`https://cdn.midjourney.com/7d495377-bc4b-4d88-b30a-663048b682ac/0_3.png`}
    // back={`https://cdn.midjourney.com/cf0c1c6c-af2e-429d-9c0a-6ae74a856b82/0_2.png`}
    // back={`https://cdn.midjourney.com/06947e48-56a4-4a01-bc36-337a3e636096/0_2.png`}
  >
    <figure class="
      fixed top-0 left-0 z-50
      bg-[url(../WoraPlayOnPiano.png)]
      bg-cover
      min-w-[100vw]
      aspect-video
    "></figure>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("color-dodge");
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);

  const WoraShard = new Audio('media/Tomorrow.mp3');
  WoraShard.play();
});
