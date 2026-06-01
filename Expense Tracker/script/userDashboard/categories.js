import { Category } from '../../data/category.js';

const emptyStateAddCategoryBtn = document.getElementById('empty-state-add-category');
const closeAddCategModal= document.getElementById('close-add-categ-modal');
const cancelModal = document.querySelector('.js-cancel-category');
const saveBtn = document.getElementById('save-category');

const header = document.querySelector('header');
const sidebar = document.querySelector('.side-bar');
const main = document.querySelector('main');
const modal = document.getElementById('add-category-modal');

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

    userCategories.addCategory(categoryName, categoryType);
    addCategToggleModal();
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