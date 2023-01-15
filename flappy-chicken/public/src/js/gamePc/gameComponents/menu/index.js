export default class sceneOne extends Phaser.Scene {
  constructor(assets, topSc) {
    super({ key: 'sceneOne' });
    this.assets = assets;
    this.playSprite;
    this.dailyTopSprite;
    this.totalTopSprite;
    this.topSc = topSc;
    this.promoCodeSprite;
  }
  addLink(variable, posY, asset, key) {
    return (variable = this.add
      .sprite(371 * 0.5, posY, asset)
      .setScale(0.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        if (key !== 'howToPlay') {
          document.querySelector('.keyboard-control').classList.add('hidden');
        }
        this.scene.start(key);
      })
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
        document.querySelector('.keyboard-control').classList.add('hidden');
        this.topSc.setType(type);

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
    if (window.innerWidth > 730) {
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
    const canvas = document.querySelector('canvas');
    // console.log(window.innerWidth);
    if (window.innerWidth < 730) {
      if (window.innerWidth > 371) {
        // console.log("here");
        document.querySelector('.cont').style.height =
          window.innerHeight + 'px';

        canvas.style.width = `${
          window.innerWidth * (371 / window.innerWidth)
        }px`;
        canvas.style.height = `${
          window.innerWidth * (430 / window.innerWidth)
        }px`;
      } else {
        document.querySelector('.cont').style.height =
          window.innerHeight + 'px';

        canvas.style.width = `${
          window.innerWidth *
          (window.innerWidth / 371) *
          (window.innerWidth / (window.innerWidth * (window.innerWidth / 371)))
        }px`;
        canvas.style.height = `${
          window.innerWidth *
          (window.innerWidth / 430) *
          (window.innerWidth / (window.innerWidth * (window.innerWidth / 430)))
        }px`;
      }
      canvas.classList.remove('mobile-tops');
    } else {
      canvas.style.width = `371px`;
      canvas.style.height = `430px`;
      canvas.classList.remove('pc-tops');
    }
    this.game.scale.resize(371, 430);

    this.add
      .image(371 * 0.5, 430 * 0.5, this.assets.scene.background.basket)
      .setScale(0.5);
    // logo
    this.add
      .image(371 * 0.5, 430 * 0.185, this.assets.scene.logo)
      .setScale(0.5);
    // //close

    // links;
    this.addLink(
      this.playSprite,
      430 * 0.48,
      this.assets.scene.playSprite,
      'howToPlay'
    );
    this.addLinkTop(
      this.dailyTopSprite,
      430 * 0.62,
      this.assets.scene.dailyTopSprite,
      'top',
      'daily'
    );
    this.addLinkTop(
      this.totalTopSprite,
      430 * 0.76,
      this.assets.scene.totalTopSprite,
      'top',
      'total'
    );
    this.addLink(
      this.promoCodeSprite,
      430 * 0.9,
      this.assets.scene.promoCodeSprite,
      'promoCodes'
    );
    // this.add
    //   .image(371 * 0.95, 430 * 0.05, this.assets.scene.close)
    //   .setInteractive({ cursor: "pointer" })
    //   .on("pointerdown", () => {
    //     setTimeout(() => {
    //       if (window.innerWidth < 730) {
    //         document
    //           .querySelector(".ext-state-minimized")
    //           .classList.toggle("shown");
    //         document.querySelector("canvas").classList.toggle("shown");
    //       }
    //     }, 100);
    //   })
    //   .setDepth(20);
    // this.playSprite.input.alwaysEnabled = true;
    // this.playSprite.on("pointerover", () => {
    //   this.playSprite.setFrame(1);
    //   console.log("hover");
    // });
    // this.playSprite.on("pointerout", () => {
    //   console.log(this.playSprite);
    //   this.playSprite.setFrame(0);
    // });
    // this.addLink(430 * 0.48, this.assets.scene.start, "howToPlay");
    // this.addLink(430 * 0.62, this.assets.scene.daily, "dailyTop");
    // this.addLink(430 * 0.76, this.assets.scene.total, "totalTop");
    // this.addLink(430 * 0.9, this.assets.scene.promo, "promoCodes");
  }
}

