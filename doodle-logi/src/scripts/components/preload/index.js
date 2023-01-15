export default class Preload extends Phaser.Scene {
  constructor(assets, isFake) {
    super({ key: 'preload' });
    this.assets = assets;
    this.isFake = isFake;
  }

  preload() {
    /* scenes elements */
    this.load.image(this.assets.scenes.logo, 'files/assets/logo.png');
    this.load.svg(this.assets.scenes.play, 'files/assets/play.svg', {
      scale: 2,
    });
    this.load.svg(this.assets.scenes.scores, 'files/assets/scores.svg', {
      scale: 2,
    });
    this.load.svg(this.assets.scenes.login, 'files/assets/login.svg', {
      scale: 2,
    });
    this.load.svg(this.assets.scenes.signup, 'files/assets/signup.svg', {
      scale: 2,
    });
    this.load.svg(this.assets.scenes.bigPlay, 'files/assets/bigPlay.svg', {
      scale: 2,
    });
    this.load.svg(this.assets.scenes.close, 'files/assets/close.svg', {
      scale: 2,
    });
    this.load.svg(this.assets.scenes.rules, 'files/assets/rules.svg', {
      scale: 2,
    });
    this.load.image(this.assets.scenes.byLogi, 'files/assets/byLogitech.png');
    this.load.image(this.assets.scenes.choose, 'files/assets/choose.png');
    this.load.image(this.assets.scenes.gameOver, 'files/assets/gameOver.png');
    this.load.image(this.assets.scenes.scoreText, 'files/assets/score.png');

    /* Preload all assets. */
    this.load.svg(this.assets.background, 'files/assets/background.svg', {
      scale: 3.15,
    });
    this.load.spritesheet(this.assets.player, 'files/assets/player-02.png', {
      scale: 0.5,
      frameWidth: 150,
    });
    this.load.spritesheet(
      this.assets.playerGirl,
      'files/assets/player-01.png',
      {
        scale: 0.5,
        frameWidth: 150,
      }
    );
    // this.load.svg("tile", "files/assets/");
    this.load.svg(this.assets.tiles.regular, 'files/assets/tile-n-01.svg', {
      scale: 2,
    });
    this.load.svg(
      this.assets.tiles.disappearing,
      'files/assets/tile-d-01.svg',
      {
        scale: 2,
      }
    );
    this.load.svg(this.assets.tiles.destructive, 'files/assets/tile-b-01.svg', {
      scale: 2,
    });
    // this.load.svg('rocket', 'files/assets/');
    this.load.svg(this.assets.spring, 'files/assets/spring.svg', {
      scale: 1.8,
    });
    this.load.svg(this.assets.star, 'files/assets/star-01.svg', { scale: 2.1 });
    this.load.svg(
      this.assets.monsters.shooting,
      'files/assets/enemy-s-01.svg',
      {
        scale: 2,
      }
    );
    this.load.svg(this.assets.monsters.moving, 'files/assets/enemy-n-01.svg', {
      scale: 2,
    });
    this.load.svg(this.assets.bullet, 'files/assets/laser.svg', {
      scale: 2,
    });
    this.load.audio(this.assets.sound, 'files/sounds/jump.mp3');
  }

  create() {
    this.anims.create({
      key: this.assets.animations.girl,
      frames: this.anims.generateFrameNames(this.assets.playerGirl, {
        start: 0,
        end: 2,
      }),
      frameRate: 9,
      repeat: 0,
    });

    this.anims.create({
      key: this.assets.animations.men,
      frames: this.anims.generateFrameNames(this.assets.player, {
        start: 0,
        end: 2,
      }),
      frameRate: 9,
      repeat: 0,
    });

    if (this.isFake) {
      this.scene.start('fakeMenu');
    } else {
      this.scene.start('menu');
    }
  }
}
