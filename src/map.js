
function onEachFeature(feature, marker) {
  if (feature.properties.incomeRate && feature.properties.cityName) {
    marker.bindPopup(
      feature.properties.cityName +
        "</br>" +
        "<span> Net return: </span>" +
        feature.properties.incomeRate +
        "%" +
        "</br>" +
        "<span>m2 price: </span>" +
        feature.properties.price +
        " €" +
        "</br>" +
        "<span>m2 rent: </span>" +
        feature.properties.rent +
        " €"
    );
    // mouseover;
    marker.on("mouseover", function(e) {
      this.openPopup();
    });
    marker.on("mouseout", function(e) {
      this.closePopup();
    });
  }
}

export function calculateNetIncomeRate(acqPrice, rent) {
  let rate = ((rent * 12) / acqPrice) * 100;
  return rate.toFixed(2); 
}

let geojsonCities = [
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Duisburg</h3>",
      price: "1200",
      rent: "6.1",
      incomeRate: calculateNetIncomeRate(1200, 6.1)
    },
    geometry: {
      type: "Point",
      coordinates: [6.762692, 51.435146]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Nuernberg</h3>",
      price: 3150,
      rent: 9.9,
      incomeRate: calculateNetIncomeRate(3150, 9.9)
    },
    geometry: {
      type: "Point",
      coordinates: [11.061859, 49.460983]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Hannover</h3>",
      price: 2750,
      rent: 8.7,
      incomeRate: calculateNetIncomeRate(2750, 8.7)
    },
    geometry: {
      type: "Point",
      coordinates: [9.73322, 52.37052]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Dresden</h3>",
      price: 2250,
      rent: 8.4,
      incomeRate: calculateNetIncomeRate(2250, 8.4)
    },
    geometry: {
      type: "Point",
      coordinates: [13.737262, 51.050407]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Bremen</h3>",
      price: 2250,
      rent: 8.4,
      incomeRate: calculateNetIncomeRate(2250, 8.4)
    },
    geometry: {
      type: "Point",
      coordinates: [8.806422, 53.073635]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Essen</h3>",
      price: 1500,
      rent: 7.1,
      incomeRate: calculateNetIncomeRate(1500, 7.1)
    },
    geometry: {
      type: "Point",
      coordinates: [7.01228, 51.45657]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Dortmund</h3>",
      price: 1600,
      rent: 7.1,
      incomeRate: calculateNetIncomeRate(1600, 7.1)
    },
    geometry: {
      type: "Point",
      coordinates: [7.466, 51.51494]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Leipzig</h3>",
      price: 1900,
      rent: 6.9,
      incomeRate: calculateNetIncomeRate(1900, 6.9)
    },
    geometry: {
      type: "Point",
      coordinates: [12.387772, 51.343479]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Duesseldorf</h3>",
      price: 3600,
      rent: 10.9,
      incomeRate: calculateNetIncomeRate(3600, 10.9)
    },
    geometry: {
      type: "Point",
      coordinates: [6.77616, 51.22172]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Stuttgart</h3>",
      price: 4350,
      rent: 14.2,
      incomeRate: calculateNetIncomeRate(4350, 14.2)
    },
    geometry: {
      type: "Point",
      coordinates: [9.17702, 48.78232]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Frankfurt</h3>",
      price: 3650,
      rent: 14.2,
      incomeRate: calculateNetIncomeRate(3650, 14.2)
    },
    geometry: {
      type: "Point",
      coordinates: [8.682127, 50.110924]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Cologne</h3>",
      price: 5300,
      rent: 11.2,
      incomeRate: calculateNetIncomeRate(5300, 11.2)
    },
    geometry: {
      type: "Point",
      coordinates: [6.953101, 50.935173]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Munich</h3>",
      price: 7500,
      rent: 18.5,
      incomeRate: calculateNetIncomeRate(7500, 18.5)
    },
    geometry: {
      type: "Point",
      coordinates: [11.576124, 48.137154]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Hamburg</h3>",
      price: 4200,
      rent: 11.6,
      incomeRate: calculateNetIncomeRate(4200, 11.6)
    },
    geometry: {
      type: "Point",
      coordinates: [9.993682, 53.551086]
    }
  },
  {
    type: "Feature",
    properties: {
      cityName: "<h3>Berlin</h3>",
      price: 4200,
      rent: 11.3,
      incomeRate: calculateNetIncomeRate(4200, 11.3)
    },
    geometry: {
      type: "Point",
      coordinates: [13.404954, 52.520008]
    }
  }
];
export let mymap = L.map("mapid").setView([51.133481, 10.018343], 5.5);


L.geoJSON(geojsonCities, {
  onEachFeature: onEachFeature
}).addTo(mymap);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors';

const tileUrl = "https://{s}.tile.openStreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
// L.marker([50.935173, 6.953101]).addTo(mymap);
// L.marker([50.935173, 10]).addTo(mymap);
