import {User} from '../../data/users.js';

const userSystem = new User('userAccounts');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warningMessageEmail = document.querySelector('.warning');
const warningMessagePassword = document.querySelector('.warning-1');
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', login);
loginForm.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){ login(e); }
});

function login(e){
    e.preventDefault();
    // Reset previous error styles before validation
    emailInput.classList.remove('email-error');
    passwordInput.classList.remove('password-error');
    warningMessageEmail.classList.remove('js-warning');
    warningMessagePassword.classList.remove('js-warning');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if(!email.includes('@') || !email.includes('.')){
        emailInput.classList.add('email-error');
        return;
    }
    
    const loginResult = userSystem.checkLogin(email, password);
    // Handle authentication failures
    if (!loginResult.success) {
        if (loginResult.error === 'email') {
            emailInput.classList.add('email-error');
            warningMessageEmail.classList.add('js-warning');
        } else if (loginResult.error === 'password') {
            passwordInput.classList.add('password-error');
            warningMessagePassword.classList.add('js-warning');
        }
        return; // Stop execution
    }
    // Access the user object from the successful result
    const user = loginResult.userExist;

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('activePage', 'dashboard');

    // Redirect based on role (defaulting to userDashboard if role is undefined)
    window.location.href = user.role === 'admin' ? 'adminDashboard.html' : 'userDashboard.html';
    e.target.reset();
}

// create account button
const createAccountBtn = document.querySelector('.create-acc-btn');
createAccountBtn.addEventListener('click', createAccount);
function createAccount(e){
    e.preventDefault();
    window.location.href = 'createAccount.html';
}