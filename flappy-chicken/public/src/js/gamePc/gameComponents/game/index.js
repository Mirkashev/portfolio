import seedrandom from 'seedrandom';
import API_URL from '../../../globals/index.js';

export default class sceneTwo extends Phaser.Scene {
  constructor(assets, gameOverSc) {
    super({ key: 'sceneTwo' });

    this.gameOverSc = gameOverSc;

    this.assets = assets;

    this.frame = 0;
    this.skipped = false;
    this.pipeCheck = false;
    this.isPipeSpecial = false;

    this.dateTimer = null;
    this.minutes = 0;
    this.second = 0;
    this.milliSecond = 0;
    this.syncCounter = 1;

    this.fpsArr = [];
    this.isLowQuality = false;

    this.playersMoves = [];

    this.ghostBird = [];

    this.xmrSended = false;
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

  sendQuery(place) {
    setTimeout(() => {
      window.Twitch.ext.onAuthorized(({ token }) => {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', API_URL + '/replays');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('x-extension-jwt', token);

        const json = {
          birdTransform: {
            x: this.playersBirdTransformX,
            y: this.playersBirdTransformY,
          },
          moves: this.playersMoves,
        };

        xhr.send(
          JSON.stringify({
            json: JSON.stringify(json),
            seed: this.seed, // this.seed,
            score: this.score,
            place: place,
          })
        );
        // console.log(
        //   "sendedQuery",
        //   JSON.stringify({
        //     json: JSON.stringify(json),
        //     seed: this.seed, // this.seed,
        //     score: this.score,
        //     place: place,
        //   })
        // );
      });
    }, Math.floor(Math.random() * 11 + 5) * 1000);
  }

  checkTime() {
    const newDate = new Date();
    this.milliSecond =
      newDate.getMilliseconds() - this.dateTimer.getMilliseconds();
    this.second = newDate.getSeconds() - this.dateTimer.getSeconds();
    this.minutes = newDate.getMinutes() - this.dateTimer.getMinutes();
    return this.minutes * 60 * 1000 + this.second * 1000 + this.milliSecond;
  }

  setLvlSeed(seed) {
    this.seed = seed;
    this.RandomDataGenerator = new seedrandom(seed);
  }
  setGhosts(prop) {
    // console.log(prop);
    // сортировать по таймингу смерти
    this.ghostMoves = prop
      .sort(
        (a, b) =>
          a.moves[a.moves.length - 1].timing -
          b.moves[b.moves.length - 1].timing
      )
      .map((el) => {
        return el.moves;
      });
    this.ghostMovesFps = this.ghostMoves;
    this.ghostTransforms = prop.map((el) => {
      return el.birdTransform;
    });
    let temp = prop.sort((a, b) => {
      return b.score - a.score;
    });
    this.ghostsPlaces = temp.map((el) => el.score);

    // console.log(this.ghostsPlaces);
    // console.log(this.ghostMoves);
  }

  randomIntFromInterval(min, max, randGenerator) {
    // min and max included
    return Math.floor(randGenerator() * (max - min + 1) + min);
  }

  setLowQuality(delta) {
    this.fpsArr.push(1000 / delta);
    if (this.fpsArr.length > 19) {
      // this.fpsArr.reduce((a, b) => (a + b)) / this.fpsArr.length;
      // console.log(this.fpsArr.reduce((a, b) => a + b) / this.fpsArr.length);
      // console.log(
      //   this.fpsArr.reduce((a, b) => a + b) / this.fpsArr.length < 40
      // );
      if (this.fpsArr.reduce((a, b) => a + b) / this.fpsArr.length < 40) {
        // удалить призраков
        this.ghostMovesFps = this.ghostMovesFps.slice(
          this.ghostMovesFps.length - 11,
          this.ghostMovesFps.length
        );
        this.ghosts.slice(0, this.ghosts.length - 11).forEach((el) => {
          el.destroy();
        });
        this.ghosts = this.ghosts.slice(
          this.ghosts.length - 11,
          this.ghosts.length
        );
        // console.log(this.ghosts);

        this.isLowQuality = true;
      }
    }
  }

  hitBird(player) {
    this.playersMoves.push({ action: 'dead', timing: this.checkTime() });
    // clearInterval(this.interval);
    this.gameOver = true;
    this.gameStarted = false;
    player.anims.play(this.getAnimationBird(this.birdName).stop);
    this.ground.anims.play(this.assets.animation.ground.stop);
    this.gameOverSc.changeScore(this.score);
    // this.gameOverSc.setPlace(0);

    let playersPlace = 1;
    if (this.score <= this.ghostsPlaces[0]) {
      this.ghostMoves.forEach((el, index) => {
        if (
          el[el.length - 1]?.timing >
          this.playersMoves[this.playersMoves.length - 1].timing
        ) {
          playersPlace++;
        }
      });
    }
    if (!this.xmrSended && window.Twitch.ext.viewer.isLinked) {
      this.xmrSended = true;
      this.gameOverSc.setPlace(playersPlace);
      this.sendQuery(playersPlace);
    }

    this.scene.start('sceneThree');
  }
  hitBird2(ghost) {
    ghost.setCollideWorldBounds(false, 0, 0, false);
    this.ghostBird.forEach((el) => {
      ghost.anims.play(this.getAnimationBird(el).stop);
    });
  }

  getAnimationBird(birdColor) {
    switch (birdColor) {
      case this.assets.bird.red:
        return this.assets.animation.bird.red;
      case this.assets.bird.blue:
        return this.assets.animation.bird.blue;
      case this.assets.bird.yellow:
        return this.assets.animation.bird.yellow;
      case this.assets.bird.gray:
        return this.assets.animation.bird.gray;
      case this.assets.bird.green:
      default:
        return this.assets.animation.bird.green;
    }
  }
  getRandomBird() {
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        return this.assets.bird.red;
      case 1:
        return this.assets.bird.blue;
      case 2:
        return this.assets.bird.yellow;
      case 3:
        return this.assets.bird.gray;
      case 4:
      default:
        return this.assets.bird.green;
    }
  }
  getGhostBird() {
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        return this.assets.bird.red;
      case 1:
        return this.assets.bird.blue;
      case 2:
        return this.assets.bird.yellow;
      case 3:
        return this.assets.bird.gray;
      case 4:
      default:
        return this.assets.bird.green;
    }
  }

  moveGhost(index, delta) {
    if (this.gameOver) return;

    this.ghosts[index].setVelocityY(-400 * 0.8);
    this.ghosts[index].angle = -15 * 0.8 * delta;
    this.ghostFramesMoveUps[index] = 5.2 * 0.8 * Math.pow(delta, -1);
  }

  moveBird(_, delta) {
    if (this.gameOver) return;
    this.player.setVelocityY(-400 * 0.8);
    this.player.angle = -15 * 0.8 * delta;
    this.framesMoveUp = 5.2 * 0.8 * Math.pow(delta, -1);

    this.playersMoves.push(
      { action: 'flap', timing: this.checkTime() },
      { action: 'sync', value: this.player.y, timing: this.checkTime() }
    );
  }
  makePipes(scene) {
    // console.log(this.score);
    if (!this.gameStarted || this.gameOver) return;

    if (this.score % 5 === 0 && (this.score / 5) % 2 !== 0) {
      this.currentPipe = this.assets.obstacle.pipe.redSecond;
      this.isPipeSpecial = !this.isPipeSpecial;
    } else if (this.isPipeSpecial) {
      this.isPipeSpecial = !this.isPipeSpecial;
      if (this.pipeCheck) {
        this.currentPipe = this.assets.obstacle.pipe.red;
      } else this.currentPipe = this.assets.obstacle.pipe.green;
    }

    const pipeTopY = this.randomIntFromInterval(
      -65,
      65,
      this.RandomDataGenerator
    );
    const gap = scene.add.line(321, pipeTopY + (210 / 512) * 430, 0, 0, 0, 98);
    this.gapsGroup.add(gap);
    gap.body.allowGravity = false;
    gap.visible = false;

    const pipeTop = this.pipesGroup
      .create(321, pipeTopY, this.currentPipe.top)
      .setScale(0.2666666666666667);
    pipeTop.body.allowGravity = false;
    pipeTop.body.setImmovable(true);

    const pipeBottom = this.pipesGroup
      .create(321, pipeTopY + (400 / 512) * 430, this.currentPipe.bottom)
      .setScale(0.2666666666666667);
    pipeBottom.body.allowGravity = false;
    pipeBottom.body.setImmovable(true);
  }

  updateScore(_, gap) {
    this.score += 1;
    gap.destroy();

    if (this.score % 10 === 0) {
      this.backgroundDay.visible = !this.backgroundDay.visible;
      this.backgroundNight.visible = !this.backgroundNight.visible;
      this.pipeCheck = !this.pipeCheck;
      if (this.currentPipe === this.assets.obstacle.pipe.green) {
        this.currentPipe = this.assets.obstacle.pipe.red;
      } else this.currentPipe = this.assets.obstacle.pipe.green;
    }

    this.updateScoreboard();
  }
  updateScoreboard() {
    this.scoreboardGroup.clear(true, true);

    const scoreAsString = this.score.toString();
    if (scoreAsString.length == 1)
      this.scoreboardGroup
        .create(371 * 0.5, 60, this.assets.scoreboard.base + this.score)
        .setScale(0.35)
        .setDepth(15);
    else {
      let initialPosition =
        371 * 0.5 -
        (this.score.toString().length * this.assets.scoreboard.width) / 2;

      for (let i = 0; i < scoreAsString.length; i++) {
        this.scoreboardGroup
          .create(
            initialPosition,
            60,
            this.assets.scoreboard.base + scoreAsString[i]
          )
          .setDepth(15)
          .setScale(0.35);
        initialPosition += this.assets.scoreboard.width;
      }
    }
  }
  prepareGame(scene) {
    this.firstPipesTiming = 180;
    this.counters = [];
    this.ghosts = [];
    this.ghostFramesMoveUps = [];
    this.xmrSended = false;
    this.ghostAlive = this.ghostMoves.length;
    this.framesMoveUp = 0;
    this.nextPipes = 0;
    this.currentPipe = this.assets.obstacle.pipe.green;
    this.score = 0;
    this.gameOver = false;
    this.backgroundDay.visible = true;
    this.backgroundNight.visible = false;
    this.ghostBird = [];

    this.birdName = this.getRandomBird();

    for (let i = 0; i < this.ghostMoves.length; i++) {
      this.ghostBird.push(this.getGhostBird());
      this.counters.push(0);
      this.ghostFramesMoveUps.push(0);
      // рандомно смещать птичек
      this.ghosts[i] = scene.physics.add
        .sprite(
          this.ghostTransforms[i].x,
          this.ghostTransforms[i].y,
          this.ghostBird[i]
        )
        .setScale((102 / 306) * 0.9)
        .setAlpha(0.25);
      this.ghosts[i].setCollideWorldBounds(true);
      this.ghosts[i].anims.play(
        this.getAnimationBird(this.ghostBird[i]).clapWings,
        true
      );
      this.ghosts[i].body.allowGravity = false;

      scene.physics.add.collider(
        this.ghosts[i],
        this.ground,
        this.hitBird2,
        null,
        scene
      );
      scene.physics.add.collider(
        this.ghosts[i],
        this.pipesGroup,
        this.hitBird2,
        null,
        scene
      );

      scene.physics.add.overlap(
        this.ghosts[i],
        this.gapsGroup,
        () => null,
        null,
        scene
      );
    }
    this.playersBirdTransformX = Phaser.Math.Between(65, 95);
    this.playersBirdTransformY = Phaser.Math.Between(205, 225);
    this.player = scene.physics.add
      .sprite(
        this.playersBirdTransformX,
        this.playersBirdTransformY,
        this.birdName
      )
      .setScale((102 / 306) * 0.9);
    this.player.setCollideWorldBounds(true);
    this.player.anims.play(
      this.getAnimationBird(this.birdName).clapWings,
      true
    );
    this.player.body.allowGravity = false;

    scene.physics.add.collider(
      this.player,
      this.ground,
      this.hitBird,
      null,
      scene
    );
    scene.physics.add.collider(
      this.player,
      this.pipesGroup,
      this.hitBird,
      null,
      scene
    );

    scene.physics.add.overlap(
      this.player,
      this.gapsGroup,
      this.updateScore,
      null,
      scene
    );

    this.ground.body.setImmovable(true);
    this.ground.anims.play(this.assets.animation.ground.moving, true);
  }
  startGame(scene) {
    this.pipeCheck = false;
    this.gameStarted = true;
    this.counter = 0;
    this.playersMoves = [];
    const score0 = this.scoreboardGroup
      .create(371 * 0.5, 60, this.assets.scoreboard.number0)
      .setScale(0.35);
    score0.setDepth(20);

    this.makePipes(scene);
  }

  create() {
    this.dateTimer = new Date();
    this.xmrSended = false;

    this.buttonSpace = this.add
      .image(371 * 0.5, 430 * 0.9, this.assets.scene.space)
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.moveBird(this, 1));

    this.clickTap = this.add
      .image(371 * 0.5, 430 * 0.9, this.assets.scene.clickTap)
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => this.moveBird(this, 1));

    this.clickTapText = this.add
      .text(371 * 0.35, 430 * 0.86, 'Жми TAP!', {
        fontFamily: 'Cera Condensed Pro Bold',
        fontSize: '64px',
        color: '#000000',
      })
      .setScale(0.5);

    this.add
      .image(371 * 0.5, 430 * 0.5, this.assets.scene.background.basketGame)
      .setScale(0.5)
      .setDepth(11);

    this.backgroundDay = this.add
      .image(371 * 0.5, 430 * 0.4, this.assets.scene.background.day)
      .setScale(0.25)
      .setInteractive();

    this.backgroundNight = this.add
      .image(371 * 0.5, 430 * 0.4, this.assets.scene.background.night)
      .setScale(0.25)
      .setInteractive();
    this.backgroundNight.visible = false;

    this.gapsGroup = this.physics.add.group();
    this.pipesGroup = this.physics.add.group();
    this.scoreboardGroup = this.physics.add.staticGroup();

    this.ground = this.physics.add
      .sprite(371 * 0.5, 430, this.assets.scene.ground)
      .setScale(1);
    this.ground.setCollideWorldBounds(true);
    this.ground.setDepth(10);

    document.querySelector('.dummy-input').oninput = (e) => {
      if (e.target.value.slice(-1) === ' ') {
        this.moveBird(this, 1);
        document.querySelector('.dummy-input').value = '';
      }
    };

    this.prepareGame(this);

    this.startGame(this);
  }
  update(deltas, delta) {
    this.setControl();

    const force = 1;

    this.buttonSpace.removeAllListeners();
    this.clickTap.removeAllListeners();
    this.backgroundDay.removeAllListeners();
    this.backgroundNight.removeAllListeners();

    this.backgroundDay.on('pointerdown', () => this.moveBird(this, force));
    this.backgroundNight.on('pointerdown', () => this.moveBird(this, force));
    this.buttonSpace.on('pointerdown', () => this.moveBird(this, force));
    this.clickTap.on('pointerdown', () => this.moveBird(this, force));

    if (this.gameOver || !this.gameStarted) return;

    this.ghostMovesFps.forEach((el, index) => {
      if (this.ghostFramesMoveUps[index] > 0) {
        this.ghostFramesMoveUps[index] -= 1;
      } else if (this.checkTime() > el[this.counters[index]]?.timing) {
        this.counters[index] += 1;
        if (el[this.counters[index]]?.action === 'sync') {
          this.ghosts[index].y = el[this.counters[index]].value;
        } else {
          this.moveGhost(index, force);
        }
      } else {
        try {
          this.ghosts[index].setVelocityY(120);
          if (this.ghosts[index].angle < 90) this.ghosts[index].angle += 1;
        } catch {
          // console.log(this.ghosts);
          // console.log(index + ' index');
        }
      }
    });
    if (this.ghostsPlaces[0] < this.score) {
      this.hitBird(this.player);
    }
    if (this.checkTime() / 400 > this.syncCounter) {
      this.playersMoves.push({
        action: 'sync',
        value: this.player.y,
        timing: this.checkTime(),
      });
      this.syncCounter++;
    }
    // setTimeout(() => {
    //   this.playersMoves.push({
    //     action: "sync",
    //     value: this.player.y,
    //     timing: this.checkTime(),
    //   });
    // }, 400);

    if (this.framesMoveUp > 0) this.framesMoveUp--;
    else {
      this.player.setVelocityY(120);
      if (this.player.angle < 90) this.player.angle += 1;
    }

    this.pipesGroup.children.iterate(function (child) {
      if (child == undefined) return;

      if (child.x < 52) {
        child.destroy();
      } else child.setVelocityX(-100);
    });

    this.gapsGroup.children.iterate(function (child) {
      child.body.setVelocityX(-100);
    });

    this.nextPipes++;
    this.firstPipesTiming = 130;
    if (this.nextPipes * force > this.firstPipesTiming) {
      this.makePipes(this);
      this.nextPipes = 0;
    }
  }
}

