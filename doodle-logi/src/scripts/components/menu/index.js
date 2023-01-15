export default class Menu extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'menu' });
    this.assets = assets;
  }

  jumpingModel() {
    this.playerGirl = this.physics.add
      .sprite(
        this.game.config.width * 0.85,
        this.game.config.height * 0.5 + 238,
        this.assets.playerGirl
      )
      .setScale(0.64);
    this.playerGirl.body.enable = true;
    this.playerGirl.setGravityY(1440);
    this.playerGirl.setVelocityY(-800);

    this.destTile = this.physics.add.sprite(
      this.game.config.width * 0.8,
      this.game.config.height * 0.5 + 323,
      this.assets.tiles.destructive
    );
    this.destTile2 = this.physics.add
      .sprite(
        this.game.config.width * 0.8,
        this.game.config.height * 0.5 + 313,
        this.assets.tiles.destructive
      )
      .setAlpha(0);

    this.destTile2.body.enable = true;
    this.destTile2.setImmovable();

    this.destTile.body.enable = true;
    this.destTile.setImmovable();

    this.physics.add.collider(this.playerGirl, this.destTile2, (girl) => {
      if (girl.body.touching.down) {
        this.playerGirl.anims.play(this.assets.animations.girl);
        this.playerGirl.setVelocityY(-800);
      }
    });

    this.playerMen = this.physics.add
      .sprite(
        this.game.config.width * 0.22,
        this.game.config.height * 0.5 + 200,
        this.assets.player
      )
      .setScale(0.64);
    this.playerMen.body.enable = true;
    this.playerMen.setGravityY(1440);
    this.playerMen.setVelocityY(-800);

    this.playerMen.setCollideWorldBounds(5);

    this.playerMen.flipX = true;
    this.playerMen.rotation = 25;
    this.playerMen.setBounce(0.8);

    this.disTile = this.physics.add.sprite(
      this.game.config.width * 0.2,
      this.game.config.height * 0.5 + 363,
      this.assets.tiles.disappearing
    );
    this.disTile.body.enable = true;
    this.disTile.body.setImmovable();

    this.disTile2 = this.physics.add
      .sprite(
        this.game.config.width * 0.2,
        this.game.config.height * 0.5 + 323,
        this.assets.tiles.disappearing
      )
      .setAlpha(0);
    this.disTile2.body.enable = true;
    this.disTile2.body.setImmovable();

    this.physics.add.collider(this.playerMen, this.disTile2, (player) => {
      if (player.body.touching.down) {
        this.playerMen.anims.play(this.assets.animations.men);

        this.playerMen.setVelocityY(-1100);
      }
    });
    this.physics.add.image(
      this.game.config.width * 0.2,
      this.game.config.height * 0.5 + 329,
      this.assets.spring
    );
  }

  createButton(scene, texture, xPos, yPos) {
    this.add
      .image(xPos, yPos, texture)
      .setInteractive({ cursor: 'pointer' })
      .setScale(1.5)
      .on('pointerdown', () => {
        document
          .querySelector('.game__close-full-screen')
          .classList.add('hidden');
        this.scene.start(scene);
      });
  }

  create() {
    this.tiles = this.physics.add.staticGroup();

    this.background = this.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      this.assets.background
    );

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
    // .setScale(1.5);
    this.createButton(
      !!localStorage.getItem('token') &&
        localStorage.getItem('token') !== 'undefined'
        ? 'choseModel'
        : 'authentication',
      this.assets.scenes.play,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 - 14
    );

    // this.add
    //   .image(
    //     this.game.config.width * 0.55,
    //     this.game.config.height * 0.5 + 42,
    //     this.assets.scenes.scores
    //   )
    //   .setInteractive({ cursor: 'pointer' })
    //   .on('pointerdown', () => {
    //     document.querySelector('.top').classList.add('active');
    //     document
    //       .querySelector('.game__close-full-screen')
    //       .classList.add('hidden');
    //     this.scene.start('top');
    //   });

    this.add
      .image(
        this.game.config.width * 0.52,
        this.game.config.height * 0.5 + 168,
        this.assets.scenes.rules
      )
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        document.querySelector('.rules').classList.add('active');
        this.scene.start('rules');
      });

    this.jumpingModel();
  }
}
