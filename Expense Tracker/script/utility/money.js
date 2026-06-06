export function formatCurrency(incomeText){
    if (!incomeText) return;

    const noCommas = incomeText.replace(/,/g, '');
    const cleanInput = noCommas.replace(/[^0-9.]/g, '');
    const incomeNumbers = Math.round(parseFloat(cleanInput));
    
    if (isNaN(incomeNumbers) || incomeNumbers <= 0) return;

    const formattedDisplay = incomeNumbers.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formattedDisplay;
}