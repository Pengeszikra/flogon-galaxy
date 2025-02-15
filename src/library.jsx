import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { setupMarkerViews } from "./marker";
import { DebugFrame } from "./DebugFrame";
import { PointAndClick } from "./PointAndClick";
import { targetSystem } from "./throw/targetSystem";

let changeMd = (doc) => {}

export const list = [
  ["https://cdn.midjourney.com/be57d5a3-0eab-4252-bcfb-604bd19a8b81/0_0.png",'../docs/rule.md'],
  ["https://cdn.midjourney.com/682ad3bc-f90c-43f7-a536-9db59d1dfe78/0_2.png",'../docs/javascript-great-again.md'],
  ["https://cdn.midjourney.com/507d0b4c-9ac4-4881-9a6a-75447ae93202/0_3.png",'../docs/game-ideas.md'],
  ["https://cdn.midjourney.com/aac1eb3c-7a10-4883-ab6a-8758262372a1/0_1.png",'../docs/stolen-content-by-AI.md'],
  ["https://cdn.midjourney.com/7badb9f2-971c-4328-814e-601b0230a797/0_0.png",'../docs/flogon-galaxy-dev.md'],
  ["https://cdn.midjourney.com/be57d5a3-0eab-4252-bcfb-604bd19a8b81/0_1.png",'../docs/test.md'],
  ["https://cdn.midjourney.com/6a76294e-a69a-42ae-b0de-d1c42df0aa4e/0_3.png",'../docs/last.md'],
  ["https://cdn.midjourney.com/e0dd83c9-2fa0-4593-92b7-c5faa9d520f9/0_1.png",'../docs/rpg.md'],
  // ["https://cdn.midjourney.com/65583a88-7206-4e33-8577-7c31d0bf5193/0_3.png",''],
]

export const Marker = ({markdown}) => (
  <article class="
      bg-zinc-900
      whitespace-pre-wrap
      px-8
      min-w-full
      min-h-screen
      relative
    ">
    <markdown-view class="p-[1rem]" source={markdown}></markdown-view>
  </article>
)

portal(
  <section>
    {/* <video class="w-[30rem] aspect-video" controls>
      <source src="media/race-start.mp4" type="video/mp4" />
    </video> */}
    <main class="ml-[2rem] w-[70vw] aspect-video bg-zinc-950 text-zinc-400">
      <Marker markdown="../docs/rule.md" />
    </main>

    <section class="fixed top-2 right-[-6rem] w-[20rem] grid gap-2 z-50">
      {list.map(([pic, doc], idx) => (
        <button class="w-[12rem] aspect-video bg-cover" style={{backgroundImage:`url(${pic})`}}
          onClick={() => changeMd(doc)} >
        </button>
      ))}
    </section>
    <Sprite {...targetSystem[3]} class="
      fixed top-[1rem] right-[14rem]
      scale-[1.2]
      mix-blend-lighten
      transition-all
      duration-300
      hover:brightness-200
      z-50
    "
      onClick={() => globalThis.location.replace('ship.html')}
    />

  </section>
).then((page) => {
  setupMarkerViews();
  const marker = page.querySelector('markdown-view');
  changeMd = (doc) => marker?.loadMarkdown(doc);
});
