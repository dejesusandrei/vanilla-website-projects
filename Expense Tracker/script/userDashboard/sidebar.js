const logOutContainer = document.querySelector('.sidebar-log-out');
const mouseHover = document.querySelectorAll('.sidebar-links');

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


