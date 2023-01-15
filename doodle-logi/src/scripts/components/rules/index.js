import MainScene from '../mainScene/index.js';

export default class Rules extends MainScene {
  constructor(assets) {
    super('rules', assets);
  }

  create() {
    this.setBg();

    this.close = this.add
      .image(
        this.game.config.width * 0.95,
        this.game.config.height * 0.04,
        this.assets.scenes.close
      ).setScale(1.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        document.querySelector('.rules').classList.remove('active');

        this.scene.start('menu');
      })
      .setDepth(10);
    this.add.image(
      this.game.config.width * 0.825,
      this.game.config.height * 0.95,
      this.assets.scenes.byLogi
    );
    this.logo = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.1,
      this.assets.scenes.logo
    );
  }
}
