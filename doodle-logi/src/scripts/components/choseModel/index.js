export default class ChoseModel extends Phaser.Scene {
  constructor(assets, gameSc) {
    super({ key: 'choseModel' });
    this.assets = assets;
    this.gameSc = gameSc;
    this.isGirl = true;
  }

  jumpingModel() {
    this.physics.add
      .image(
        this.game.config.width * 0.7,
        this.game.config.height * 0.5 + 190,
        this.assets.playerGirl
      )
      .setScale(1.64)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.isGirl = true;
        this.gameSc.setPlayerAsset(this.isGirl);
        this.scene.start('game');
      });

    this.playerMen = this.physics.add
      .image(
        this.game.config.width * 0.3,
        this.game.config.height * 0.5 + 190,
        this.assets.player
      )
      .setScale(1.64)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.isGirl = false;
        this.gameSc.setPlayerAsset(this.isGirl);
        this.scene.start('game');
      });
    this.playerMen.flipX = true;

    this.physics.add
      .image(
        this.game.config.width * 0.3,
        this.game.config.height * 0.5 + 323,
        this.assets.tiles.disappearing
      )
      .setScale(1.2);
    this.physics.add
      .image(
        this.game.config.width * 0.7,
        this.game.config.height * 0.5 + 323,
        this.assets.tiles.destructive
      )
      .setScale(1.2);
  }

  createButton(scene, texture, xPos, yPos) {
    this.add
      .image(xPos, yPos, texture)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.scene.start(scene));
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
      ).setScale(1.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        console.log('choose model close');
        document
          .querySelector('.game__close-full-screen')
          .classList.remove('hidden');
        this.scene.start('menu');
      });

    this.logo = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 390,
      this.assets.scenes.logo
    );
    // .setScale(1.8);
    this.add.image(
      this.game.config.width * 0.825,
      this.game.config.height * 0.95,
      this.assets.scenes.byLogi
    );

    this.choose = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      this.assets.scenes.choose
    );
    // .setScale(1.5);

    this.jumpingModel();
  }
}
