export default function animation() {
  let check = false;

  // console.log(document.querySelectorAll('.regulation-card'));

  document.querySelectorAll('.regulation-card').forEach((el, index) => {
    // console.log(scrollY);
    if (
      window.innerHeight / (window.innerWidth < 521 ? 3.5 : 2) >
        el.getBoundingClientRect().top &&
      index !== 0
    ) {
      el.classList.add('animated');
    }
  });

  document.querySelectorAll('.regulation-card').forEach((el, index) => {
    check = false;
    if (el.classList.contains('animated')) {
      check = true;
    }
  });

  if (check) window.removeEventListener('scroll', animation);
}
