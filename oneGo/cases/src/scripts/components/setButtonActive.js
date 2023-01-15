import renderCases from './renderCases.js';
import selectData from './selectData.js';

export default async function setActiveButton() {
  const caseSelections = Array.from(
    document.querySelector('.cases-select').children
  );
  caseSelections.forEach((el) => el.classList.remove('case-type-active'));
  this.classList.add('case-type-active');
  renderCases(await selectData(), this.innerText);
}
