import { requestAPI } from "../ajax/functions.js";
import { renderProfile, renderTags, renderUsers } from "../dom/functions.js";

const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'index.html';
}

const reqUsers = await requestAPI('users', 'GET', token);
const users = reqUsers.json;
const $users = renderUsers(users);

/* const reqSended = await requestAPI('profile/compliments/send', 'GET', token);
const sendedCompliments = reqSended.json;

for (const compliment of sendedCompliments) {
    console.log(compliment);
} */

const reqTags = await requestAPI('tags', 'GET', token);
const tags = reqTags.json;
const $tags = renderTags(tags);

const sendComplimentBtns = document.getElementsByClassName('home__user--compliment');
const viewProfileBtns = document.getElementsByClassName('home__user--profile');
const closeBtns = document.getElementsByClassName('home__display--close');

const $display = document.querySelector('.home__display');
const $sendComplimentContainer = document.querySelector('.home__display--container--tag');

const $viewProfileContainer = document.querySelector('.home__display--container--profile');

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

const $exitButton = document.querySelector('.header__button--exit');
$exitButton.addEventListener('click', () => {
    localStorage.setItem('token', '');
    window.location.href = 'index.html';
})

const $complimentForm = document.querySelector('.home__display--form');
$complimentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const $successMessage = document.querySelector('.home__display--success');
    const $errorMessage = document.querySelector('.home__display--error');
    const $errorMessageContent = document.querySelector('.home__display--message--error-title');
    const userReceiverName = localStorage.getItem('user_receiver');
    const userReceiver = $users[userReceiverName].id;
    const message = document.querySelector('textarea').value;
    const tag = localStorage.getItem('tag');

    if (message) {
        const reqCompliment = requestAPI('compliments/send', 'POST', token, {
            tag_id: tag,
            user_receiver: userReceiver,
            message: message
        })
            .then(({response, json}) => {
                const statusCode = response.status;
                const errorMessage = json.error;

                switch (statusCode) {
                    case 200:
                        $successMessage.style.display = 'flex';
                        setTimeout(() => {
                            $display.style = 'none';
                            $successMessage.style.display ='none';
                        }, 1200)
                        break;
                    default:
                        $errorMessageContent.textContent = 'Você não pode elogiar a si mesmo!'
                        $errorMessage.style.display = 'flex';
                        setTimeout(() => {
                            $errorMessage.style.display = 'none';
                        }, 2500)
                }
            });
    } else {
        $errorMessageContent.textContent = 'A mensagem não pode ser vazia!'
        $errorMessage.style.display = 'flex';
        setTimeout(() => {
            $errorMessage.style.display = 'none';
        }, 2500)
    }

});