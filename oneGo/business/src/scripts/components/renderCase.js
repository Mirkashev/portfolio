export default function renderCase(caseData) {
  document.querySelector(
    '.case-detail__nav__header'
  ).innerHTML = `главная / кейсы / ${caseData.title}`;
  document.querySelector('.case-detail__nav__date').innerHTML = new Date(
    Date.parse(caseData.date)
  ).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  document.querySelector('.case-detail__header').innerHTML = caseData.title;
  document.querySelector('.case-detail__img').src = caseData.img;
  document.querySelector('.case-detail__main-technology').innerHTML =
    caseData.type.join(', ');
  document.querySelector('.case-detail__dev-time__value').innerHTML =
    caseData.devTime;

  document.querySelector('.case-detail__task__text').innerHTML = caseData.task;
  document.querySelector('.case-detail__our-invest__text').innerHTML =
    caseData.invest;

  document.querySelector('.case-detail__technologies__list').innerHTML =
    caseData.technologies;
  document.querySelector('.case-detail__technologies__list-mobile').innerHTML =
    caseData.technologies;
  document.querySelector('.case-detail__technologies__img').src =
    caseData.technologiesImg;
  document.querySelector('.case-detail__technologies__img-mobile').src =
    caseData.technologiesImgMobile;

  document.querySelector('.case-detail__approaches__list').innerHTML =
    caseData.approaches;
  document.querySelector('.case-detail__approaches__list-mobile').innerHTML =
    caseData.approaches;
  document.querySelector('.case-detail__approaches__img').src =
    caseData.approachesImg;

  document.querySelector('.case-detail__approaches__img-mobile').innerHTML = '';

  caseData.approaches.split(',').forEach((element) => {
    const div = document.createElement('div');
    div.className = 'case-detail__approaches__img-mobile__element';
    div.innerHTML = element;

    document.querySelector('.case-detail__approaches__img-mobile').append(div);
  });

  document.querySelector('.case-detail__comment__img').src =
    caseData.commentImg;
  document.querySelector('.case-detail__comment__text').innerHTML =
    caseData.comment;
  document.querySelector('.case-detail__comment__user').innerHTML =
    caseData.commentName;

  if (caseData.comment.length < 1) {
    document.querySelector('.case-detail__comment').style = 'display:none';
  }
}
