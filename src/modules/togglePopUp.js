const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                let count = 0;
                const animatePopup = function() {
                    count++;
                    popupContent.style.left = count * 35 + 'px';
                    popupContent.style.top = count * 15 + 'px';
                    if (count < 20) {
                        setTimeout(animatePopup, 5);
                    }
                };
                if (screen.width > 920) {
                    animatePopup();
                }
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
};

export default togglePopUp;