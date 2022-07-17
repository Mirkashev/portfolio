export default function headerAnimation() {
  try {
    document.querySelector(".h1-not-animated").classList.add("h1-animated");
    document
      .querySelector(".h1-not-animated")
      .classList.remove("h1-not-animated");
    setTimeout(() => {
      document.querySelector(".h1-animated").classList.add("h1-animated-two");
    }, 1000);
  } catch (error) {}
}
