import toggleMenu from './components/burgerMenu.js';
import renderCase from './components/renderCase.js';
import getData from '../../../dataModel/index.js';

document.querySelector('.business-header-img').src =
  '../files/imgs/business.png';
document.querySelector('.business-header-img').onload = () => {
  document.querySelector('.business-header-img').classList.remove('hidden');
  document.querySelector('.business-header-img-loader').classList.add('hidden');
};

document.querySelector('.burger-menu').onclick = toggleMenu;

window.onload = async () => {
  const data = await getData();
  JSON.parse(data).cases.forEach((el) =>
    el.id == new URLSearchParams(window.location.search).get('id')
      ? renderCase(el)
      : ''
  );
};

// window.onload = () => {
//   commonData.cases.forEach((el) => (el.id == 1 ? renderCase(el) : ''));
// };
