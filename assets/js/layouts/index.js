import { requestAPI } from "../ajax/functions.js";

const isLogged = localStorage.getItem('token');

if (isLogged) {
    window.location.href = 'home.html';
}

let register = false;
const $form = document.querySelector('form');
const $name = document.getElementById('name-input');
const $email = document.getElementById('email-input');
const $password = document.getElementById('password-input');
const $switchBtn = document.getElementById('switch-form');


$switchBtn.addEventListener('click', () => {
    switchForm();
})

function switchForm() {
    if(register) {
        $name.style.display = 'none';
        $switchBtn.textContent = 'Criar conta';
        register = false;
        return;
    }
        $name.style.display = 'flex';
        $switchBtn.textContent = 'Já possuo uma conta';
        register = true;
}

$form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(register);

    const email = $email.value;
    const password = $password.value;

    if (register) {
        const name = $name.value;

        if(name && email && password) {
            const create = requestAPI('users', 'POST', '', {
                name: name,
                email: email,
                password: password
            })
                .then(({response, json}) => {
                    const statusCode = response.status;
                    
                    switch (statusCode) {
                        case 200:
                            alert('conta criada');
                            register = true;
                            switchForm();
                            break;
                        default:
                            console.log(response);
                            break;
                    }
                })
                .catch(e => console.log(e));

        }
    } else {
        const login = requestAPI('login', 'POST', '', {
            email: email,
            password: password
        })
            .then(({response, json}) => {
                const statusCode = response.status
                const token = json;

                switch (statusCode) {
                    case 200:
                        localStorage.setItem('token', token);
                        window.location.href = 'home.html'
                        break;
                    default:
                        console.log(response);
                        break;
                }
            })
    }
    
})