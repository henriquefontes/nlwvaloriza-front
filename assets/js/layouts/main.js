let showRegisterForm = true;

const $switchBtn = document.getElementById('switch-form');
const $form = document.querySelector('form');
const $nameInput = document.getElementById('name-input');

$switchBtn.addEventListener('click', () => {
    if(showRegisterForm) {
        $nameInput.style.display = 'flex';
        $switchBtn.textContent = 'Já possuo uma conta';
        showRegisterForm = false;
        return;
    }
        $nameInput.style.display = 'none';
        $switchBtn.textContent = 'Criar conta';
        showRegisterForm = true;
})