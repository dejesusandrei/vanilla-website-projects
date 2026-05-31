document.addEventListener('DOMContentLoaded', () =>{
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return; 
    }

    const currentActivePage = localStorage.getItem('activePage') || 'dashboard';
    renderSetActivePageUI(currentActivePage);
    const sidebarLinks = document.querySelectorAll('.sidebar-links');

    sidebarLinks.forEach(link =>{
        const h4 = link.querySelector('.h4-hover');
        const normalIcon = link.querySelector('.normal-icon');
        const hoverIcon = link.querySelector('.hover-icon');

        if (!h4 || !normalIcon || !hoverIcon) return;

        const toggleHoverState = (isHovered) => {
            h4.style.color = isHovered ? '#5B21B6' : '#4d4d4d';
            normalIcon.style.display = isHovered ? 'none' : 'inline';
            hoverIcon.style.display = isHovered ? 'inline' : 'none';
            link.style.backgroundColor = isHovered ? '#864de119' : 'transparent';
        };

        link.addEventListener('mouseenter', () => {
            // PROTEKSYON: Kung ito ang active page, HUWAG ibalik sa gray ang kulay
            if (link.classList.contains('active')) return;
            toggleHoverState(true);
        });
        link.addEventListener('mouseleave', () => {
            // PROTEKSYON: Kung ito ang active page, HUWAG ibalik sa gray ang kulay
            if (link.classList.contains('active')) return;
            toggleHoverState(false);
        });

        // active link
        link.addEventListener('click', () =>{
            const pageName = h4.textContent.trim().toLowerCase();

            if (pageName !== 'logout') {
                localStorage.setItem('activePage', pageName);
                renderSetActivePageUI(pageName);
            }
        });
    });
});

function renderSetActivePageUI(pageName){
    const sidebarLinks = document.querySelectorAll('.sidebar-links');

    sidebarLinks.forEach(link => {
        const h4 = link.querySelector('.h4-hover');
        const normalIcon = link.querySelector('.normal-icon');
        const hoverIcon = link.querySelector('.hover-icon');
        
        if (!h4 || !normalIcon || !hoverIcon) return;

        const toggleActiveState = (isActive) => {
            h4.style.color = isActive ? '#5B21B6' : '#4d4d4d';
            normalIcon.style.display = isActive ? 'none' : 'inline';
            hoverIcon.style.display = isActive ? 'inline' : 'none';
            link.style.backgroundColor = isActive ? '#864de119' : 'transparent';
        };

        const currentLinkText = h4.textContent.trim().toLowerCase();
        if(currentLinkText === pageName){
            toggleActiveState(true);
            link.classList.add('active');
        }else{
            toggleActiveState(false);
            link.classList.remove('active');
        }
    });
}