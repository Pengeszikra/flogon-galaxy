    import { fragment, signal } from './utils/old-bird-soft';

    const map = document.querySelector('main');
    const bridge = document.querySelector('figure');
    map.style.backgroundBlendMode = "screen, normal";

    const initial = {x:0, y:0, xSpeed:0, ySpeed:0};
    const ship = signal(p=>p)(initial);
    console.log(ship)
    const loop = () => {
      ship.x+= ship.xSpeed;
      ship.y+= ship.ySpeed;
      map.style.backgroundPosition = `${ship.x}% ${ship.y}%,${ship.x/1.4}% ${ship.y/1.4}%`;
      window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);

    document.addEventListener("keydown",
      /** @type {(event:KeyboardEvent) => any} */
      (event) => {
        const {key} = event;
        switch (key) {
          case "a": return ship.xSpeed -= .1;
          case "w": return ship.ySpeed -= .1;
          case "s": return ship.ySpeed += .1;
          case "d": return ship.xSpeed += .1;
        }
      }
    );
