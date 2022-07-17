import LocomotiveScroll from "locomotive-scroll";
import headerAnimation from "./components/headerAnimation.js";
import quizLocomotive from "./components/quiz.js";
import createLottie from "../lottie/index.js";
import paralaxLocomotive from "./components/paralax.js";
import sliderLocomotive from "./components/slider.js";
import animations from "./components/animations.js";

export default function startLoco(startY) {
  console.log("loco-init", startY);

  const isMobile = mobileAndTabletCheck();
  let paralaxMultiplier = 1;
  if (isMobile) {
    if (window.screen.width > 500) {
      paralaxMultiplier = 0.75;
    } else {
      paralaxMultiplier = 0.25;
    }
    // takeDeviceHeight(window.innerHeight);
    // console.log(paralaxMultiplier);
  }
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    resetNativeScroll: false,
    multiplier: 2,
    touchMultiplier: 1,
    initPosition: startY === undefined ? { x: 0, y: 0 } : { x: 0, y: startY },
    repeat: false,
    mobile: {
      smooth: false,
      breakpoint: 0,
    },
    tablet: {
      smooth: false,
      breakpoint: 0,
    },
  });
  // init lotties
  const firstLott = createLottie(
    document.querySelector(".first-lottie-container"),
    "./files/lotties/first-lottie.json"
  );
  const secondLott = createLottie(
    document.querySelector(".second-lottie-container"),
    "./files/lotties/second-lottie.json"
  );
  const thirdLott = createLottie(
    document.querySelector(".third-lottie-container"),
    "./files/lotties/third-lottie.json"
  );
  const fourthLott = createLottie(
    document.querySelector(".fourth-lottie-container"),
    "./files/lotties/fourth-lottie.json"
  );

  scroll.on("call", (call) => {
    if (call === "h1_animation") {
      headerAnimation();
    }
    // if (call === "green_form") {
    //   setFullScreen("gs-wrap form-full-screen");
    // }
  });
  scroll.on("scroll", (args) => {
    const currEl = args.currentElements;

    // console.log(args);
    //animations
    animations(
      currEl
      // setFullScreen,
      // setNavBarStage,
      // setCompanyTextAnimation
    );
    //paralax
    paralaxLocomotive(currEl, paralaxMultiplier);
    //fake quiz
    quizLocomotive(
      currEl,
      isMobile,
      firstLott,
      secondLott,
      thirdLott,
      fourthLott
    );
    // //slider
    sliderLocomotive(currEl, isMobile);
  });

  return scroll;
}
