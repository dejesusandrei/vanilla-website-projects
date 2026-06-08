export function formatCurrency(incomeText){
    if (incomeText === undefined || incomeText === null || incomeText === '') return '0.00';

    const incomeStr = incomeText.toString();
    const noCommas = incomeStr.replace(/,/g, '');
    const cleanInput = noCommas.replace(/[^0-9.-]/g, '');
    const incomeNumbers = parseFloat(cleanInput);

    if (isNaN(incomeNumbers) || incomeNumbers === 0) return '0.00';

    return incomeNumbers.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}