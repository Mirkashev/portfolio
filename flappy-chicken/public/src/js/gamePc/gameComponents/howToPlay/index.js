export default class HowToPlay extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'howToPlay' });
    this.assets = assets;
  }

  setControl() {
    if (document.getElementById('keyboardControl')?.checked) {
      document.querySelector('.dummy-input').focus();
      this.clickTap.setDepth(1);
      this.clickTapText.setDepth(1);
      this.buttonSpace.setDepth(15);
    } else {
      document.querySelector('.dummy-input').blur();
      this.clickTap.setDepth(15);
      this.clickTapText.setDepth(15);
      this.buttonSpace.setDepth(1);
    }
  }

  create() {
    this.add
      .image(371 * 0.5, 430 * 0.5, this.assets.scene.background.howToPlayBg)
      .setScale(0.25);
    this.add
      .image(371 * 0.5, 430 * 0.5, this.assets.scene.messageInitial)
      .setScale(0.3);
    this.add
      .image(371 * 0.5, 430 * 0.5, this.assets.scene.background.basketHow)
      .setScale(0.5);

    this.add
      .image(371 * 0.5, 430 * 0.075, this.assets.scene.howToPlay)
      .setScale(0.5);

    this.add
      .image(371 * 0.95, 430 * 0.05, this.assets.scene.close)
      .setScale(0.5 * 2)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.scene.start('sceneOne'));

    this.clickTap = this.add
      .image(371 * 0.5, 430 * 0.9, this.assets.scene.clickTap)
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('lobby');
      });
    this.clickTapText = this.add
      .text(371 * 0.35, 430 * 0.86, 'Жми TAP!', {
        fontFamily: 'Cera Condensed Pro Bold',
        fontSize: '64px',
        color: '#000000',
      })
      .setScale(0.5);

    this.buttonSpace = this.add
      .image(371 * 0.5, 430 * 0.9, this.assets.scene.space)
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('lobby');
      });

    document.querySelector('.dummy-input').oninput = (e) => {
      // console.log('oninput');
      if (e.target.value.slice(-1) === ' ') {
        this.scene.start('lobby');
        document.querySelector('.dummy-input').value = '';
        document.querySelector('.dummy-input').oninput = '';
      }
    };
  }
  update() {
    this.setControl();
  }
}

