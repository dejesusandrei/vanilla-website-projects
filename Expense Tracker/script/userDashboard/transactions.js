import { Transaction } from "../../data/transaction.js";

const emptyAddTransacBtn = document.getElementById('empty-state-add-transaction');
const addTransactionBtn = document.querySelector('.add-transaction-btn');
const cancelTransac = document.getElementById('cancel-transaction');
const closeAddTransacModal = document.getElementById('close-add-transaction-modal');
const modal = document.getElementById('add-transaction-modal');
const saveBtn = document.getElementById('save-transaction');

const header = document.querySelector('header');
const sidebar = document.querySelector('.side-bar');
const main = document.querySelector('main');
const editModal = document.getElementById('edit-transaction-modal');
const tableBody = document.querySelector('.transaction-items-body');

// get the current user from localStorage to associate transactions with the user
const saveUser = JSON.parse(localStorage.getItem('currentUser'));
let userTransaction;

if(saveUser){
    userTransaction = new Transaction(`transaction-${saveUser.id}`);
} else{
    window.location.href = 'login.html';
}

saveBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const categorySelect = document.getElementById('category-transaction');
    const categoryName = categorySelect.value;
    const categoryType = categorySelect.selectedOptions[0].getAttribute('data-type-category');
    const descriptionText = document.getElementById('description').value;
    const rawAmount = document.getElementById('incomeText').value;
    const rawDate = document.getElementById('transaction-date').value;

    if(!categoryName || !categoryType || !descriptionText || !rawAmount || !rawDate){
        alert('Please fill in all fields.');
        return;
    }

    const parsedAmount = parseFloat(rawAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    userTransaction.addTransaction(rawDate, descriptionText, categoryName, categoryType, rawAmount, e);
    addTransacToggleModal();
});

let currentEditingCategoryId = null;
tableBody.addEventListener('click', (e) =>{
    const deleteBtn = e.target.closest('.js-delete-btn');
    if(deleteBtn){
        const transactionId = Number(deleteBtn.getAttribute('data-category-id'));
        userTransaction.deleteTransaction(transactionId);
        return;
    }

    const editBtn = e.target.closest('.js-edit-btn');
    if(editBtn){
        const transactionId = Number(editBtn.getAttribute('data-category-id'));
        currentEditingCategoryId = transactionId;
        userTransaction.openEditModal(transactionId);

        editTransacToggleModal();
        return;
    }
});

// editModal.addEventListener('click', (e) =>{
//     e.preventDefault();
//     if(e.target.closest('#close-edit-transaction-modal'))  {editTransacToggleModal(); return;}
//     if(e.target.closest('#cancel-edit-transaction')) {editTransacToggleModal(); return;}
//     if(){
//         console.log('save');
//     }
// });

emptyAddTransacBtn.addEventListener('click', () => addTransacToggleModal());
closeAddTransacModal.addEventListener('click', () => addTransacToggleModal());
cancelTransac.addEventListener('click', () => addTransacToggleModal());
addTransactionBtn.addEventListener('click', () => addTransacToggleModal());

const addTransacToggleModal = () => {
    modal.classList.toggle('show-open-category-modal');
    header.classList.toggle('blur-effect');
    sidebar.classList.toggle('blur-effect');
    main.classList.toggle('blur-effect');
};

const editTransacToggleModal = () => {
    editModal.classList.toggle('show-open-category-modal');
    header.classList.toggle('blur-effect');
    sidebar.classList.toggle('blur-effect');
    main.classList.toggle('blur-effect');
};


console.log(userTransaction.transaction);
userTransaction.isTransactionEmpty();
userTransaction.renderTransaction();