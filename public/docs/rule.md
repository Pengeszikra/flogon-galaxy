# Rule of `Quest of the best`

{%deal%16/9}

## This is a semi solitare game rule is:

Each card have 1 important value which is a number between -21 -> 22

player have deck of 20 -> 25 cards of a random values

quest have a deck of 30 cards of a random values

each player hand is open

- if player deck are less than a 4 card then shuffle their drop to deck
- player draw a 4 cards
- quest draw a 2 cards ( END-RULE ) ( QUEST-REVENGE )

## PLAY PHASE

  player may play card from hand according following pairing rules:

  - pair any positive odd card to quest positive even card
  - pair any positive even card to quest positive odd card

  - pair any negative odd card to quest negative odd card
  - pair any negative even card to quest negative even card

  the score is sum of two card abs value

  - pair any zero card to quest any non-zero card
  - pair any non-zero card to quest zero card

  the score is sum of two card abs value multiple by three

  - pair any card with their inverse, means abs(player.card) === abd(quest.card),
    but cannot pair 0 with 0

  the score is the positive card value multiple by four

  player played card goes to player drop
  quest paired card goes to quest drop

  this process can repeat until player can pair card.

## END-RULE:
if quest don't have deck game is end with a collected score - quest score

## QUEST-REVENGE
- quest draw 2 cards up to 4
- if quest reach 4 hand then quest on action
- player drop their hand
- quest score the sum abs of cards
- player draw 4 cards
- quest play against player according play phase rules and gains scores
- if quest cannot able to play any card, then drop their hand abs sum scored by player
- quest draw 2 cards up to four ( game end rule are active )
- if end of that phase quest hand goes below four then play right back to the player
