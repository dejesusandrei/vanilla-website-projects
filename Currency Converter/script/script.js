const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const exchangeBtn = document.getElementById('exhange-btn');
const amount = document.getElementById('amount');
const errorMessage = document.getElementById('error');
const resultMessage = document.getElementById('result');

async function loadDropdowns() {
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    const list = await res.json();

    const popularCurrencies = ['usd', 'php', 'eur', 'jpy', 'gbp', 'aud', 'cad', 'sgd', 'hkd'];

    console.log(list);

    const optionsHTML = Object.entries(list)
        .filter(([code]) => popularCurrencies.includes(code))
        .map(([code, name]) => `<option value="${code}">${code.toUpperCase()} - ${name}</option>`)
        .join('');

    fromSelect.innerHTML = toSelect.innerHTML = optionsHTML;

    // Default values
    fromSelect.value = 'usd';
    toSelect.value = 'php';
}

async function convertCurrency() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amountRaw = amount.value;

    if (!amountRaw || isNaN(amountRaw) || amountRaw <= 0) {
        errorMessage.textContent = "Please enter a valid amount.";
        return; // Hihinto na rito ang code
    }

    try {
        errorMessage.textContent = "";

        const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`);
        const data = await res.json();

        const rate = data[from][to];
        const total = amountRaw * rate;

        const formattedTotal =  total.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        resultMessage.style.display = 'flex';
        resultMessage.textContent = `${amountRaw} ${from.toUpperCase()} = ${formattedTotal} ${to.toUpperCase()}`;
    } catch (error) {
        errorMessage.textContent = "Failed to fetch exchange rates.";
        resultMessage.style.display = 'none';
    }
}

loadDropdowns();
exchangeBtn.addEventListener('click', convertCurrency);