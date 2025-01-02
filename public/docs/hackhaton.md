# Requirements
## What to Build: 
Entrants must build a game using Amazon Q Developer, a generative AI-powered assistant, to speed up development, and at least one additional AWS service within your game.

## What to Submit:
- Must include a text description that explains how you used Amazon Q Developer, any other AWS services you used, the features, functionality, and the intended purpose of your game.
- Provide a URL to your code repository for judging and testing. The repository must be public.
- Optional: Provide feedback on your experience building with AWS, you can submit multiple times for different services
- Optional: Submit a blog post about how you built your game on community.aws using the tag “game-challenge”
- Optional: a demonstration video of your Project. 

> The video portion of the Submission should be less than 3 minutes should include footage that shows the intended interaction with your application if included, should be uploaded to and made publicly visible on YouTube or Vimeo, and a link to the video should be provided on the submission form on the Hackathon Website; and must not include third-party trademarks, or copyrighted music or other material unless the Entrant has permission to use such material.

{% https://www.youtube.com/embed/rcauLdXxni8?si=5Qq8BQe9zQ3B4gp6 %}

## Dynamo DB implementation
Mandatory quest tommorow to implement `DynamoDB` to this markdown editor, and command line stuff for edit and save / load markdown files to dynamo. Which is a halfway of success to a well organized way of working.

> AWS account are created, as dynamodb table as well `flogon-storage`

## Turn Marker to Builder
Because Marker are great tool to put together the multimedia stuff with a small amount of work. There I can import a text, codes, images, video and programs.

## Multiple Marker under Option
Maybe I can test a multiple marker under options or in some grid or even with switchable editor.
Such a crazy idea, but I think that solution will be pushing forward this game developmnet concept.

## GIT hell of .env
> I forget add .env to a gitignore which is steal 3 dev hours. Shame!!

## Q is working on Server code Again!
...working... I hope this time make a much more cleaner code as before.
Nope it is make some class based solution. Need to be refact!
Q is not bad at all, maybe working maybe not.
Actually don't
So this is my experiment with a Q development. 
I don't want to over estimated their capability.
This document are fine for a finaly document on Hackhaton about `Amazon Q`
I saw the Q need a lot of time to work this stuff, I hope that is don't 
afraid about a lot of assets inlcluded to this project already. 

I make a decision which lib to use for BE
- express
- fastify
- koa
- nestjs
- hapi
> I am stay on my working standard: express
Meanwhile Q are created a new iteration.

## I my Gosh! I am on same river as before 4 hours ago!
```shell
http://localhost:3000/health
# answer

{"status":"Kepp up good work!"}
```

## DynamoDB Query and More

[dynamo db doc](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html);

> scan

```
await fetch('http://localhost:3000/scan', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({Limit:10}),
    }).then(r=>r.text()).then(console.log);
```

```
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "314RA09BAVBF4GKFRFOVS6BCSRVV4KQNSO5AEMVJF66Q9ASUAAJG",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "Count": 3,
  "Items": [
    {
      "content": "It is seems working?",
      "id": "77"
    },
    {
      "content": "Muh more interesting",
      "id": "732872"
    },
    {
      "content": "Let's do something else",
      "id": "42"
    }
  ],
  "ScannedCount": 3
}
```

## Top 25 Space Game

````
{% https://www.youtube.com/embed/UbI5byCVR5A?si=ZARBTorq8LemOZdf %}
````

```
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/UbI5byCVR5A?si=ZARBTorq8LemOZdf" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen
></iframe>
```

- 00:56 Starcom: Unknown Space
- 01:35 Liberation
- 02:35 Master of Orion (Remake)
- 03:27 Reentry - A Space Flight Simulator
- 04:04 Starfield
- 05:02 Empyrion - Galactic Survival
- 05:36 Space Engineers
- 06:14 Elite Dangerous
- 07:02 Mass Effect 2
- 07:33 Avorion
- 08:05 Everspace 2
- 08:50 Star Traders: Frontiers
- 09:19 EVE Online
- 09:56 Starbase
- 10:25 Starsector
- 10:48 Space Trash Scavenger
- 11:23 Faster Than Light
- 11:57 Outer Wilds
- 12:30 Endless Space 2
- 13:03 No Man's Sky
- 13:47 Kerbal Space Program
- 14:55 Space Engine
- 16:42 Stellaris 
- 17:13 Star Citizen
- 18:33 X4: Foundations

![](mid/flogon4143.jpeg)


