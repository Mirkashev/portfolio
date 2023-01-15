import Lottie from "lottie-web";

export default function createLottie(container, lottiePath) {
  // console.log(animationData);
  const anim = Lottie.loadAnimation({
    container: container, // Required
    path: lottiePath, // Required
    renderer: "svg", // Required
    loop: false, // Optional
    autoplay: false, // Optional
    name: "Hello World", // Name for future reference. Optional.
    rendererSettings: {
      scaleMode: "noScale",
    },
  });

  anim.setSpeed(1.5);

  return anim;
}
