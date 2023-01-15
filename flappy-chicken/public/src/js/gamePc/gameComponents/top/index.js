export default class Top extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'top' });
    this.type = 'daily';
    this.assets = assets;

    this.isStreamer = false;
  }
  setType(type) {
    this.type = type;
    // console.log(type);
  }
  updatePanel(panel, content) {
    if (content == undefined) {
      content = [];
    }
    var sizer = panel.getElement('panel');
    var scene = panel.scene;
    sizer.clear(true);
    // console.log(content);
    sizer.add(
      this.rexUI.add.label({
        width: 180,
        height: 5,
        align: 'center',
        text: scene.add
          .text(50, 0, 'ИМЯ', {
            fontSize: '36px',
            color: '#000000',
            fontFamily: 'Cera Condensed Pro',
          })
          .setScale(0.5),
      })
    );
    sizer.add(
      this.rexUI.add.label({
        width: 200,
        height: 5,
        align: 'center',
        text: scene.add
          .text(
            50,
            0,
            this.type === 'daily' ? 'ТОП-1 ЗА ДЕНЬ' : 'РЕКОРД ТОП-1',
            {
              fontSize: '36px',
              color: '#000000',
              fontFamily: 'Cera Condensed Pro',
            }
          )
          .setScale(0.5),
      })
    );
    for (var li = 0, lcnt = content.length; li < lcnt; li++) {
      // console.log("content", content[li]);
      sizer.add(
        scene.add.image(0, 0, this.assets.scene.underline).setScale(0.95)
      );
      sizer.add(
        this.rexUI.add.label({
          width: 220,
          height: 5,
          text: scene.add
            .text(50, 0, li + 1 + '. ' + content[li].username, {
              fontSize: '36px',
              color: '#000000',
              fontFamily: 'Cera Condensed Pro',
            })
            .setScale(0.5),
        })
      );
      sizer.add(
        this.rexUI.add.label({
          width: 154,
          height: 5,
          align: 'center',
          text: scene.add
            .text(50, 0, content[li].count, {
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
  create() {
    const canvas = document.querySelector('canvas');

    if (window.innerWidth < 730) {
      canvas.classList.add('mobile-tops');
    } else {
      canvas.style.width = `508px`;
      canvas.style.height = `401px`;
      canvas.classList.add('pc-tops');
    }

    this.game.scale.resize(508, 401);

    const listener = (target, content, body) => {
      const parsedBody = JSON.parse(body);
      // console.log(body);
      if (parsedBody.message === 'top') {
        this.globalData =
          this.type === 'daily'
            ? parsedBody.payload.dailyTop
            : parsedBody.payload.totalTop;
        // console.log(this.globalData);
      } else {
        this.globalData = [];
      }
    };
    const listenerBroadcast = (target, content, body) => {
      this.isStreamer = true;
      const parsedBody = JSON.parse(body);
      // console.log(body);
      if (parsedBody.message === 'top') {
        this.topList = this.rexUI.add
          .scrollablePanel({
            x: 254,
            y: 219,
            width: 437,
            height: 266,

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

            slider: {
              track: this.rexUI.add.roundRectangle(
                0,
                0,
                2.5,
                10,
                2.5,
                0xe5e5e5
              ),
              thumb: this.rexUI.add.roundRectangle(
                0,
                0,
                2.5,
                60,
                2.5,
                0xc5002d
              ),
            },
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
        this.updatePanel(
          this.topList,
          this.type === 'daily'
            ? parsedBody.payload.dailyTop
            : parsedBody.payload.totalTop
        );
        this.topList.setDepth(11);
      } else {
        this.topList = this.rexUI.add
          .scrollablePanel({
            x: 254,
            y: 219,
            width: 437,
            height: 266,

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

            slider: {
              track: this.rexUI.add.roundRectangle(
                0,
                0,
                2.5,
                10,
                2.5,
                0xe5e5e5
              ),
              thumb: this.rexUI.add.roundRectangle(
                0,
                0,
                2.5,
                60,
                2.5,
                0xc5002d
              ),
            },
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
        this.updatePanel(this.topList, []);
        this.topList.setDepth(11);
      }
    };

    this.bg = this.add.image(
      508 * 0.5,
      401 * 0.5,
      this.assets.scene.background.basket3
    );
    this.header = this.add.text(
      204,
      10,
      this.type === 'daily' ? 'Daily TOP' : 'Total TOP',
      {
        fontSize: 32,
        fontFamily: 'Cera Condensed Pro Bold',
        color: '#ffffff',
      }
    );
    this.topBasket = this.add
      .image(508 * 0.5, 401 * 0.92, this.assets.scene.topBasket)
      .setScale(0.5)
      .setDepth(15);

    this.close = this.add
      .image(476, 24, this.assets.scene.close)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        window.Twitch.ext.unlisten('broadcast', listenerBroadcast);
        window.Twitch.ext.unlisten('global', listener);

        this.scene.start('sceneOne');
        document.querySelector('.keyboard-control').classList.remove('hidden');
      });

    this.loadingText = this.add
      .text(508 * 0.38, 401 * 0.5, 'Загрузка...', {
        fontSize: 64,
        fontFamily: 'Cera Condensed Pro',
        color: '#000000',
      })
      .setScale(0.5);

    window.Twitch.ext.listen('broadcast', listenerBroadcast);
    window.Twitch.ext.listen('global', listener);

    setTimeout(() => {
      if (!this.isStreamer) {
        this.topList = this.rexUI.add
          .scrollablePanel({
            x: 254,
            y: 219,
            width: 437,
            height: 266,

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

            slider: {
              track: this.rexUI.add.roundRectangle(
                0,
                0,
                2.5,
                10,
                2.5,
                0xe5e5e5
              ),
              thumb: this.rexUI.add.roundRectangle(
                0,
                0,
                2.5,
                60,
                2.5,
                0xc5002d
              ),
            },
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
        this.updatePanel(this.topList, this.globalData);
        this.topList.setDepth(11);
      }
    }, 8000);
  }
}

