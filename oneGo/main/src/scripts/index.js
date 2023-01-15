import toggleMenu from './components/burgerMenu.js';
import Drum from './components/drum.js';
import animation from './components/animationCard.js';
import Swiper, { Navigation, Pagination } from 'swiper';
import renderComments from './components/renderComments.js';
import getData from '../../../dataModel/index.js';

document.querySelector('.main-header-img').src = './files/imgs/mobile-app.png';
document.querySelector('.main-header-img').onload = () => {
  document.querySelector('.main-header-img').classList.remove('hidden');
  document.querySelector('.main-header-img-loader').classList.add('hidden');
};

document.querySelector('.main-business-img').src = './files/imgs/business.png';
document.querySelector('.main-business-img').onload = () => {
  document.querySelector('.main-business-img').classList.remove('hidden');
  document.querySelector('.main-business-img-loader').classList.add('hidden');
};

new Swiper('.mySwiper', {
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

new Swiper('.secondMySwiper', {
  slidesPerView: 'auto',
});

const drum = new Drum([
  {
    value: 0,
    text: 'IOS',
  },
  {
    value: 2,
    text: 'BACKEND',
  },
  {
    value: 1,
    text: 'ANDROID',
  },
]);

drum.init();

window.addEventListener('resize', () => {
  if (window.innerWidth < 521) {
    document.getElementById('month2').remove();

    document.querySelector(
      '.date-selector2'
    ).innerHTML = `<div class="month" id="month2"></div>`;
  } else {
    document.getElementById('month1').remove();

    document.querySelector('.date-selector').innerHTML = `
      <div class="month" id="month1"></div>`;
  }

  drum.destroy();
  drum.init();
});

window.addEventListener('scroll', animation);

document.querySelector('.burger-menu').onclick = toggleMenu;

(async function () {
  const data = await getData();
  renderComments(JSON.parse(data).comments.filter((el) => el.text.length > 0));
})();
