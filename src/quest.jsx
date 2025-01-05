/** @jsx fencer *//** @jsxFrag Fragment */
import { fencer, portal } from "./utils/fencer";

const InnerOne = ({title}) => <div>{title}</div>;

const App = () => (
  <main class="
    bg-zinc-900
    min-w-full
    aspect-video
    bg-[url(../sheets/texture-2002.png),url(../sheets/texture-2001.png)]
    p-8
    text-emerald-200
    grid
    place-items-center
    text-2xl
    select-none
  "> Q U E S T on G A L A X Y</main>
);

portal(<App />);
