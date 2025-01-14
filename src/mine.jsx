import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { calculateShipRotation, GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";
import { desertShip } from "./desertShip";
import { planets } from "./planets";
import { flogons } from "./flogonsSprites";
import { spicies } from "./spicies";
import {assets} from './throw/asset';

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <Sprite {...desertShip[9]} class="
      ship
      pointer-events-auto
      rotate-[90deg]
      scale-[2]
    "></Sprite>

    <Sprite {...assets[4]} class="
      fixed top-0 left-0
      planet
      pointer-events-auto
      scale-[2]
      z-50
    "></Sprite>
    <svg class="absolute top-0 left-0 w-[100vw] aspect-video pointer-events-none z-50">
      <line x1="0" y1="80" x2="100" y2="20" stroke="blue" />
    </svg>
  </GalaxyRoute>
).then(() => {
  /** @type {HTMLDivElement} */
  const ship = document.querySelector('.ship');
  const line = document.querySelector('line');
  ship.style.transitionDuration = "0";
  ship.onclick = () => globalThis.location.replace('deal.html');
  //   setTimeout(() => ship.style.transitionDuration = "500ms", 300);
  const showState = st => {
    /** @type {{xSpeed:number, ySpeed:number}} */
    const { xSpeed, ySpeed } = st;

    const rotation = calculateShipRotation(st.xSpeed, st.ySpeed);

    ship.style.rotate = `${rotation}rad`;
    // JSON.stringify({ xs:+xSpeed.toFixed(2), ys:+ySpeed.toFixed(2), r:+rotation.toFixed(2)});
  }
  const [state] = routeController("soft-light", showState); // "hard-light"
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
  useStarshipNavigation(state, line);

  const instruments = new Audio('media/Ethernal Wood.mp3');
  // instruments.play();
});

// "difference" --> inversit
// "multiply" --> darkest space
// "soft-light" --> mid dark
