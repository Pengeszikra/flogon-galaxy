import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <section>
    <GalaxyRoute
      front={`../sheets/texture-${gAlfa}.png`}
      back={`../sheets/texture-${gBeta}.png`}
      zoom={250}
    >
      <section class="grid place-items-center w-[100vw] h-[100vh]">
        <figure class="
          pointer-events-auto
          aspect-video
          w-[80%]
          bg-[url(../ui-elements/ship-no-bg.png)]
          bg-cover
          relative
        ">
          <button id="hangar"
            class="bg-emerald-700/40 absolute w-[5rem] h-[3rem] top-[4rem] left-[2.5rem]"
            onClick={() => globalThis.location.replace('mine.html')}
          ></button>
          <button id="capatain"
            class="bg-sky-700/40 absolute w-[4rem] h-[3rem] top-[4rem] left-[11.5rem]"
            onClick={() => globalThis.location.replace('adventure.html')}
          ></button>
          <button id="bridge"></button>
          <button id="cantine"></button>
          <button id="storage"></button>
          <button id="meeting-hall"></button>
          <button id="relax"></button>
        </figure>
      </section>
    </GalaxyRoute>
  </section>
).then((page) => {
  const [state] = routeController("soft-light");
  state.ySpeed = (Math.random() - .5) / 3;
  state.xSpeed = Math.random();
  useKeyboardCurse(state);
});
