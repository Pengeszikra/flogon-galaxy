## Hyper `test` of all `subpages`
{%card%18/39}
{%mine%16/9}w
{%work%16/9}
{%quest%16/9}
{%adventure%16/9}
{%story%16/9}
{%throw%5/4}

## Test engingen
Crazy but the `Marker` also perfect for a E2E testing surface

```
// deal.jsx - game test

globalThis.gameTest =  (speed = FortyTwo, pAmunt = 20, qAmount = 25) => {
  const state = freshState(logger);
  gameSetup(state, randomDeck(pAmunt), randomDeck(qAmount));
  globalThis.run = () => gameLoop(state);
  const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); run() }, speed);
};
```
