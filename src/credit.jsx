import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { pick, rnd } from "./utils/old-bird-soft";
import { trackList } from "./media-assets";
import { targetSystem } from "./throw/targetSystem";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <section class="relative max-w-[70%] m-auto
    max-h-[56.25vw]

    portrait:w-[100vw]
    portrait:h-[56.25vw]

    landscape:mx-auto
    landscape:w-[178vh]
    landscape:h-[100vh]

    overflow-y-scroll
  ">
    <section class="fixed top-0 left-0">
      <GalaxyRoute
        front={`../sheets/texture-${gAlfa}.png`}
        back={`../ui-elements/evidence-of-history.png`}
        zoom={250}
      >
        <Sprite {...targetSystem[1]} class="
          absolute top-[1rem] right-[1rem]
          scale-[.7]
          mix-blend-lighten
          transition-all
          duration-300
          hover:brightness-200
        "
        onClick={() => globalThis.location.replace('ship.html')}
        />
      </GalaxyRoute>
    </section>
    <section class="pt-[44vw] pb-[5vw] grid select-none overflow-y-scroll min-h-screen pointer-events-auto absolute top-0 left-0 z-50">
      <article class="my-[16vw] text-emerald-200 text-[2.5vw] text-center grid gap-[42vw] select-auto">
        <p>The Flogons' story is just beginning...<br />But where will humanity’s story flow?</p>

        <p>Even this program was created with the help of AI.<br />
        They are not better than us and cannot replace us.<br />
        They are merely learning from humans,<br/>without permission.</p>
        <p>I believe that any content or idea,<br /> even if created with AI assistance,<br /> is nothing more than a question directed at the human knowledge base through a strange interface<br/> that we call AI.</p>
        <p>That is why it is truly important for me to mention specific individuals and entities who have inspired me and kept my spirit up during this thrilling development rush.<br/> The list may be a bit chaotic, but so is life.</p>
      </article>
    <article class="text-[1.7vw] text-white my-[4rem] whitespace-break-spaces font-mono">{
`               - - - [ crew ] - - -

                Amazon Q :: code expert
                 ChatGPT :: project assistant, lyric, code
              Midjourney :: visual
                    Suno :: track
                Revoicer :: voice over
                HailuoAI :: clip
                Clipdrop :: remove background
                 DreamAI :: visual training

               developer :: @Pengeszikra
                  tester :: @kwandera.shoe
                 advisor :: Tibor Darula

              Guest Star :: Wora Shard


            - - - [ Inspiration ] - - -

                 dev.to :: https://dev.to/
     Pure Web Fundation :: https://pureweb.dev/
          Douglas Adams :: 42
             Tim Burton ::
       Basil Poledouris ::
            Dan Abranov ::
           Ray Carniato :: @ryansolid
            ThePrimagen :: https://www.youtube.com/@ThePrimeTimeagen
           Alberta Tech :: @albertatech
        Jack Herrington :: @jherr
                   Theo :: @t3dotgg
                 Vsauce :: @Vsauce
      Indie Game Clinic :: @IndieGameClinic
              blumineck :: @blumineck
         Sellsword Arts :: @SellswordArts
       Fun Fun Function :: @funfunfunction
              Imphenzia :: @Imphenzia
              Savallion :: @Savallion
    Continuous Delivery :: @ContinuousDelivery
            IsiShuffles :: @IsiShuffles
            ErikDoesVFX :: @erikdoesvfx
               Ginny Di :: @GinnyDi
           Venus Theory ::
 The AI Music Alchemist :: @theaimusicalchemist
           The9thDivine :: @The9thDivine
                  Nello :: @Nellooo
            Eric Barone ::
                  Jazza :: @Jazza
             Felde Imre ::
         Óbudai Egyetem :: https://uni-obuda.hu/
         Nyulászi Zsolt ::
           Novák Csanád ::
        Terenyei Róbert ::
      Delta Vision Kft. ::
         ELTE Atomcsill :: atomcsill.elte.hu
         Kis-Tóth Ágnes ::
            Dávid Gyula ::
    Sabine Hossenfelder :: @SabineHossenfelder
              Wolf Kati ::
                Crystal ::
                 Unique ::
             Honeybeast ::
               Zanzibar ::
          Tarja Turunen ::
        Sandra Nurmsalu ::
Kollányi Zsuzsi & Majka ::
            Auth Csilla ::
              Rasmussen ::
               Supernem ::
            Random Trip ::
                    AWS ::
                 Reddit ::
                Blender :: https://www.blender.org/
                    TCS :: Tata Consultancy Service
                     EA :: Europe Assistance
             Card Crawl ::
          Arnold Rauers ::
       Macromedia Flash :: <rip>
                  React ::
                   Rust ::
              Touch Bar :: <rip> ( MacBook Pro )
      Pipeline Operator :: p |> f;
       Pitypang the Cat ::


             - - - [ software ] - - -

                   HTML ::
                    CSS ::
             javascript ::
                  JSDoc ::
                    JSX ::
               DynamoDB ::
                 iMovie :: https://apps.apple.com/us/app/imovie
                  krita :: https://krita.org/en/
               Concepts :: https://concepts.app/en/
             Excalidraw :: https://excalidraw.com/
                ghostty :: https://ghostty.org/
                    vim ::
                    zed ::
                 VSCode ::
                 github ::
                 vercel ::
                    npm ::
                   pnpm ::
                   brew ::
                 zoxide ::
                ripgrep ::
                 marker :: ./marker.html
                 fencer :: ./src/utils/fencer.js
    sprite-sheet-editor :: ./throw.html ( ctrl + Z )













            directed by :: Vívó Péter

      special thanks to :: My Lady

      `}</article>
  </section>
</section>
).then((page) => {
  const [state] = routeController("multiply");
  state.ySpeed = ( Math.random() - .5 + .3 ) / 2;
  state.xSpeed = ( - Math.random() * .1 - .05 ) / 3;
  useKeyboardCurse(state);
  page.onclick = () => {
    globalThis.location.replace('ship.html');
    // const [,randomTrack] = pick(trackList);
    // const WoraShard = new Audio(randomTrack);
    // WoraShard.play();
  }
});
