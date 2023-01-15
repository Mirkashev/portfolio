import Phaser from 'phaser';

import Swiper, { Navigation, Pagination } from 'swiper';

import Authentication from './components/authentication/index.js';
import ChoseModel from './components/choseModel/index.js';
import Game from './components/game/index.js';
import GameOver from './components/gameOver/index.js';
import Menu from './components/menu/index.js';
import Preload from './components/preload/index.js';
import Top from './components/top/index.js';
import FakeMenu from './components/fakeMenu/index.js';
import Rules from './components/rules/index.js';

function setWidth() {
  if (window.innerWidth < 1280) {
    if (window.innerWidth < 720) {
      console.log(window.innerWidth, window.innerHeight);
      if (window.innerWidth < 520) {
        return window.innerWidth * 2;
      }
      return window.innerWidth * 1.7;
    }
    return document.getElementById('gameplaceTrue').offsetWidth * 1.85;
  } else return document.getElementById('gameplaceTrue').offsetWidth * 2.1;
}

function setHeight() {
  if (window.innerWidth < 1280) {
    if (window.innerWidth < 720) {
      if (window.innerWidth < 520) {
        return window.innerHeight * 0.85 * 2;
      }
      return window.innerHeight * 0.85 * 1.7;
    }
    return document.getElementById('gameplaceTrue').offsetHeight * 1.85;
  } else return document.getElementById('gameplaceTrue').offsetHeight * 2.1;
}

function renderWeek(data, i) {
  document.querySelector('.leaderboard__render-place').innerHTML = '';

  data[`week_${i}`].forEach((el) => {
    const div = document.createElement('div');

    div.className = 'leaderboard__el';

    div.innerHTML = `
      <div>
        <span></span>
        <span>${el.username}</span>
      </div>
      <span class="leaderboard__el__score">${el.score}<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.9999 7.8572C14.9999 11.8021 11.802 15.0001 7.85709 15.0001C3.9122 15.0001 0.714233 11.8021 0.714233 7.8572C0.714233 3.91231 3.9122 0.71434 7.85709 0.71434C11.802 0.71434 14.9999 3.91231 14.9999 7.8572Z" fill="url(#paint0_linear_182_179)"/>
        <path d="M14.9999 7.8572C14.9999 11.8021 11.802 15.0001 7.85709 15.0001C3.9122 15.0001 0.714233 11.8021 0.714233 7.8572C0.714233 3.91231 3.9122 0.71434 7.85709 0.71434C11.802 0.71434 14.9999 3.91231 14.9999 7.8572Z" fill="black" fill-opacity="0.2"/>
        <path d="M14.2857 7.14286C14.2857 11.0877 11.0877 14.2857 7.1428 14.2857C3.19791 14.2857 -6.10352e-05 11.0877 -6.10352e-05 7.14286C-6.10352e-05 3.19797 3.19791 0 7.1428 0C11.0877 0 14.2857 3.19797 14.2857 7.14286Z" fill="url(#paint1_linear_182_179)"/>
        <defs>
        <linearGradient id="paint0_linear_182_179" x1="8.05719" y1="15.5223" x2="7.47195" y2="-2.23213" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFCF53"/>
        <stop offset="0.3725" stop-color="#F8E790"/>
        <stop offset="1" stop-color="#FCFF7B"/>
        </linearGradient>
        <linearGradient id="paint1_linear_182_179" x1="7.3429" y1="14.808" x2="6.75766" y2="-2.94647" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFCF53"/>
        <stop offset="0.3725" stop-color="#F8E790"/>
        <stop offset="1" stop-color="#FCFF7B"/>
        </linearGradient>
        </defs>
        </svg>
        </span>
      `;

    document.querySelector('.leaderboard__render-place').append(div);
  });

  document
    .querySelectorAll('.leaderboard__select-week')
    .forEach((el, index) => {
      // console.log(index);
      index === i
        ? el.classList.add('selected-week')
        : el.classList.remove('selected-week');
    });
}

function setActiveButtons(data, realIndexContinue, mySwiper) {
  if (window.innerWidth < 720) {
    if (realIndexContinue > 9) {
      if (
        data[`week_${realIndexContinue + 1}`]?.length > 0 &&
        realIndexContinue < 11
      ) {
        document
          .querySelector('.next-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.next-slide')
          .classList.add('non-active-button');
      }
      if (data[`week_${realIndexContinue - 1}`]?.length > 0) {
        document
          .querySelector('.prev-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.prev-slide')
          .classList.add('non-active-button');
      }
    } else {
      if (data[`week_${mySwiper.realIndex + 1}`]?.length > 0) {
        document
          .querySelector('.next-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.next-slide')
          .classList.add('non-active-button');
      }

      if (data[`week_${mySwiper.realIndex - 1}`]?.length > 0) {
        document
          .querySelector('.prev-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.prev-slide')
          .classList.add('non-active-button');
      }
    }
  } else {
    if (realIndexContinue > 8) {
      if (
        data[`week_${realIndexContinue + 1}`]?.length > 0 &&
        realIndexContinue < 11
      ) {
        document
          .querySelector('.next-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.next-slide')
          .classList.add('non-active-button');
      }
      if (data[`week_${realIndexContinue - 1}`]?.length > 0) {
        document
          .querySelector('.prev-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.prev-slide')
          .classList.add('non-active-button');
      }
    } else {
      if (data[`week_${mySwiper.realIndex + 1}`]?.length > 0) {
        document
          .querySelector('.next-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.next-slide')
          .classList.add('non-active-button');
      }

      if (data[`week_${mySwiper.realIndex - 1}`]?.length > 0) {
        document
          .querySelector('.prev-slide')
          .classList.remove('non-active-button');
      } else {
        document
          .querySelector('.prev-slide')
          .classList.add('non-active-button');
      }
    }
  }
}

function setPaginationClickable(data) {
  if (window.innerWidth < 720) {
    document
      .querySelectorAll('.leaderbpard__pagination__indicator')[0]
      .classList.add('leaderbpard__pagination__indicator-clickable');

    if (data.week_3?.length > 0) {
      document
        .querySelectorAll('.leaderbpard__pagination__indicator')[1]
        .classList.add('leaderbpard__pagination__indicator-clickable');
      if (data.week_6?.length > 0) {
        document
          .querySelectorAll('.leaderbpard__pagination__indicator')[2]
          .classList.add('leaderbpard__pagination__indicator-clickable');
      }
      if (data.week_9?.length > 0) {
        document
          .querySelectorAll('.leaderbpard__pagination__indicator')[3]
          .classList.add('leaderbpard__pagination__indicator-clickable');
      }
    }
  } else {
    document
      .querySelectorAll('.leaderbpard__pagination__indicator')[0]
      .classList.add('leaderbpard__pagination__indicator-clickable');

    if (data.week_4?.length > 0) {
      document
        .querySelectorAll('.leaderbpard__pagination__indicator')[1]
        .classList.add('leaderbpard__pagination__indicator-clickable');
      if (data.week_8?.length > 0) {
        document
          .querySelectorAll('.leaderbpard__pagination__indicator')[2]
          .classList.add('leaderbpard__pagination__indicator-clickable');
      }
    }
  }
}

function setPaginationIndicator(mySwiper) {
  if (window.innerWidth < 720) {
    // console.log('mobile');
    document
      .querySelectorAll('.leaderbpard__pagination__indicator')
      .forEach((el, i) => {
        el.classList.remove('leaderbpard__pagination__indicator-active');
        if (i === 3 && mySwiper.realIndex > 8) {
          el.classList.add('leaderbpard__pagination__indicator-active');
        }

        if (i === 2 && mySwiper.realIndex > 5 && mySwiper.realIndex < 9) {
          el.classList.add('leaderbpard__pagination__indicator-active');
        }

        if (i === 1 && mySwiper.realIndex > 2 && mySwiper.realIndex < 6) {
          el.classList.add('leaderbpard__pagination__indicator-active');
        }

        if (i === 0 && mySwiper.realIndex <= 2) {
          el.classList.add('leaderbpard__pagination__indicator-active');
        }
      });
  } else {
    document
      .querySelectorAll('.leaderbpard__pagination__indicator')
      .forEach((el, i) => {
        el.classList.remove('leaderbpard__pagination__indicator-active');
        if (i === 2 && mySwiper.realIndex > 7) {
          el.classList.add('leaderbpard__pagination__indicator-active');
        }

        if (i === 1 && mySwiper.realIndex > 3 && mySwiper.realIndex < 8) {
          el.classList.add('leaderbpard__pagination__indicator-active');
        }

        if (i === 0 && mySwiper.realIndex <= 3) {
          el.classList.add('leaderbpard__pagination__indicator-active');
        }
      });
  }
}

function setSliderActions(data, mySwiper, realIndexContinue) {
  document.querySelector('.next-slide').onclick = () => {
    const slideIndex = mySwiper.realIndex + 1;
    // console.log(slideIndex, realIndexContinue);
    if (window.innerWidth < 720) {
      if (data[`week_${slideIndex}`]?.length > 0 && slideIndex < 10) {
        mySwiper.slideTo(slideIndex, 200, false);
        sessionStorage.setItem('leaderboardPage', slideIndex);
        renderWeek(data, slideIndex);
        setActiveButtons(data, realIndexContinue, mySwiper);
        setPaginationIndicator(mySwiper);
      }
      if (slideIndex > 9) {
        if (
          data[`week_${realIndexContinue}`]?.length > 0 &&
          realIndexContinue < 11
        ) {
          realIndexContinue += 1;

          sessionStorage.setItem('leaderboardPage', realIndexContinue);

          renderWeek(data, realIndexContinue);
          setActiveButtons(data, realIndexContinue, mySwiper);
          setPaginationIndicator(mySwiper);
        }
      }
    } else {
      if (data[`week_${slideIndex}`]?.length > 0 && slideIndex < 9) {
        mySwiper.slideTo(slideIndex, 200, false);
        sessionStorage.setItem('leaderboardPage', slideIndex);
        renderWeek(data, slideIndex);
        setActiveButtons(data, realIndexContinue, mySwiper);
        setPaginationIndicator(mySwiper);
      }

      if (slideIndex > 8) {
        if (
          data[`week_${realIndexContinue}`]?.length > 0 &&
          realIndexContinue < 11
        ) {
          realIndexContinue += 1;

          sessionStorage.setItem('leaderboardPage', realIndexContinue);

          renderWeek(data, realIndexContinue);
          setActiveButtons(data, realIndexContinue, mySwiper);
          setPaginationIndicator(mySwiper);
        }
      }
    }
  };

  document.querySelector('.prev-slide').onclick = () => {
    const slideIndex = mySwiper.realIndex - 1;
    console.log(slideIndex);

    if (window.innerWidth < 720) {
      if (realIndexContinue > 9) {
        console.log('real');
        realIndexContinue -= 1;
        sessionStorage.setItem('leaderboardPage', realIndexContinue);
        setActiveButtons(data, realIndexContinue, mySwiper);
        setPaginationIndicator(mySwiper);

        renderWeek(data, realIndexContinue);
      } else {
        if (slideIndex > -1) {
          mySwiper.slideTo(slideIndex, 200, false);
          sessionStorage.setItem('leaderboardPage', slideIndex);
          renderWeek(data, slideIndex);
          setActiveButtons(data, realIndexContinue, mySwiper);
          setPaginationIndicator(mySwiper);
        }
      }
    } else {
      if (realIndexContinue > 8) {
        console.log('real');
        realIndexContinue -= 1;
        sessionStorage.setItem('leaderboardPage', realIndexContinue);
        setActiveButtons(data, realIndexContinue, mySwiper);
        setPaginationIndicator(mySwiper);

        renderWeek(data, realIndexContinue);
      } else {
        if (slideIndex > -1) {
          mySwiper.slideTo(slideIndex, 200, false);
          sessionStorage.setItem('leaderboardPage', slideIndex);
          renderWeek(data, slideIndex);
          setActiveButtons(data, realIndexContinue, mySwiper);
          setPaginationIndicator(mySwiper);
        }
      }
    }
  };
}

async function query(response, realIndexContinue, mySwiper) {
  // запоминание страницы лидерборда
  const data = await response.json();

  // data = {};
  // // temp data for tests
  // for (let i = 0; i < 9; i += 1) {
  //   data[`week_${i}`] = [
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssssds16', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //     { username: 'ldoss2slssss', score: i },
  //     { username: 'ldoss2slssss', score: 6666 },
  //     { username: 'Vexzy', score: 676 },
  //   ];
  // }
  // console.log(data);

  setPaginationClickable(data);

  setPaginationIndicator(mySwiper);

  mySwiper.realIndex = JSON.parse(sessionStorage.getItem('leaderboardPage'));

  setActiveButtons(data, realIndexContinue, mySwiper);

  setSliderActions(data, mySwiper, realIndexContinue);

  renderWeek(data, JSON.parse(sessionStorage.getItem('leaderboardPage')));

  document.querySelectorAll('.leaderboard__select-week').forEach((el, i) => {
    if (data[`week_${i}`]?.length > 0) {
      el.classList.add('has-week');
      // el.onclick = () => {
      //   sessionStorage.setItem('leaderboardPage', i);
      //   renderWeek(data, i);
      //   if (mySwiper.realIndex < i) {
      //     mySwiper.slideTo(i, 200, false);
      //     realIndexContinue = 8;
      //   } else {
      //     mySwiper.slideTo(9, 200, false);
      //     realIndexContinue = i;
      //   }
      // };
    }
  });
}

const assets = {
  player: 'player',
  playerGirl: 'playerGirl',
  tiles: {
    disappearing: 'disappearing',
    destructive: 'destructive',
    regular: 'regular',
  },
  spring: 'spring',
  star: 'star',
  monsters: {
    shooting: 'shooting',
    moving: 'moving',
  },
  bullet: 'bullet',
  background: 'background',
  scenes: {
    logo: 'logo',
    play: 'play',
    scores: 'scores',
    login: 'login',
    signup: 'signup',
    bigPlay: 'bigPlay',
    close: 'close',
    choose: 'choose',
    gameOver: 'gameOver',
    scoreText: 'scoreText',
    rules: 'rules',
    byLogi: 'byLogi',
  },
  sound: 'sound',
  animations: {
    girl: 'girl-jumping',
    men: 'men-jumping',
  },
};
const gameOver = new GameOver(assets);
const gameScene = new Game(assets, gameOver);

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'gameplaceTrue',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: setWidth(),
    height: setHeight(),
  },
  render: {
    clearBeforeRender: true,
    // powerPreference: 'high-performance',
  },
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: {y: 360},
      fixedStep: false,
      // debug: true,
    },
  },
  fps: { forceSetTimeOut: true, target: 60 },
  audio: {
    disableWebAudio: false,
  },
  scene: [
    new Preload(assets, false),
    new Menu(assets),
    new Rules(assets),
    new Authentication(assets),
    new ChoseModel(assets, gameScene),
    new Top(assets),
    gameScene,
    gameOver,
  ],

  backgroundColor: 0xeeeeee,
};

const configMenu = {
  type: Phaser.AUTO,
  scale: {
    parent: 'gamespace',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width:
      window.innerWidth > 720
        ? document.getElementById('gamespace').offsetWidth * 2.5
        : window.innerWidth > 520
        ? document.getElementById('gamespace').offsetWidth * 2
        : document.getElementById('gamespace').offsetWidth * 2.5,
    height:
      window.innerWidth > 720
        ? document.getElementById('gamespace').offsetHeight * 2.5
        : window.innerWidth > 520
        ? document.getElementById('gamespace').offsetHeight * 2
        : document.getElementById('gamespace').offsetHeight * 2.5,
  },
  render: {
    clearBeforeRender: true,
    // powerPreference: 'high-performance',
  },
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: {y: 360},
      fixedStep: false,
      // debug: true,
    },
  },
  fps: { forceSetTimeOut: true, target: 60 },
  audio: {
    disableWebAudio: false,
  },
  scene: [new Preload(assets, true), new FakeMenu(assets)],

  backgroundColor: 0xeeeeee,
};

window.onload = () => {
  if (document.fonts.check('24px Futura PT')) {
    let check = false;

    new Phaser.Game(configMenu);

    const countriesArray = [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Åland Islands', code: 'AX' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'AndorrA', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
      { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Aruba', code: 'AW' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Bermuda', code: 'BM' },
      { name: 'Bhutan', code: 'BT' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' },
      { name: 'Botswana', code: 'BW' },
      { name: 'Bouvet Island', code: 'BV' },
      { name: 'Brazil', code: 'BR' },
      { name: 'British Indian Ocean Territory', code: 'IO' },
      { name: 'Brunei Darussalam', code: 'BN' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' },
      { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' },
      { name: 'Canada', code: 'CA' },
      { name: 'Cape Verde', code: 'CV' },
      { name: 'Cayman Islands', code: 'KY' },
      { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' },
      { name: 'Chile', code: 'CL' },
      { name: 'China', code: 'CN' },
      { name: 'Christmas Island', code: 'CX' },
      { name: 'Cocos (Keeling) Islands', code: 'CC' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Comoros', code: 'KM' },
      { name: 'Congo', code: 'CG' },
      { name: 'Congo, The Democratic Republic of the', code: 'CD' },
      { name: 'Cook Islands', code: 'CK' },
      { name: 'Costa Rica', code: 'CR' },
      { name: "Cote D'Ivoire", code: 'CI' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' },
      { name: 'Dominica', code: 'DM' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Egypt', code: 'EG' },
      { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' },
      { name: 'Eritrea', code: 'ER' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Falkland Islands (Malvinas)', code: 'FK' },
      { name: 'Faroe Islands', code: 'FO' },
      { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'French Guiana', code: 'GF' },
      { name: 'French Polynesia', code: 'PF' },
      { name: 'French Southern Territories', code: 'TF' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' },
      { name: 'Georgia', code: 'GE' },
      { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Gibraltar', code: 'GI' },
      { name: 'Greece', code: 'GR' },
      { name: 'Greenland', code: 'GL' },
      { name: 'Grenada', code: 'GD' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Guernsey', code: 'GG' },
      { name: 'Guinea', code: 'GN' },
      { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' },
      { name: 'Haiti', code: 'HT' },
      { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
      { name: 'Holy See (Vatican City State)', code: 'VA' },
      { name: 'Honduras', code: 'HN' },
      { name: 'Hong Kong', code: 'HK' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Iceland', code: 'IS' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iran, Islamic Republic Of', code: 'IR' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Isle of Man', code: 'IM' },
      { name: 'Israel', code: 'IL' },
      { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jersey', code: 'JE' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Kiribati', code: 'KI' },
      { name: "Korea, Democratic People'S Republic of", code: 'KP' },
      { name: 'Korea, Republic of', code: 'KR' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: "Lao People'S Democratic Republic", code: 'LA' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' },
      { name: 'Libyan Arab Jamahiriya', code: 'LY' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxembourg', code: 'LU' },
      { name: 'Macao', code: 'MO' },
      { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
      { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' },
      { name: 'Malta', code: 'MT' },
      { name: 'Marshall Islands', code: 'MH' },
      { name: 'Martinique', code: 'MQ' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Mauritius', code: 'MU' },
      { name: 'Mayotte', code: 'YT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia, Federated States of', code: 'FM' },
      { name: 'Moldova, Republic of', code: 'MD' },
      { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Montserrat', code: 'MS' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' },
      { name: 'Nepal', code: 'NP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Netherlands Antilles', code: 'AN' },
      { name: 'New Caledonia', code: 'NC' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Nicaragua', code: 'NI' },
      { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Niue', code: 'NU' },
      { name: 'Norfolk Island', code: 'NF' },
      { name: 'Northern Mariana Islands', code: 'MP' },
      { name: 'Norway', code: 'NO' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' },
      { name: 'Palestinian Territory, Occupied', code: 'PS' },
      { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Pitcairn', code: 'PN' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Puerto Rico', code: 'PR' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Reunion', code: 'RE' },
      { name: 'Romania', code: 'RO' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'RWANDA', code: 'RW' },
      { name: 'Saint Helena', code: 'SH' },
      { name: 'Saint Kitts and Nevis', code: 'KN' },
      { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Pierre and Miquelon', code: 'PM' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' },
      { name: 'Samoa', code: 'WS' },
      { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Serbia and Montenegro', code: 'CS' },
      { name: 'Seychelles', code: 'SC' },
      { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' },
      { name: 'Somalia', code: 'SO' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Suriname', code: 'SR' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Syrian Arab Republic', code: 'SY' },
      { name: 'Taiwan, Province of China', code: 'TW' },
      { name: 'Tajikistan', code: 'TJ' },
      { name: 'Tanzania, United Republic of', code: 'TZ' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'Togo', code: 'TG' },
      { name: 'Tokelau', code: 'TK' },
      { name: 'Tonga', code: 'TO' },
      { name: 'Trinidad and Tobago', code: 'TT' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' },
      { name: 'Turkmenistan', code: 'TM' },
      { name: 'Turks and Caicos Islands', code: 'TC' },
      { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
      { name: 'United States Minor Outlying Islands', code: 'UM' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vanuatu', code: 'VU' },
      { name: 'Venezuela', code: 'VE' },
      { name: 'Viet Nam', code: 'VN' },
      { name: 'Virgin Islands, British', code: 'VG' },
      { name: 'Virgin Islands, U.S.', code: 'VI' },
      { name: 'Wallis and Futuna', code: 'WF' },
      { name: 'Western Sahara', code: 'EH' },
      { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' },
      { name: 'Zimbabwe', code: 'ZW' },
    ];

    countriesArray.map((el) => {
      const optionDOM = document.createElement('option');
      optionDOM.id = el.code;
      optionDOM.value = el.name;
      document.getElementById('character').append(optionDOM);
    });

    let realIndexContinue = window.innerWidth < 720 ? 9 : 8;

    const mySwiper = new Swiper('.mySwiper', {
      slidesPerView: window.innerWidth < 720 ? 3 : 4,
      spaceBetween: 8,
      allowTouchMove: false,
    });

    fetch(`https://doodle.theclownteam.ru/api/api/scores`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      async (response) => await query(response, realIndexContinue, mySwiper)
    );

    sessionStorage.setItem('leaderboardPage', 0);

    setInterval(() => {
      if (!document.hidden) {
        fetch(`https://doodle.theclownteam.ru/api/api/scores`, {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(
          async (response) => await query(response, realIndexContinue, mySwiper)
        );
      }
    }, 15000);

    // if safari $('..leaderboard__render-place__wrapper').style = "overflow:scroll;" .leaderboard__render-place => overflow-hidden

    if (window.innerWidth < 1280) {
      document.querySelector('.true-game__wrapper').style = `margin-top:${
        (window.innerHeight - window.innerHeight * 0.8) / 2
      }px;`;
    }

    document.querySelector('.game__set-full-screen').onclick = () => {
      if (!check) {
        check = true;
        new Phaser.Game(config);
      }

      document.querySelector('body').classList.add('full-screen-active');

      document.querySelector('.true-game').classList.add('game-is-active');
      document.querySelector('body').scrollTop = 0;
      document.querySelector('.gamespace').style = 'opacity:0';
    };

    document.querySelector('.true-game__backbg').onclick = () => {
      document.querySelector('body').classList.remove('full-screen-active');

      document.querySelector('.true-game').classList.remove('game-is-active');
      document.querySelector('.gamespace').style = 'opacity:1';
    };
  }
};
