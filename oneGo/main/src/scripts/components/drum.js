class IosSelector {
  constructor(options) {
    let defaults = {
      el: '', // dom
      type: 'infinite',
      count: 20,
      sensitivity: 0.8,
      source: [],
      value: null,
      onChange: null,
      elMargins: 4.4,
    };
    this.easing = {
      easeOutCubic: function (pos) {
        return Math.pow(pos - 1, 3) + 1;
      },
      easeOutQuart: function (pos) {
        return -(Math.pow(pos - 1, 4) - 1);
      },
    };

    this.options = Object.assign({}, defaults, options);
    this.options.count = this.options.count - (this.options.count % 4);
    Object.assign(this, this.options);

    this.halfCount = this.options.count / 2;
    this.quarterCount = this.options.count / 4;
    this.a = this.options.sensitivity * 10;
    this.minV = Math.sqrt(1 / this.a);
    this.selected = this.source[0];
    this.scrollTemp = 0;
    this.startY = 0;
    this.isWheelActive = false;

    this.exceedA = 10;
    this.moveT = 0;
    this.moving = false;

    this.elems = {
      el: document.querySelector(this.options.el),
      circleList: null,
      circleItems: null, // list

      highlight: null,
      highlightList: null,
      highListItems: null, // list
    };
    this.elemsLis = {
      el:
        this.options.el === '#month1'
          ? document.querySelector('.drum')
          : document.querySelector('.drum-mob'),
    };

    this.events = {
      touchstart: null,
      touchmove: null,
      touchend: null,
      wheelmove: null,
      clickmove: null,
    };

    this.itemHeight =
      (this.elems.el.offsetHeight * this.options.elMargins) /
      this.options.count;
    this.itemAngle = 360 / this.options.count;
    this.radius = this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180);

    this.scroll = 0;
    this._init();
  }

  _init() {
    this._create(this.options.source);

    let touchData = {
      startY: 0,
      yArr: [],
      touchScroll: 0,
    };

    for (let eventName in this.events) {
      this.events[eventName] = ((eventName) => {
        return (e) => {
          if (
            this.elemsLis.el.contains(e.target) ||
            e.target === this.elemsLis.el
          ) {
            e.preventDefault();
            if (this.source.length) {
              this['_' + eventName](e, touchData);
            }
          }
        };
      })(eventName);
      // console.log(this.events);
    }
    // console.log(document.querySelector(".drum"));

    this.elemsLis.el.addEventListener('touchstart', this.events.touchstart);
    document.addEventListener('mousedown', this.events.touchstart);
    this.elemsLis.el.addEventListener('touchend', this.events.touchend);
    document.addEventListener('mouseup', this.events.touchend);
    this.elemsLis.el.addEventListener('mousewheel', this.events.wheelmove);

    if (this.source.length) {
      this.value = this.value !== null ? this.value : this.source[0].value;
      this.select(this.value);
    }
  }

  _clickmove(e, touchData) {
    // console.log('test', e);
  }

  _wheelmove(e, touchData) {
    if (window.innerWidth > window.innerHeight) {
      // console.log(this.elems.el.getBoundingClientRect().top);
      this.startY =
        this.elems.el.getBoundingClientRect().top +
        this.elems.el.getBoundingClientRect().height / 2;

      let fakeTouch =
        this.startY + this.elems.circleList.children[0].offsetHeight;

      if (e.deltaY > 0) {
        fakeTouch =
          this.startY + this.elems.circleList.children[0].offsetHeight;
        // console.log(
        //   'clicked',
        //   this.startY + this.elems.circleList.children[0].offsetHeight
        // );
      } else {
        fakeTouch =
          this.startY - this.elems.circleList.children[0].offsetHeight;
        // console.log(
        //   'clicked',
        //   this.startY - this.elems.circleList.children[0].offsetHeight
        // );
      }
      // v = 0;
      let wWidth = window.innerWidth;
      let wHeight = window.innerHeight;
      let startTime =
        new Date().getTime() -
        (820 * (wWidth / wHeight)) / (0.5 + wWidth / wHeight);
      // pc monitors

      if (wWidth > wHeight) {
        startTime =
          new Date().getTime() -
          (820 * (wWidth / wHeight)) / (2 + wWidth / wHeight);
        if (wWidth / wHeight > 2.1) {
          startTime =
            new Date().getTime() -
            (820 * (wWidth / wHeight)) / (2.5 + wWidth / wHeight);
        } else if (wWidth / wHeight > 1.7) {
          startTime =
            new Date().getTime() -
            (820 * (wWidth / wHeight)) / (2.2 + wWidth / wHeight);
        } else if (wWidth / wHeight < 1.4) {
          startTime =
            new Date().getTime() -
            (820 * (wWidth / wHeight)) / (1.7 + wWidth / wHeight);
        }
      } else {
        // console.log("mobile");
        if (wWidth / wHeight > 0.65) {
          startTime =
            new Date().getTime() -
            (820 * (wWidth / wHeight)) / (0.5 + wWidth / wHeight);
        } else if (wWidth / wHeight > 0.5) {
          startTime =
            new Date().getTime() -
            (820 * (wWidth / wHeight)) / (1 + wWidth / wHeight);
        } else if (wWidth / wHeight > 0.45) {
          startTime =
            new Date().getTime() -
            (820 * (wWidth / wHeight)) / (0.7 + wWidth / wHeight);
        }
      }
      let endTime = new Date().getTime();
      let startY = fakeTouch + fakeTouch * 0.05;
      if (fakeTouch < this.startY) {
        startY = fakeTouch - fakeTouch * 0.05;
      }
      let endY = this.startY;

      // console.log(
      //   'startTime ',
      //   startTime,
      //   '\nendTime ',
      //   endTime,
      //   '\nstartY ',
      //   startY,
      //   '\nendY ',
      //   endY
      // );
      let v = 0;

      v = (((startY - endY) / this.itemHeight) * 1000) / (endTime - startTime);
      let sign = v > 0 ? 1 : -1;

      v = Math.abs(v) > 30 ? 30 * sign : v;

      if (!this.isWheelActive) {
        this.scroll = this.scrollTemp;
        this._animateMoveByInitV(v);
        this.isWheelActive = true;
      }
    }
  }

  _touchstart(e, touchData) {
    // console.log('\ntouchscroll: ', touchData.touchScroll);

    this.elemsLis.el.addEventListener('touchmove', this.events.touchmove);
    document.addEventListener('mousemove', this.events.touchmove);

    let eventY = e.clientY || e.touches[0].clientY;
    touchData.startY = eventY;
    touchData.yArr = [[eventY, new Date().getTime()]];
    touchData.touchScroll = this.scroll;
    this._stop();
  }

  _touchmove(e, touchData) {
    // console.log('\ntouchscroll move: ', touchData.touchScroll);

    let eventY = e.clientY || e.touches[0].clientY;
    touchData.yArr.push([eventY, new Date().getTime()]);
    if (touchData.length > 5) {
      touchData.unshift();
    }

    let scrollAdd = (touchData.startY - eventY) / this.itemHeight;
    let moveToScroll = scrollAdd + this.scroll;

    if (this.type === 'normal') {
      if (moveToScroll < 0) {
        moveToScroll *= 0.3;
      } else if (moveToScroll > this.source.length) {
        moveToScroll =
          this.source.length + (moveToScroll - this.source.length) * 0.3;
      }
      // console.log(moveToScroll);
    } else {
      moveToScroll = this._normalizeScroll(moveToScroll);
    }

    touchData.touchScroll = this._moveTo(moveToScroll);
  }

  _touchend(e, touchData) {
    // console.log('touchend: ', e, '\ntouchdata: ', touchData, this.scroll);

    // console.log(e);
    this.elems.el.removeEventListener('touchmove', this.events.touchmove);
    document.removeEventListener('mousemove', this.events.touchmove);

    let v;

    if (touchData.yArr.length === 1) {
      this.startY =
        this.elems.el.getBoundingClientRect().top +
        this.elems.el.getBoundingClientRect().height / 2;
      // v = 0;
      // console.log('clicked', touchData.yArr[0]);
      let wWidth = window.innerWidth;
      let wHeight = window.innerHeight;
      let startTime =
        touchData.yArr[0][1] -
        (820 * (wWidth / wHeight)) / (0.5 + wWidth / wHeight);
      let startY = touchData.yArr[0][0] + touchData.yArr[0][0] * 0.07;
      if (touchData.yArr[0][0] < this.startY) {
        startY = touchData.yArr[0][0] - touchData.yArr[0][0] * 0.07;
      }
      // pc monitors

      if (wWidth > wHeight) {
        startTime =
          touchData.yArr[0][1] -
          (820 * (wWidth / wHeight)) / (2 + wWidth / wHeight);
        if (wWidth / wHeight > 2.1) {
          startTime =
            touchData.yArr[0][1] -
            (820 * (wWidth / wHeight)) / (2.5 + wWidth / wHeight);
        } else if (wWidth / wHeight > 1.7) {
          startTime =
            touchData.yArr[0][1] -
            (820 * (wWidth / wHeight)) / (2.2 + wWidth / wHeight);
        } else if (wWidth / wHeight < 1.4) {
          startTime =
            touchData.yArr[0][1] -
            (820 * (wWidth / wHeight)) / (1.7 + wWidth / wHeight);
        }
      } else {
        // console.log("mobile");
        if (wWidth / wHeight > 0.65) {
          startTime =
            touchData.yArr[0][1] -
            (820 * (wWidth / wHeight)) / (0.5 + wWidth / wHeight);
        } else if (wWidth / wHeight > 0.5) {
          startTime =
            touchData.yArr[0][1] -
            (820 * (wWidth / wHeight)) / (1 + wWidth / wHeight);
        } else if (wWidth / wHeight > 0.45) {
          startTime =
            touchData.yArr[0][1] -
            (820 * (wWidth / wHeight)) / (0.7 + wWidth / wHeight);
        }
      }
      let endTime = touchData.yArr[0][1];

      let endY = this.startY;

      // if (Math.abs(startY - endY) > this.startY * 0.3 || Math.abs(endY - startY) > this.startY * 0.3) {
      //   console.log(">100");
      //   startTime = touchData.yArr[0][1] - 400;
      //   // endY = ;
      //   // startY = touchData.yArr[0][0] + (50 / 450) * touchData.yArr[0][0];
      // }

      // console.log(
      //   'startTime ',
      //   startTime,
      //   '\nendTime ',
      //   endTime,
      //   '\nstartY ',
      //   startY,
      //   '\nendY ',
      //   endY
      // );

      v = (((startY - endY) / this.itemHeight) * 1000) / (endTime - startTime);
      let sign = v > 0 ? 1 : -1;

      v = Math.abs(v) > 30 ? 30 * sign : v;
      // touchData.touchScroll = touchData.touchScroll + 1;
      // this.scrollTemp = touchData.touchScroll + 1;
      // console.log("touchData.touchScroll", touchData.touchScroll, "\ntouch.scroll", this.scroll)
    } else {
      let startTime = touchData.yArr[touchData.yArr.length - 2][1];
      let endTime = touchData.yArr[touchData.yArr.length - 1][1];
      let startY = touchData.yArr[touchData.yArr.length - 2][0];
      let endY = touchData.yArr[touchData.yArr.length - 1][0];

      v = (((startY - endY) / this.itemHeight) * 1000) / (endTime - startTime);
      let sign = v > 0 ? 1 : -1;

      v = Math.abs(v) > 30 ? 30 * sign : v;
    }

    this.scroll = touchData.touchScroll;
    this._animateMoveByInitV(v);
  }
  _;

  _create(source) {
    if (!source.length) {
      return;
    }

    let template = `
            <div class="select-wrap">
              <ul class="select-options" style="transform: translate3d(0, 0, ${-this
                .radius}px) rotateX(0deg);">
                {{circleListHTML}}
                <!-- <li class="select-option">a0</li> -->
              </ul>
              <div class="highlight">
                <ul class="highlight-list">
                  <!-- <li class="highlight-item"></li> -->
                  {{highListHTML}}
                </ul>
              </div>
            </div>
          `;

    if (this.options.type === 'infinite') {
      let concatSource = [].concat(source);
      while (concatSource.length < this.halfCount) {
        concatSource = concatSource.concat(source);
      }
      source = concatSource;
    }
    this.source = source;
    let sourceLength = source.length;

    let circleListHTML = '';
    for (let i = 0; i < source.length; i++) {
      circleListHTML += `<li class="select-option"
                          style="
                            top: ${this.itemHeight * -0.5}px;
                            height: ${this.itemHeight}px;
                            line-height: ${this.itemHeight}px;
                            transform: rotateX(${
                              -this.itemAngle * i
                            }deg) translate3d(0, 0, ${this.radius}px);
                          "
                          data-index="${i}"
                          >${source[i].text}</li>`;
    }

    let highListHTML = '';
    for (let i = 0; i < source.length; i++) {
      highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                              ${source[i].text}
                            </li>`;
    }

    if (this.options.type === 'infinite') {
      for (let i = 0; i < this.quarterCount; i++) {
        circleListHTML =
          `<li class="select-option"
                            style="
                              top: ${this.itemHeight * -0.5}px;
                              height: ${this.itemHeight}px;
                              line-height: ${this.itemHeight}px;
                              transform: rotateX(${
                                this.itemAngle * (i + 1)
                              }deg) translate3d(0, 0, ${this.radius}px);
                            "
                            data-index="${-i - 1}"
                            >${source[sourceLength - i - 1].text}</li>` +
          circleListHTML;
        circleListHTML += `<li class="select-option"
                            style="
                              top: ${this.itemHeight * -0.5}px;
                              height: ${this.itemHeight}px;
                              line-height: ${this.itemHeight}px;
                              transform: rotateX(${
                                -this.itemAngle * (i + sourceLength)
                              }deg) translate3d(0, 0, ${this.radius}px);
                            "
                            data-index="${i + sourceLength}"
                            >${source[i].text}</li>`;
      }

      highListHTML =
        `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                                ${source[sourceLength - 1].text}
                            </li>` + highListHTML;
      highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">${source[0].text}</li>`;
    }

    this.elems.el.innerHTML = template
      .replace('{{circleListHTML}}', circleListHTML)
      .replace('{{highListHTML}}', highListHTML);
    this.elems.circleList = this.elems.el.querySelector('.select-options');
    this.elems.circleItems = this.elems.el.querySelectorAll('.select-option');

    this.elems.highlight = this.elems.el.querySelector('.highlight');
    this.elems.highlightList = this.elems.el.querySelector('.highlight-list');
    this.elems.highlightitems =
      this.elems.el.querySelectorAll('.highlight-item');

    if (this.type === 'infinite') {
      this.elems.highlightList.style.top = -this.itemHeight + 'px';
    }

    this.elems.highlight.style.height = this.itemHeight + 'px';
    this.elems.highlight.style.lineHeight = this.itemHeight + 'px';
  }

  _normalizeScroll(scroll) {
    let normalizedScroll = scroll;

    while (normalizedScroll < 0) {
      normalizedScroll += this.source.length;
    }
    normalizedScroll = normalizedScroll % this.source.length;
    return normalizedScroll;
  }

  _moveTo(scroll) {
    // console.log(scroll);
    if (this.type === 'infinite') {
      scroll = this._normalizeScroll(scroll);
    }
    this.elems.circleList.style.transform = `translate3d(0, 0, ${-this
      .radius}px) rotateX(${this.itemAngle * scroll}deg)`;
    // console.log(this.elems.circleList.style.transform);
    this.elems.highlightList.style.transform = `translate3d(0, ${
      -scroll * this.itemHeight
    }px, 0)`;

    [...this.elems.circleItems].forEach((itemElem) => {
      if (Math.abs(itemElem.dataset.index - scroll) > this.quarterCount) {
        itemElem.style.visibility = 'hidden';
      } else {
        itemElem.style.visibility = 'visible';
      }
    });

    return scroll;
  }

  async _animateMoveByInitV(initV) {
    // console.log(initV);

    let initScroll;
    let finalScroll;
    let finalV;

    let totalScrollLen;
    let a;
    let t;

    if (this.type === 'normal') {
      if (this.scroll < 0 || this.scroll > this.source.length - 1) {
        a = this.exceedA;
        initScroll = this.scroll;
        finalScroll = this.scroll < 0 ? 0 : this.source.length - 1;
        totalScrollLen = initScroll - finalScroll;

        t = Math.sqrt(Math.abs(totalScrollLen / a));
        initV = a * t;
        initV = this.scroll > 0 ? -initV : initV;
        finalV = 0;
        await this._animateToScroll(initScroll, finalScroll, t);
      } else {
        initScroll = this.scroll;
        a = initV > 0 ? -this.a : this.a;
        t = Math.abs(initV / a);
        totalScrollLen = initV * t + (a * t * t) / 2;
        finalScroll = Math.round(this.scroll + totalScrollLen);
        finalScroll =
          finalScroll < 0
            ? 0
            : finalScroll > this.source.length - 1
            ? this.source.length - 1
            : finalScroll;

        totalScrollLen = finalScroll - initScroll;
        t = Math.sqrt(Math.abs(totalScrollLen / a));
        await this._animateToScroll(
          this.scroll,
          finalScroll,
          t,
          'easeOutQuart'
        );
      }
    } else {
      initScroll = this.scroll;

      a = initV > 0 ? -this.a : this.a;
      t = Math.abs(initV / a);
      totalScrollLen = initV * t + (a * t * t) / 2;
      finalScroll = Math.round(this.scroll + totalScrollLen);
      await this._animateToScroll(this.scroll, finalScroll, t, 'easeOutQuart');
    }

    // await this._animateToScroll(this.scroll, finalScroll, initV, 0);

    this._selectByScroll(this.scroll);
  }

  _animateToScroll(initScroll, finalScroll, t, easingName = 'easeOutQuart') {
    if (initScroll === finalScroll || t === 0) {
      this._moveTo(initScroll);
      return;
    }

    let start = new Date().getTime() / 1000;
    let pass = 0;
    let totalScrollLen = finalScroll - initScroll;

    // console.log(initScroll, finalScroll, initV, finalV, a);
    return new Promise((resolve, reject) => {
      this.moving = true;
      let tick = () => {
        pass = new Date().getTime() / 1000 - start;

        if (pass < t) {
          this.scroll = this._moveTo(
            initScroll + this.easing[easingName](pass / t) * totalScrollLen
          );
          this.moveT = requestAnimationFrame(tick);
        } else {
          resolve();
          this._stop();
          this.scroll = this._moveTo(initScroll + totalScrollLen);
        }
      };
      tick();
    });
  }

  _stop() {
    this.moving = false;
    cancelAnimationFrame(this.moveT);
  }

  _selectByScroll(scroll) {
    // console.log(scroll);
    // touchData.touchScroll =
    this.scrollTemp = scroll;
    scroll = this._normalizeScroll(scroll) | 0;
    if (scroll > this.source.length - 1) {
      scroll = this.source.length - 1;
      this._moveTo(scroll);
    }
    this._moveTo(scroll);
    this.scroll = scroll;
    this.selected = this.source[scroll];
    this.value = this.selected.value;
    this.onChange && this.onChange(this.selected);
    this.isWheelActive = false;
  }

  updateSource(source) {
    this._create(source);

    if (!this.moving) {
      this._selectByScroll(this.scroll);
    }
  }

  select(value) {
    for (let i = 0; i < this.source.length; i++) {
      if (this.source[i].value === value) {
        window.cancelAnimationFrame(this.moveT);
        // this.scroll = this._moveTo(i);
        let initScroll = this._normalizeScroll(this.scroll);
        let finalScroll = i;
        let t = Math.sqrt(Math.abs((finalScroll - initScroll) / this.a));
        this._animateToScroll(initScroll, finalScroll, t);
        setTimeout(() => this._selectByScroll(i));
        return;
      }
    }
    throw new Error(
      `can not select value: ${value}, ${value} match nothing in current source`
    );
  }

  destroy() {
    this._stop();

    document.removeEventListener('mousedown', this.events['touchstart']);
    document.removeEventListener('mousemove', this.events['touchmove']);
    document.removeEventListener('mouseup', this.events['touchend']);
    document.removeEventListener('touchstart', this.events['touchstart']);
    document.removeEventListener('touchmove', this.events['touchmove']);
    document.removeEventListener('touchend', this.events['touchend']);

    this.elemsLis.el.removeEventListener(
      'mousewheel',
      this.events['wheelmove']
    );

    this.elemsLis.el.removeEventListener('touchend', this.events['touchend']);

    this.events = {
      touchstart: null,
      touchmove: null,
      touchend: null,
    };
    this.elems.el.innerHTML = '';
    this.elems = null;
  }
}

export default class Drum {
  constructor(stackSource) {
    this.stackSource = stackSource;
  }

  init() {
    this.stackSelector = new IosSelector({
      el: window.innerWidth < 521 ? '#month2' : '#month1',
      type: 'infinite',
      source: this.stackSource,
      count: 20,
      onChange: (selected) => {
        // currentMonth = selected.value;

        // console.log(stackSelector.value);
        if (selected.value === 0) {
          // console.log("ios");
          document.querySelector('.ios').classList.remove('hidden');
          document.querySelector('.android').classList.add('hidden');
          document.querySelector('.backend').classList.add('hidden');

          document.querySelector('.ios2').classList.remove('hidden');
          document.querySelector('.android2').classList.add('hidden');
          document.querySelector('.backend2').classList.add('hidden');
        } else if (selected.value === 1) {
          // console.log("android");

          document.querySelector('.ios').classList.add('hidden');
          document.querySelector('.android').classList.remove('hidden');
          document.querySelector('.backend').classList.add('hidden');

          document.querySelector('.ios2').classList.add('hidden');
          document.querySelector('.android2').classList.remove('hidden');
          document.querySelector('.backend2').classList.add('hidden');
        } else if (selected.value === 2) {
          // console.log("backend");

          document.querySelector('.ios').classList.add('hidden');
          document.querySelector('.android').classList.add('hidden');
          document.querySelector('.backend').classList.remove('hidden');

          document.querySelector('.ios2').classList.add('hidden');
          document.querySelector('.android2').classList.add('hidden');
          document.querySelector('.backend2').classList.remove('hidden');
        }
      },
      elMargins: window.innerWidth < 521 ? 8 : 4.4,
    });
  }

  destroy() {
    this.stackSelector.destroy();
    this.stackSelector = null;
  }
}
