document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.getElementById('range');
    const rangeValue = document.getElementById('rangeValue');
    const generatedPassword = document.getElementById('generatedPassword');
    const generateButton = document.getElementById('generateButton');
    const copyIcon = document.getElementById('copyIcon');
    const refreshIcon = document.getElementById('refreshIcon');

    const toggleUppercase = document.getElementById('toggleUppercase');
    const toggleLowercase = document.getElementById('toggleLowercase');
    const toggleNumbers = document.getElementById('toggleNumbers');
    const toggleSymbols = document.getElementById('toggleSymbols');

    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

    generateButton.addEventListener('click', () => {
        generatedPassword.textContent = generatePassword();
    });

    refreshIcon.addEventListener('click', () => {
        generatedPassword.textContent = generatePassword();
    });

    copyIcon.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedPassword.textContent).then(() => {
            const customAlert = document.getElementById('customAlert');
            customAlert.classList.remove('fade-in-out');
            customAlert.style.opacity = 1;
            customAlert.offsetHeight;
            customAlert.classList.add('fade-in-out');

            setTimeout(() => {
                customAlert.style.opacity = '0';
            }, 3000);
        });
    });

    rangeInput.addEventListener('input', () => {
        const value = rangeInput.value;
        const min = rangeInput.min;
        const max = rangeInput.max;
        const progress = ((value - min) / (max - min)) * 100 + '%';
        rangeValue.textContent = value;
        rangeInput.style.setProperty('--range-progress', progress);
    });

    function generatePassword() {
        let characters = '';
        if (toggleUppercase.checked) characters += uppercaseLetters;
        if (toggleLowercase.checked) characters += lowercaseLetters;
        if (toggleNumbers.checked) characters += numbers;
        if (toggleSymbols.checked) characters += symbols;

        if (characters === '') {
            alert('Please select at least one character type.');
            return '';
        }

        let password = '';
        const length = parseInt(rangeInput.value);
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];

        }
        return password;
    }

    rangeInput.dispatchEvent(new Event('input'));
});