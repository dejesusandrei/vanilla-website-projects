import { Category } from '../../data/category.js';

const emptyStateAddCategoryBtn = document.getElementById('empty-state-add-category');
const closeAddCategModal= document.getElementById('close-add-categ-modal');
const cancelModal = document.querySelector('.js-cancel-category');
const saveBtn = document.getElementById('save-category');
const addCategoryBtn = document.querySelector('.add-category-btn');

const header = document.querySelector('header');
const sidebar = document.querySelector('.side-bar');
const main = document.querySelector('main');
const modal = document.getElementById('add-category-modal');
const tableBody = document.querySelector('.category-items-body');

// get the current user from localStorage to associate categories with the user
const saveUser = JSON.parse(localStorage.getItem('currentUser'));
let userCategories;

if(saveUser){
    userCategories = new Category(`categories-${saveUser.id}`);
} else {
    window.location.href = 'login.html'; 
}

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const categoryName = document.getElementById('categoryName').value.trim();
    const categoryType = document.getElementById('typeCategory').value.trim();

    if(!categoryName || !categoryType){
        alert('Please fill in all fields.');
        return;
    }

    userCategories.addCategory(categoryName, categoryType, e);
    addCategToggleModal();
});

addCategoryBtn.addEventListener('click', (e) => {
    addCategToggleModal();
});

// event delegation for delete buttons and edit buttons
tableBody.addEventListener('click', (e) =>{

    const deleteBtn = e.target.closest('.js-delete-btn');
    if (deleteBtn) {
        const categoryId = Number(deleteBtn.dataset.categoryId);
        userCategories.deleteCategory(categoryId);

        const tableRow = document.querySelector(`.row-${categoryId}`);
        if (tableRow) tableRow.remove();
        return;
    }
});

console.log(userCategories.category);

const addCategToggleModal = () => {
    modal.classList.toggle('show-open-category-modal');
    header.classList.toggle('blur-effect');
    sidebar.classList.toggle('blur-effect');
    main.classList.toggle('blur-effect');
};

emptyStateAddCategoryBtn.addEventListener('click', () =>{
    addCategToggleModal();
});

closeAddCategModal.addEventListener('click', () =>{
    addCategToggleModal();
});

cancelModal.addEventListener('click', () =>{
    addCategToggleModal();
});

userCategories.renderCategory();
userCategories.isCategoryEmpty();