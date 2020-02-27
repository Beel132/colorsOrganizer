const palettNameInput = document.getElementById('palette--title');
const colorBoxContainer = document.getElementById('color--box');

const ContainerColorBoxContainer = document.getElementById('boxes--container');
const colorBoxesClass = document.getElementsByClassName('color--boxes');

const colorsResultTitle = document.getElementsByClassName('h1Title');

const colorsResultBox = document.getElementById('saved--colors--box');
const containerColorsResult = document.getElementById('save--color--container');
const colorsResultBoxClass = document.getElementsByClassName('saved--colors--box');

var selectedValue;

const coloredBoxesInputClass = document.getElementsByClassName('input');
const coloredBoxes = document.getElementsByClassName('box');

const closeIconClass = document.getElementsByClassName('closeIcon');

(function autoExec() {
    palettNameInput.focus();
})();

// ------------------------------------------- //

document.getElementById('create--button').addEventListener('click', createBoxOnButtonClick);
window.addEventListener('keyup', (e) => e.keyCode == 13 ? createBoxOnButtonClick() : 0);

// ------------------------------------------- //
function createNewColorBox() {
    let createNewColorBox = document.createElement('div');

    createNewColorBox.innerHTML = (colorBoxContainer.innerHTML);
    createNewColorBox.className = 'color--boxes';

    ContainerColorBoxContainer.appendChild(createNewColorBox);
}

function decideIfDeleteOrCreate() {
    let colorBoxesClass = document.getElementsByClassName('color--boxes');
    selectedValue = document.getElementById('color--number').value;

    if (selectedValue < colorBoxesClass.length) deleteBoxBasedOnSelectedValue();
    else createBoxBasedOnSelectedValue();
}

function createBoxBasedOnSelectedValue() {
    selectedValue = document.getElementById('color--number').value;

    while (selectedValue > colorBoxesClass.length) createNewColorBox();
}

function deleteBoxBasedOnSelectedValue(valueAfterButton) {
    selectedValue = document.getElementById('color--number').value;

    if (valueAfterButton) selectedValue = valueAfterButton;

    while (selectedValue < colorBoxesClass.length)
        ContainerColorBoxContainer.removeChild(colorBoxesClass[colorBoxesClass.length - 1]);
}

// ------------------------------------------- //

function changeBoxColorBasedOnInputValue() {

    var inputValueWithoutHashtag;

    for (let i = 0; i < coloredBoxesInputClass.length; i++) {

        //todo input value without hashtag
        if (coloredBoxesInputClass[i].value.split('')[0] == '#')
            (inputValueWithoutHashtag = '', inputValueWithoutHashtag = coloredBoxesInputClass[i].value.slice(1, coloredBoxesInputClass[i].value.length))
        else
            (inputValueWithoutHashtag = coloredBoxesInputClass[i].value);
        //todo end

        coloredBoxes[i].style.background = `#${inputValueWithoutHashtag}`;
        coloredBoxesInputClass[i].style.borderBottom = `2px solid #${inputValueWithoutHashtag}`;
    }
}

// ------------------------------------------- //

function checkIfFirstBoxIsFilled() {
    let colorBoxesClassInput = [...document.querySelectorAll('.color--boxes .input')];

    if (colorBoxesClassInput.every(input => !input.value))
        return false;
    else
        return true;
}

let IDSArray = [];
let counter = 0;

function setAttrToCloseIcon() {
    closeIconClass[closeIconClass.length - 1].setAttribute('onclick', `closeBox(${counter})`);

    IDSArray.push(counter);
}

function createBoxOnButtonClick() {

    if (!checkIfFirstBoxIsFilled()) {
        alert('fill the box');
    } else {
        const palettNameInput = document.getElementById('palette--title');

        selectedValue = document.getElementById('color--number').value;

        if (!palettNameInput.value) return alert('Give your palett a name');
        else if (selectedValue == 0) return alert('Choose a valid number of boxes');

        let createNewColorResultBox = document.createElement('div');

        createTitleBox();

        createNewColorResultBox.style.borderBottom = `2px solid ${colorsResultTitle[0].style.background}`;

        // create and append all the values to the box;
        createNewColorResultBox.innerHTML = colorsResultBox.innerHTML;
        createNewColorResultBox.className = 'saved--colors--box';
        createNewColorResultBox.id = counter;

        containerColorsResult.appendChild(createNewColorResultBox);

        setAttrToCloseIcon();

        counter++;

        appendColorsAndParagraphToResultBox();
        thingsAfterButtonClick();
    }
}

function createTitleBox() {
    let palettNameInput = document.getElementById('palette--title');
    let coloredBoxesInputClass = document.getElementsByClassName('input');

    for (let pos = 0;; pos++) {
        if (coloredBoxesInputClass[pos].value) {
            colorsResultTitle[0].style.background = coloredBoxes[pos].style.background;
            break;
        }
    }

    colorsResultTitle[0].innerHTML = (palettNameInput.value);
}

// check if color is nearest to black or white
function checkLightOrDark(color) {
    let r, g, b, hsp;
    let colorSpliced = color;

    //todo check if color is invalid
    if (!(/^#/.test(color)) && color.length == 7)
        colorSpliced = color.split('').slice(0, color.length - 1).join('');

    colorSpliced = +("0x" + colorSpliced.slice(1).replace(colorSpliced.length < 5 && /./g, '$&$&'));

    r = colorSpliced >> 16;
    g = colorSpliced >> 8 & 255;
    b = colorSpliced & 255;

    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    if (hsp > 128)
        return 'light';
    else
        return 'dark';
}

// ------------------------------------------- //

const thingsAfterButtonClick = () => {
    let inputClass = document.getElementsByClassName('input');
    let colorsResultTitle = document.getElementsByClassName('h1Title');
    let closeIconClass = document.getElementsByClassName('closeIcon');

    palettNameInput.value = '';
    palettNameInput.focus();
    document.getElementById('color--number').value = 1;
    deleteBoxBasedOnSelectedValue(1);

    // input unstyle
    if (!inputClass[1] && !coloredBoxes[1] && !coloredBoxesInputClass[1]) {
        return;
    }

    if (checkLightOrDark([...inputClass][1].value) == 'light') {
        colorsResultTitle[colorsResultTitle.length - 1].style.color = '#212121';
        closeIconClass[closeIconClass.length - 1].style.color = '#212121';
    } else {
        colorsResultTitle[colorsResultTitle.length - 1].style.color = '#f2f2f2';
        closeIconClass[closeIconClass.length - 1].style.color = '#f2f2f2';
    }

    inputClass[1].value = '';
    coloredBoxes[1].style.background = '#fff';
    coloredBoxesInputClass[1].style.borderBottom = '2px solid rgba(204, 204, 204, .75)';
};

// ------------------------------------------- //

function appendColorsAndParagraphToResultBox() {
    let colorBoxesClass = document.getElementsByClassName('color--boxes');
    let resultBoxColorContainer = document.getElementsByClassName('selected--colors--container');
    let colorBoxesClassInput = document.querySelectorAll('.color--boxes input');

    for (let i = 0; i < colorBoxesClass.length;) {
        if (!colorBoxesClassInput[i].value) i++;

        else {
            let createNewBoxColorContainer = document.createElement('div');
            createNewBoxColorContainer.className = 'color--and--title';

            let createNewBoxColor = document.createElement('div');
            let createNewBoxColorText = document.createElement('input');

            createNewBoxColor.className = 'box--result';

            createNewBoxColorText.className = 'input--box--color--code';


            //todo input value without hashtag
            //* slice input | #32c3d2 => 32c3d2
            if (colorBoxesClassInput[i].value.split('')[0] == '#')
                (inputValueWithoutHashtag = '', inputValueWithoutHashtag = colorBoxesClassInput[i].value.slice(1, colorBoxesClassInput[i].value.length))

            //* slice troll input | 2222221 => 222222
            else if (!(/^#/.test(colorBoxesClassInput[i].value)) && colorBoxesClassInput[i].value.length == 7)
                inputValueWithoutHashtag = colorBoxesClassInput[i].value.split('').slice(0, colorBoxesClassInput[i].value.length - 1).join('');

            else
                (inputValueWithoutHashtag = colorBoxesClassInput[i].value);
            //todo end

            createNewBoxColorText.style.borderBottom = `2px solid #${inputValueWithoutHashtag}`;
            createNewBoxColorText.value = `#${inputValueWithoutHashtag}`;
            createNewBoxColorText.setAttribute('onkeyup', 'newInputChangeColor()');
            createNewBoxColorText.setAttribute('spellcheck', 'false');
            createNewBoxColorText.setAttribute('autocomplete', 'off');

            createNewBoxColorContainer.appendChild(createNewBoxColor);
            createNewBoxColorContainer.appendChild(createNewBoxColorText);

            //todo styles before append
            createNewBoxColor.style.background = `#${inputValueWithoutHashtag}`;


            let resultBoxColorContainerARRAY = Array.prototype.slice.call(resultBoxColorContainer);
            resultBoxColorContainerARRAY.splice(0, resultBoxColorContainerARRAY.length - 1);

            resultBoxColorContainerARRAY[0].appendChild(createNewBoxColorContainer);
            i++;
        }
    }
}

// ------------------------------------------- //

function closeBox(value) {
    containerColorsResult.removeChild(document.getElementById(`${value}`));
    IDSArray.splice(IDSArray.indexOf(value), 1);
}

// ------------------------------------------- //

const newInputClass = document.getElementsByClassName('input--box--color--code');

function newInputChangeColor() {
    let coloredBoxesRESULT = document.getElementsByClassName('box--result');

    var inputValueWithoutHashtag;

    for (let i = 0; i < newInputClass.length; i++) {
        // if you wanna change something on input[] change
        //// code here
        //

        //todo input value without hashtag
        if (newInputClass[i].value.split('')[0] == '#')
            (inputValueWithoutHashtag = '', inputValueWithoutHashtag = newInputClass[i].value.slice(1, newInputClass[i].value.length))
        else
            (inputValueWithoutHashtag = newInputClass[i].value);
        //todo end

        coloredBoxesRESULT[i].style.background = `#${inputValueWithoutHashtag}`;
        newInputClass[i].style.borderBottom = `2px solid #${inputValueWithoutHashtag}`;
    }
}
