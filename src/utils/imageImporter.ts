import BlackPanther from '../assets/images/black-panther.jpeg'
import CaptainAmerica from '../assets/images/captain-america.jpeg'
import CaptainMarvel from '../assets/images/captain-marvel.jpeg'
import CaptainThini from '../assets/images/captain-thini.jpeg'
import Hulk from '../assets/images/hulk.jpeg'
import Ironman from '../assets/images/ironman.jpeg'
import Spiderman from '../assets/images/spiderman.jpeg'
import Thor from '../assets/images/thor.jpeg'
import WinterSoldier from '../assets/images/winter-soldier.jpeg'
import Thanos from '../assets/images/thanos.jpeg'

import Marvel from '../assets/images/marvel.jpeg'

interface ImageMap {
  [key: string]: string;
}

const imageMap: ImageMap = {
  'BlackPanther': BlackPanther,
  'CaptainMarvel': CaptainMarvel,
  'CaptainAmerica': CaptainAmerica,
  'CaptainThini': CaptainThini,
  'Hulk': Hulk,
  'Ironman': Ironman, 
  'Spiderman': Spiderman,
  'Thor': Thor,
  'WinterSoldier': WinterSoldier,
  'Thanos': Thanos
};

export default Object.keys(imageMap);

export const getImage = (fileName: string): string => {
  return imageMap[fileName];
};

export const getMarvelImage = () => {
  return Marvel
}