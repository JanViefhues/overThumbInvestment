let propertyData;

const _calculateIncomeRate = propertyData => {
  let rent = propertyData.size * propertyData.squareMeterRent * 12; // total rent / year
  let rate = rent / propertyData.price * 100; // calculate incomeRate
  let roundedRate = rate.toFixed(2);
  return `${roundedRate} %`;
  
};



const getInput = event => {
  event.preventDefault();

  propertyData = {
    price: document.getElementById("priceInput").value,
    size: document.getElementById("squareMetersInput").value,
    squareMeterRent: document.getElementById("rentInput").value
  };
  console.log(propertyData);

  // rendering the calculated rent on the page for testing
  let result = document.createElement("p");
  result.innerHTML = _calculateIncomeRate(propertyData);
  document.body.appendChild(result);  
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btnProperty")
    .addEventListener("click", getInput, _calculateIncomeRate);
})

