window.addEventListener('DOMContentLoaded', event => {

    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    if(window.innerWidth > 991) {
        menuItems = document.getElementById("navbarResponsive").getElementsByTagName("a");

        menuDisplay(menuItems)

        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].onclick = function(){
                for (let i = 0; i < menuItems.length; i++) {
                    menuItems[i].classList.remove("active");
                }

                menuItems[i].classList.add("active");

                menuDisplay(menuItems)
            };
        }
    }

});

function menuDisplay(menuItems) {
        for (let i = 0; i < menuItems.length; i++) {
            href = menuItems[i].href.split('html')
            div = document.body.querySelector(href[1])

            if (!menuItems[i].classList.contains('active')) {
                div.setAttribute("style","display:none;")
            }else {
                div.setAttribute("style","display:block;")
            }
        }
}