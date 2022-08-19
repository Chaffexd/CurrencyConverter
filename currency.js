// Currencies available as options
const currencies = {
    GBP: "Pound Sterling",
    AUD: "Australian Dollar",
    AED: "UAE Dirham",
    ARS: "Argentine Peso",
    BRL: "Brazilian Real",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Renminbi",
    COP: "Colombian Peso",
    CRC: "Costa Rican Colon",
    CUP: "Cuban Peso",
    CVE: "Cape Verdean Escudo",
    CZK: "Czech Koruna",
    DKK: "Danish Krone",
    EGP: "Egyptian Pound",
    EUR: "Euro",
    FJD: "Fiji Dollar",
    FKP: "Falkland Islands Pound",
    HKD: "Hong Kong Dollar",
    HRK: "Croatian Kuna",
    HUF: "Hungarian Forint",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    KRW: "South Korean Won",
    LKR: "Sri Lanka Rupee",
    MXN: "Mexican Peso",
    NOK: "Norwegian Krone",
    NZD: "New Zealand Dollar",
    PHP: "Philippine Peso",
    PLN: "Polish Złoty",
    RUB: "Russian Ruble",
    SEK: "Swedish Krona",
    SGD: "Singapore Dollar",
    THB: "Thai Baht",
    TRY: "Turkish Lira",
    TWD: "New Taiwan Dollar",
    USD: "United States Dollar",
    ZAR: "South African Rand",
};

// returns the data from our object, currencies and lays the options out as so
function getOptions(data) {
    return Object.entries(data)
    .map(([country, currency]) => `<option value="${country}">${country} | ${currency}</option>`)
    .join("");
}

// Grabs currencies and sets their content as what is available in currencies
const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");
primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies);

// Our API call
function fetchCurrencies() {
    const primary = primaryCurrency.value;     // takes the value of first currency
    const secondary = secondaryCurrency.value; // takes the value of second currency
    const amount = document.getElementById("amount").value;
    fetch("https://v6.exchangerate-api.com/v6/46425ff7eaf0bc9ca4e1fa18/latest/" + primary)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then((data) => {
        console.log(data);
        displayCurrency(data, primary, secondary, amount);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}
// Takes data from the API
function displayCurrency(data, primary, secondary, amount) {
    // Takes entered amount and multiplies it by the API conversion rates for the secondary currency
    const calculated = amount * data.conversion_rates[secondary]; 
    // Updates the HTML elements
    document.getElementById("currencyExchange").setAttribute("style", "display:block");
    document.getElementById("from").innerText = amount + " " + primary + " = ";
    document.getElementById("to").innerText = calculated + " " + secondary;
}

// Gets our button and performs function on click
document.getElementById("convert").addEventListener("click", fetchCurrencies);

