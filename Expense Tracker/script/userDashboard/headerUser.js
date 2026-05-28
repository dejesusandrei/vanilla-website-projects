document.addEventListener('DOMContentLoaded', userLogged);

function userLogged(e){
    const savedUser = localStorage.getItem('currentUser');

    const userName = document.getElementById('user-name');
    const userNameLogo = document.getElementById('user-logo-text');
    if(savedUser){
        const user = JSON.parse(savedUser);
        
        const currentFullName = user.fullName || 'User';
        if(userName) userName.textContent = currentFullName;
        if(userNameLogo) userNameLogo.textContent = currentFullName.charAt(0).toUpperCase();
    }
    else{
        window.location.href = 'login.html';
    }
}