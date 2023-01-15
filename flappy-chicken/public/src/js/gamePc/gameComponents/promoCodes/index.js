import API_URL from '../../../globals/index.js';

export default class PromoCodes extends Phaser.Scene {
  constructor(assets) {
    super({ key: 'promoCodes' });
    this.assets = assets;
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
        width: 350,
        height: 5,
        align: 'center',
        text: scene.add
          .text(
            50,
            0,
            'ТАК ДЕРЖАТЬ! ТВОЯ НАГРАДА - СКИДОЧНЫЕ ПРОМОКОДЫ НА ВКУСНУЮ КУРОЧКУ',
            {
              fontSize: '29px',
              color: '#000000',
              fontFamily: 'Cera Condensed Pro Medium',
            }
          )
          .setScale(0.5),
      })
    );
    sizer.add(
      this.rexUI.add.label({
        width: 350,
        height: 20,
        align: 'center',
        text: scene.add
          .text(
            0,
            0,
            'Промокод дает скидку 15% и распространяется только на заказы в мобильном приложении\nноминалом от 500 руб. Акция действительна с 11.07.22 до 31.11.22.',
            {
              fontSize: '25px',
              color: '#000000',
              fontFamily: 'Cera Condensed Pro Medium',
              align: 'center',
            }
          )
          .setScale(0.5),
      })
    );
    sizer.add(
      this.rexUI.add.label({
        width: 350,
        height: 10,
        align: 'center',
        text: scene.add
          .text(0, 0, ' ', {
            fontSize: '26px',
            color: '#000000',
            fontFamily: 'Cera Condensed Pro',
            align: 'center',
          })
          .setScale(0.5),
      })
    );
    for (var li = 0, lcnt = content.length; li < lcnt; li++) {
      if (li !== 0) {
        sizer.add(
          scene.add.image(0, 0, this.assets.scene.underline).setScale(0.95)
        );
      }
      sizer.add(
        this.rexUI.add.label({
          width: 220,
          height: 5,
          text: scene.add
            .text(50, 0, li + 1 + '.   ' + content[li], {
              fontSize: '36px',
              color: '#000000',
              fontFamily: 'Cera Condensed Pro Medium',
            })
            .setScale(0.5),
        })
      );
      // sizer.add(
      //   this.rexUI.add.label({
      //     width: 154,
      //     height: 5,
      //     align: "center",
      //     text: scene.add
      //       .text(50, 0, content[li].count, {
      //         fontSize: "36px",
      //         color: "#000000",
      //         fontFamily: "Cera Condensed Pro",
      //       })
      //       .setScale(0.5),
      //   })
      // );
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

    this.bg = this.add.image(
      508 * 0.5,
      401 * 0.5,
      this.assets.scene.background.basket3
    );
    this.header = this.add.text(154, 10, 'Мои Промокоды', {
      fontSize: 32,
      fontFamily: 'Cera Condensed Pro Bold',
      color: '#ffffff',
    });
    this.topBasket = this.add
      .image(508 * 0.5, 401 * 0.92, this.assets.scene.topBasket)
      .setScale(0.5)
      .setDepth(15);

    this.close = this.add
      .image(476, 24, this.assets.scene.close)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        document.querySelector('.keyboard-control').classList.remove('hidden');

        this.scene.start('sceneOne');
      });

    this.loadingText = this.add
      .text(508 * 0.38, 401 * 0.5, 'Загрузка...', {
        fontSize: 64,
        fontFamily: 'Cera Condensed Pro',
        color: '#000000',
      })
      .setScale(0.5);
    if (window.Twitch.ext.viewer.isLinked) {
      setTimeout(() => {
        window.Twitch.ext.onAuthorized(({ userId, channelId, token }) => {
          fetch(API_URL + '/promos', {
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
              this.topList = this.rexUI.add
                .scrollablePanel({
                  x: 254,
                  y: 219,
                  width: 437,
                  height: 266,

                  scrollMode: 0,

                  background: this.rexUI.add.roundRectangle(
                    0,
                    0,
                    2,
                    2,
                    10,
                    0xffffff
                  ),

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
                    right: 6,
                    top: 5,
                    bottom: 5,

                    panel: 10,
                  },
                })
                .layout();
              this.updatePanel(this.topList, parsedJson);
              this.topList.setDepth(11);
            });
        });
      }, Math.floor(Math.random() * 11 + 5) * 1000);
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
            track: this.rexUI.add.roundRectangle(0, 0, 2.5, 10, 2.5, 0xe5e5e5),
            thumb: this.rexUI.add.roundRectangle(0, 0, 2.5, 60, 2.5, 0xc5002d),
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
            right: 6,
            top: 5,
            bottom: 5,

            panel: 10,
          },
        })
        .layout();
      this.updatePanel(this.topList, []);
      this.topList.setDepth(11);
    }
  }
}

