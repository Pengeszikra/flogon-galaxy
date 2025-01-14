import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { calculateShipRotation, GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";
import { desertShip } from "./desertShip";
import { flogons } from "./flogonsSprites";
import {assets} from './throw/asset';
import { rnd } from "./utils/old-bird-soft";
import { spicies } from "./throw/spicies";
import { planets } from "./throw/planets";
import { scifiUI } from "./throw/ui-elements";
import { targetSystem } from "./throw/targetSystem";

const [gAlfa, gBeta] = galaxyTextureList();
let [spaceX, spaceY] = [0, 0];

let score = 0; let scoreDisplay;

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <Sprite {...targetSystem[13]} class="
      absolute top-[4rem] right-[4rem]
      scale-[2]
      mix-blend-lighten
      transition-all
      duration-300
      hover:brightness-200
    "
    onClick={() => globalThis.location.replace('ship.html')}
    />
    <div class="select-none fixed top-0 left-[40%] z-50 text-[2rem] p-4 text-orange-400">score: <span id="score"></span></div>
    <section id="origo" class="absolute top-[50%] left-[50%]">
      {[...scifiUI,...scifiUI,...scifiUI,...targetSystem, ...targetSystem, ...targetSystem].map((object, idx) => (
        <Sprite {...object} class="
          absolute top-[50%] left-[50%]
          planet
          pointer-events-auto
          scale-[2]
          hover:brightness-150
          hover:scale-[4]
          transition-all
          duration-300
          mix-blend-lighten
        "
          style={{ top: `${rnd(1000) - 500}rem`, left: `${rnd(1000) - 500}rem` }}
          onClick={({target}) => {
            try {
              target.style.pointerEvents = "none";
              target.style.transformDuration = "1000";
              target.style.transform = "scale(0.01)"
              setTimeout(() => target.remove(), 1000);
              score += rnd(10) * 10;
              scoreDisplay.innerText = score;
            } catch(error) {console.error(error)}
          } }
        ></Sprite>
      ))}
    </section>

    <Sprite {...desertShip[9]} class="
      ship
      pointer-events-none
      rotate-[90deg]
      scale-[2]
    "></Sprite>


    <svg class="absolute top-0 left-0 w-[100vw] aspect-video pointer-events-none z-50">
      <line x1="0" y1="80" x2="100" y2="20" stroke="blue" />
    </svg>
  </GalaxyRoute>
).then((page) => {
  /** @type {HTMLDivElement} */
  const ship = page.querySelector('.ship');
  const line = document.querySelector('line');
  /** @type {HTMLDivElement} */
  const origo = page.querySelector('#origo');
  /** @type {HTMLDivElement} */
  scoreDisplay = document.querySelector('#score');
  globalThis.origo = origo

  ship.style.transitionDuration = "0";
  // ship.onclick = () => globalThis.location.replace('deal.html');
  // setTimeout(() => ship.style.transitionDuration = "500ms", 300);
  /** @type {(st:{xSpeed:number, ySpeed:number}) => void} */
  const showState = st => {
    const rotation = calculateShipRotation(st.xSpeed, st.ySpeed);
    ship.style.rotate = `${rotation}rad`;
    origo.style.left   = `${spaceX -= st.xSpeed}%`;
    origo.style.top  = `${spaceY -= st.ySpeed}%`;
  }

  const [state] = routeController("soft-light", showState); // "hard-light"
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;

  // useKeyboardCurse(state);
  useStarshipNavigation(state, line);

  const instruments = new Audio('media/Ethernal Wood.mp3');
  // instruments.play();
});

// "difference" --> inversit
// "multiply" --> darkest space
// "soft-light" --> mid dark
