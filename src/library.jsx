import { fencer, portal, Fragment } from "./utils/fencer";
import { setupMarkerViews } from "./marker";
import { DebugFrame } from "./DebugFrame";
import { PointAndClick } from "./PointAndClick";

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
    <PointAndClick id="foo" nextUrl="ship.html" bg="bg-emerald-300/45" top={0} left={45}></PointAndClick>
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
