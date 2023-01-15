import toggleMenu from './components/burgerMenu.js';
import renderCase from './components/renderCase.js';
import getData from '../../../dataModel/index.js';

document.querySelector('.burger-menu').onclick = toggleMenu;

window.onload = async () => {
  const data = await getData();
  JSON.parse(data).cases.forEach((el) =>
    el.id == new URLSearchParams(window.location.search).get('id')
      ? renderCase(el)
      : ''
  );

  // JSON.parse(data).cases.forEach((el) => (el.id == 1 ? renderCase(el) : ''));
};

// window.onload = () => {
//   commonData.cases.forEach((el) => (el.id == 1 ? renderCase(el) : ''));
// };
