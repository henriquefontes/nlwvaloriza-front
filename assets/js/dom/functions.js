let complimentSelected = false;

function renderProfile(user) {
    const badge = document.querySelector('.home__display--badge');
    const name = document.querySelector('.profile__header--name');

    if(user.admin) {
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }

    name.textContent = user.name;

}

function renderUsers(users) {
    const badge = document.querySelector('.home__users--user--badge');
    const usersContainer = document.querySelector('.home__users');
    const usersArr = [];


    for (const user of users) {
        usersArr[user.name] = user;
    
        const container = document.createElement('div');
        container.setAttribute('class', 'home__users--user');
    
        const admin = badge.cloneNode(true);
    
        const nameContainer = document.createElement('div');
        nameContainer.setAttribute('class', 'home__users--user--name');
    
        const name = document.createElement('span');
        name.setAttribute('class', 'home__user--name');
    
        const imageContainer = document.createElement('div');
        imageContainer.setAttribute('class', 'home__users--user--image');
    
        const image = document.createElement('img');
        image.setAttribute('class', 'home__user--image');
    
        const buttonsContainer = document.createElement('div');
        buttonsContainer.setAttribute('class', 'home__users--user--buttons');
    
        const complimentButton = document.createElement('button');
        const profileButton = document.createElement('button');
        complimentButton.setAttribute('class', 'home__user--compliment');
        complimentButton.setAttribute('id', user.name);
        
        profileButton.setAttribute('class', 'home__user--profile');
        profileButton.setAttribute('id', user.name);
        
    
        name.textContent = user.name;
        image.setAttribute('src', 'assets/img/home/user-img.png');
        complimentButton.textContent = 'Elogiar'
        profileButton.textContent = 'Ver Perfil'
    
        if(user.admin) {
            admin.style.display = 'flex';
        }
    
        nameContainer.append(name);
        imageContainer.append(image);
        buttonsContainer.append(complimentButton, profileButton);
        container.append(admin, nameContainer, imageContainer, buttonsContainer);
        usersContainer.append(container)
    }

    return usersArr;
}

function renderTags(tags) {
    const tagContainer = document.querySelector('.home__display--tag--list');
    const tagsArr = [];

    for (const tag of tags) {
        tagsArr[tag.name] = tag.id;

        const tagButton = document.createElement('button');

        tagButton.textContent = tag.name;
        tagButton.setAttribute('class', 'home__display--tag not-selected');
        tagButton.setAttribute('id', tag.name);
        
        tagContainer.appendChild(tagButton);

        const $pageOne = document.querySelector('.home__display--page--one');
        const $pageTwo = document.querySelector('.home__display--page--two');
        const $btnPageOne = document.querySelector('.home__display--switch1');
        const $btnPageTwo = document.querySelector('.home__display--switch2');
        const $errorMessage = document.querySelector('.home__display--error');

        const element = tagButton.getAttribute('class').split(' ')[0];
        let tagButtonCondition = tagButton.getAttribute('class').split(' ')[1];

        tagButton.addEventListener('click', () => {
            if(tagButtonCondition == 'not-selected' && !complimentSelected) {
                tagButtonCondition = 'selected';
                complimentSelected = true;
                tagButton.setAttribute('class', `${element} ${tagButtonCondition}`);
                
                localStorage.setItem('tag', tag.id);

                console.log(complimentSelected);

                $pageOne.style.cssText = `
                transition: .5s transform;
                transform: translateX(-105%);
                `;
                $pageTwo.style.cssText = `
                    transition: .5s transform;
                    transform: translateX(0);
                `;
    
                let btn = $btnPageTwo.getAttribute('class').split(' ')[0];
    
    
                $btnPageTwo.setAttribute('class', `${btn} selected`)
                $btnPageOne.setAttribute('class', `${$btnPageOne.getAttribute('class').split(' ')[0]} not-selected`)
    
            } else if (tagButtonCondition == 'selected'){
                tagButtonCondition = 'not-selected';
                complimentSelected = false;
                tagButton.setAttribute('class', `${element} ${tagButtonCondition}`)
            } else {
                $errorMessage.style.display = 'flex';
                setTimeout(() => {
                    $errorMessage.style.display ='none';
                }, 3000)
            }
        })
    }

    return tagsArr;
}


export { renderProfile, renderUsers, renderTags };