import { fencer, portal, Fragment } from "./utils/fencer";
import { setupMarkerViews } from "./marker";

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
  <main class="w-[70vw] aspect-video bg-zinc-950 text-zinc-400">
    <Marker markdown="../docs/demo.md" />
    <Marker markdown="../docs/hackhaton.md" />
  </main>
).then((page) => {
  setupMarkerViews();
});
