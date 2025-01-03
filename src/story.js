import { objectGet } from "./utils/dynamo";
import { fragment } from "./utils/old-bird-soft";

const playStory = (storyBoard, sceneNumber) => {
  const scene = fragment('#scene','main','scene-001');
  const next = () => {
    //@ts-ignore
    const [, imgurl, descript] = /\((.*?)\)\s*(.*)\s*/gms.exec(storyBoard[sceneNumber]);
    scene.querySelector('p').innerText = descript;
    scene.style.backgroundImage = `url(${imgurl})`;
    scene.querySelector('button').onclick = () => {sceneNumber ++ ; next()};
  }
  next()
}

const parseStoryBoard = ( {content} ) => {
  const storyBoard = content.split('![]');
  let sceneNumber = 1;
  const scene = playStory(storyBoard, sceneNumber);
  
}

objectGet (parseStoryBoard) ('recon-mission.md');