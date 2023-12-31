"use strict";

const cardCountainer = document.querySelector(".card-container");

const searchInput = document.getElementById("searchInput");

const message = document.getElementById("message");

let api = [];

const title = document.getElementById("header-title");

const darkBtn = document.getElementById("dark");

const searchIcon = document.getElementById("searchIcon");

const countryName = document.getElementById("countryName");


const scrollToTopButton = document.getElementById("scrollToTopButton");




searchIcon.addEventListener("click", () => {
  message.classList.replace("hidden", "block");
  cardCountainer.classList.replace("flex", "hidden");
  cardCountainer.innerHTML = "";
  countryName.textContent = "";
  const searchedValue = searchInput.value.trim();
  fetch(`https://api.api-ninjas.com/v1/covid19?country=${searchedValue}`, {
    headers: {
      "X-Api-Key": `kvGrcHWKTvlAj8o7uLhhnCg38oDLidio4bnlbVD0`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (!searchedValue) {
        countryName.innerText = "Cannot be empty, please try again.";
        message.classList.replace("block", "hidden");

        return;
      }
      if (data.length === 0) {
        countryName.innerText = "Country is not idetifined, please try again.";
        message.classList.replace("block", "hidden");

        return;
      }
      console.log(data);

      const regions = data.length;
      console.log(regions);
      countryName.innerText = data[0].country;
      showCards(data);
    });
});

const showCards = (data) => {
  data.forEach((r) => {
    const p = document.createElement("p");
    p.innerText = r.region;
    const reg = document.createElement("h2");
    reg.innerText = r.region ? `Region: ${r.region} ` : "No region";
    reg.style.color = "white"
    reg.style.width = "1500px";
    reg.className = "region";
    cardCountainer.append(reg);

    let objLength = Object.entries(r.cases).length;
    for (let i = 0; i < objLength; i++) {
      message.classList.replace("block", "hidden");
      cardCountainer.classList.replace("hidden", "flex");
      countryName.style.color="white"
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img id="coronaPic" src="covid-19.jpg" alt="" />
      <div class="card-content">
        <p id="date">${Object.entries(r.cases)[i][0]}</p>
        <p>Total: <span id="total">${
          Object.entries(r.cases)[i][1]["total"]
        }</span></p>
        <p>New: <span id="new">${
          Object.entries(r.cases)[i][1]["new"]
        }</span></p>
      </div>`;
      cardCountainer.append(card);
    }
  });
};
