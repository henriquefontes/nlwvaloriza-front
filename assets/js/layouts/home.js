import { getUsers, getTags, postCompliment } from "../ajax/functions.js";
import { renderProfile, renderTags, renderUsers } from "../dom/functions.js";

const token = localStorage.getItem('token');

const users = await getUsers(token);
const $users = renderUsers(users);

const tags = await getTags(token);
const $tags = renderTags(tags);

const sendComplimentBtns = document.getElementsByClassName('home__user--compliment');
const viewProfileBtns = document.getElementsByClassName('home__user--profile');
const closeBtns = document.getElementsByClassName('home__display--close');

const $display = document.querySelector('.home__display');
const tagsBtns = document.getElementsByClassName('home__display--tag');
const $sendComplimentContainer = document.querySelector('.home__display--container--tag');

const $viewProfileContainer = document.querySelector('.home__display--container--profile');

const $close = document.querySelector('.home__display--close');
const $btnPageOne = document.querySelector('.home__display--switch1');
const $btnPageTwo = document.querySelector('.home__display--switch2');
const $pageOne = document.querySelector('.home__display--page--one');
const $pageTwo = document.querySelector('.home__display--page--two');
const $errorMessage = document.querySelector('.home__display--error');

for (const button of sendComplimentBtns) {
    button.addEventListener('click', () => {
        $display.style.display = 'flex';
        $sendComplimentContainer.style.display = 'flex';
        $viewProfileContainer.style.display = 'none';
        
        const user = button.getAttribute('id');

        localStorage.setItem('user_receiver', user);
    })
}

for (const button of viewProfileBtns) {
    button.addEventListener('click', () => {
        $display.style.display = 'flex';
        $viewProfileContainer.style.display = 'flex';
        $sendComplimentContainer.style.display = 'none';

        const user = button.getAttribute('id');

        renderProfile($users[user]);
    })
}

for (const button of closeBtns) {
    button.addEventListener('click', () => {
        $display.style.display = 'none';
    })
}

$btnPageOne.addEventListener('click', () => {
    let modifier = $btnPageOne.getAttribute('class').split(' ')[1];

    if(modifier == 'not-selected') {
        $pageTwo.style.cssText = `
            transition: .5s transform;
            transform: translateX(105%);
        `;
        $pageOne.style.cssText = `
            transition: .5s transform;
            transform: translateX(0);
        `;

        let element = $btnPageOne.getAttribute('class').split(' ')[0];

        modifier = 'selected';

        $btnPageOne.setAttribute('class', `${element} ${modifier}`);
        $btnPageTwo.setAttribute('class', `${$btnPageTwo.getAttribute('class').split(' ')[0]} not-selected`)
    }
});

$btnPageTwo.addEventListener('click', () => {
    let modifier = $btnPageTwo.getAttribute('class').split(' ')[1];

    if(modifier == 'not-selected') {
        $pageOne.style.cssText = `
            transition: .5s transform;
            transform: translateX(-105%);
        `;
        $pageTwo.style.cssText = `
            transition: .5s transform;
            transform: translateX(0);
        `;
    
        let element = $btnPageTwo.getAttribute('class').split(' ')[0];


        $btnPageTwo.setAttribute('class', `${element} selected`)
        $btnPageOne.setAttribute('class', `${$btnPageOne.getAttribute('class').split(' ')[0]} not-selected`)
    }
});

const $exitButton = document.querySelector('.header__right--nav--exit');
$exitButton.addEventListener('click', () => {
    localStorage.setItem('token', '');
    window.location.href = 'index.html';
})

const $complimentForm = document.querySelector('.home__display--form');
$complimentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userReceiverName = localStorage.getItem('user_receiver');
    const userReceiverData = $users[userReceiverName];
    const message = document.querySelector('textarea').value;
    const tag = localStorage.getItem('tag');

    if (message) {
        const compliment = postCompliment(tag, userReceiverData, message, token)
            .then(({response, json}) => {
                const statusCode = response.status;
                const errorMessage = json.error;

                switch (statusCode) {
                    case 200:
                        $display.style.display = 'none';
                        alert('elogio enviado')
                        console.log(data)
                        break;
                    default:
                        alert(errorMessage);
                        break;
                }
            });
    }

})