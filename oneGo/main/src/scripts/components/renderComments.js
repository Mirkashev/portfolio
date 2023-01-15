export default function renderComments(data) {
  console.log(data);
  const renderPlace = document.querySelector('.main-comments');
  renderPlace.innerHTML = '';

  data.forEach((element) => {
    const div = document.createElement('div');

    div.className = 'swiper-slide';
    div.innerHTML = `
    <img
      class="slide-img"
      src="${element.url}"
      alt="photo"
    />
    <span class="slide-text">${element.text}</span>
    <span class="slide-name">${element.name}</span>
    `;
    renderPlace.append(div);
  });
}
