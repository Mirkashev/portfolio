import toggleMenu from "./modules/burger-menu.js";
import IosSelector from "./modules/drum.js";

document.querySelector(".burger-menu").onclick = () => toggleMenu();

function getMonths() {
  let months = [];
  for (let i = 1; i <= 3; i++) {
    if (i === 1) {
      months.push({
        value: i,
        text: "IOS",
      });
    } else if (i === 2) {
      months.push({
        value: i,
        text: "BACKEND",
      });
    } else {
      months.push({
        value: i,
        text: "ANDROID",
      });
    }
  }
  return months;
}

let monthSelector;

let monthSource = getMonths();

monthSelector = new IosSelector({
  el: innerWidth < 521 ? "#month2" : "#month1",
  type: "infinite",
  source: monthSource,
  count: 20,
  onChange: (selected) => {
    // currentMonth = selected.value;

    // console.log(monthSelector.value);
    if (selected.value === 1) {
      // console.log("ios");
      document.querySelector(".ios").classList.remove("hidden");
      document.querySelector(".android").classList.add("hidden");
      document.querySelector(".backend").classList.add("hidden");

      document.querySelector(".ios2").classList.remove("hidden");
      document.querySelector(".android2").classList.add("hidden");
      document.querySelector(".backend2").classList.add("hidden");
    } else if (selected.value === 3) {
      // console.log("android");

      document.querySelector(".ios").classList.add("hidden");
      document.querySelector(".android").classList.remove("hidden");
      document.querySelector(".backend").classList.add("hidden");

      document.querySelector(".ios2").classList.add("hidden");
      document.querySelector(".android2").classList.remove("hidden");
      document.querySelector(".backend2").classList.add("hidden");
    } else {
      // console.log("backend");

      document.querySelector(".ios").classList.add("hidden");
      document.querySelector(".android").classList.add("hidden");
      document.querySelector(".backend").classList.remove("hidden");

      document.querySelector(".ios2").classList.add("hidden");
      document.querySelector(".android2").classList.add("hidden");
      document.querySelector(".backend2").classList.remove("hidden");
    }
  },
  elMargins: innerWidth < 521 ? 8 : 4.4,
});
addEventListener("resize", () => {
  console.log(innerWidth);
  if (innerWidth < 521) {
    document.getElementById("month2").remove();
    document.querySelector(
      ".date-selector2"
    ).innerHTML = `<div class="month" id="month2"></div>`;
    monthSelector = new IosSelector({
      el: "#month2",
      type: "infinite",
      source: monthSource,
      count: 20,
      onChange: (selected) => {
        //   currentMonth = selected.value;
        console.log(selected);

        if (selected.value === 1) {
          console.log("ios");
          document.querySelector(".ios2").classList.remove("hidden");
          document.querySelector(".android2").classList.add("hidden");
          document.querySelector(".backend2").classList.add("hidden");
        } else if (selected.value === 3) {
          // console.log("android");

          document.querySelector(".ios2").classList.add("hidden");
          document.querySelector(".android2").classList.remove("hidden");
          document.querySelector(".backend2").classList.add("hidden");
        } else {
          // console.log("backend");

          document.querySelector(".ios2").classList.add("hidden");
          document.querySelector(".android2").classList.add("hidden");
          document.querySelector(".backend2").classList.remove("hidden");
        }
      },
      elMargins: 8,
    });
  } else {
    document.getElementById("month1").remove();

    document.querySelector(".date-selector").innerHTML = `
      <div class="month" id="month1"></div>`;
    monthSelector = new IosSelector({
      el: "#month1",
      type: "infinite",
      source: monthSource,
      count: 20,
      onChange: (selected) => {
        //   currentMonth = selected.value;

        if (selected.value === 1) {
          // console.log("ios");
          document.querySelector(".ios").classList.remove("hidden");
          document.querySelector(".android").classList.add("hidden");
          document.querySelector(".backend").classList.add("hidden");
        } else if (selected.value === 3) {
          // console.log("android");

          document.querySelector(".ios").classList.add("hidden");
          document.querySelector(".android").classList.remove("hidden");
          document.querySelector(".backend").classList.add("hidden");
        } else {
          // console.log("backend");

          document.querySelector(".ios").classList.add("hidden");
          document.querySelector(".android").classList.add("hidden");
          document.querySelector(".backend").classList.remove("hidden");
        }
      },
      elMargins: 4.4,
    });
  }
});
