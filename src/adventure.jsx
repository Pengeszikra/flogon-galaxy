import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <figure class="
      fixed top-0 left-0 z-50
      bg-[url(../WoraPlayOnPiano.png)]
      bg-cover
      min-w-[100vw]
      aspect-video
      pointer-events-none
    "></figure>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("color-dodge");
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
  useStarshipNavigation(state);
  let isPlay = false;

  document.querySelector('body').onclick = () => {
    if (isPlay) {
      window.location = 'mine.html';
      return;
    }
    const WoraShard = new Audio('media/Tomorrow.mp3');
    WoraShard.play();
    isPlay = true;
  }
});
