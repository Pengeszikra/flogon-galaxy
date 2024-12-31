# Markdown Test
## Some nice markdown editor is `there`
At this current state this markdown post to be looks likes as I expected.

```html
<header></header>
<main>
</main>
<script>
/** @type {()=>number} */
const foo = () => 42;
</script>
// markdown HERO

const alfa = `Some interesting ${beta = false ? "no" :  "yes" } template-str`

// as you see upper this solution have a problem

  /** @type {(safeCode:string) => string} */
  const syntaxHighlight = safeCode => {
    return encodCodeBlockToSafeHtml(safeCode)
      .replaceAll(/("[^&]*"|`[^&]*`|&apos;[^&]*&apos;)/g, "<st>$1</st>")
      .replaceAll(/(&lt;[^\s|^&]*&gt;)/g, "<wt>$1</wt>")
      .replaceAll(/(&lt;[^\s|^&|^\!]*)(\s+)/g, "<wt>$1</wt>$2")
      .replaceAll(/(\{|\}|\(|\)|\[|\])/g, "<sw>$1</sw>")
      .replaceAll(/(const|let|return|function|var|for|if|while)/g, "<rw>$1</rw>")
      .replaceAll(/(className|class|onClick|onInput|export|import|@type|@typedef|string|number|object)/g, "<ew>$1</ew>")
      .replaceAll(/(\=&gt;|\=|\|)/g, "<uw>$1</uw>")
      .replaceAll(/(\/\/(.*)$)/g, "<rm>$1</rm>")
      .replaceAll(/(\/\*\*[^\*|.]*\*\/)/g, "<jd>$1</jd>")
      .replaceAll(/(&lt;\!--[.|^&]*--&gt;)/g, "<rm>$1</rm>")
    ;
  }
</script>
```

## Syntax Highlight Improving
- First round separate the code to different languages part
- colorize every part separetly
- combine to one syntax


```
/** @type {(matrix: number[])=>number[]} */
const matchLoop = (matrix) => {

}
```

## TODO for today
  - figure out what game will be developed for AWS Game Builder Challenge
    - space travel card game with lot of adventure and game collection
    - space live card game, where you can advanture throught the galaxy to find your planet where you live and base to your quest.  I think this idea need at least a bunch of month to create, I don't have that many times.
    - Somehow figure out where is the good place the revoicer voicer.
  - figure out a game design, and that at least somehow need to be consistent.
  - alien solitare or 3match game will be working.
  - try at least two or three AWS service for game
  - find a name for this Editor
  - shortkey for editor
  - figure out what cause the problem on `DRSA` admin tool

great story about game developer : [Eric creator of Stardew Valley](https://www.youtube.com/watch?
v=v0OsW8HSqA8)

## Pritify of JS obfuscating
```
(
  ([]**[] + []**[])
          +
  ([]**[] + []**[])
)
          **
(
  ([]**[] + []**[])
          +
  ([]**[] + []**[])
)
```

## Zed the speed editor
The problem with ZED is how reformat the Tailwind class in HTML on every save.
Even if turn off the
The positive feedback is the consistent syntax highlight even in HTML embeded javascript code

## Name of this editor:
```
- THED - <this-editor>
- POET - <poc-editor>
- AXEDIT - <axe-editor>
- FENCER - <fencer-editor>
- MARKER - <mark-editor>
```
[great article of editors](https://sotergreco.com/ive-used-every-code-editor-what-is-the-best)

```
- TIE - <the-inde-editor>

     /     \
     |--O--|
     \     /
```
_maybe also fancy if some ASCII capability included_

## Performance on long code.
performance is slow when I edit a 3000 LOC code
round 15 -> 20ms just for a render function.
this is definetley need to be speed up.
because at every keystroke, I was recalculate the
whole `syntaxhighlight` rerender, that is awefull slow.

## Kilo :: no-dependency C editor

[writing editor in less than 1000LOC](http://antirez.com/news/108)
[kilo :: github](https://github.com/antirez/kilo)

# <table-top>
```
// how can I code a tabletop game

/** @type {(situation: Situation) => Rule} */
const rule = (situation) => {};

// even I can use template string to organize a Rule by `DSL`
rule`
  // A L I E N - S O L I T A R E

  let player select his/her hero
  let player choose a game type
  let create 48 predefined deck of cards
      according player collection and choiced game type

  // - - - Layout - - -
  //
  //             deck | drop
  //  line1 | line2   | line3   | line4
  //  hero  | action1 | action2 | store1
  //

  let the top one is the hero card of player
  let deal hero to player
  let shuffle the deck
  // phase: `deal`
  let deal 4 top card to `frontline` line1 -> line4
  // phase: `interaction`
  let player able to play card following these rules:
    - stranger can move
       :: front - vs -> hero
       :: front - vs -> action:guard
    - fix can move
       ::  front -> store1 = actions -> fixing
       :: front -> drop
    - guard can move
       :: front -> actions, store, drop
    - strike can move
       :: front -> actions, store, drop
       :: actions -> stranger ( front )
    - score can move
       :: front -> actions, store, drop
    - skill can move
       :: front -> actions, store, drop
  while at least 3 front slot empty
  if game don't reach some goal goto to phase `deal`
  let end of the game and show the `result`
`;

/** @type {() => UI} */
const render = () => {};
```

## Grid Hell

```
<SubHeader>
  <HeaderLeft>
    <Grid container alignItems="center" wrap="nowrap" spacing={5}>
      <Grid item xs={4}>
        <Grid container alignItems="center" wrap="nowrap" spacing={2}>
          <Grid item>
            <Typography variant="subtitle1" noWrap>
              <FormattedMessage {...messages.tokens} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select value={currentPartner.id} onChange={handleChange}>
                {map(partner => (
                  <MenuItem key={partner.id} value={partner.id}>
                    {partner.label || partner.id}
                  </MenuItem>
                ))(partners)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </HeaderLeft>
</SubHeader>
```

_hapy ending_
