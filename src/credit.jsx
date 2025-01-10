import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { pick, rnd } from "./utils/old-bird-soft";
import { trackList } from "./media-assets";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    // front={`https://cdn.midjourney.com/4151a128-a790-4b9f-8586-812300685fca/0_1.png`}
    // front={`https://cdn.midjourney.com/441bb587-4d56-4d73-a027-6d6eef418659/0_2.png`}
    // back={`https://cdn.midjourney.com/441bb587-4d56-4d73-a027-6d6eef418659/0_2.png`} // dual
    // front={`https://cdn.midjourney.com/2fdeae00-337a-41f4-b243-55f399e0a5b2/0_1.png`}
    back={`https://cdn.midjourney.com/e52feeaf-3369-4136-80a4-baa03c272792/0_2.png`}
    zoom={250}
  >
    <section class="grid select-none">
      <h1 class="text-emerald-200 text-[5vw]">C R E D I T</h1>
      <p class="text-orange-300 text-[3vw] text-right min-w-max">... a long list comming</p>
    </section>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("multiply");
  state.ySpeed = Math.random() - .5;
  useKeyboardCurse(state);
  document.querySelector('body').onclick = () => {
    const [,randomTrack] = pick(trackList);
    const WoraShard = new Audio(randomTrack);
    WoraShard.play();
  }
});
