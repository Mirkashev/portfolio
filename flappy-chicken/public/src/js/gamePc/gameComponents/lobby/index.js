// сюда нужно прокинуть реплеи и рандомно их перемешать по определенному сиду, который тоже выбирается рандомно
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  countries,
  names,
  animals,
} from 'unique-names-generator';
import API_URL from '../../../globals/index.js';

export default class Lobby extends Phaser.Scene {
  constructor(assets, gameSc) {
    super({ key: 'lobby' });

    this.assets = assets;

    this.gameSc = gameSc;

    this.isReplaysLoaded = false;
  }
  ifCantFetch(seed) {
    let parsedBody = [
      {
        seed: 'tongue',
        username: 'unclebansh',
        json: '{"moves":[{"action":"flap","timing":250}],"birdTransform":{"x":82,"y":218}}',
        score: 20,
        place: 1,
      },
      {
        seed: 'chicken',
        username: 'unclebansh',
        json: '{"moves":[{"action":"flap","timing":250}],"birdTransform":{"x":82,"y":218}}',
        score: 20,
        place: 1,
      },
      {
        seed: 'money',
        username: 'unclebansh',
        json: '{"moves":[{"action":"flap","timing":250}],"birdTransform":{"x":82,"y":218}}',
        score: 20,
        place: 1,
      },
      {
        seed: 'globus',
        username: 'unclebansh',
        json: '{"moves":[{"action":"flap","timing":250}],"birdTransform":{"x":82,"y":218}}',
        score: 20,
        place: 1,
      },
      {
        seed: 'outsider',
        username: 'unclebansh',
        json: '{"moves":[{"action":"flap","timing":250}],"birdTransform":{"x":82,"y":218}}',
        score: 20,
        place: 1,
      },
    ];
    parsedBody = parsedBody.filter((el) => el.seed === seed);
    // parsedBody = parsedJson;

    let replays = [];
    parsedBody.forEach((replay) => {
      const sameNicknames = parsedBody.filter(
        (e) => e.username == replay.username
      );
      const isNicknameExist = replays.filter(
        (e) => e.username == replay.username
      );
      if (sameNicknames.length > 0 && isNicknameExist.length != 0) {
        const shortName = uniqueNamesGenerator({
          dictionaries: [adjectives, animals, colors, names], // colors can be omitted here as not used
          length: 2,
          style: 0.5 - Math.random() > 0 ? 'capital' : 'lowerCase',
          separator: '',
        });
        replays.push({
          ...replay,
          username: shortName,
        });
      } else {
        replays.push(replay);
      }
    });
    parsedBody = replays;
    // console.log(parsedJson, parsedBody);
    this.playersList = this.rexUI.add
      .scrollablePanel({
        x: 371 * 0.5,
        y: 430 * 0.5,
        width: 274,
        height: 242,

        scrollMode: 0,

        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0xffffff),

        panel: {
          child: this.rexUI.add.fixWidthSizer({
            space: {
              left: 1.5,
              right: 1.5,
              top: 1.5,
              bottom: 1.5,
              item: 4,
              line: 4,
            },
          }),

          mask: {
            padding: 0.5,
          },
        },

        // slider: {
        //   track: this.rexUI.add.roundRectangle(0, 0, 2.5, 10, 2.5, 0xe5e5e5),
        //   thumb: this.rexUI.add.roundRectangle(0, 0, 2.5, 60, 2.5, 0xc5002d),
        // },
        scroller: {
          threshold: 10,
          slidingDeceleration: 5000,
          backDeceleration: 2000,
          pointerOutRelease: true,
        },
        mouseWheelScroller: {
          focus: false,
          speed: 0.7,
        },

        space: {
          left: 10,
          right: 10,
          top: 5,
          bottom: 5,

          panel: 10,
        },
      })
      .layout();

    let tempRandomReplays = parsedBody
      .sort(() => 0.5 - Math.random())
      .slice(0, 30);

    // console.log(tempRandomReplays);
    this.updatePanel(this.playersList, tempRandomReplays);
    this.playersList.setDepth(11);

    let selectedGhosts = tempRandomReplays.map((el) => {
      return {
        ...JSON.parse(el.json),
        score: el.score,
      };
    });
    // console.log(selectedGhosts);

    this.gameSc.setLvlSeed(seed);
    this.gameSc.setGhosts(selectedGhosts);

    this.installGameControls();

    this.isReplaysLoaded = true;

    document.querySelector('.dummy-input').oninput = (e) => {
      if (e.target.value.slice(-1) === ' ') {
        this.scene.start('sceneTwo');
        document.querySelector('.dummy-input').value = '';
        document.querySelector('.dummy-input').oninput = '';
      }
    };
  }

  getReplays(token, seed) {
    fetch(API_URL + '/replays', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-extension-jwt': token,
      }),
    })
      .then((resp) => resp.json())
      .then((parsedJson) => {
        // console.log(parsedJson);
        let parsedBody = {};
        parsedBody.replay = parsedJson.filter((el) => el.seed === seed);
        // parsedBody.replay = parsedJson;

        let replays = [];
        parsedBody.replay.forEach((replay) => {
          const sameNicknames = parsedBody.replay.filter(
            (e) => e.username == replay.username
          );
          const isNicknameExist = replays.filter(
            (e) => e.username == replay.username
          );
          if (sameNicknames.length > 0 && isNicknameExist.length != 0) {
            const shortName = uniqueNamesGenerator({
              dictionaries: [adjectives, animals, colors, names], // colors can be omitted here as not used
              length: 2,
              style: 0.5 - Math.random() > 0 ? 'capital' : 'lowerCase',
              separator: '',
            });
            replays.push({
              ...replay,
              username: shortName,
            });
          } else {
            replays.push(replay);
          }
        });
        parsedBody.replay = replays;
        // console.log(parsedJson, parsedBody);
        this.playersList = this.rexUI.add
          .scrollablePanel({
            x: 371 * 0.5,
            y: 430 * 0.5,
            width: 274,
            height: 242,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0xffffff),

            panel: {
              child: this.rexUI.add.fixWidthSizer({
                space: {
                  left: 1.5,
                  right: 1.5,
                  top: 1.5,
                  bottom: 1.5,
                  item: 4,
                  line: 4,
                },
              }),

              mask: {
                padding: 0.5,
              },
            },

            // slider: {
            //   track: this.rexUI.add.roundRectangle(0, 0, 2.5, 10, 2.5, 0xe5e5e5),
            //   thumb: this.rexUI.add.roundRectangle(0, 0, 2.5, 60, 2.5, 0xc5002d),
            // },
            scroller: {
              threshold: 10,
              slidingDeceleration: 5000,
              backDeceleration: 2000,
              pointerOutRelease: true,
            },
            mouseWheelScroller: {
              focus: false,
              speed: 0.7,
            },

            space: {
              left: 10,
              right: 10,
              top: 5,
              bottom: 5,

              panel: 10,
            },
          })
          .layout();

        let tempRandomReplays = parsedBody.replay
          .sort(() => 0.5 - Math.random())
          .slice(0, 30);

        // console.log(tempRandomReplays);
        this.updatePanel(this.playersList, tempRandomReplays);
        this.playersList.setDepth(11);

        let selectedGhosts = tempRandomReplays.map((el) => {
          return {
            ...JSON.parse(el.json),
            score: el.score,
          };
        });
        // console.log(selectedGhosts);

        this.gameSc.setLvlSeed(seed);
        this.gameSc.setGhosts(selectedGhosts);

        this.installGameControls();

        this.isReplaysLoaded = true;

        document.querySelector('.dummy-input').oninput = (e) => {
          if (e.target.value.slice(-1) === ' ') {
            this.scene.start('sceneTwo');
            document.querySelector('.dummy-input').value = '';
            document.querySelector('.dummy-input').oninput = '';
          }
        };
      });
  }

  setControl() {
    if (this.isReplaysLoaded) {
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
  }

  installGameControls() {
    this.buttonSpace = this.add
      .image(371 * 0.5, 430 * 0.9, this.assets.scene.space)
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('sceneTwo');
      });

    this.clickTap = this.add
      .image(371 * 0.5, 430 * 0.9, this.assets.scene.clickTap)
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('sceneTwo');
      });
    this.clickTapText = this.add
      .text(371 * 0.35, 430 * 0.86, 'Жми TAP!', {
        fontFamily: 'Cera Condensed Pro Bold',
        fontSize: '64px',
        color: '#000000',
      })
      .setScale(0.5);
  }

  updatePanel(panel, content) {
    var sizer = panel.getElement('panel');
    var scene = panel.scene;
    sizer.clear(true);
    // console.log(content);
    for (var li = 0, lcnt = content.length; li < lcnt; li++) {
      sizer.add(
        this.rexUI.add.label({
          width: 50,
          height: 5,
          // align: "left",
          text: scene.add
            .text(50, 50, li + 1 + '. ', {
              fontSize: '36px',
              color: '#000000',
              fontFamily: 'Cera Condensed Pro',
            })
            .setScale(0.5),
        })
      );
      sizer.add(
        this.rexUI.add.label({
          width: 150,
          height: 5,
          align: 'center',
          text: scene.add
            .text(0, 0, content[li].username, {
              fontSize: '36px',
              color: '#000000',
              fontFamily: 'Cera Condensed Pro',
            })
            .setScale(0.5),
        })
      );

      // making broken underlines

      if (li < lcnt - 1) {
        sizer.addNewLine();
      }
    }

    panel.layout();
    return panel;
  }

  getSeedNumber() {
    return Math.floor(Math.random() * 5);
  }

  create() {
    this.isReplaysLoaded = false;
    this.bg = this.add
      .image(371 * 0.5, 430 * 0.5, this.assets.scene.background.basket2)
      .setScale(0.5);
    this.lobby = this.add
      .image(371 * 0.5, 430 * 0.075, this.assets.scene.lobby)
      .setScale(0.5);
    this.close = this.add
      .image(371 * 0.95, 430 * 0.05, this.assets.scene.close)
      .setScale(0.5 * 2)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.scene.start('sceneOne'));

    let parsedBody = {
      replay: [],
    };

    this.loadingText = this.add
      .text(371 * 0.38, 430 * 0.45, 'Загрузка...', {
        fontSize: 56,
        fontFamily: 'Cera Condensed Pro',
        color: '#000000',
      })
      .setScale(0.5);

    setTimeout(() => {
      // console.log('request');
      this.pubSub = window.Twitch.ext.onAuthorized(
        ({ userId, channelId, token }) => {
          const seeds = ['globus', 'chicken', 'outsider', 'money', 'tongue'];
          let numSeed = this.getSeedNumber();
          let seed = seeds[numSeed];
          // console.log('seed: ', seed);
          // console.log(userId);
          // this.ifCantFetch(seed);

          this.getReplays(token, seed);
        }
      );
    }, Math.floor(Math.random() * 11 + 1) * 1000);
  }
  update() {
    this.setControl();
  }
}

