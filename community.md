# Javascript great again! `The Voice of Void`

{%.%16/9}

## A thrilling game development, including a π / 42 theory.
```
#game-challenge #ai #javascript #jsdoc #aws
```

## TLDR 
Maybe a too much information are zipped into this small program. This will be happen if we ride on a creative flow. Sure this is just a POC level code, and I will continue on so many direction.

Try it: [F L O G O N - G A L A X Y](https://flogon-galaxy.vercel.app/) this is run on any device. Tested on mobile phone, tabblet, browser, even my TV basic browser.

## Device Demo
Here is my desk where this program are created, and run on many different devices:
{%https://www.youtube.com/embed/7dXCTOeSDRA?si=vTy0lvEtgy1L1zne%16/9}

## Game Play
{%https://www.youtube.com/embed/BKTn8XU4wgE?si=YVv1zFUgHAOiIr3V%16/9}

## Pure Javascript Game Development
This project is built with a minimal dependency philosophy, stripping away unnecessary frameworks while keeping efficiency in focus.

My turning point was:
On my work I am facing the fact that 8GB memory isn't enough for a legacy React application to build. The DevOps team solved the problem by setting 16GB RAM on a virtual build server. At that precious moment, I instantly lost all my trust in modern JavaScript frameworks and any compiling.

But this state are so strict, plus this hackhaton requriment is using some great AWS cloud API to extending my game possibilities near to unlimited. For the publishing is also need a minimal build setup. Even for the local testing your code which not need to compile is also great choice the pnpm / vite duo because of hot reload, which is so important on development time.

At the end I can keep the dependency on minimal level, which is give amazing loading time also. Details of minimal dependency details can you readed bellow or skip it. 

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

## JSDoc

A great pillar of uncompiled / minimal dependency JS development was the really underrated JSDoc. [JSDoc evangelism](https://dev.to/pengeszikra/jsdoc-evangelism-1eij). To sort: as this project are proof JSDoc equal to TS without that dependecy ( just devDep ). So at the end:
JavaScript remains readable and maintainable with strict documentation standards. Using JSDoc ensures clarity and provides editor hints even without TypeScript.

## 3D Without a 3D Engine

Using CSS transformations, we achieve a pseudo-3D effect while keeping performance high and dependencies low.

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

A lightweight JSX rendering system drives UI interactions without requiring React, maintaining simplicity and control.

## Story-Driven Development

Flogon Galaxy is not just a game—it's an evolving narrative. The entire gameplay experience unfolds through dynamic storytelling mechanics.

## Imperfection Workflow

Rather than striving for immediate perfection, an iterative, adaptive workflow guides development. This allows creative ideas to shape the game naturally.

## The Untold Story of Flogon

The Flogon species, capable of quantum dream travel, shape-changing, and interstellar exploration, interact with the vastness of space in unique ways. The game showcases their encounters with humanity and their mysterious abilities.

## Credit Roll


## Theory of π / 42

A deep dive into the mathematical intrigue behind the Flogon universe, where π and the number 42 hold the key to understanding cosmic resonance.

## The Pitch
{%https://www.youtube.com/embed/4utuTzVpw5E?si=wH-VqtKL6dNwKQQL%16/9}

## Wora Shard
{%https://www.youtube.com/embed/0ZZH9dA8Pbg?si=HlW1xICKOS_KLIHQ%16/9}

## Future plan
After project freeze ended I am start focusing the Flogon story lines which is saddly don't fit to this project. The connection betwen us and the Flogons is really interesting field. Technically a multiplayer version with poolished games, including card collection ability, space trading, ship building. 

_Your Dreams Come True!_