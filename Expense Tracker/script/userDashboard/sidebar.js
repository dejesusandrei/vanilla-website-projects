const logOutContainer = document.querySelector('.sidebar-log-out');
const mouseHover = document.querySelectorAll('.sidebar-links');
const toggleBar = document.getElementById('toggle-bar');
const toggleContainer = document.getElementById('toggle-container');
const toggleBarX = document.getElementById('toggle-x');
const logoText = document.getElementById('logo-text');
const logoIconContainer = document.getElementById('logo-container');
const sideBar = document.querySelector(".side-bar");


// Logout
logOutContainer.addEventListener('click', () =>{
    window.location.href = 'login.html';
});

// sidebar hover
mouseHover.forEach(link => {
    const h4 = link.querySelector('.h4-hover');
    const normalIcon = link.querySelector('.normal-icon');
    const hoverIcon = link.querySelector('.hover-icon');
    if(h4 && normalIcon && hoverIcon){
        link.addEventListener('mouseenter', () =>{
            h4.style.color = '#5B21B6';
            normalIcon.style.display = 'none';
            hoverIcon.style.display = 'inline';
        });
        link.addEventListener('mouseleave', () =>{
            h4.style.color = '#4d4d4d';
            normalIcon.style.display = 'inline';
            hoverIcon.style.display = 'none';
        });
    }
});


// toggle
toggleBar.addEventListener('click', () =>{
    if(toggleBarX) toggleBarX.style.display = 'block';
    if(toggleContainer) toggleContainer.style.marginLeft = '0' ;
    if(logoIconContainer) {
        logoIconContainer.style.borderRight = '1px solid rgb(203, 203, 203)';
        logoIconContainer.style.borderBottom = '1px solid white';
    }
    if(toggleBar) toggleBar.style.display = 'none';
    if(logoText) logoText.style.display = 'none';

    const h4Collapse = document.querySelectorAll('.collapse');
    sideBar.style.width = '70px';
    h4Collapse.forEach(h4 => {
        h4.style.display = 'none';
    });

});

// toggle X
toggleBarX.addEventListener('click', () =>{
    if(toggleBarX) toggleBarX.style.display = 'none';
    if(toggleBar) toggleBar.style.display = 'block';
    if(toggleContainer) toggleContainer.style.marginLeft = '2em' ;
    if(logoIconContainer){ 
        logoIconContainer.style.borderRight = 'none';
        logoIconContainer.style.borderBottom = 'none';
    }
    if(logoText) logoText.style.display = 'flex';
    const h4Collapse = document.querySelectorAll('.collapse');
    sideBar.style.width = '240px';
    h4Collapse.forEach(h4 => {
        h4.style.display = 'block';
    });

});