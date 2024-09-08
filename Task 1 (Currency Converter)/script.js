const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const resetBtn = document.getElementById('reset-btn');

const apiKey = '4ab13dfe12d42fa4823010d1'; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function fetchCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);
    
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = currency;
        option1.textContent = option2.textContent = currency;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }

    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
    const data = await response.json();
    const rate = data.conversion_rates[to];
    const convertedAmount = (amount * rate).toFixed(2);
    
    resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
}

function resetFields() {
    amountInput.value = '';
    fromCurrency.selectedIndex = 0;
    toCurrency.selectedIndex = 0;
    resultDiv.textContent = '';
}

convertBtn.addEventListener('click', convertCurrency);
resetBtn.addEventListener('click', resetFields); // Add event listener for reset

window.onload = fetchCurrencies;



