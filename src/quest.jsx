import { fencer, portal } from "./utils/fencer";
import { GalaxyRoute, routeController } from "./GalaxyRoute";

portal(
  <section class="relative min-w-full min-h-full">
    <GalaxyRoute
      front={"../sheets/texture-2002.png"}
      back={"../sheets/texture-2001.png"}
    />
    <section class="
      grid place-items-center
      absolute top-0 left-0
      min-w-[100vw] min-h-[100%]
      selection-none
      --bg-[url(../sheets/texture-2012.png)]
    ">
      <section class="grid select-none">
        <h1 class="text-emerald-200 text-2xl select-none">F L O G O N - G A L A X Y</h1>
        <p class="text-orange-300 text-sm text-right min-w-max">first contact</p>
      </section>
    </section>
  </section>
);

const [state] = routeController();
state.ySpeed = .3;

document.addEventListener("keydown",
  /** @type {(event:KeyboardEvent) => any} */
  (event) => {
    const {key} = event;
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
