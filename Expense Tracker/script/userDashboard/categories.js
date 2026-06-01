const emptyStateAddCategoryBtn = document.getElementById('empty-state-add-category');
const closeAddCategModal= document.getElementById('close-add-categ-modal');
const cancelModal = document.querySelector('.js-cancel-category');


const header = document.querySelector('header');
const sidebar = document.querySelector('.side-bar');
const main = document.querySelector('main');
const modal = document.getElementById('add-category-modal');


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