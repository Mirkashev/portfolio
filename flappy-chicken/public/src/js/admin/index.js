document.querySelectorAll(".tab_link").forEach((el, index) => {
  el.onclick = () => {
    document
      .querySelectorAll(".tab_content")
      .forEach((content, content_index) => {
        if (index === content_index) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    document.querySelectorAll(".tab_link").forEach((tab, tab_index) => {
      if (tab_index === index) {
        tab.style.backgroundColor = "#009999";
        tab.style.color = "#ffffff";
      } else {
        tab.style.backgroundColor = "#f6f6f6";
        tab.style.color = "#21759b";
      }
    });
    if (index === 0) {
      //get
      let tempResponse = [];
      window.Twitch.ext.onAuthorized(({ userId, channelId, token }) => {
        // console.log(token);
        fetch("https://flappy.black-sheep.ru" + "/replays/broadcaster", {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-extension-jwt": token,
          }),
        })
          .then((resp) => resp.json())
          .then((result) => {
            tempResponse = result;
            // console.log(tempResponse);
            document.getElementById("tab9").innerHTML = "";

            tempResponse.forEach((el, index) => {
              const p = document.createElement("p");

              p.append(index + 1 + ". " + el.username + " " + el.count);
              document.getElementById("tab9").append(p);
            });
          });
      });
      // console.log(tempResponse);
    }
    if (index === 1) {
      //get
      let tempResponse = [];
      window.Twitch.ext.onAuthorized(({ userId, channelId, token }) => {
        fetch("https://flappy.black-sheep.ru" + "/replays/broadcaster/score", {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-extension-jwt": token,
          }),
        })
          .then((resp) => resp.json())
          .then((result) => {
            tempResponse = result;
            // console.log(tempResponse);
            document.getElementById("tab10").innerHTML = "";

            tempResponse.forEach((el, index) => {
              const p = document.createElement("p");
              p.append(index + 1 + ". " + el.username + " " + el.sum + "\n");
              document.getElementById("tab10").append(p);
            });
          });
      });
    }
    // if(index === 2) {
    //   //post
    // }
  };
});

document.querySelector(".send-button").onclick = () => {
  let array = document.querySelector(".send").value.split(" ");
  window.Twitch.ext.onAuthorized(({ userId, channelId, token }) => {
    // console.log(token);
    fetch("https://flappy.black-sheep.ru" + "/promos", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-extension-jwt": token,
      }),
      body: JSON.stringify(array),
    });
  });
  //   console.log(array);
};
