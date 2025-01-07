import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";
import { desertShip } from "./desertShip";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <Sprite {...desertShip[1]} class="
      rotate-[90deg]
      --hover:scale-[1.5]
      transition-all
      duration-500
    "></Sprite>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("soft-light"); // "hard-light"
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  state.foo = "something";
  useKeyboardCurse(state);
  useStarshipNavigation(state);

  const WoraShard = new Audio('media/Ethernal Wood.mp3');
  WoraShard.play();
});


// "difference" --> inversit
// "multiply" --> darkest space
// "soft-light" --> mid dark
