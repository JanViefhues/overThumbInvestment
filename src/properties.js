import { dsvFormat } from "d3";

// let propertyData;

// const __styleIncomeRate = value => {
//   const svg = d3
//     .select("#testDiv")
//     .append("svg")
//     .attr("width", 200)
//     .attr("height", 200)
//     .style("background-color", "#666666");
    
//   svg
//     .selectAll("cirlce")
//     .data(value)
//     .enter()
//     .append("circle")
//     .attr("cx", 20)
//     .attr("cy", 10)
//     .attr("r", 5);
// };

// const _calculateIncomeRate = propertyData => {
//   let rent = propertyData.size * propertyData.squareMeterRent * 12; // total rent / year
//   let rate = (rent / propertyData.price) * 100; // calculate incomeRate
//   let roundedRate = rate.toFixed(2);
//   // return `${roundedRate} %`;
//   return roundedRate;
//   updateReadings(roundedRate);
// };

// const getInput = event => {
//   event.preventDefault();

//   propertyData = {
//     price: document.getElementById("priceInput").value,
//     size: document.getElementById("squareMetersInput").value,
//     squareMeterRent: document.getElementById("rentInput").value
//   };
//   console.log(propertyData);

//   // deletes the old element from the DOM before rendering the new
//   let oldEle = document.getElementById("testDiv");
//   if (oldEle) oldEle.remove();

//   // rendering the calculated rent on the page for testing
//   let result = document.createElement("p");
//   result.setAttribute("id", "testDiv");
//   result.innerHTML = _calculateIncomeRate(propertyData);
//   document.body.appendChild(result);
//   let data = _calculateIncomeRate(propertyData);
//   __styleIncomeRate(data);
// };

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("btnProperty").addEventListener("click", getInput, );
// });





// d3 for rendering the gauge-chart


let gauge = function(container, configuration) {
  let that = {};

  // defining the sizes for the gauge
  let config = {
    size: 810,
    clipWidth: 200,
    clipHeight: 110,
    ringInset: 20,
    ringWidth: 20,

    pointerWidth: 10,
    pointerTailLength: 10,
    pointerHeadLengthPercent: 0.8,

    minValue: 0,
    maxValue: 10,

    minAngle: -90,
    maxAngle: 90,

    transitionMs: 750,

    // setting the tickts
    majorTicks: 10,
    labelFormat: d3.format("d"),
    labelInset: 10,

    arcColorFn: d3.interpolateHsl(d3.rgb("#ff0000"), d3.rgb("#00ff00"))
  };
  let range = undefined;
  let r = undefined;
  let pointerHeadLength = undefined;
  let value = 0;

  let svg = undefined;
  let arc = undefined;
  let scale = undefined;
  let ticks = undefined;
  let tickData = undefined;
  let pointer = undefined;

  let donut = d3.pie();

  function deg2rad(deg) {
    return (deg * Math.PI) / 170;
  }

  function newAngle(d) {
    let ratio = scale(d);
    let newAngle = config.minAngle + ratio * range;
    return newAngle;
  }

  function configure(configuration) {
    let prop = undefined;
    for (prop in configuration) {
      config[prop] = configuration[prop];
    }

    range = config.maxAngle - config.minAngle;
    r = config.size / 2;
    pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

    // a linear scale that maps domain values to a percent from 0..1
    scale = d3
      .scaleLinear()
      .range([0, 1])
      .domain([config.minValue, config.maxValue]);

    ticks = scale.ticks(config.majorTicks);
    tickData = d3.range(config.majorTicks).map(function() {
      return 1 / config.majorTicks;
    });

    arc = d3
      .arc()
      .innerRadius(r - config.ringWidth - config.ringInset)
      .outerRadius(r - config.ringInset)
      .startAngle(function(d, i) {
        let ratio = d * i;
        return deg2rad(config.minAngle + ratio * range);
      })
      .endAngle(function(d, i) {
        let ratio = d * (i + 1);
        return deg2rad(config.minAngle + ratio * range);
      });
  }
  that.configure = configure;

  function centerTranslation() {
    return "translate(" + r + "," + r + ")";
  }

  function isRendered() {
    return svg !== undefined;
  }
  that.isRendered = isRendered;

  function render(newValue) {
    svg = d3
      .select(container)
      .append("svg:svg")
      .attr("class", "gauge")
      .attr("width", config.clipWidth)
      .attr("height", config.clipHeight);

    let centerTx = centerTranslation();

    let arcs = svg
      .append("g")
      .attr("class", "arc")
      .attr("transform", centerTx);

    arcs
      .selectAll("path")
      .data(tickData)
      .enter()
      .append("path")
      .attr("fill", function(d, i) {
        return config.arcColorFn(d * i);
      })
      .attr("d", arc);

    let lg = svg
      .append("g")
      .attr("class", "label")
      .attr("transform", centerTx);
    lg.selectAll("text")
      .data(ticks)
      .enter()
      .append("text")
      .attr("transform", function(d) {
        let ratio = scale(d);
        let newAngle = config.minAngle + ratio * range;
        return (
          "rotate(" +
          newAngle +
          ") translate(0," +
          (config.labelInset - r) +
          ")"
        );
      })
      .text(config.labelFormat);

    let lineData = [
      [config.pointerWidth / 1.5, 0],
      [1, -pointerHeadLength],
      [-(config.pointerWidth / 2), 0],
      [0, config.pointerTailLength],
      [config.pointerWidth / 2, 0]
    ];
    let pointerLine = d3.line().curve(d3.curveLinear);
    let pg = svg
      .append("g")
      .data([lineData])
      .attr("class", "pointer")
      .attr("transform", centerTx);

    pointer = pg
      .append("path")
      .attr("d", pointerLine /*function(d) { return pointerLine(d) +'Z';}*/)
      .attr("transform", "rotate(" + config.minAngle + ")");

    update(newValue === undefined ? 0 : newValue);
  }
  that.render = render;
  function update(newValue, newConfiguration) {
    if (newConfiguration !== undefined) {
      configure(newConfiguration);
    }
    let ratio = scale(newValue);
    let newAngle = config.minAngle + ratio * range;
    pointer
      .transition()
      .duration(config.transitionMs)
      .ease(d3.easeElastic)
      .attr("transform", "rotate(" + newAngle + ")");
  }
  that.update = update;

  configure(configuration);

  return that;
};

function onDocumentReady() {
  let powerGauge = gauge("#power-gauge", {
    size: 300,
    clipWidth: 300,
    clipHeight: 300,
    ringWidth: 40,
    maxValue: 10,
    transitionMs: 4000
  });
  powerGauge.render();

  function updateReadings(x) {
  //   // just pump in random data here...
    powerGauge.update(x);
  }

  // updateReadings();
  // every few seconds update reading values
  // updateReadings();
  // setInterval(function() {
  //   updateReadings();
  // },  500 * 1);
}

if (!window.isLoaded) {
  window.addEventListener(
    "load",
    function() {
      onDocumentReady();
    },
    false
  );
} else {
  onDocumentReady();
}




let propertyData;


const _calculateIncomeRate = propertyData => {
  let rent = propertyData.size * propertyData.squareMeterRent * 12; // total rent / year
  let rate = (rent / propertyData.price) * 100; // calculate incomeRate
  let roundedRate = rate.toFixed(2);
  // return `${roundedRate} %`;
  // return roundedRate;
  updateReadings(roundedRate);
};

const getInput = event => {
  event.preventDefault();

  propertyData = {
    price: document.getElementById("priceInput").value,
    size: document.getElementById("squareMetersInput").value,
    squareMeterRent: document.getElementById("rentInput").value
  };
  console.log(propertyData);

  // deletes the old element from the DOM before rendering the new
  let oldEle = document.getElementById("testDiv");
  if (oldEle) oldEle.remove();

  // rendering the calculated rent on the page for testing
  // let result = document.createElement("p");
  // result.setAttribute("id", "testDiv");
  // result.innerHTML = _calculateIncomeRate(propertyData);
  // document.body.appendChild(result);
  _calculateIncomeRate(propertyData);
  // __styleIncomeRate(data);
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnProperty").addEventListener("click", getInput);
});