export default class Game extends Phaser.Scene {
  constructor(assets, gameOverSc) {
    super({ key: 'game' });

    this.assets = assets;
    this.isGirl = true;
    this.playerRotation = 0;
    this.gameOverSc = gameOverSc;
  }

  query() {
    if (this.score > 0) {
      fetch(`https://doodle.theclownteam.ru/api/api/scores`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },

        body: JSON.stringify({ score: this.score, seed: 'test' }),
      });
    }
  }

  setPlayerAsset(isGirl) {
    this.isGirl = isGirl;
  }

  removeCollision(gameObject) {
    gameObject.body.checkCollision.down = false;
    gameObject.body.checkCollision.right = false;
    gameObject.body.checkCollision.left = false;
  }

  /* Create Player Model */
  createPlayer() {
    // this.player.body.setCollideWorldBounds();

    this.player = this.physics.add
      .sprite(
        this.game.config.width / 2,
        (3 * this.game.config.height) / 4,
        this.isGirl ? this.assets.playerGirl : this.assets.player
      )
      .setScale(0.64);

    this.player.setVelocity(0, -1000);
    this.player.setGravityY(1440);
    this.player.setBounce(0.8);
    // this.player

    this.player.depth = 0;

    this.player.yOrig = this.player.y;
    this.player.yChange = 0;

    console.log(this.player);
  }

  /* Create Regular Tiles/Platform */
  createBackground() {
    this.background = this.physics.add.image(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      this.assets.background
    );
    this.background.scrollFactorY = 0;
  }

  createTiles() {
    this.tilesGroup = this.physics.add.staticGroup({ runChildUpdate: true });
    this.tilesGroup.enableBody = true;
    this.tileChild = this.tilesGroup.getChildren();

    // spawnTile();
    for (let i = 0; i < 10; i++) {
      this.tn = this.spawnTile(
        Phaser.Math.Between(25, this.physics.world.bounds.width - 25),
        this.physics.world.bounds.height - 200 * i,
        this.assets.tiles.regular
      );
      this.removeCollision(this.tn);
    }
  }

  /* Create Breaking Tiles */
  createBreakTiles() {
    this.breakTilesGroup = this.physics.add.staticGroup({
      runChildUpdate: true,
    });
    this.breakTilesGroup.enableBody = true;
    this.breakTileChild = this.breakTilesGroup.getChildren();
  }

  /* Create Disappearing Tiles */
  createDisTiles() {
    this.DisTilesGroup = this.physics.add.staticGroup({ runChildUpdate: true });
    this.DisTilesGroup.enableBody = true;
    this.DisTileChild = this.DisTilesGroup.getChildren();
  }

  /* Create Springs */
  createSpring() {
    this.springGroup = this.physics.add.staticGroup({ runChildUpdate: true });
    this.springGroup.enableBody = true;
    this.springChild = this.springGroup.getChildren();
  }

  createTrueSpring() {
    this.springGroupTrueBody = this.physics.add.staticGroup({
      runChildUpdate: true,
    });
    this.springGroupTrueBody.enableBody = true;
    this.springChildTrueBody = this.springGroupTrueBody.getChildren();
  }

  /* Create Stars */
  createStars() {
    this.starGroup = this.physics.add.staticGroup({ runChildUpdate: true });
    this.starGroup.enableBody = true;
    this.starChild = this.starGroup.getChildren();
  }

  /* Create Normal Enemies group */
  createEnemyN() {
    this.enemyNgroup = this.physics.add.group({ runChildUpdate: true });
    this.enemyNgroup.enableBody = true;
    this.enemyNchild = this.enemyNgroup.getChildren();
  }

  /* Create Shooting Enemies group */
  createEnemyS() {
    this.enemySgroup = this.physics.add.group({ runChildUpdate: true });
    this.enemySgroup.enableBody = true;
    this.enemySchild = this.enemySgroup.getChildren();
  }

  /* Sub function for Regular tiles.*/
  spawnTile(x, y, type) {
    this.tile = this.tilesGroup.create(x, y, type);
    this.tile.setImmovable();
    this.removeCollision(this.tile);

    return this.tile;
  }

  /* Sub function for Breaking tiles.*/
  spawnTileBreak(x, y, type) {
    this.tile = this.breakTilesGroup.create(x, y, type);
    this.tile.setImmovable();
    this.removeCollision(this.tile);

    return this.tile;
  }

  /* Sub function for Disappearing tiles.*/
  spawnTileDis(x, y, type) {
    this.tile = this.DisTilesGroup.create(x, y, type);
    this.tile.setImmovable();
    this.removeCollision(this.tile);

    return this.tile;
  }

  /* Sub function for Springs.*/
  spawnSpring(x, y, type) {
    this.spring = this.springGroup.create(x, y, type);
    this.spring.setImmovable();
    this.removeCollision(this.spring);
    this.spring.body.checkCollision.up = false;

    return this.spring;
  }

  spawnTrueSpring(x, y, type) {
    this.trueSpring = this.springGroupTrueBody.create(x, y, type).setAlpha(0);
    this.trueSpring.setImmovable();
    this.removeCollision(this.trueSpring);

    return this.trueSpring;
  }

  /* Sub function for Stars.*/
  spawnStar(x, y, type) {
    this.star = this.starGroup.create(x, y, type);
    this.star.setImmovable();
    return this.star;
  }

  /* Sub function for enemy N.*/
  spawnEnemyN(y, type) {
    const rightOrLeft = Phaser.Math.Between(0, 100);
    const x = rightOrLeft > 51 ? 0 : this.game.config.width;
    // console.log(rightOrLeft);
    this.enemy_n = this.enemyNgroup.create(x, y, type);
    this.enemy_n.body.velocity.x = rightOrLeft > 51 ? 100 : -100;
    // console.log(this.enemy_n.body.velocity.x);
    this.enemy_n.setImmovable();
    return this.enemy_n;
  }

  /* Sub function for enemy S.*/
  spawnEnemyS(x, y, type) {
    let counter = 0;

    while (counter < 2) {
      const rotation = Phaser.Math.Between(0, 180);

      const particles = this.add.particles(this.assets.bullet);
      const emitter = particles.createEmitter({
        angle: rotation,
        lifespan: 20000,
        speed: { min: 50, max: 150 },
        quantity: 1,
        on: false,
        deathZone: {
          type: 'onEnter',
          source: {
            contains: (x, y) => {
              // console.log('inside death zone');
              if (this.player.body.hitTest(x, y) && !emitter.isTouched) {
                emitter.isTouched = true;
                emitter.setAlpha(0);
                this.score -= 4;
                if (this.score - 4 < 0) this.score = 0;
                this.scoreText.setText('Score: ' + this.score);
              }
            },
          },
        },
        rotate: rotation - 90,
        isTouched: false,
      });

      particles.enableBody = true;

      this.enemy_s = this.enemySgroup.create(x, y, type);
      particles.emitParticleAt(this.enemy_s.x, this.enemy_s.y);
      this.enemy_s.setImmovable();
      counter += 1;
    }
  }

  jumpAnimation(_player) {
    _player.anims.play(
      this.isGirl ? this.assets.animations.girl : this.assets.animations.men
    );
  }

  /* Bounce off Regular Tiles / Regular Tile interaction */
  bounceBack(_player, _tilesGroup) {
    if (_player.body.touching.down && _tilesGroup.body.touching.up) {
      this.jumpAudio.play();
      this.jumpAnimation(_player);

      if (!_tilesGroup.body.wasTouching.up) this.score += 2;
      _tilesGroup.body.wasTouching.up = true;
      this.scoreText.setText('Score: ' + this.score);

      this.player.body.velocity.y = -400 * 2;
    }
  }

  /* Disappearing Tiles func / Dis Tile Interaction*/
  TileDisappear(_player, _DisTilesGroup) {
    this.DisTilesGroup.children.each(function (e) {
      if (_player.body.touching.down && e.body.touching.up) {
        this.jumpAudio.play();
        this.DisTilesGroup.remove(e, true);
        this.score = this.score + 10;
        this.player.body.velocity.y = -400 * 2;
        this.scoreText.setText('Score: ' + this.score);
      }
    }, this);
  }

  /* Breaking Tiles func / Breaking Tile Interaction */
  TileBreak(_player, _breakTilesGroup) {
    this.breakTilesGroup.children.each(function (e) {
      if (_player.body.touching.down && e.body.touching.up) {
        this.breakTilesGroup.remove(e, true);
        // this.score = this.score + 10;
        // this.player.body.velocity.y = -400 * 2;
        // this.scoreText.setText('Score: ' + this.score);
      }
    }, this);
  }

  /* Spring Interaction func */
  BigBounce(_player, _springGroup) {
    console.log('here');
    if (_player.body.touching.down && _springGroup.body.touching.up) {
      this.jumpAudio.play();

      this.score += 2;
      this.scoreText.setText('Score: ' + this.score);
      this.player.body.velocity.y = -1100 * 2;
    }
  }

  MonsterBounce(_player, _springGroup) {
    if (_player.body.touching.down && _springGroup.body.touching.up) {
      this.jumpAudio.play();

      _springGroup.destroy();
      this.score += 20;
      this.scoreText.setText('Score: ' + this.score);
      this.player.body.velocity.y = -1100 * 2;
    } else {
      this.GameOver();
    }
  }

  /* Stars Interaction func */
  pickStars(_player, _starGroup) {
    this.starGroup.children.each(function (e) {
      if (
        Math.abs(Math.abs(_player.y) - Math.abs(e.y)) < 100 &&
        Math.abs(Math.abs(_player.x) - Math.abs(e.x)) < 100
      ) {
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        e.destroy();
      }
    }, this);
  }

  GameOver() {
    // Show Game Over Text
    this.gameOverSc.setScore(this.score);
    this.query();

    // this.scoreText.setPosition(
    //   this.game.config.width / 2,
    //   this.game.config.height / 2 + 100
    // );
    // this.scoreText.setFontSize(45);
    // this.scoreText.setOrigin(0.5);

    /* Hide and clear assets */
    this.tilesGroup.setAlpha(0);
    this.tilesGroup.clear();
    this.breakTilesGroup.setAlpha(0);
    this.breakTilesGroup.clear();
    this.DisTilesGroup.setAlpha(0);
    this.DisTilesGroup.clear();
    this.springGroup.setAlpha(0);
    this.springGroup.clear();
    this.springGroupTrueBody.setAlpha(0);
    this.springGroupTrueBody.clear();
    this.starGroup.setAlpha(0);
    this.starGroup.clear();
    this.enemyNgroup.setAlpha(0);
    this.enemyNgroup.clear();
    this.enemySgroup.setAlpha(0);
    this.enemySgroup.clear();

    /* Player Opacity */
    this.player.setAlpha(0.45);
    this.lastPlayerPosY = 0;

    // window.removeEventListener(
    //   'deviceorientation',
    //   this.handleOrientation,
    //   true
    // );

    this.scene.start('gameOver');
  }

  create() {
    // console.log(this.assets.background);
    // this.add
    //   .image(371 * 0.5, 430 * 0.4, this.assets.scene.background.day)
    //   .setScale(0.25)
    //   .setInteractive({ cursor: 'pointer' });
    // console.log('create', this.player);
    // this.backgroundPos = 2;
    // this.backgroundCounter = 1;
    this.lastPlayerPosY = 0;

    this.score = 0;
    /* Create Floor */
    this.floor = this.physics.add.image(
      this.game.config.width / 2,
      this.game.config.height + 30,
      this.assets.tiles.disappearing
    );
    this.floor.setImmovable();
    this.floor.scale = 6;

    this.createBackground();
    /* Create Tiles/Platforms */
    this.createTiles();
    /* Create Breaking Tiles/Platforms Group */
    this.createBreakTiles();
    /* Create Disappearing Tiles/Platforms Group */
    this.createDisTiles();
    /* Create Player Model */
    this.createPlayer();
    /* Create Springs */
    this.createSpring();
    this.createTrueSpring();

    /* Create Stars */
    this.createStars();
    /* Create Normal Enemies */
    this.createEnemyN();
    /* Create Shooting Enemies */
    this.createEnemyS();

    // console.log(this.sound, this.assets.sound);
    this.jumpAudio = this.sound.add(this.assets.sound);

    /* Score Text */
    this.scoreText = this.add
      .text(16, 16, 'Score: 0', {
        fontFamily: 'Futura PT',
        fontSize: '48px',
        fill: '#000000',
      })
      .setScrollFactor(0);
    this.scoreText.depth = 2;

    /* Collision checks and events */
    this.physics.add.collider(
      this.player,
      this.floor,
      this.GameOver,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.tilesGroup,
      this.bounceBack,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.DisTilesGroup,
      this.TileDisappear,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.breakTilesGroup,
      this.TileBreak,
      null,
      this
    );
    // this.physics.add.collider(
    //   this.player,
    //   this.springGroup,
    //   this.BigBounce,
    //   null,
    //   this
    // );
    this.physics.add.collider(
      this.player,
      this.springGroupTrueBody,
      this.BigBounce,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.starGroup,
      this.pickStars,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemyNgroup,
      this.MonsterBounce,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemySgroup,
      this.MonsterBounce,
      null,
      this
    );
    // this.physics.add.overlap(
    //   this.player,
    //   this.particles,
    //   this.GameOver,
    //   null,
    //   this
    // );

    /* camera and tile tracking vars */
    this.cameraYMin = 99999;
    this.tileYMin = 99999;

    /* Control setup, Kbd  */
    this.key_left = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.key_right = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.key_Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    /* Mouse Clicks */
    this.input.mouse.disableContextMenu();

    // this.handleOrientation = (e) => {
    //   // console.log(this.player.body);
    //   console.log(e);
    //   const dx = e.gamma;
    //   const edx = (dx / 3.5) ** 4;
    //   // console.log(dx, edx);
    //   if (dx < 0) {
    //     this.player.body.velocity.x = -edx;
    //   } else {
    //     this.player.body.velocity.x = edx;
    //   }
    //   // this.player.body.velocity.x = 0;
    //   if (this.player.body.velocity.x > 400) {
    //     this.player.body.velocity.x = 400;
    //   } else if (this.player.body.velocity.x < -400)
    //     this.player.body.velocity.x = -400;
    // };

    /* Device Orientation */
    // window.addEventListener('deviceorientation', this.handleOrientation, true);
  }

  update(delta) {
    /* track the maximum amount that the hero has travelled */
    this.player.yChange = Math.max(
      this.player.yChange,
      Math.abs(this.player.y - this.player.yOrig)
    );

    /* Dynamically change world bounds based on player pos */
    // scene.physics.world.setBounds(x, y, width, height, checkLeft, checkRight, checkUp, checkDown);
    this.physics.world.setBounds(
      0,
      -this.player.yChange,
      this.physics.world.bounds.width,
      this.game.config.height + this.player.yChange
    );

    /* Camera tracking */
    // this.cameras.main.startFollow(player, true);
    // console.log(this.player.y);
    if (this.player.y < this.lastPlayerPosY || this.lastPlayerPosY === 0) {
      this.lastPlayerPosY = this.player.y;
      this.cameras.main.setLerp(0.8);
      this.cameras.main.centerOnY(this.player.y);
    }

    /* Arrow buttons */
    if (this.key_right.isDown) {
      this.player.body.velocity.x = 400 * 2;
      this.player.flipX = true;
    } else if (this.key_left.isDown) {
      this.player.body.velocity.x = -400 * 2;
      this.player.flipX = false;
    } else this.player.body.velocity.x = 0;

    /* Touch events !? */
    const pointer = this.input.activePointer;
    if (pointer.isDown) {
      if (pointer.x > this.game.config.width / 2) {
        this.player.body.velocity.x = 400 * 2;
        this.player.flipX = true;
      } else if (pointer.x < this.game.config.width / 2 + 1) {
        this.player.flipX = false;

        this.player.body.velocity.x = -400 * 2;
      } else this.player.body.velocity.x = 0;
    }

    /* Up arrow to give Y velocity for debug beyond camera screen */
    // if (this.key_Up.isDown) this.player.body.velocity.y = -400;

    /* Wrap the player from left <==> right of the screen. */
    this.physics.world.wrap(this.player, this.player.width / 6, false);

    /* if the hero falls below the camera view, gameover */
    if (this.player.y > this.cameraYMin + this.game.config.height) {
      console.log(this.player.y, this.cameraYMin, this.game.config.height);
      console.log('death by fall');
      this.GameOver();
    }

    /* For each tilesGroup child, find out which is the highest
		if one goes below the camera view, then create a new one at a distance from the highest one
		these are pooled so they are very performant */
    this.tilesGroup.children.iterate((item) => {
      const chance = Phaser.Math.Between(1, 100);
      const chance2 = Phaser.Math.Between(1, 100);
      const chance3 = Phaser.Math.Between(1, 100);
      let xAxis;
      let yAxis = this.tileYMin - 200;
      this.tileYMin = Math.min(this.tileYMin, item.y);
      this.cameraYMin = Math.min(
        this.cameraYMin,
        this.player.y - this.game.config.height + 600
      );

      if (item.y > this.cameraYMin + this.game.config.height) {
        item.destroy();
        /* 15% chance for Disappearing Tile */
        if (chance > 84 && chance <= 95) {
          xAxis = Phaser.Math.Between(
            100,
            this.physics.world.bounds.width - 100
          );
          this.tn = this.spawnTile(xAxis, yAxis, this.assets.tiles.regular);
          this.tb = this.spawnTileDis(
            Phaser.Math.Between(
              xAxis + 100,
              this.physics.world.bounds.width - 100
            ) || Phaser.Math.Between(100, xAxis - 100),
            Phaser.Math.Between(yAxis + 25, yAxis - 25),
            this.assets.tiles.disappearing
          );
        } else if (chance > 96) {
          xAxis = Phaser.Math.Between(
            100,
            this.physics.world.bounds.width - 100
          );
          this.tn = this.spawnTile(xAxis, yAxis, this.assets.tiles.regular);
          this.tb = this.spawnTileBreak(
            Phaser.Math.Between(
              xAxis + 100,
              this.physics.world.bounds.width - 100
            ) || Phaser.Math.Between(100, xAxis - 100),
            Phaser.Math.Between(yAxis + 25, yAxis - 25),
            this.assets.tiles.destructive
          );
        } else {
          xAxis = Phaser.Math.Between(
            100,
            this.physics.world.bounds.width - 100
          );
          this.tn = this.spawnTile(xAxis, yAxis, this.assets.tiles.regular);
        }
        if (chance2 > 95) {
          /* 20% chance2 of spawning stars */
          console.log('star spawned');
          this.spawnStar(
            Phaser.Math.Between(200, this.physics.world.bounds.width - 200),
            Phaser.Math.Between(yAxis, yAxis - 200),
            this.assets.star
          );
        } else if (chance2 > 75 && chance2 < 81) {
          this.spawnSpring(
            Phaser.Math.Between(xAxis, xAxis),
            yAxis - 32.5,
            this.assets.spring
          );
          this.spawnTrueSpring(
            Phaser.Math.Between(xAxis, xAxis),
            yAxis - 1,
            this.assets.tiles.destructive
          );
        }
        if (chance3 > 97) {
          console.log('monster shooting spawned');
          this.spawnEnemyS(
            Phaser.Math.Between(200, this.physics.world.bounds.width - 200),
            Phaser.Math.Between(yAxis, yAxis - 200),
            this.assets.monsters.shooting
          );
        } else if (chance3 > 92 && chance3 < 97) {
          console.log('monster n spawned');
          this.spawnEnemyN(
            Phaser.Math.Between(yAxis, yAxis - 200),
            this.assets.monsters.moving
          );
        }
      }
    }, this);
  }
}
