import { fencer, portal, Fragment } from "./utils/fencer";
import { setupMarkerViews } from "./marker";
import { DebugFrame } from "./DebugFrame";

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
    <DebugFrame />
    {/* <video class="w-[30rem] aspect-video" controls>
      <source src="media/race-start.mp4" type="video/mp4" />
    </video> */}
    <main class="ml-[2rem] w-[70vw] aspect-video bg-zinc-950 text-zinc-400">
      <Marker markdown="../docs/trading-pioneers.md" />
    </main>
  </section>
).then((page) => {
  setupMarkerViews();
});
