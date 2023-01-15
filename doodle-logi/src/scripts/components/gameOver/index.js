export default class GameOver extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'gameOver' });
    this.assets = assets;
    this.scoreDom = document.querySelector('.score');
  }

  jumpingModel() {
    //left anim
    this.physics.add
      .image(
        this.game.config.width * 0.78,
        this.game.config.height * 0.5 + 318,
        this.assets.playerGirl
      )
      .setScale(0.64);

    this.physics.add.image(
      this.game.config.width * 0.8,
      this.game.config.height * 0.5 + 383,
      this.assets.tiles.destructive
    );
    //right anim
    this.playerMen = this.physics.add
      .image(
        this.game.config.width * 0.22,
        this.game.config.height * 0.5 + 320,
        this.assets.player
      )
      .setScale(0.64);

    this.playerMen.flipX = true;
    this.playerMen.rotation = 25;

    this.physics.add.image(
      this.game.config.width * 0.2,
      this.game.config.height * 0.5 + 483,
      this.assets.tiles.disappearing
    );
    this.physics.add.image(
      this.game.config.width * 0.2,
      this.game.config.height * 0.5 + 449,
      this.assets.spring
    );
  }

  createButton(scene, texture, xPos, yPos) {
    this.add
      .image(xPos, yPos, texture)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        // this.scoreDom.classList.remove('active');
        document.querySelector('.score').classList.remove('active');
        document.querySelector('.top').classList.add('active');
        document
          .querySelector('.game__close-full-screen')
          .classList.add('hidden');
        this.scene.start('top');
        this.scene.start(scene);
      });
  }

  setScore(score) {
    console.log(score);
    this.scoreDom.classList.add('active');
    this.scoreDom.innerHTML = `<div class="container"><span>${score}</span></div>`;
  }

  create() {
    this.background = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      this.assets.background
    );

    this.close = this.add
      .image(
        this.game.config.width * 0.95,
        this.game.config.height * 0.04,
        this.assets.scenes.close
      )
      .setScale(1.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        document.querySelector('.top').classList.remove('active');
        document.querySelector('.score').classList.remove('active');

        this.scene.start('menu');
      });

    this.logo = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 390,
      this.assets.scenes.logo
    );
    // .setScale(1.8);

    this.gameOver = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 111,
      this.assets.scenes.gameOver
    );
    this.scoreText = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 40,
      this.assets.scenes.scoreText
    );
    this.add.image(
      this.game.config.width * 0.825,
      this.game.config.height * 0.95,
      this.assets.scenes.byLogi
    );
    // this.createButton(
    //   'top',
    //   this.assets.scenes.scores,
    //   this.game.config.width * 0.5,
    //   this.game.config.height * 0.5 + 170
    // );
    this.add
      .image(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5 + 205,
        this.assets.scenes.play
      )
      .setScale(1.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.scene.start('choseModel');
        document.querySelector('.score').classList.remove('active');
      });

    this.jumpingModel();
  }
}
