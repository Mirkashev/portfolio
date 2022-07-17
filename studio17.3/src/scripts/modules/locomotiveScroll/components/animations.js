const animations = (
  currEl
  // setFullScreen,
  // setNavBarStage,
  // setCompanyTextAnimation
) => {
  const nav = document.querySelector(".nav-top");
  // console.log(currEl);
  if (typeof currEl.firstS === "object") {
    nav.className = "nav-top";
  }
  if (typeof currEl.globalFix === "object") {
    nav.className = "nav-top black-nav";
  }
  if (typeof currEl.green_form === "object") {
    nav.className = "nav-top disabled";
  }
  // if (typeof currEl.company_text_animation === "object") {
  //   setCompanyTextAnimation("about-company-text animated");
  // }
};
export default animations;
