// import {calculateNetIncomeRate} from "./map";

// get the avarage rate for the city

function calculate(acqPrice, rent) {
  let rate = ((rent * 12) / acqPrice) * 100;
  return rate.toFixed(2);
}

let citys = [
  {
    name: "Berlin",
    latitude: 52.520008,
    longitude: 13.404954,
    acqPrice: 4200,
    rental: 11.3
  },
  {
    name: "Hamburg",
    latitude: 53.551086,
    longitude: 9.993682,
    acqPrice: 4200,
    rental: 11.6
  },
  {
    name: "Munichen",
    latitude: 48.137154,
    longitude: 11.576124,
    acqPrice: 7.5,
    rental: 18.5
  },
  {
    name: "Cologne",
    latitude: 50.935173,
    longitude: 6.953101,
    acqPrice: 5300,
    rental: 11.2
  },
  {
    name: "Frankfurt",
    latitude: 50.110924,
    longitude: 8.682127,
    acqPrice: 3650,
    rental: 14.2
  },
  {
    name: "Stuttgart",
    latitude: 48.78232,
    longitude: 9.17702,
    acqPrice: 4350,
    rental: 14.2
  },
  {
    name: "Düsseldorf",
    latitude: 51.22172,
    longitude: 6.77616,
    acqPrice: 3600,
    rental: 10.9
  },
  {
    name: "Leipzig",
    latitude: 51.343479,
    longitude: 12.387772,
    acqPrice: 1900,
    rental: 6.9
  },
  {
    name: "Dortmund",
    latitude: 51.51494,
    longitude: 7.466,
    acqPrice: 1600,
    rental: 7.1
  },
  {
    name: "Essen",
    latitude: 51.45657,
    longitude: 7.01228,
    acqPrice: 1500,
    rental: 7.1
  },
  {
    name: "Bremen",
    latitude: 53.073635,
    longitude: 8.806422,
    acqPrice: 2250,
    rental: 8.4
  },
  {
    name: "Dresden",
    latitude: 51.050407,
    longitude: 13.737262,
    acqPrice: 2250,
    rental: 8.4
  },
  {
    name: "Hannover",
    latitude: 52.37052,
    longitude: 9.73322,
    acqPrice: 2750,
    rental: 8.7
  },
  {
    name: "Nürnberg",
    latitude: 49.460983,
    longitude: 11.061859,
    acqPrice: 3150,
    rental: 9.9
  },
  {
    name: "Duisburg",
    latitude: 51.435146,
    longitude: 6.762692,
    acqPrice: 1200,
    rental: 6.1
  }
];

let price;
let rent;

const getCityInput = event => {
  event.preventDefault();
  cityData = {
    cityName: document.getElementById("cityInput").value
  };
  if (cityData.cityName) {
    for (let i = 0; i < citys.length; i++) {
      let city = citys[i];
      if (city.name === cityData.cityName) {
        // console.log(city.rental);
        price = city.acqPrice;
        rent = city.rental;
      }
    }

    let oldAvg = document.getElementById("AvgRate");
    if (oldAvg) oldAvg.remove();
    let newAvg = document.createElement("h2");
    newAvg.setAttribute("id", "AvgRate");
    newAvg.innerHTML = `The avarage for ${cityData.cityName} is ` + calculate(price, rent) + "%";
    document.getElementById("Your-return-rate").appendChild(newAvg);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btnProperty")
    .addEventListener("click", getCityInput);
});
