export default class MainScene extends Phaser.Scene {
  constructor(sceneName, assets) {
    super({ key: sceneName });
    this.assets = assets;
  }

  setBg() {
    this.background = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      this.assets.background
    );
  }

  create() {}
}
