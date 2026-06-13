import { Transaction } from "../../data/transaction.js";

const emptyAddTransacBtn = document.getElementById('empty-state-add-transaction');
const addTransactionBtn = document.querySelector('.add-transaction-btn');
const cancelTransac = document.getElementById('cancel-transaction');
const closeAddTransacModal = document.getElementById('close-add-transaction-modal');
const modal = document.getElementById('add-transaction-modal');
const saveBtn = document.getElementById('save-transaction');
const searchFilter = document.getElementById('search');
const categoryDropdown = document.getElementById('category-dropdown');
const typeDropdown = document.getElementById('type-dropdown');

const header = document.querySelector('header');
const sidebar = document.querySelector('.side-bar');
const main = document.querySelector('main');
const editModal = document.getElementById('edit-transaction-modal');
const tableBody = document.querySelector('.transaction-items-body');

// get the current user from localStorage to associate transactions with the user
const saveUser = JSON.parse(localStorage.getItem('currentUser'));
const userTransaction = saveUser ? new Transaction(`transaction-${saveUser.id}`) : window.location.href = 'login.html';

// Filter
searchFilter.addEventListener('keyup', updateFilter);
categoryDropdown.addEventListener('change', updateFilter);
typeDropdown.addEventListener('change', updateFilter);
function updateFilter(){
    let searchText = searchFilter.value.toLowerCase();
    let selectedCategory = categoryDropdown.value.toLowerCase();
    let selectedType = typeDropdown.value.toLowerCase();
    let tableRow = document.querySelectorAll('.table-items');

    tableRow.forEach(tableRowItem =>{
        const description = tableRowItem.cells[1].textContent.toLowerCase();
        const category = tableRowItem.cells[2].textContent.toLowerCase();
        const type = tableRowItem.cells[3].textContent.toLowerCase();

        const matchesText = description.includes(searchText) || category.includes(searchText) || type.includes(searchText);
        const matchesCategory = (selectedCategory === 'all categories') || (category === selectedCategory);
        const matchesType = (selectedType === 'all types') || (type === selectedType);

        if(matchesText && matchesCategory && matchesType){
            tableRowItem.style.display = '';
        }else { tableRowItem.style.display = 'none'; }
    });
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

console.log(userTransaction.transaction);

editModal.addEventListener('click', (e) =>{
    e.preventDefault();
    if(e.target.closest('#close-edit-transaction-modal'))  {editTransacToggleModal(); return;}
    if(e.target.closest('#cancel-edit-transaction')) {editTransacToggleModal(); return;}
    if(e.target.closest('#save-edit-transaction')){
        e.preventDefault();
        const transactionId = currentEditingCategoryId;
        const categorySelect = document.getElementById('category-edit-transaction');
        const categoryName = categorySelect.value;
        const categoryType = categorySelect.selectedOptions[0].getAttribute('data-type-category');
        const descriptionText = document.getElementById('edit-description').value;
        const rawAmount = document.getElementById('incomeEditText').value;
        const rawDate = document.getElementById('transaction-edit-date').value;

        if(!categoryName || !categoryType || !descriptionText || !rawAmount || !rawDate){
            alert('Please fill in all fields.');
            return;
        }

        const parsedAmount = parseFloat(rawAmount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        userTransaction.editTransaction(transactionId, rawDate, descriptionText, categoryName, categoryType, rawAmount, e);
        editTransacToggleModal();
        }
});

emptyAddTransacBtn.addEventListener('click', () => addTransacToggleModal());
closeAddTransacModal.addEventListener('click', (e) =>{e.preventDefault(); e.target.closest('.transaction-form').reset(); addTransacToggleModal()});
cancelTransac.addEventListener('click', (e) => {e.preventDefault(); e.target.closest('.transaction-form').reset(); addTransacToggleModal()});
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