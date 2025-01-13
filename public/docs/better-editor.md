## Performance check on this editor.
let make some nice code with performance now();
if I just syntax highlight to actual part, then that is will be really performant.

> this is run on run on every keystroke.

```
/** @type { (source:string) => string } - jsDoc minimal implemented */
const slowDown = (source) => {
  const byLanguage = splitSourceByLanguage(source);
}
```

## Editor as I like it.
I am not 100% satisfy the current editor: VS-Code, VIM, NeoVIM.
My main problem, these editor are too complex. Great and I don't want to ask their succes,
but for example the VSCode is cannot able to make a right syntax highlight when JS code
are in <script> tag.

## Colorise in editor
Let's check that functionality is possible or not. Maybe I think somehow can be solve,
but I don't want to copy the cursor and selection position, just on the last.

## Plugins
The best option if different syntax highliter or extra feature will be plugin to `editor`
But this is not the first priority.

## File Stream Read/Edit
I would like to make editor which is capable to hyperfast show a lot of file in a
vertical scroll list. In that fashion, you can take a look whole of project just a
long scroll down and don't need to switch tab between files.

## Theo SSR Trick:
Using `12 Webworkers` for a time consuming process. Maybe that solution is also will handy in this rendering.

## Name of this editor
Top editor:
- VIM, Neovim, VI
- VS Code
- Notepad ++
- Syblime text
- Atom
- JS Storm

My ideas:
- MFE - Markdown First Editor
- Pure Editor
- PIM
- MEDIT
