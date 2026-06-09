import {User} from '../../data/users.js';

const userSystem = new User('userAccounts');
const backBtn = document.getElementById('back-btn');
const alreadyHaveAccountBtn = document.querySelector('.have-acc-btn');
const emaillnput =  document.getElementById('newEmail');
const createAccountForm = document.getElementById('create-acc-form');
const main = document.querySelector('main');
const accountCreatedModal = document.querySelector('.account-created');
const closeBtn = document.querySelector('.close-btn');
const dashboard = document.querySelector('.dashboard-btn');

backBtn.addEventListener('click', () =>{
    window.location.href = 'login.html';
});

alreadyHaveAccountBtn.addEventListener('click', () =>{
    window.location.href = 'login.html';
});

createAccountForm.addEventListener('submit', registerAccount);
createAccountForm.addEventListener('keydown', (e) =>{
    if(e.target === 'Enter'){
        registerAccount(e);
        showAccountCreated();
    }
});

let currentEmail = '';
let loginResult = '';
function registerAccount(e){    
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();

    const fullName = `${firstName} ${lastName}`.trim();
    if(!email.includes('@') || !email.includes('.')){
        emaillnput.classList.add('email-error');
        return;
    }

    currentEmail = email;
    userSystem.register(fullName, email, password);
    loginResult = userSystem.checkLogin(email, password);
    showAccountCreated();
    e.target.reset();
}

closeBtn.addEventListener('click', () => {
    showAccountCreated();
    return;
});

dashboard.addEventListener('click', () =>{
    const user = loginResult.userExist;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('activePage', 'dashboard');

    window.location.href = currentEmail === 'andreidejesus@gmail.com' ? 'adminDashboard.html' : 'userDashboard.html';
});

const showAccountCreated = () => {
    accountCreatedModal.classList.toggle('show-account-created-modal');
    main.classList.toggle('blur-effect');
}

console.log(userSystem.users);