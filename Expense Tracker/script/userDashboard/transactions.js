import { Transaction } from "../../data/transaction.js";
import { formatDate } from '../../script/utility/date.js';

const emptyAddTransacBtn = document.getElementById('empty-state-add-transaction');
const cancelTransac = document.getElementById('cancel-transaction');
const closeAddTransacModal = document.getElementById('close-add-transaction-modal');
const modal = document.getElementById('add-transaction-modal');
const saveBtn = document.getElementById('save-transaction');

const header = document.querySelector('header');
const sidebar = document.querySelector('.side-bar');
const main = document.querySelector('main');

// get the current user from localStorage to associate transactions with the user
const saveUser = JSON.parse(localStorage.getItem('currentUser'));
let userTransaction;

if(saveUser){
    userTransaction = new Transaction(`transaction-${saveUser}`);
} else{
    window.location.href = 'login.html';
}

saveBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    const categorySelect = document.getElementById('category-transaction');
    const categoryName = categorySelect.value;
    const categoryType = categorySelect.selectedOptions[0].getAttribute('data-type-category');

    if(!categoryName || !categoryType){
        alert('Please fill in all fields.');
        return;
    }
    
    const incomeText = document.getElementById('incomeText');
    // "Huwag mong buburahin ang mga numero at ang tuldok"
    const cleanInput = incomeText.value.replace(/[^0-9.]/g, '');
    const incomeNumbers = parseFloat(cleanInput);
    if (isNaN(incomeNumbers) || incomeNumbers <= 0) {
        alert('Please enter a valid number for income.');
        return;
    }

    const date = document.getElementById('transaction-date').value;
    const formattedDate = formatDate(date);

    console.log(categoryName);
    console.log(categoryType);
    console.log(incomeNumbers);
    console.log(formattedDate);
});

emptyAddTransacBtn.addEventListener('click', () => addTransacToggleModal());
closeAddTransacModal.addEventListener('click', () => addTransacToggleModal());
cancelTransac.addEventListener('click', () => addTransacToggleModal());

const addTransacToggleModal = () => {
    modal.classList.toggle('show-open-category-modal');
    header.classList.toggle('blur-effect');
    sidebar.classList.toggle('blur-effect');
    main.classList.toggle('blur-effect');
};

userTransaction.isTransactionEmpty();
console.log(saveUser);