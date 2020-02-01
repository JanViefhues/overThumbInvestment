import { dsvFormat } from "d3";



//  :Part1: -----------------Creating gauge chart------------------ //

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

    // arcColorFn: d3.interpolateHsl(d3.rgb("#ff0000"), d3.rgb("#00ff00"))

    // arcColorFn: d3.interpolateHsl(d3.rgb("#5A3E51"), d3.rgb("#FFFF"))
    arcColorFn: d3.interpolateHsl(d3.rgb("#c31432"), d3.rgb("#96c93d"))
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

  function renderChart(newValue) {
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
  that.renderChart = renderChart;

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

// setting the size values for the gaug graph
let powerGauge = gauge("#power-gauge", {
  size: 450,
  widht: 100,
  clipWidth: 450,
  clipHeight: 300,
  ringWidth: 40,
  maxValue: 15,
  transitionMs: 5000
});





//  :Part2: ---------------- Connection logic to gauge chart ----------------- //

// rendring the gauge with default value of 0;
function onDocumentReady(gauge) {
  gauge.renderChart();
  gauge.update(0);
}

// updating the gauge with the user input (incomeRate)
function updateGauge(gauge2, num) {
  gauge2.update(num);
}

// we want render the gauge graph when the document is loaded
if (!window.isLoaded) {
  window.addEventListener(
    "load",
    function() {
      onDocumentReady(powerGauge);
    },
    false
  );
} else {
  onDocumentReady(powerGauge);
}


// :Part3: -------- Getting the input data and do calculation ------------- //

let propertyData;
// let incomeRate;
const _calculateIncomeRate = propertyData => {
  let rent = propertyData.size * propertyData.squareMeterRent * 12; // total rent / year
  let rate = (rent / propertyData.price) * 100; // calculate incomeRate
  let roundedRate = rate.toFixed(2);
  console.log(`${roundedRate} %`); //`${roundedRate} %`;

  return roundedRate;
};

const getInput = event => {
  event.preventDefault();
  propertyData = {
    price: document.getElementById("priceInput").value,
    size: document.getElementById("squareMetersInput").value,
    squareMeterRent: document.getElementById("rentInput").value,
    // city: document.getElementById("cityInput").value

  };
  console.log(propertyData);

  // deletes old element from DOM before rendering  new
  let incomeRate = _calculateIncomeRate(propertyData);
  if (incomeRate > 50 ) {
    return alert(
      `${incomeRate}% return? Right input? Your property numbers seems to be unrealistic. If they are real, go and buy that property right NOW!!!! `
    );
  }
  let oldEle = document.getElementById("IncomeRate");
  if (oldEle) oldEle.remove();

  // rendering calculated rent rate on page
  let result = document.createElement("h2");
  result.setAttribute("id", "IncomeRate");

  result.innerHTML = incomeRate + "%";
  document.getElementById("Your-return-rate").appendChild(result);
  

  updateGauge(powerGauge, incomeRate);
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnProperty").addEventListener("click", getInput);
});









