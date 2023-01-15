import toggleMenu from './components/burgerMenu.js';
import renderCases from './components/renderCases.js';
import selectData from './components/selectData.js';
import setActiveButton from './components/setButtonActive.js';

document.querySelector('.burger-menu').onclick = toggleMenu;

const caseSelections = Array.from(
  document.querySelector('.cases-select').children
);

caseSelections.forEach((element, index) => {
  if (index === 0) element.classList.add('case-type-active');
  element.onclick = setActiveButton;
});

(async function () {
  const data = await selectData();
  renderCases(data, 'все');
})();
