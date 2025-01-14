# THE LAST OF DAYS

## This is happen again!
I just have `one` day to finish, and so much things to do.
I saw I run out of time again, but `hackhaton` is this type of business.

## Current state of game:
{%.%16/9}

## Final `TODO` list
```
-[+] Implement Card Game Interaction
-[+] Implement Spaceship Interaction
-[ ] Make something target to spaceship which can collect.
-[ ] Figure out some multiplayer possibilities at least a score board
-[ ] Setup the story to a game
-[ ] Polish the starship
-[ ] Make Captain `Yogdar` as playfull character
-[ ] Implement Dream Travel!
-[ ] Flogon knowledge, Inversit, Wora Shard must implement
-[ ] Make a Credit page
-[ ] Do not put any out of scope ingredient to a content
-[ ] Dynamo DB + S3.Bucket Medi Chanell option
-[ ] Pich Video
-[ ] Fill the Pitch form
-[ ] Quest system
-[ ] Config page
-[ ] Solve Safari layout error
-[ ] Fix Responsivity
-[ ] Backface of card
-[ ] Collection of cards
-[ ] Background info of development process
-[ ] Obsolate all previous TODO list
```

## The Big Responsivity topic
I don't think this is so hard to solve, even with `Tailwind`
But I think aspect ratio `16/9`  was a good decesion at the right moment.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flogon Galaxy</title>
  <link rel="manifest" href="manifest.json" />
  <link href="src/style.css" rel="stylesheet" />
  <style>body, html{ font-size: 1.5vmin;}</style>
</head>
<body class="bg-sky-900 text-zinc-400 relative grid place-items-center overflow-hidden">
  <section class="bg-zinc-900
    aspect-video
    portrait:w-screen
    landscape:min-h-screen
    mx-auto
    max-w-[100vw]
    max-h-[56.25vh]
    overflow-hidden
    grid place-items-center
  ">
    <div class="bg-neutral-700 w-[50rem] h-[30rem] grid place-items-center">
      <p class="text-[3rem]">F L O G O N - G A L A X Y</p>
    </div>
  </section>
</body>
</html>
```
