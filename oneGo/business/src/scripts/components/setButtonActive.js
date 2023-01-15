import renderCases from './renderCases.js';
import data from './selectData.js';

export default function setActiveButton() {
  const caseSelections = Array.from(
    document.querySelector('.cases-select').children
  );
  caseSelections.forEach((el) => el.classList.remove('case-type-active'));
  this.classList.add('case-type-active');
  // console.log(this.innerText);
  renderCases(data, this.innerText);
}
