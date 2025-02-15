# Javascript great again! - `The Voice of Void`

> A thrilling game development, including a π / 42 theory.
[original post on community.aws](https://community.aws/content/2rmBlPQhaWEWylZu72H1Vtm8EMe/javascript-great-again-the-voice-of-void)

github repo: https://github.com/Pengeszikra/flogon-galaxy

## PITCH
{% https://www.youtube.com/embed/DpiOSJe_N30?si=YE9mQegUGsB0dt23 %16/9}

## TLDR 
Maybe a too much information are zipped into this small program. This will be happen if we ride on a creative flow. Sure this is just a POC level code, and I will continue on so many direction.

Try it: [F L O G O N - G A L A X Y](https://flogon-galaxy.vercel.app/) this is run on any device. Tested on mobile phone, tabblet, browser, even my TV basic browser.

## Device Demo
Here is my desk where this program are created, and run on many different devices:


{% https://www.youtube.com/embed/7dXCTOeSDRA %16/9}

## Game Play

{% https://www.youtube.com/embed/BKTn8XU4wgE %16/9}

## Pure Javascript Game Development
This project is built with a minimal dependency philosophy, stripping away unnecessary frameworks while keeping efficiency in focus.

My turning point was:
On my work I am facing the fact that 8GB memory isn't enough for a legacy React application to build. The DevOps team solved the problem by setting 16GB RAM on a virtual build server. At that precious moment, I instantly lost all my trust in modern JavaScript frameworks and any compiling.

But this state are so strict, plus this hackhaton requriment is using some great AWS cloud API to extending my game possibilities near to unlimited. For the publishing is also need a minimal build setup. Even for the local testing your code which not need to compile is also great choice the pnpm / vite duo because of hot reload, which is so important on development time.

At the end I can keep the dependency on minimal level, which is give amazing loading time also. Details of minimal dependency details can you readed bellow or skip it. 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b3v8b1n8j6ks0h3k5cuq.jpg)
## Release the chain of dependency

> package.json
```
  "scripts": {
    "build": "vite build",
    "client": "vite",
    "server": "pnpm node src/services/dbServer.js",
    // local development command 
    "start": "pnpm run server & pnpm run client"
  },
  "dependencies": {
    // minimal dependency for AWS dynamodb
    "@aws-sdk/client-dynamodb": "^3.0.0",
    "@aws-sdk/lib-dynamodb": "^3.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.1",
    "express": "^5.0.1"
  },
  "devDependencies": {
    // tailwin
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    // surprising it is need for JSDoc, but just devDep!
    "typescript": "5.7.2",
    // build
    "vite": "^6.0.3",
    // PWA
    "vite-plugin-pwa": "^0.21.1"
  }
}
```

Vite are nicely fragmented the whole project into a minimal size of chunks.
Because this project is build on lazy coupled HTML pages.

```sh
> pnpm build

dist/registerSW.js                               0.13 kB
dist/manifest.webmanifest                        0.36 kB
dist/assets/manifest-B2xQAFIn.json               0.58 kB │ gzip: 0.26 kB
dist/credit.html                                 0.99 kB │ gzip: 0.46 kB
dist/adventure.html                              0.99 kB │ gzip: 0.46 kB
dist/library.html                                1.01 kB │ gzip: 0.47 kB
dist/ship.html                                   1.03 kB │ gzip: 0.51 kB
dist/card.html                                   1.03 kB │ gzip: 0.49 kB
dist/fit.html                                    1.14 kB │ gzip: 0.61 kB
dist/work.html                                   1.28 kB │ gzip: 0.55 kB
dist/mine.html                                   1.34 kB │ gzip: 0.62 kB
dist/story.html                                  1.36 kB │ gzip: 0.63 kB
dist/index.html                                  1.38 kB │ gzip: 0.68 kB
dist/deal.html                                   1.63 kB │ gzip: 0.70 kB
dist/marker.html                                 2.01 kB │ gzip: 0.86 kB
dist/travel.html                                 2.03 kB │ gzip: 0.85 kB
dist/__index.html                                2.10 kB │ gzip: 0.91 kB
dist/throw.html                                  6.14 kB │ gzip: 1.81 kB
dist/assets/style-5bcm0AOV.css                  19.64 kB │ gzip: 4.44 kB
dist/assets/marker-a3K9PoX8.css                 20.43 kB │ gzip: 4.75 kB
dist/assets/ui-elements-C42piOfa.js              0.52 kB │ gzip: 0.20 kB
dist/assets/old-bird-soft-Cet9K-fd.js            0.64 kB │ gzip: 0.40 kB
dist/assets/targetSystem-C6rfYONd.js             0.70 kB │ gzip: 0.17 kB
dist/assets/index-DPcikNFZ.js                    0.70 kB │ gzip: 0.47 kB
dist/assets/modulepreload-polyfill-B5Qt9EMX.js   0.71 kB │ gzip: 0.40 kB
dist/assets/story-BYdjpAbD.js                    0.71 kB │ gzip: 0.50 kB
dist/assets/credit-B_lCQp87.js                   0.92 kB │ gzip: 0.58 kB
dist/assets/shoot-9YV2jSCs.js                    1.11 kB │ gzip: 0.20 kB
dist/assets/work-AxYhedTL.js                     1.24 kB │ gzip: 0.59 kB
dist/assets/adventure-mfPAHVPp.js                1.26 kB │ gzip: 0.74 kB
dist/assets/fencer-CBOzlVSn.js                   1.51 kB │ gzip: 0.76 kB
dist/assets/ship-DzKwFTHn.js                     1.57 kB │ gzip: 0.79 kB
dist/assets/library-iOGeQgd2.js                  1.69 kB │ gzip: 0.87 kB
dist/assets/concept-1YqRBMyf.js                  1.70 kB │ gzip: 0.84 kB
dist/assets/travel-BjKxB5xP.js                   1.70 kB │ gzip: 0.84 kB
dist/assets/GalaxyRoute-Czkip2Wg.js              1.77 kB │ gzip: 0.85 kB
dist/assets/asset-DRNybFKp.js                    2.01 kB │ gzip: 0.50 kB
dist/assets/card-BxPOIcVT.js                     3.05 kB │ gzip: 1.03 kB
dist/assets/mine-txzynpoG.js                     3.08 kB │ gzip: 1.33 kB
dist/assets/marker-CDmeMeHZ.js                   3.08 kB │ gzip: 1.43 kB
dist/assets/throw-CtACwOyr.js                    7.86 kB │ gzip: 2.68 kB
dist/assets/deal-ptFW1zND.js                    10.26 kB │ gzip: 3.93 kB
✓ built in 1.16s

PWA v0.21.1
mode      generateSW
precache  41 entries (110.77 KiB)
```

## PWA & Responsivity

A Progressive Web App (PWA) setup ensures that Flogon Galaxy runs efficiently on mobile, desktop, and even embedded browsers. TailwindCSS handles the design flexibly. But the main pain point is the setup of PWA. At first moment I asked Amazon Q to help me, but that solution cause broke my whole program look and feel,
because generated a wrong service workes, which is stuck on browser, so when I tryed to fix it the problem that error are be stay even after a complet roll back, - thx to `Amazon Q /dev` functionality which is great! the modification can be easy review and roll back - , also try ChatGPTo1 help also failed to help. A problem is need to be reset the service worker on chrome. After this incident I figure out the solution by give a right question to AI: 
Why not a vite generate a PWA stuff under the build process ?
Give to this job to a `vite-plugin-pwa` and configured perfectly are solved.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/suttrv7s5sl6ysahqwpr.png)

> This program greatest help is my markdown editor: `marker` which is also great tool for testing a different aspect-ratio, which is a base question on the responsivity.

## JSDoc

A great pillar of uncompiled / minimal dependency JS development was the really underrated JSDoc. [JSDoc evangelism](https://dev.to/pengeszikra/jsdoc-evangelism-1eij). To sort: as this project are proof JSDoc equal to TS without that dependecy ( just devDep ). So at the end:
JavaScript remains readable and maintainable with strict documentation standards. Using JSDoc ensures clarity and provides editor hints even without TypeScript.

## 3D Without a 3D Engine

Using CSS transformations, we achieve a pseudo-3D effect while keeping performance high and dependencies low.
The card game based on this css setup (Tailwind don't handle these attributes)

```css
    #desk {
      transform-style: preserve-3d;
      transform:
        perspective(70vw)
        rotateX(40deg)
        rotateY(0deg)
        rotateZ(0deg)
        scale(.55)
        translateZ(0rem)
        translateY(5rem)
        translateX(-8rem);
      pointer-events: none;
    }
```

All cards are attached to `#desk` and that why see our cards in 3D.

## My AI Crew
My development don't realized under this sort time without AI workes help.
Here is my AI crew list:
  - Amazon Q : code expert
  - ChatGPT : project assistant, lyric, code
  - Midjourney : visual
  - Suno : track
  - Revoicer : voice over
  - HailuoAI : clip
  - Clipdrop : remove background
  - DreamAI : visual training
Without these help this project are cannot realize under a strickt timeframe:

2024.06.27 -> alien-solitare : react based cardgame for dev.to challange
2024.07.06 -> pure-web-ccg : started my pure web work
2024.12.14 -> flogon-board : meanwhile I found reddit hackhaton also, 
              a first game of Flogon series + sprite editor
2024.12.29 -> flogon-galaxy : I started focusing on this project

On this exact project I have just two weeks. Very underestimated. But thx of these helps the Flogon Galaxy are reach the state of technical demo.

## Amazon Q
For me the Amazon Q is a great help on a think phase - around november - when I created around 15+ mini game using by Amazon Q. This is a great help to quick try and test my different ideas. On later the implement phase the /dev command is the greatest help to solve a different task including a DynamoDB implementation, which case I not really familiar, but solwe that stuff under no time.

Which I don't like in Amazon Q is the too much extra question like a: Do you have another question? That is completly unneccecary in point of my view. Instead just show the next chat input line, and if I write to there something that means I continue the work, don't need a extra button click.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kfdfj5611v9g7yz3322u.jpg)

## DynamoDB and Marker
On early stage of this project: november, I created a markdown-view WebComponent, plus attach a simple textarea to it. My initial goal with that program just a very basci markdown-viewer, but after I implemented the minor syntax highlighting for a codeblock, and a iframe capability a whole new world open to me.

You can test this program on link:
[M A R K E R](https://flogon-galaxy.vercel.app/marker.html)

Try to paste any markdown to it.

It cannot understund a different program languages, just a mix of HTML/JS/JSDoc setup on it, sure to need a extension, but it is working as POC, with a good speed.

Table, list, bold, are don't work, but the real power is the embedding url with a 
```
{%url%}

// or

{%url%aspect-ratio}

for example:

{%.%16/9} // start this program on standard aspect ratio

{%deal.html%16/9} // start a card game

// or 

{%deal%16/9} // also start the card game.

// a secret old program is started by:

{%throw%1/1}

// this is my previous reddit hackhaton submit. 
// A different version of Flogon's Throw to Match game.
```

## The AWS DynamoDB are included to this marker
But that is just work on locally a good reason, because I used it to instant save and load a markdown file. Just press the `ESC` and on input line write: `e:rpg.md` which is try to load a rpg.md from DynamoDB. But to do that, need to setup your DynamoDB credential to your .env which is looks like this:

```
AWS_ACCESS_KEY_ID = "AKI........"
AWS_SECRET_ACCESS_KEY = "4Qr8........"
AWS_REGION = "eu-north-1"
DYNAMO_TABLE = "storage-0392"
PORT = 3000
API = "http://localhost"
```

of course for do that need to make your AWS account, and create a dynamoDB, it is worth it!

I have another development tools in this program:

## Sprite Sheet Editor 
```
{%throw%1/1}
```

```
If press `z` started the sprite editor
`c` - move box
`v` - pick a sprite
`w` - decrease a vertical size
`s` - increase a vertical size
`a` - decrease a horizontal size
`d` - increase a horizontal size
`[` , `]` - change sprite sheet
```

```
// you can copy spritesheet data to your code with this js code 
// in chorme dev tools:
copy(JSON.parse(localStorage.getItem('-shoot-') || '{}'));
```

[You can found my code on this repo](https://github.com/Pengeszikra/flogon-galaxy)

## Which is lead me to use some framework like functions?
As I sed at first I try to live without any framework, but I need a state managment, which is really important part of a complex application like a card game, where so many events happend. Which is easy replacable a reactive state. Her is one of the easiest implementation. Also important this state are not coupled with any view like in a React. Even this state handling is not nececcary to using on every file.

## Signal-Based State Management

A custom signal system replaces external state libraries, providing fine-grained reactivity with minimal overhead. This single function are solved a nececcary state management in this game. I also created a more "sofisticated" function: `zignal` which is capable to handle a deep level Proxy state handling, but 
that is overcomplicated in this case. So I choice the simplier one. 

```
/** @type {<T>(watcher?: function) => (state?: T | object) => T} */
export const signal = (watcher = () => { }) => (state = {}) => {
  return new Proxy(state, {
    get: (target, prop) => target[prop],
    set: (target, prop, value) => {
      target[prop] = (value !== null && typeof value === 'object')
        ? signal(watcher)(value)
        : value
        ;
      watcher(target, prop, value);
      return true;
    },
  });
};
```

## JSX Framework

The another big improvement of modern framework is the easy composable application. Where a JSX is shining so bright. On a certain point I realized, without a JSX I need to labell every DOM element, and that is so painfull. That why I grab out my really old A lightweight JSX rendering system drives UI interactions without requiring React, maintaining simplicity and control.
5 years ago I readed a blog about JSX, and I created a function which can be used a basic JSX handler. Now the times is come to take out of that code and with a AI help to combine with vite to handle JSX files. After a few tweek rounds it is properly fine for my program. I don't have to write a test, the working code are the help.

The important vite.config.js part:

```
  esbuild: {
    jsxFactory: 'fencer', // Use your custom `fencer` function as the JSX factory
    jsxFragment: 'Fragment', // Optional if you use JSX fragments (e.g., `<>...</>`).
  },
```

## Imperfection Workflow

As you can see, rather than striving for immediate perfection, an iterative, adaptive workflow guides development. This allows to me, my creative ideas to shape the game naturally. So I do not fear to make a mistake, instead I search which part can be finish before the deadline. I think many of developer use this technic, and don't stuck on a specific porblem.

## The Untold Story of Flogon

My biggest dept is: I don't have to shaping my story about the Flogons to you.
So this chaper at least told a few basic things about Flogons.
Please listen it this discusion about Flogon special dream travel capability and the 
universe undiscovered material the Inverzit.

{% https://www.youtube.com/embed/dEvza4zqK6E?si=lyzkVDdgfHJSr91G %16/9}

We don't reach even the closest star system at this moment. But the first contact give a chanche to reach undreamed distances. The main problem because the Flogons are nor technocrat or kapitalist, because the distance and the possible place don't close it, like us. So hard to understund what is the common between us.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/51q06p9cuivworipc1sq.jpg)

So the flogon use a bit different the technic than as, because some of them even cabale to shape change into a item also. Not every flogon can dream travel, also not every flogon capable to that level of shape change - but normal shape chanege is very common. That why sometimes use cloth sometimes not. We don't know yet how many start systems or galaxy they are explored.

But our scientist are collect a strange theory from the Flogon from Wora Shard. This is some hidden code which can be ready any one: Just need to be count a 42 markers  distance ( fluctuation ) in a π. This is:

## Theory of π / 42

A deep dive into the mathematical intrigue behind the Flogon universe, where π and the number 42 hold the key to understanding cosmic resonance. Wora Shard even crated a song about this one.

{% https://www.youtube.com/embed/nSjjrrqZbvQ %16/9}

## Wora Shard
A question worth pondering. The short answer? She was just an underground Punk-Metal singer, lost in the echoes of rebellion—until the night she dreamed herself into the vast unknown.

One moment, she was on Earth. The next, she awakened on a distant, alien world, surrounded by mysteries beyond human comprehension. Stranded and disoriented, she would have been lost forever… if not for Yogdar, a seasoned Flogon captain who saw something unusual in her arrival.

Through perilous journeys across the galaxy, through worlds uncharted and dangers untold, Yogdar guided her back home. But something had changed. Wora was no longer just a singer—she was a traveler between realms, a dreamer who had touched the fabric of a universe she barely understood.

And this… this is where our story truly begins.

{% https://www.youtube.com/embed/0ZZH9dA8Pbg %16/9}

## Credit Roll
My other big debt is the end credit roll list. Because a same point this development process is looks like a one man show with a AI help. But the whole AI thing is learning for us. So any content or idea which even materialize a AI that is nothing else than a question to the human knowledge base throught a AI interface.
Also important to include this list a specific person, who are inspired me and keep my spirit up on these thirilling development rush. Thx for that, credit roll will coming after the freez.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aeo1lx8q9yhu335kxsh3.jpg)

## Future plan
After project freeze ended I am start focusing the Flogon story lines which is saddly don't fit to this project. The connection betwen us and the Flogons is really interesting field. Technically a multiplayer version with poolished games, including card collection ability, space trading, ship building. 

_Your Dreams Come True!_


