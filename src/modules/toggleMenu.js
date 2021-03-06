const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            activeMenu = document.querySelector('.active-menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', event => {
            let target = event.target;
            if (target.tagName === 'A') {
                handlerMenu();
            }
        });

};

export default toggleMenu;