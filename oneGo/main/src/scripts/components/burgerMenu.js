export default function toggleMenu() {
  document.querySelector("nav").classList.toggle("active");
  document.querySelector("body").classList.toggle("burger-is-active");
}
