//Accessing The DOM
const container = document.getElementById("root");
const ul = document.getElementById("wrap");

const url = "https://restcountries.eu/rest/v2/all";
//Filter by region: https://restcountries.eu/rest/v2/region/europe

function append(parent, el) {
  return parent.appendChild(el);
}

const getApi = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const countries = await data.slice(0, 12);
  //const countries = data;

  //console.log(data)
  console.log(countries);

  countries.forEach((country) => {
    console.log(country.name);
    console.log(country.flag);
  });

  countries.map((country) => {
    let div = document.createElement("div");
    let li = document.createElement("li");
    let img = document.createElement("img");
    let anchor = document.createElement("a");

    const name = country.name;
    const population = country.population;
    const region = country.region;
    const capital = country.capital;

    div.innerHTML = `<h4>${name}</h4><p>Population: ${population}</p>
    <p>Region: ${region}</p><p>Capital: ${capital}</p>`;
    //div.textContent = "Hi";

    img.setAttribute("src", country.flag);
    img.setAttribute("title", country.name);
    anchor.setAttribute("href", "#");
    div.setAttribute("class", "wrapper");
    li.setAttribute("class", "list-items");

    img.style.height = "50%";
    img.style.width = "100%";
    // span.innerHTML = `Name: ${country.name},
    // Capital: ${country.capital},
    // Time-zone: ${country.timezones},
    // Native-Name: ${country.nativeName},
    // Population: ${country.population},
    // Languages: ${country.languages[0].name},
    // Currencies: ${country.currencies[0].name},
    // Region: ${country.region},
    // Sub-Region: ${country.subregion},
    // Borders: ${country.borders}`

    append(anchor, img);
    append(li, anchor);
    append(li, div);
    append(ul, li);
  });
};

getApi();
