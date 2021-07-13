const buttons = document.getElementsByClassName('home__user--compliment');
const $display = document.querySelector('.home__display');
const $close = document.querySelector('.home__display--close');
const $btnPageOne = document.querySelector('.home__display--switch1');
const $btnPageTwo = document.querySelector('.home__display--switch2');
const $pageOne = document.querySelector('.home__display--page--one');
const $pageTwo = document.querySelector('.home__display--page--two');

function selectElem(elem, callback) {
    const $elem = document.querySelector(elem);
    callback($elem);
    return $elem;
}


for (const button of buttons) {
    button.addEventListener('click', () => {
        $display.style.display = 'flex';
    })
}

const close = selectElem('.home__display--close', (button) => {
    button.addEventListener('click', () => {
        $display.style.display = 'none';
    })
})

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