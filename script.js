//Accessing The DOM
const container = document.getElementById("root");
const itemContainer = document.querySelector(".item-container");
const selectItem = document.getElementById("select");
const items = document.querySelector(".menu-item");
const countScore = container.querySelector(".count");
const searchInput = document.querySelector(".input-search");

const url = "https://restcountries.eu/rest/v2/all";
//urlSelect = `https://restcountries.eu/rest/v2/region/${region}`;
//fullName search: https://restcountries.eu/rest/v2/name/{name}?fullText=true

//Preloader
const Preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  Preloader.classList.add("hide-preloader");
});

//Theme switcher
const lightModeText = document.getElementById("light-mode-text");
const darkModeText = document.getElementById("dark-mode-text");
const head = document.querySelector(".head");
const mode = document.getElementById("mode");
const search = document.querySelector(".search");
const select = document.querySelector(".choose");
const heading = document.querySelector(".heading");
const wrapper = document.querySelector(".wrapper");
const anchor = document.querySelector(".anchor");
const switcher = document.querySelector(".switcher");

lightModeText.classList.add("mode-text");

switcher.addEventListener("click", () => {
  switcher.classList.toggle("active");
  document.body.classList.toggle("light");
  head.classList.toggle("light");
  heading.classList.toggle("light");
  mode.classList.toggle("light");
  items.classList.toggle("light");
  countScore.classList.toggle("light");
  select.classList.toggle("light");
  search.classList.toggle("light");
  searchInput.classList.toggle("light");
  wrapper.classList.toggle("light");
  anchor.classList.toggle("light");

  //Changing the mode text
  darkModeText.classList.toggle("mode-text");
  lightModeText.classList.toggle("mode-text");
});

window.addEventListener("DOMContentLoaded", () => {
  getApi();
  filterSelect();
  filterSearch();

  console.log("Loading...");
});

const getApi = async () => {
  const response = await fetch(url);
  const data = await response.json();
  //const countries = await data.slice(0, 12);
  const countries = data;

  //console.log(countries);
  displayCountryItems(countries);
  filterSelect(countries);
  filterSearch(countries);
};

const displayCountryItems = (countryItems) => {
  let displayCountry = countryItems
    .map((country) => {
      return `<article class="menu-item">
      <a href="#" class="anchor"><img src=${country.flag} alt="Flag Items" class="flags" /></a>
      <div class="wrapper">
        <h4 class="country-name">${country.name}</h4>
        <p class="population">Population: ${country.population}</p>
        <p class="region">Region: ${country.region}</p>
        <p class="capital">Capital: ${country.capital}</p>
      </div>
    </article>`;
    })
    .join("");

  itemContainer.innerHTML = displayCountry;
  countScore.textContent = `${countryItems.length} countries`;
};

const filterSelect = (countryItems) => {
  selectItem.addEventListener("change", (e) => {
    //console.log(e.currentTarget.value);
    const region = e.currentTarget.value;
    const countryRegion = countryItems.filter((countryItem) => {
      if (countryItem.region === region) {
        return countryItem;
      }
    });
    //console.log(countryRegion);
    if (region === "") {
      displayCountryItems(countryItems);
    } else {
      displayCountryItems(countryRegion);
      countScore.textContent = `${countryRegion.length} countries`;
    }
  });
};

var filterSearch = (searchItems) => {
  searchInput.addEventListener("keyup", (e) => {
    console.log(e.currentTarget.value);
    console.log(searchItems);
    // const name = e.currentTarget.value;
    // const countryName = searchItems.filter((searchItem) => {
    //   if (searchItem.name === name) {
    //     return searchItem;
    //   }
    // });
    // //console.log(countryRegion);
    // if (name === "") {
    //   displayCountryItems(searchItems);
    // } else {
    //   displayCountryItems(countryName);
    //   countScore.textContent = "";
    // }
  });
};

// const filterSearch = async () => {
//   let filter = searchItem.value.toUpperCase();

//   // for (i = 0; i < items.length; i++) {
//   //   a = items[i].getElementsByTagName("a")[0];
//   //   txtValue = a.textContent || a.innerText;
//   //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
//   //     items[i].style.display = "";
//   //   } else {
//   //     items[i].style.display = "none";
//   //   }
//   // }
//   const url = `https://restcountries.eu/rest/v2/name/${filter}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);

//   if (searchItem.value === "") {
//     displayCountryItems(data);
//     countScore.textContent = `${data.length} countries matched`;
//   }
// };

getApi();
filterSelect();
filterSearch();
