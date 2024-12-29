# <\\>
  ## Test the Editor!
  Please test the editor on left side.
  This is need to be proper work `under` the right way! [localhost](localhost)

  ```
export const MainFrame = ({ children }) => {
  const { theme, setTheme, switchTheme } = useDarkLightTheme();
  useEffect(() => { setTheme(Theme.DARK); }, [setTheme]);

  // some remmark with "highlighted stuff" this let help = true;

  return (
    <main className="dark:bg-zinc-800 dark:text-white min-h-screen">
      <button
        className="fixed right-0 p-2 m-2 rounded-lg dark:bg-black bg-white opacity-70 z-20"
        onClick={() => switchTheme()}>
          {theme}
      </button>
      <section className="m-auto max-w-screen-md">
        {children}
      </section>
    </main>
  );
```


> :: `TODO` ::
    - [x] fine size of editor / view
    - table
    - [x] code block
    - [x] HTML injection safe
    - subtitle `error` fix
    - [x] Set the right size of this two panel.
    - [x] Skining with `CSS` vars (just colors)
    - create a single panel editor,
      where I am immediatley edit on a proper edit.
    - more than one link in one line
    - [x] syntax highlight POC
    - [x] syntax highlight `beta`
    - add VIM motion to editor
    - add VS-Code shortkey to editor
    - save / load :: localhost
    - fix italic
    - collect all markdown element
    - collect all VIM motion
    - Web Animation API backed scroll animation
    - prot to `Rust`
    - YAML metadata - take look what exactly meanings

    [localhost](http://localhost)

    [this localhost](localhost)

    ## Why I would like to make this?

Because a big part of development is based on markdown `documentation`
If you would like inform me this is just a `bullshit`.
I am arguing the opposite is the true.

> Some code works something `don't`

## Syntax Highliter POC
Example of sytax highlight
- <bw> : basic word
- <rw> : reserved word
- <sw> : special word
- <tw> : tag word

> The most problematic highlighter is a `HTML` highlihter
Because the `HTML` can also contain: `CSS`, `JS`, `RegExp`, `Template string`, `SVG`, `RegExp` or even `JSX` also


[Highlighter Code Example](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_syntax_highlight)


_table test_

```
| why hidden the first | this is very strange |
| -------------------- | -------------------- |
| hello                |                  100 |
| other                |                 1000 |
```
## gameLoop
    - create a table
    - insert visual spot
    - insert hidden spot
    - put a bunch of cards to the table
    - real time card Edit capability

> Need to be figure out: how can I handle a so much `language switch`
Markdown -> HTML -> CSS ->
  Javascript -> JSX -> Typescript ->
  jsDoc -> Shader -> Wasm
  _in a single file for example_

## Code Example Working fine
without Syntax Highlight

```javascript
import { useEffect } from "react";
import { Theme, useDarkLightTheme } from "../hooks/useDarkLightTheme";

export const MainFrame = ({ children }) => {
  const { theme, setTheme, switchTheme } = useDarkLightTheme();
  useEffect(() => { setTheme(Theme.DARK); }, [setTheme]);

  return (
    <main className="dark:bg-zinc-800 dark:text-white min-h-screen">
      <button
        className="fixed right-0 p-2 m-2 rounded-lg dark:bg-black bg-white opacity-70 z-20"
        onClick={() => switchTheme()}>
          {theme}
      </button>
      <section className="m-auto max-w-screen-md">
        {children}
      </section>
    </main>
  );
}
```

---
title: "My First Post"
date: "2023-10-01"
slug: "my-first-post"
highlight: true
---
> also would like to handle a metadata part a differential way.

## Krita on tablet
Some brushes is very nice. UI is terrible.
But free so very usefull.

## Markdown editor of very few lines
Hi `@pengeszikra` In my process of creating Markdown, I'm using a "desktop" application for editing Markdown content. For example, I use Typora and/or Obsidian.

## VIM + VS
`VIM + VS Code - vim extra functionality ->`

     At least some VIM motion need to insert.
     But a few VS-Code motion is also handy.
     Let't buld  a really nice text editor, with
     a minimal codebase as possible.

     If I can conbine a markdown with a great
     soft editor then it will be fantastic.

     But now let's take a looke some game
     development improvements

                                               Strange editor

## Web Animation API
This code show animation is really fine way to create some nice animation.
Maybe I can combine the markdown editor with some animation.
Which is the way of `MDX` if I am right.

`Skin` markdown is very simple with combine the `CSS` and `Tailwind`

## Slash
Maybe I can crawl out of the box my long forgotten animation editor/language idea called: `SLASH` from the ages of `Flash`.

# ZEN development
## Keep in the Flow
What is means `ZEN game development` ? Sure it is part of `pure HTML` because the main idea is very simple:
Write your game without any library, game engine, compiling your code to somewhere else.
Just use a pure HTML page as starting point - even less ( I will be explaining a later )

## Loose your chain
Even thi editor also created this way. So the final target is creating everything from `skratch`.

> At the start your code looks like this:

```html
// <script> tag broke the vite which is just Hot Reloader
// in this workflow

<main class="bg-zinc-800 text-zinc-400 p-8 min-h-screen">
  <!-- UI -->
</main>
```

## The Black Hole Traveller!
 I don't know you are heard about the black hole traveller. This is a brand-new class of existing job in the universe or bright leader shoulder shaking new technology which I love to us to reach the forest edge of the universe without need a spend of the generation life, so that's why we brought, to invite you in our team us captain of our latest spaceship and we also would you like to meet your wall stuff?

 ## Super Small Editor
SSE - means Super Small Editor, the current state is show I am no so fare away of creating a simple Web Component to replace the `VS Code` to a really simple one. But my focus need to be on `Game Hackhaton` which is much more valuable project.

_the end_

----
                                                                    _happy coding_