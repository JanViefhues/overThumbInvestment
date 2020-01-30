// boundy data for drwaing the polygon in the map
// -> geting OSM id from openstreetmap
// getting the geojson among the id on polygons.openstreetmap

const mymap = L.map("mapid").setView([51.133481, 10.018343], 5.5);


function onEachFeature(feature, marker) {
  // does this feature have a property named popupContent?
  // Just validation check for bigger data set
  if (feature.properties.incomeRate && feature.properties.cityName) {
    // layer.bindPopup(feature.properties.popupContent);
    // marker.bindPopup(feature.properties.incomeRate);
     marker.bindPopup(
        feature.properties.cityName + "</br>" +
       "Net return: " +
         feature.properties.incomeRate +
         "%" +
         "</br>" +
         "m2 price: " +
         feature.properties.price +
         " €" +
         "</br>" +
         "m2 rent: " +
         feature.properties.rent +
         " €"
     );
     marker.on("mouseover", function(e) {
       this.openPopup();
     });
     marker.on("mouseout", function(e) {
       this.closePopup();
     });
  }
}

function calculateNetIncomeRate(acqPrice, rent){
   let rate = ( rent*12 / acqPrice ) * 100 
   return rate.toFixed(2);
}

let geojsonBerlin = {
  type: "Feature",
  properties: {
    cityName: "Berlin",
    price: 4200,
    rent: 11.3,
    incomeRate: calculateNetIncomeRate(4200,11.3)
  },
  geometry: {
    type: "Point",
    coordinates: [13.404954, 52.520008]
  }
};

L.geoJSON(geojsonBerlin, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonHamburg = {
  type: "Feature",
  properties: {
    cityName: "Hamburg",
    price: 4200,
    rent: 11.6,
    incomeRate: calculateNetIncomeRate(4200,11.6)
  },
  geometry: {
    type: "Point",
    coordinates: [9.993682, 53.551086]
  }
};
L.geoJSON(geojsonHamburg, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonMunich = {
  type: "Feature",
  properties: {
    cityName: "Munich",
    price: 7500,
    rent: 18.5,
    incomeRate: calculateNetIncomeRate(7500,18.5)
  },
  geometry: {
    type: "Point",
    coordinates: [11.576124, 48.137154]
  }
};
L.geoJSON(geojsonMunich, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonCologne = {
  type: "Feature",
  properties: {
    cityName: "Cologne",
    price: 5300,
    rent: 11.2,
    incomeRate: calculateNetIncomeRate(5300,11.2)
  },
  geometry: {
    type: "Point",
    coordinates: [6.953101, 50.935173]
  }
};
L.geoJSON(geojsonCologne, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonFrankfurt = {
  type: "Feature",
  properties: {
    cityName: "Frankfurt",
    price: 3650,
    rent: 14.2,
    incomeRate: calculateNetIncomeRate(3650,14.2)
  },
  geometry: {
    type: "Point",
    coordinates: [8.682127, 50.110924]
  }
};
L.geoJSON(geojsonFrankfurt, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonStuttgart = {
  type: "Feature",
  properties: {
    cityName: "Stuttgart",
    price: 4350,
    rent: 14.2,
    incomeRate: calculateNetIncomeRate(4350,14.2)
  },
  geometry: {
    type: "Point",
    coordinates: [9.17702, 48.78232]
  }
};
L.geoJSON(geojsonStuttgart, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonDuesseldorf = {
  type: "Feature",
  properties: {
    cityName: "Duesseldorf",
    price: 3600,
    rent: 10.9,
    incomeRate: calculateNetIncomeRate(3600,10.9)
  },
  geometry: {
    type: "Point",
    coordinates: [6.77616, 51.22172]
  }
};
L.geoJSON(geojsonDuesseldorf, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonLeipzig = {
  type: "Feature",
  properties: {
    cityName: "Leipzig",
    price: 1900,
    rent: 6.9,
    incomeRate: calculateNetIncomeRate(1900,6.9)
  },
  geometry: {
    type: "Point",
    coordinates: [12.387772, 51.343479]
  }
};
L.geoJSON(geojsonLeipzig, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonDortmund = {
  type: "Feature",
  properties: {
    cityName: "Dortmund",
    price: 1600,
    rent: 7.1,
    incomeRate: calculateNetIncomeRate(1600,7.1)
  },
  geometry: {
    type: "Point",
    coordinates: [7.466, 51.51494]
  }
};
L.geoJSON(geojsonDortmund, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonEssen = {
  type: "Feature",
  properties: {
    cityName: "Essen",
    price: 1500,
    rent: 7.1,
    incomeRate: calculateNetIncomeRate(1500,7.1)
  },
  geometry: {
    type: "Point",
    coordinates: [7.01228, 51.45657]
  }
};
L.geoJSON(geojsonEssen, {
  onEachFeature: onEachFeature
}).addTo(mymap);


let geojsonBremen = {
  type: "Feature",
  properties: {
    cityName: "Bremen",
    price: 2250,
    rent: 8.4,
    incomeRate: calculateNetIncomeRate(2250,8.4)
  },
  geometry: {
    type: "Point",
    coordinates: [8.806422, 53.073635]
  }
};
L.geoJSON(geojsonBremen, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonDresden = {
  type: "Feature",
  properties: {
    cityName: "Dresden",
    price: 2250,
    rent: 8.4,
    incomeRate: calculateNetIncomeRate(2250, 8.4)
  },
  geometry: {
    type: "Point",
    coordinates: [13.737262, 51.050407]
  }
};
L.geoJSON(geojsonDresden, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonHannover = {
  type: "Feature",
  properties: {
    cityName: "Hannover",
    price: 2750,
    rent: 8.7,
    incomeRate: calculateNetIncomeRate(2750,8.7)
  },
  geometry: {
    type: "Point",
    coordinates: [9.73322, 52.37052]
  }
};
L.geoJSON(geojsonHannover, {
  onEachFeature: onEachFeature
}).addTo(mymap);


let geojsonNuernberg = {
  type: "Feature",
  properties: {
    cityName: "Nuernberg",
    price: 3150,
    rent: 9.9,
    incomeRate: calculateNetIncomeRate(3150, 9.9)
  },
  geometry: {
    type: "Point",
    coordinates: [11.061859, 49.460983]
  }
};
L.geoJSON(geojsonNuernberg, {
  onEachFeature: onEachFeature
}).addTo(mymap);

let geojsonDuisburg = {
  type: "Feature",
  properties: {
    cityName: "Duisburg",
    price: 1200,
    rent: 6.1,
    incomeRate: calculateNetIncomeRate(1200,6.1)
  },
  geometry: {
    type: "Point",
    coordinates: [6.762692, 51.435146]
  }
};
L.geoJSON(geojsonDuisburg, {
  onEachFeature: onEachFeature
}).addTo(mymap);




const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors';

const tileUrl = "https://{s}.tile.openStreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
// L.marker([50.935173, 6.953101]).addTo(mymap);
// L.marker([50.935173, 10]).addTo(mymap);
