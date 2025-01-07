import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { calculateShipRotation, GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";
import { desertShip } from "./desertShip";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <Sprite {...desertShip[9]} class="
      ship
      rotate-[90deg]
      --hover:scale-[1.5]
      --transition-all
      duration-0
    "></Sprite>
    <pre class="
      hidden
      text-sm
      p-2
      absolute top-0 left-0
      text-emerald-400
    ">{}</pre>
  </GalaxyRoute>
).then(() => {
  const debug = document.querySelector('pre');
  /** @type{HTMLElement} */
  const ship = document.querySelector('.ship')
  setTimeout(() => ship.style.transitionDuration = "500ms", 300);
  const showState = st => {
    /** @type {{xSpeed:number, ySpeed:number}} */
    const { xSpeed, ySpeed } = st;

    const rotation = calculateShipRotation(st.xSpeed, st.ySpeed);

    ship.style.rotate = `${rotation + 90}deg`;
    debug.innerText = JSON.stringify({ xs:+xSpeed.toFixed(2), ys:+ySpeed.toFixed(2), r:+rotation.toFixed(2)});
  }
  const [state] = routeController("soft-light", showState); // "hard-light"
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
  useStarshipNavigation(state);

  const instruments = new Audio('media/Ethernal Wood.mp3');
  // instruments.play();
});


// "difference" --> inversit
// "multiply" --> darkest space
// "soft-light" --> mid dark
