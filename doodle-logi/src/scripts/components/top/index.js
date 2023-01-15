export default class Top extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'top' });
    this.assets = assets;
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
        console.log('close score');
        document.querySelector('.top').classList.remove('active');

        this.scene.start('menu');
      })
      .setDepth(10);
  }
}
