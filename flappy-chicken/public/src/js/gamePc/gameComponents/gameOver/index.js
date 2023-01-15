// const isAuth = window.Twitch.ext.viewer.isLinked;
// const isAuth = true;

export default class sceneThree extends Phaser.Scene {
  constructor(assets, topSc) {
    super({ key: 'sceneThree' });
    this.assets = assets;
    this.score = 0;
    this.place = 0;
    this.topSc = topSc;
  }
  setPlace(place) {
    this.place = place;
  }
  setScore(score) {
    let newScore = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let counter = [...score.toString()].map(Number).length;

    for (let i = 9; i > 0; i--) {
      newScore[i] = [...score.toString()].map(Number)[counter];
      counter--;
      if (counter < 0) break;
    }
    return newScore.join('');
  }

  addLink(variable, posY, asset, key) {
    return (variable = this.add
      .sprite(371 * 0.5, posY, asset)
      .setScale(0.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.scene.start(key))
      .on('pointerover', () => {
        variable.setFrame(1);
      })
      .on('pointerout', () => {
        variable.setFrame(0);
      }));
  }
  addLinkTop(variable, posY, asset, key, type) {
    return (variable = this.add
      .sprite(371 * 0.5, posY, asset)
      .setScale(0.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.topSc.setType(type);
        document.querySelector('.keyboard-control').classList.add('hidden');
        this.scene.start(key);
      })
      .on('pointerover', () => {
        variable.setFrame(1);
      })
      .on('pointerout', () => {
        variable.setFrame(0);
      }));
  }
  create() {
    this.add
      .image(371 * 0.5, 430 * 0.185, this.assets.scene.logo)
      .setDepth(10)
      .setScale(0.5);
    if (window.innerWidth > 719) {
      this.add
        .image(371 * 0.95, 430 * 0.05, this.assets.scene.close)
        .setScale(0.5 * 2)
        .setDepth(10)
        .setInteractive({ cursor: 'pointer' })
        .once('pointerdown', () => {
          document.querySelector('canvas').style.opacity = 0;
          setTimeout(() => {
            document.querySelector('canvas').classList.remove('shown');
            document
              .querySelector('.ext-state-minimized')
              .classList.add('shown');
            document.querySelector('.keyboard-control').classList.add('hidden');
          }, 50);
          this.scene.start('sceneOne');
        });
    }

    if (this.place > 3) {
      this.add
        .text(371 * 0.31, 430 * 0.38, 'ИГРА ОКОНЧЕНА', {
          fontFamily: 'Cera Condensed Pro Bold',
          fontSize: '48px',
          color: '#000000',
        })
        .setDepth(10)
        .setScale(0.5);
    } else {
      this.add
        .text(371 * 0.18, 430 * 0.38, 'ТЫ ВЫИГРАЛ! Твоё место: ' + this.place, {
          fontFamily: 'Cera Condensed Pro Bold',
          fontSize: '48px',
          color: '#000000',
        })
        .setDepth(10)
        .setScale(0.5);
    }

    this.add
      .text(371 * 0.385, 430 * 0.45, 'ТВОЙ СЧЁТ:', {
        fontFamily: 'Cera Condensed Pro Bold',
        fontSize: '40px',
        color: '#000000',
      })
      .setDepth(10)
      .setScale(0.5);
    this.add
      .image(371 * 0.5, 430 * 0.57, this.assets.scene.scoreBg)
      .setScale(0.5)
      .setDepth(10);
    this.add
      .text(85, 217, this.setScore(this.score), {
        fontFamily: 'Cera Condensed Pro Bold',
        fontSize: '96px',
        color: '#ffffff',
      })
      .setDepth(10)
      .setScale(0.5);

    // console.log(this.setScore(this.score));

    if (window.Twitch.ext.viewer.isLinked) {
      this.add
        .image(
          371 * 0.5,
          430 * 0.5,
          this.assets.scene.background.basketGameOver2
        )
        .setScale(0.5);
      setTimeout(() => {
        this.addLink(
          this.play,
          430 * 0.69,
          this.assets.scene.playSpriteTwo,
          'sceneOne'
        );
        this.addLinkTop(
          this.play,
          430 * 0.8,
          this.assets.scene.dailyTopSpriteTwo,
          'top',
          'daily'
        );
        this.addLinkTop(
          this.play,
          430 * 0.91,
          this.assets.scene.totalTopSpriteTwo,
          'top',
          'total'
        );
      }, 2000);
    } else {
      this.add
        .image(
          371 * 0.5,
          430 * 0.5,
          this.assets.scene.background.basketGameOver
        )
        .setScale(0.5);

      this.add
        .text(
          371 * 0.295,
          430 * 0.6325,
          'Пройди авторизацию,\nчтобы войти\nв рейтинг игроков\nи получить свой приз!',
          {
            fontFamily: 'Cera Condensed Pro Bold',
            fontSize: '40px',
            color: '#000000',
            align: 'center',
          }
        )
        .setScale(0.5);

      setTimeout(() => {
        this.auth = this.add
          .sprite(371 * 0.5, 430 * 0.9, this.assets.scene.authSprite)
          .setInteractive({ cursor: 'pointer' })
          .setScale(0.5)
          .setDepth(10)
          .on('pointerdown', () => {
            window.Twitch.ext.actions.requestIdShare();
            // console.log("auth");
          });

        this.auth.on('pointerover', () => {
          this.auth.setFrame(1);
        });
        this.auth.on('pointerout', () => {
          this.auth.setFrame(0);
        });
      }, 2000);
    }
  }
  changeScore(value) {
    this.score = value;
  }
}

