import { Category } from '../../data/category.js';
import { addedMessage, deletedMessage, editedMessage } from "../controls/toastCategories.js";

const emptyStateAddCategoryBtn = document.getElementById('empty-state-add-category');
const closeAddCategModal= document.getElementById('close-add-categ-modal');
const cancelModal = document.querySelector('.js-cancel-category');
const saveBtn = document.getElementById('save-category');
const addCategoryBtn = document.querySelector('.add-category-btn');

const header = document.querySelector('header');
const sidebar = document.querySelector('.side-bar');
const main = document.querySelector('main');
const modal = document.getElementById('add-category-modal');
const editModal = document.getElementById('edit-category-modal');
const tableBody = document.querySelector('.category-items-body');

// get the current user from localStorage to associate categories with the user
const saveUser = JSON.parse(localStorage.getItem('currentUser'));
const userCategories = saveUser ? new Category(`categories-${saveUser.id}`) : (window.location.href = 'login.html');

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
    addedMessage();
});

addCategoryBtn.addEventListener('click', (e) => {
    addCategToggleModal();
});

// event delegation for delete buttons and edit buttons
let currentEditingCategoryId = null;
tableBody.addEventListener('click', (e) =>{
    const deleteBtn = e.target.closest('.js-delete-btn');
    if (deleteBtn) {
        const categoryId = Number(deleteBtn.getAttribute('data-category-id'));
        userCategories.deleteCategory(categoryId);

        const tableRow = document.querySelector(`.row-${categoryId}`);
        if (tableRow) tableRow.remove();
        deletedMessage();
        return;
    }

    const editBtn = e.target.closest('.js-edit-btn');
    if(editBtn){
        const categoryId = Number(editBtn.getAttribute('data-category-id'));
        currentEditingCategoryId = categoryId;
        userCategories.openEditModal(categoryId);
        editCategToggleModal();
    }
});

editModal.addEventListener('click', (e) =>{
    e.preventDefault();
    if(e.target.closest('#close-edit-categ-modal'))  {e.target.closest('.category-edit-form').reset(); editCategToggleModal(); return;}
    if(e.target.closest('#cancel-edit-category')) {e.target.closest('.category-edit-form').reset(); editCategToggleModal(); return;}
    if(e.target.closest('#save-changes')){
        const categoryId = currentEditingCategoryId;
        const categoryName = document.getElementById('categoryEditName').value.trim();
        const categoryType = document.getElementById('typeEditCategory').value.trim();

        if(!categoryName || !categoryType){
            alert('Please fill in all fields.');
            return;
        }

        userCategories.editCategory(categoryId, categoryName, categoryType, e);
        editCategToggleModal();
        editedMessage();
    }
});

const addCategToggleModal = () => {
    modal.classList.toggle('show-open-category-modal');
    header.classList.toggle('blur-effect');
    sidebar.classList.toggle('blur-effect');
    main.classList.toggle('blur-effect');
};

const editCategToggleModal = () => {
    editModal.classList.toggle('show-open-category-modal');
    header.classList.toggle('blur-effect');
    sidebar.classList.toggle('blur-effect');
    main.classList.toggle('blur-effect');
};

emptyStateAddCategoryBtn.addEventListener('click', () => addCategToggleModal());
cancelModal.addEventListener('click', (e) => { e.preventDefault(); e.target.closest('.category-form').reset(); addCategToggleModal();});
closeAddCategModal.addEventListener('click', (e) => {e.preventDefault(); e.target.closest('.category-form').reset(); addCategToggleModal();});