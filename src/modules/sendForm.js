const sendForm = () => {
        const errorMessage = 'Что то пошло не так ...',
            loadMessage = 'Загрузка ...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.querySelectorAll('form'),
        phone = document.querySelectorAll('input[name="user_phone'),    
        name = document.querySelectorAll('input[name="user_name"]'),   
        email = document.querySelectorAll('input[name="user_email"]'),   
        message = document.querySelectorAll('input[name="user_message"]');
        
        for (let i = 0; i < 3; i++) {
            name[i].setAttribute('required', '');
            email[i].setAttribute('required', '');
            phone[i].setAttribute('required', '');
        }   
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2 rem;';
        statusMessage.style.color = 'grey';
        
        for (let i = 0; i < form.length; i++) {
            form[i].addEventListener('submit', (event) => {
                const inputs = document.querySelectorAll('form input'),
                    popup = document.querySelector('.popup');
                
                event.preventDefault();
                form[i].appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form[i]);
                let body = {};
                
                formData.forEach((val, key) => {
                    body[key] = val;
                });   
                //4) После отправки инпуты должны очищаться
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                }  
                function hidePopup() {
                    popup.style.display = 'none';
                }
                function hideStsMsg() {
                    statusMessage.textContent = '';
                }
                
                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.textContent = successMessage
                        setTimeout(hideStsMsg, 2000);
                        setTimeout(hidePopup, 3000);
                    })
                    .catch((error) => {
                        statusMessage.textContent = errorMessage
                        console.log(error);
                        setTimeout(hideStsMsg, 2000);
                        setTimeout(hidePopup, 3000);
                    });
            });
        }

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include',
            });
        };

        //validator 
        for (let i = 0; i < form.length; i++) {
            const validator = function () {
                name[i].value = name[i].value.replace(/[^а-яА-Я \ ]/ig, '');
                message[0].value = message[0].value.replace(/[^а-яА-Я \ ]/ig, '');
            }
        name[i].addEventListener('input', validator);
        message[0].addEventListener('input', validator);
        };
        maskPhone('.form-phone');
};

export default sendForm;