export class Transaction{
    #localStorageKey;
    transaction;
    date;
    description;
    category;
    type;
    amount;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.transaction = undefined;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.transaction = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.transaction));
    }

    isTransactionEmpty(){
        const addTransactionBtn = document.querySelector('.add-transaction-btn');
        const emptyTransactionContainer = document.querySelector('.empty-transaction');
        const tableContainer = document.getElementById('transaction-table');

        if(!addTransactionBtn || !emptyTransactionContainer || !tableContainer) return;

        addTransactionBtn.style.display = this.transaction.length === 0 ? 'none' : 'display';
        emptyTransactionContainer.style.display = this.transaction.length === 0 ? 'flex' : 'none';
        tableContainer.style.display = this.transaction.length === 0 ? 'none' : 'table';
    }
}