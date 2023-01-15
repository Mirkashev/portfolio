export default function renderCases(casesList, type) {
  const renderPlace = document.querySelector('.cases-list');
  renderPlace.innerHTML = '';

  casesList.forEach((element) => {
    if (element.type.includes(type) || type === 'все') {
      const caseDiv = document.createElement('div');
      const caseImg = document.createElement('div');
      const caseInfo = document.createElement('div');
      const spinner = document.createElement('div');
      const img = document.createElement('img');

      caseDiv.className = 'case';
      caseDiv.onclick = () =>
        (location.href = `../caseDetail?id=${element.id}`);

      caseImg.className = 'case-img';

      spinner.className = 'loader';
      spinner.innerHTML = `
      <div class="spin"></div>
      <div class="bounce"></div>
    `;

      img.src = element.img;
      img.className = 'hidden';
      img.onload = () => {
        spinner.classList.add('hidden');
        img.className = '';
      };

      caseImg.append(spinner, img);

      caseInfo.className = 'case-info';

      caseInfo.innerHTML = `
        <div class="case-info__flex-group">
          <span class="case-info__name">${element.title}</span>
          <span class="case-info__date">${element.date}</span>
        </div>
        <img src='../files/imgs/next-slide.png' alt="go" />
      `;

      caseDiv.append(caseImg, caseInfo);

      renderPlace.append(caseDiv);
    }
  });
}
