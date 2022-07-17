export default function sliderLocomotive(currEl, isMobile) {
  let mobileSense = 0;
  let firstFrameStartPosition = 0.31;
  let secondFrameStartPosition = 0.33;
  if (isMobile) {
    mobileSense = 0.017;
    firstFrameStartPosition = 0.41;
    secondFrameStartPosition = 0.43;
  }
  if (typeof currEl.slider === "object") {
    const frames = document.querySelectorAll(".frame");
    const progressBars = document.querySelectorAll(".progress-bar-children");
    const progressBarsMobile = document.querySelectorAll(
      ".mobile-progress-bar-children"
    );
    const videoArr = document.querySelectorAll("video");
    const sliderProgress = currEl.slider.progress;
    // progressBars[0].attributes.style.value = "opacity: 0";
    let progressBarScale = "";
    if (sliderProgress < firstFrameStartPosition + mobileSense) {
      frames[4].classList = "frame active";
      videoArr[0].attributes.style.value = "opacity: 1";
      if (isMobile) {
        if (sliderProgress > 0.2) {
          progressBarScale = `scale3d(${(0.2 - sliderProgress) * 8.8}, 1, 1)`;
          frames[4].classList = "frame active visuals_active";
          progressBarsMobile[0].style.transform = progressBarScale;
          videoArr[0].play();
        } else {
          frames[4].classList = "frame active";
          videoArr[0].pause();
        }
      } else {
        if (sliderProgress > 0.01) {
          frames[4].classList = "frame active visuals_active";
          progressBarScale = `scale3d(1, ${(0.02 - sliderProgress) * -6.9}, 1)`;
          progressBars[4].style.transform = progressBarScale;
          videoArr[0].play();
        } else {
          frames[4].classList = "frame active";
          videoArr[0].pause();
        }
      }
    } else {
      frames[4].classList = "frame";
      videoArr[0].attributes.style.value = "opacity: 0";
      videoArr[0].pause();
    }
    if (
      sliderProgress > secondFrameStartPosition &&
      sliderProgress < 0.64 + mobileSense
    ) {
      frames[5].classList = "frame active visuals_active";
      progressBarScale = `scale3d(1, ${(0.33 - sliderProgress) * -6.8}, 1)`;
      if (isMobile)
        progressBarScale = `scale3d(${(0.43 - sliderProgress) * 8.8}, 1, 1)`;
      progressBarsMobile[1].style.transform = progressBarScale;
      videoArr[1].play();
    } else {
      frames[5].classList = "frame";
      videoArr[1].pause();
    }
    if (sliderProgress > 0.66) {
      frames[6].classList = "frame active visuals_active";
      progressBarScale = `scale3d(1, ${(0.66 - sliderProgress) * -6.8}, 1)`;
      if (isMobile)
        progressBarScale = `scale3d(${(0.66 - sliderProgress) * 8.8}, 1, 1)`;
      progressBarsMobile[2].style.transform = progressBarScale;
      videoArr[2].play();
    } else {
      frames[6].classList = "frame";
      videoArr[2].pause();
    }
  }
}
