import { Transaction } from "../../data/transaction.js";
import { formatCurrency } from '../../script/utility/money.js';

const emptyAddTransacBtn = document.getElementById('empty-state-add-transaction');
const cancelTransac = document.getElementById('cancel-transaction');
const closeAddTransacModal = document.getElementById('close-add-transaction-modal');
const modal = document.getElementById('add-transaction-modal');

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

emptyAddTransacBtn.addEventListener('click', () =>addTransacToggleModal());
closeAddTransacModal.addEventListener('click', () =>addTransacToggleModal());
cancelTransac.addEventListener('click', () =>addTransacToggleModal());

const addTransacToggleModal = () => {
    modal.classList.toggle('show-open-category-modal');
    header.classList.toggle('blur-effect');
    sidebar.classList.toggle('blur-effect');
    main.classList.toggle('blur-effect');
};

userTransaction.isTransactionEmpty();
console.log(saveUser);