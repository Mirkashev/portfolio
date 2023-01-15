import preloadScene from './gameComponents/preload/index.js';
import HowToPlay from './gameComponents/howToPlay/index.js';
import sceneOne from './gameComponents/menu/index.js';
import sceneTwo from './gameComponents/game/index.js';
import sceneThree from './gameComponents/gameOver/index.js';
import Lobby from './gameComponents/lobby/index.js';
import Top from './gameComponents/top/index.js';
import PromoCodes from './gameComponents/promoCodes/index.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const assets = {
  bird: {
    red: 'bird-red',
    yellow: 'bird-yellow',
    blue: 'bird-blue',
    gray: 'bird-gray',
    green: 'bird-green',
  },
  obstacle: {
    pipe: {
      green: {
        top: 'pipe-green-top',
        bottom: 'pipe-green-bottom',
      },
      red: {
        top: 'pipe-red-top',
        bottom: 'pipe-red-bo',
      },
      redSecond: {
        top: 'pipe-red-top2',
        bottom: 'pipe-red-bo2',
      },
    },
  },
  scene: {
    width: window.innerWidth,
    background: {
      day: 'background-day',
      night: 'background-night',
      gray: 'background-gray',
      basketGame: 'basketGame',
      basket: 'basket',
      basket2: 'basket2',
      basket3: 'basket3',
      basketGameOver: 'basketGameOver',
      basketGameOver2: 'basketGameOver2',
      basketHow: 'basketHow',
      howToPlayBg: 'howToPlayBg',
    },
    ground: 'ground',
    // restart: "restart-button",
    messageInitial: 'message-initial',
    // start: "start-button",
    // daily: "daily-top",
    // total: "total-top",
    auth: 'authorization',
    // promo: "promo-code",
    logo: 'logo',
    close: 'close',
    space: 'space',
    clickTap: 'clickTap',

    howToPlay: 'howtoplay',
    lobby: 'lobby',
    underline: 'underline',
    topBasket: 'topBasket',
    gameOverButton: 'gameOverButton',
    scoreBg: 'scoreBg',
    loader: 'loader',

    playSprite: 'playSprite',
    dailyTopSprite: 'dailyTopSprite',
    totalTopSprite: 'totalTopSprite',
    promoCodeSprite: 'promoCodeSprite',

    playSpriteTwo: 'playSpriteTwo',
    dailyTopSpriteTwo: 'dailyTopSpriteTwo',
    totalTopSpriteTwo: 'totalTopSpriteTwo',
    authSprite: 'authSprite',
  },
  scoreboard: {
    width: 25,
    base: 'number',
    number0: 'number0',
    number1: 'number1',
    number2: 'number2',
    number3: 'number3',
    number4: 'number4',
    number5: 'number5',
    number6: 'number6',
    number7: 'number7',
    number8: 'number8',
    number9: 'number9',
  },
  animation: {
    bird: {
      red: {
        clapWings: 'red-clap-wings',
        stop: 'red-stop',
      },
      blue: {
        clapWings: 'blue-clap-wings',
        stop: 'blue-stop',
      },
      yellow: {
        clapWings: 'yellow-clap-wings',
        stop: 'yellow-stop',
      },
      gray: {
        clapWings: 'gray-clap-wings',
        stop: 'gray-stop',
      },
      green: {
        clapWings: 'green-clap-wings',
        stop: 'green-stop',
      },
    },
    ground: {
      moving: 'moving-ground',
      stop: 'stop-ground',
    },
  },
};

const preloadSc = new preloadScene(assets);
const topSc = new Top(assets);

const gameOverSc = new sceneThree(assets, topSc);
const gameSc = new sceneTwo(assets, gameOverSc);
const menuSc = new sceneOne(assets, topSc);
const lobbySc = new Lobby(assets, gameSc);
const howToPlaySc = new HowToPlay(assets);

const promoCodesSc = new PromoCodes(assets);

const configurations = {
  type: Phaser.AUTO,
  parent: 'cont',
  width: 371,
  height: 430,
  // backgroundColor: "#D9D9D9",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300,
      },
      debug: false,
    },
  },
  fps: { forceSetTimeOut: true, target: 60 },
  transparent: true,
  scale: {
    width: 371,
    height: 430,

    zoom: 1,
  },
  scene: [
    preloadSc,
    howToPlaySc,
    lobbySc,
    menuSc,
    topSc,
    promoCodesSc,
    gameSc,
    gameOverSc,
  ],
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
};
let gameStarted = false;
let fontsCount = 0;
let isClicked = false;

let interval = setInterval(() => {
  if (document.fonts.check('32px Cera Condensed Pro Bold')) {
    if (document.fonts.check('32px Cera Condensed Pro')) {
      if (document.fonts.check('32px Cera Condensed Pro Medium')) {
        fontsCount = 2;
        clearInterval(interval);
        window.Twitch.ext.listen('global', (t, c, b) => true);
        new Phaser.Game(configurations);
        gameStarted = true;
        if (window.innerWidth < 720) {
          document.querySelector('canvas').classList.toggle('shown');
          document.querySelector('body').classList.add('mobile');
        } else {
          document.querySelector('body').onclick = (e) => {
            // console.log(document.getElementById('keyboardControl').checked);
            if (!e.composedPath().includes(document.querySelector('.cont'))) {
              document.getElementById('keyboardControl').checked = false;
            } else {
              document.querySelector('.dummy-input').focus();
            }
          };
          document.getElementById('keyboardControl').onclick = (e) => {
            e.target.blur();
          };

          document.querySelector('.ext-state-minimized').onclick = () => {
            if (fontsCount === 2 && !isClicked) {
              isClicked = true;
              setTimeout(() => {
                document.querySelector('canvas').style.opacity = 1;
                document.querySelector('canvas').classList.toggle('shown');
                document
                  .querySelector('.ext-state-minimized')
                  .classList.toggle('shown');

                document
                  .querySelector('.keyboard-control')
                  .classList.remove('hidden');

                isClicked = false;
              }, 1500);
            }
          };
        }
      }
    }
  }
}, 1000);

// window.onload = () => {
//   if(window.innerWidth > 700) {

//   }

// };

