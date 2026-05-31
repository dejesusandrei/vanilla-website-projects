const logOutContainer = document.querySelector('.sidebar-log-out');
const toggleBar = document.getElementById('toggle-bar');
const toggleContainer = document.getElementById('toggle-container');
const toggleBarX = document.getElementById('toggle-x');
const logoText = document.getElementById('logo-text');
const logoIconContainer = document.getElementById('logo-container');
const sideBar = document.querySelector(".side-bar");
const body = document.getElementById('body');


// Logout
logOutContainer.addEventListener('click', () =>{
    window.location.href = 'login.html';
});

const saveSidebarState = localStorage.getItem('sidebarState');
saveSidebarState === 'collapsed' ? collapseSidebar() : expandSidebar();

// toggle
toggleBar.addEventListener('click', () =>{
    collapseSidebar();
    localStorage.setItem('sidebarState', 'collapsed');
});

// toggle X
toggleBarX.addEventListener('click', () =>{
    expandSidebar();
    localStorage.setItem('sidebarState', 'expanded');
});


function collapseSidebar(){
    toggleBarX?.style.setProperty('display', 'block');
    toggleContainer?.style.setProperty('margin-left', '0');
    toggleBar?.style.setProperty('display', 'none');
    body?.style.setProperty('margin-left', '90px');
    logoText?.style.setProperty('display', 'none');

    if(logoIconContainer) {
        logoIconContainer.style.borderRight = '1px solid rgb(203, 203, 203)';
        logoIconContainer.style.borderBottom = '1px solid white';
    }
    if (sideBar) sideBar.style.width = '70px';
    
    const h4Collapse = document.querySelectorAll('.collapse');
    h4Collapse.forEach(h4 => h4.style.display = 'none');
}

function expandSidebar(){
    // Gumagamit ng ?. para sa mabilisang style changes
    // h1.style.setProperty('background-color', 'blue');
    toggleBarX?.style.setProperty('display', 'none');
    toggleBar?.style.setProperty('display', 'block');
    toggleContainer?.style.setProperty('margin-left', '2em');
    body?.style.setProperty('margin-left', '260px');
    logoText?.style.setProperty('display', 'flex');

    if(logoIconContainer){ 
        logoIconContainer.style.borderRight = 'none';
        logoIconContainer.style.borderBottom = 'none';
    }
    if (sideBar) sideBar.style.width = '240px';
    
    const h4Collapse = document.querySelectorAll('.collapse');
    h4Collapse.forEach(h4 => h4.style.display = 'block');
}