const main = document.querySelector('main')
const root = document.querySelector(':root')
const contentValues = document.querySelector('#contentValues')
const resultInput = document.querySelector('#resultInput')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll('.buttonsCalc').forEach( (button) => {
    button.addEventListener('click', () => {
        const value = button.dataset.value
        contentValues.value += value
    })
})

document.getElementById('clearInput').addEventListener('click', () => {
    contentValues.value = ''
    contentValues.focus()
    resultInput.value = ''
})

contentValues.addEventListener('keydown', function (event) {
    event.preventDefault()
    if (allowedKeys.includes(event.key)){
        contentValues.value += event.key
        return
    }

    if (event.key === 'Backspace'){
        contentValues.value = contentValues.value.slice(0, -1)
        return
    }

    if(event.key === 'Enter'){
        calculated()
    }
})

document.getElementById('equalResult').addEventListener('click', calculated)

function calculated() {
    const expression = contentValues.value.trim();

    try {
        const result = eval(expression);

        if (isNaN(result)) {
            resultInput.value = 'ERROR';
        } else {
            resultInput.value = result;
        }
    } catch (error) {
        resultInput.value = 'ERROR';
    }
}

document.getElementById('copyButton').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const textToCopy = resultInput.value;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                button.innerText = 'Copied!';
                button.setAttribute('id', 'success');;

                setTimeout(() => {
                    button.innerText = 'Copy';
                    button.classList.remove('success');
                    button.removeAttribute('id');
                    button.setAttribute('id', 'copyButton')
                }, 1000);
            })
 }
});


document.getElementById('themeSwitcher').addEventListener('click', () => {
    if (main.dataset.theme === 'darkTheme') {
        root.style.setProperty('--bgColor', '#1b1f2d');
        root.style.setProperty('--fontColor', '#FFFFFF');
        root.style.setProperty('--borderColor', '#ffffff');
        root.style.setProperty('--bgPrimary-color', '#00fff7');
        main.dataset.theme = 'lightTheme';
    } else {
        root.style.setProperty('--bgColor', '#FFFFFF');
        root.style.setProperty('--fontColor', '#7a7979');
        root.style.setProperty('--borderColor', '#003300');
        root.style.setProperty('--bgPrimary-color', '#007BFF');
        main.dataset.theme = 'darkTheme';
    }
});
