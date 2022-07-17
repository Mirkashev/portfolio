const quizLocomotive = (
  currEl,
  isMobile,
  firstLott,
  secondLott,
  thirdLott,
  fourthLott
) => {
  let mobileSense = 0;
  let firstFrameStartPosition = 0.23;
  let secondFrameStartPosition = 0.25;
  if (isMobile) {
    mobileSense = 0.017;
    firstFrameStartPosition = 0.31;
    secondFrameStartPosition = 0.33;
  }
  if (typeof currEl.quiz === "object") {
    const frames = document.querySelectorAll(".frame");
    const quizProgress = currEl.quiz.progress;
    const progressBars = document.querySelectorAll(".progress-bar-children");
    let progressBarScale = "";
    if (quizProgress < firstFrameStartPosition + mobileSense) {
      frames[0].classList = "frame active";
      if (isMobile) {
        if (quizProgress > 0.16) {
          //   setAnimationStatus(false);
          firstLott.play();
          progressBarScale = `scale3d(${-12 * (0.16 - quizProgress)}, 1, 1)`;
          frames[0].classList = "frame active visuals_active";
          progressBars[0].style.transform = progressBarScale;
        } else {
          frames[0].classList = "frame active";
          //   setAnimationStatus(true);
          firstLott.stop();
        }
      } else {
        if (quizProgress > 0.01) {
          progressBarScale = `scale3d(1, ${-9.5 * (0.02 - quizProgress)}, 1)`;
          frames[0].classList = "frame active visuals_active";
          progressBars[0].style.transform = progressBarScale;
          //   setAnimationStatus(false);
          firstLott.play();
        } else {
          frames[0].classList = "frame active";
          //   setAnimationStatus(true);
          firstLott.stop();
        }
      }
    } else {
      frames[0].classList = "frame";
      //   setAnimationStatus(true);
      firstLott.stop();
    }
    if (
      quizProgress > secondFrameStartPosition &&
      quizProgress < 0.48 + mobileSense
    ) {
      frames[1].classList = "frame active visuals_active";
      progressBarScale = `scale3d(1, ${-9.5 * (0.25 - quizProgress)}, 1)`;
      if (isMobile) {
        progressBarScale = `scale3d(${-12 * (0.33 - quizProgress)}, 1, 1)`;
      }
      progressBars[1].style.transform = progressBarScale;
      //   setAnimationStatus1(false);
      secondLott.play();
    } else {
      frames[1].classList = "frame";
      //   setAnimationStatus1(true);
      secondLott.stop();
    }
    if (quizProgress > 0.5 && quizProgress < 0.73 + mobileSense) {
      frames[2].classList = "frame active visuals_active";
      progressBarScale = `scale3d(1, ${-9.5 * (0.5 - quizProgress)}, 1)`;
      if (isMobile) {
        progressBarScale = `scale3d(${8.2 * (0.5 - quizProgress)}, 1, 1)`;
      }
      progressBars[2].style.transform = progressBarScale;
      //   setAnimationStatus2(false);
      thirdLott.play();
    } else {
      frames[2].classList = "frame";
      //   setAnimationStatus2(true);
      thirdLott.stop();
    }
    if (quizProgress > 0.75) {
      frames[3].classList = "frame active visuals_active";
      progressBarScale = `scale3d(1, ${-9.5 * (0.75 - quizProgress)}, 1)`;
      if (isMobile) {
        progressBarScale = `scale3d(${-15 * (0.75 - quizProgress)}, 1, 1)`;
      }
      progressBars[3].style.transform = progressBarScale;
      //   setAnimationStatus3(false);
      fourthLott.play();
    } else {
      frames[3].classList = "frame";
      //   setAnimationStatus3(true);
      fourthLott.stop();
    }
  }
};
export default quizLocomotive;
