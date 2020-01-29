
const mymap = L.map("mapid").setView([51.00, 9.00], 7);

// var latlngs = [
//   [37, -109.05],
//   [41, -109.03],
//   [41, -102.05],
//   [37, -102.04],
//   [36, -102.04],
//   [37, -102.04]
// ];
// var polygon = L.polygon(latlngs, { color: "red" }).addTo(mymap);
// // zoom the map to the polygon
// mymap.fitBounds(polygon.getBounds());

var myLines = [
  {
    type: "LineString",
    coordinates: [
      [-100, 40],
      [-105, 45],
      [-110, 55]
    ]
  }
];

var myStyle = {
  color: "#ff7800",
  weight: 5,
  opacity: 0.65
};

L.geoJSON(myLines, {
  style: myStyle
}).addTo(mymap);







const attribution = 
'&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors';


const tileUrl = 'https://{s}.tile.openStreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution})
tiles.addTo(mymap);  
L.marker([50.935173, 6.953101]).addTo(mymap);
L.marker([50.935173, 10]).addTo(mymap);


