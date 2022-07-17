const paralaxLocomotive = (currEl, paralaxMultiplier) => {
  if (typeof currEl.paralaxLocomotiveLogo === "object") {
    let vectorTranslate = currEl.paralaxLocomotiveLogo.progress;
    // console.log(currEl['paralaxLocomotiveLogo'].progress)
    currEl.paralaxLocomotiveLogo.el.children[0].children[0].style.transform = `translate3d(0px, ${
      vectorTranslate * 130 * -1 * paralaxMultiplier
    }px, 0px)`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[0].style.opacity = `${
      1 - vectorTranslate * 1.25
    }`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[1].style.transform = `translate3d(0px, ${
      vectorTranslate * 75 * -1 * paralaxMultiplier
    }px, 0px)`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[1].style.opacity = `${
      1 - vectorTranslate * 1.25
    }`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[2].style.transform = `translate3d(0px, ${
      vectorTranslate * 50 * 1 * paralaxMultiplier
    }px, 0px)`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[2].style.opacity = `${
      1 - vectorTranslate * 1.25
    }`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[3].style.transform = `translate3d(0px, ${
      vectorTranslate * 110 * 1 * paralaxMultiplier
    }px, 0px)`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[3].style.opacity = `${
      1 - vectorTranslate * 1.25
    }`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[4].style.transform = `translate3d(0px, ${
      vectorTranslate * 220 * 1 * paralaxMultiplier
    }px, 0px)`;
    currEl.paralaxLocomotiveLogo.el.children[0].children[4].style.opacity = `${
      1 - vectorTranslate * 1.25
    }`;
  }
};
export default paralaxLocomotive;
