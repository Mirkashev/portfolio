import API_URL from '../../../globals/index.js';

export default class preloadScene extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'scenePreload' });
    this.assets = assets;
  }
  // loadFont(name, url) {
  //   var newFont = new FontFace(name, `url(${url})`);
  //   newFont
  //     .load()
  //     .then(function (loaded) {
  //       document.fonts.add(loaded);
  //     })
  //     .catch(function (error) {
  //       return error;
  //     });
  //   // document.fonts.size = 5;
  //   console.log(newFont);
  //   return newFont;
  // }
  preload() {
    // console.log(document.fonts);
    this.load.image(
      this.assets.scene.clickTap,
      'build/files/assets/clickTap.png'
    );
    this.load.spritesheet(
      this.assets.scene.playSprite,
      'build/files/assets/playSprite.png',
      {
        frameWidth: 578,
        frameHeight: 102,
      }
    );
    this.load.spritesheet(
      this.assets.scene.dailyTopSprite,
      'build/files/assets/dailyTopSprite.png',
      {
        frameWidth: 578,
        frameHeight: 102,
      }
    );
    this.load.spritesheet(
      this.assets.scene.totalTopSprite,
      'build/files/assets/totalTopSprite.png',
      {
        frameWidth: 578,
        frameHeight: 102,
      }
    );
    this.load.spritesheet(
      this.assets.scene.promoCodeSprite,
      'build/files/assets/promoCodeSprite.png',
      {
        frameWidth: 578,
        frameHeight: 102,
      }
    );

    this.load.spritesheet(
      this.assets.scene.authSprite,
      'build/files/assets/authSprite.png',
      {
        frameWidth: 578,
        frameHeight: 102,
      }
    );

    this.load.spritesheet(
      this.assets.scene.playSpriteTwo,
      'build/files/assets/playSpriteTwo.png',
      {
        frameWidth: 584,
        frameHeight: 90,
      }
    );
    this.load.spritesheet(
      this.assets.scene.dailyTopSpriteTwo,
      'build/files/assets/dailyTopSpriteTwo.png',
      {
        frameWidth: 584,
        frameHeight: 90,
      }
    );
    this.load.spritesheet(
      this.assets.scene.totalTopSpriteTwo,
      'build/files/assets/totalTopSpriteTwo.png',
      {
        frameWidth: 584,
        frameHeight: 90,
      }
    );

    // this.load.image(
    //   this.assets.scene.start,
    //   "build/files/assets/startGamex2.png"
    // );
    // this.load.image(
    //   this.assets.scene.promo,
    //   "build/files/assets/promoCodex2.png"
    // );
    // this.load.image(
    //   this.assets.scene.daily,
    //   "build/files/assets/dailyTopx2.png"
    // );
    // this.load.image(
    //   this.assets.scene.total,
    //   "build/files/assets/totalTopx2.png"
    // );
    this.load.image(
      this.assets.scene.background.howToPlayBg,
      'build/files/assets/howToPlayBg.png'
    );
    this.load.image(this.assets.scene.logo, 'build/files/assets/logox2.png');
    this.load.image(this.assets.scene.close, 'build/files/assets/close.png');
    this.load.image(this.assets.scene.space, 'build/files/assets/spacex2.png');
    this.load.image(
      this.assets.scene.howToPlay,
      'build/files/assets/howToPlay.png'
    );
    this.load.image(this.assets.scene.lobby, 'build/files/assets/lobby.png');
    this.load.image(
      this.assets.scene.underline,
      'build/files/assets/underline.png'
    );
    this.load.image(
      this.assets.scene.topBasket,
      'build/files/assets/topBasket.png'
    );
    this.load.image(
      this.assets.scene.scoreBg,
      'build/files/assets/scoreBg.png'
    );
    this.load.image(
      this.assets.scene.messageInitial,
      'build/files/assets/message-initial2.png'
    );
    this.load.image(this.assets.scene.loader, 'build/files/assets/loader.svg');

    this.load.image(
      this.assets.scene.gameOverButton,
      'build/files/assets/gameOverButton.png'
    );

    this.load.image(
      this.assets.scene.background.day,
      'build/files/assets/background-day2.png'
    );
    this.load.image(
      this.assets.scene.background.night,
      'build/files/assets/background-night2.png'
    );
    this.load.image(
      this.assets.scene.background.basket,
      'build/files/assets/basketx2.png'
    );
    this.load.image(
      this.assets.scene.background.basket2,
      'build/files/assets/basket2x2.png'
    );
    this.load.image(
      this.assets.scene.background.basket3,
      'build/files/assets/basket3.png'
    );
    this.load.image(
      this.assets.scene.background.basketGame,
      'build/files/assets/basketGame.png'
    );
    this.load.image(
      this.assets.scene.background.basketGameOver,
      'build/files/assets/basketGameOver.png'
    );
    this.load.image(
      this.assets.scene.background.basketGameOver2,
      'build/files/assets/basketGameOver2.png'
    );
    this.load.image(
      this.assets.scene.background.basketHow,
      'build/files/assets/basketHow.png'
    );

    this.load.spritesheet(
      this.assets.scene.ground,
      'build/files/assets/ground-sprite.png',
      {
        frameWidth: 288,
        frameHeight: 128,
      }
    );

    // Pipes
    this.load.image(
      this.assets.obstacle.pipe.green.top,
      'build/files/assets/pipe-green-top.png'
    );
    this.load.image(
      this.assets.obstacle.pipe.green.bottom,
      'build/files/assets/pipe-green-bottom.png'
    );
    this.load.image(
      this.assets.obstacle.pipe.red.top,
      'build/files/assets/pipe-red-top.png'
    );
    this.load.image(
      this.assets.obstacle.pipe.red.bottom,
      'build/files/assets/pipe-red-bottom.png'
    );
    this.load.image(
      this.assets.obstacle.pipe.redSecond.top,
      'build/files/assets/pipe-red-top2.png'
    );
    this.load.image(
      this.assets.obstacle.pipe.redSecond.bottom,
      'build/files/assets/pipe-red-bottom2.png'
    );

    // Start game
    // this.load.image(
    //   this.assets.scene.messageInitial,
    //   "build/files/assets/message-initial.png"
    // );
    // this.load.image(
    //   this.assets.scene.start,
    //   "build/files/assets/restart-button.png"
    // );

    // End game
    // this.load.image(this.assets.scene.gameOver, "build/files/assets/gameover.png");
    // this.load.image(
    //   this.assets.scene.restart,
    //   "build/files/assets/restart-button.png"
    // );

    // Birds
    this.load.spritesheet(
      this.assets.bird.red,
      'build/files/assets/bird-red-sprite.png',
      {
        frameWidth: 306 / 3,
        frameHeight: 72,
      }
    );
    this.load.spritesheet(
      this.assets.bird.blue,
      'build/files/assets/bird-blue-sprite.png',
      {
        frameWidth: 306 / 3,
        frameHeight: 72,
      }
    );
    this.load.spritesheet(
      this.assets.bird.yellow,
      'build/files/assets/bird-yellow-sprite.png',
      {
        frameWidth: 306 / 3,
        frameHeight: 72,
      }
    );
    this.load.spritesheet(
      this.assets.bird.gray,
      'build/files/assets/bird-gray-sprite.png',
      {
        frameWidth: 306 / 3,
        frameHeight: 72,
      }
    );
    this.load.spritesheet(
      this.assets.bird.green,
      'build/files/assets/bird-green-sprite.png',
      {
        frameWidth: 306 / 3,
        frameHeight: 72,
      }
    );

    // Numbers
    this.load.image(
      this.assets.scoreboard.number0,
      'build/files/assets/number0.png'
    );
    this.load.image(
      this.assets.scoreboard.number1,
      'build/files/assets/number1.png'
    );
    this.load.image(
      this.assets.scoreboard.number2,
      'build/files/assets/number2.png'
    );
    this.load.image(
      this.assets.scoreboard.number3,
      'build/files/assets/number3.png'
    );
    this.load.image(
      this.assets.scoreboard.number4,
      'build/files/assets/number4.png'
    );
    this.load.image(
      this.assets.scoreboard.number5,
      'build/files/assets/number5.png'
    );
    this.load.image(
      this.assets.scoreboard.number6,
      'build/files/assets/number6.png'
    );
    this.load.image(
      this.assets.scoreboard.number7,
      'build/files/assets/number7.png'
    );
    this.load.image(
      this.assets.scoreboard.number8,
      'build/files/assets/number8.png'
    );
    this.load.image(
      this.assets.scoreboard.number9,
      'build/files/assets/number9.png'
    );

    this.load.image(this.assets.scene.auth, 'build/files/assets/auth.png');
  }

  create() {
    if (!localStorage.getItem('auth')) {
      localStorage.setItem('auth', 'no');
    }
    // Ground animations
    let xhr = new XMLHttpRequest();

    // отправка и получение для авторизованного пользователя

    setTimeout(() => {
      window.Twitch.ext.onAuthorized((data) => {
        const channelId = data.channelId; // отправлять вместе с реплеем
        const token = data.token; // token for request
        const userId = data.userId; // auth-request and save replay request
        if (
          window.Twitch.ext.viewer.isLinked &&
          // true
          localStorage.getItem('auth') === 'no'
        ) {
          xhr.open('POST', API_URL + '/users');
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('x-extension-jwt', token);

          xhr.onload = () => localStorage.setItem('auth', 'yes');
          xhr.send();
        }
      });
    }, Math.floor(Math.random() * 11 + 1) * 1000);

    this.anims.create({
      key: this.assets.animation.ground.moving,
      frames: this.anims.generateFrameNumbers(this.assets.scene.ground, {
        start: 0,
        end: 2,
      }),
      frameRate: 3.75,
      repeat: -1,
    });
    this.anims.create({
      key: this.assets.animation.ground.stop,
      frames: [
        {
          key: this.assets.scene.ground,
          frame: 0,
        },
      ],
      frameRate: 5,
    });

    // Red Bird Animations
    this.anims.create({
      key: this.assets.animation.bird.red.clapWings,
      frames: this.anims.generateFrameNumbers(this.assets.bird.red, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: this.assets.animation.bird.red.stop,
      frames: [
        {
          key: this.assets.bird.red,
          frame: 1,
        },
      ],
      frameRate: 20,
    });

    // Blue Bird animations
    this.anims.create({
      key: this.assets.animation.bird.blue.clapWings,
      frames: this.anims.generateFrameNumbers(this.assets.bird.blue, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: this.assets.animation.bird.blue.stop,
      frames: [
        {
          key: this.assets.bird.blue,
          frame: 1,
        },
      ],
      frameRate: 20,
    });

    // Yellow Bird animations
    this.anims.create({
      key: this.assets.animation.bird.yellow.clapWings,
      frames: this.anims.generateFrameNumbers(this.assets.bird.yellow, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: this.assets.animation.bird.yellow.stop,
      frames: [
        {
          key: this.assets.bird.yellow,
          frame: 1,
        },
      ],
      frameRate: 20,
    });
    // gray
    this.anims.create({
      key: this.assets.animation.bird.gray.clapWings,
      frames: this.anims.generateFrameNumbers(this.assets.bird.gray, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: this.assets.animation.bird.gray.stop,
      frames: [
        {
          key: this.assets.bird.gray,
          frame: 1,
        },
      ],
      frameRate: 20,
    });
    // green

    this.anims.create({
      key: this.assets.animation.bird.green.clapWings,
      frames: this.anims.generateFrameNumbers(this.assets.bird.green, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: this.assets.animation.bird.green.stop,
      frames: [
        {
          key: this.assets.bird.green,
          frame: 1,
        },
      ],
      frameRate: 20,
    });
    this.scene.start('sceneOne');
  }
}

