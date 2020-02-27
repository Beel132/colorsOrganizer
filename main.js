const select = document.getElementById('color--number');
const duplicateThing = document.getElementById('boxes--container').innerHTML;
const boxesContainer = document.getElementById('boxes--container');

const boxesClass = document.getElementsByClassName('color--boxes');

const paletteTitle = document.getElementById('palette--title');
paletteTitle.focus();

const listContainer = document.getElementById('cooked--values');
const cookedParagraphs = document.getElementsByClassName('cooked--p');
// cria os parágrafos
function createCookedParagraph(id) {

    let newP = document.createElement('p');
    newP.className = 'cooked--p'
    listContainer.appendChild(newP);
};

// cria os primeiros parágrafos
createCookedParagraph();

// cria a primeira caixa
(function createSingleBox() {
    let oldDiv = document.getElementById('color--boxes');
    let createDiv = document.createElement('div');

    createDiv.className = "color--boxes";
    createDiv.classList.remove('none');

    createDiv.innerHTML = oldDiv.innerHTML;

    boxesContainer.appendChild(createDiv);
})();

// cria todas as caixas de acordo com o select
function createBox() {
    let selectedValue = select.value;

    do {
        let oldDiv = document.getElementById('color--boxes');
        let createDiv = document.createElement('div');

        createDiv.className = "color--boxes";

        createDiv.innerHTML = oldDiv.innerHTML;

        boxesContainer.appendChild(createDiv);

        createCookedParagraph();
    } while (selectedValue >= boxesClass.length);

    if (selectedValue <= boxesClass.length)
        deleteBox();
}

// deleta as caixas (de acordo com o select)
function deleteBox() {
    let selectedValue = select.value;
    const input = document.querySelectorAll('.input--container input');
    let i = 1;

    if (selectedValue == boxesClass.length - 1) 0;
    else {
        while (selectedValue < boxesClass.length - 1) {

            // remove boxes
            let newDivs = document.getElementsByClassName('color--boxes');

            let oldDiv = document.getElementById('boxes--container');

            // if (!input[i].value)
            //   oldDiv.removeChild(newDivs[i]);

            oldDiv.removeChild(newDivs[newDivs.length - 1]);

            i++;

            // remove paragraphs
            if (!cookedParagraphs[cookedParagraphs.length - 1].innerHTML)
                listContainer.removeChild(cookedParagraphs[cookedParagraphs.length - 1]);
        }
    }
}

// adiciona a cor digitada no input na box e no parágrafo
function addColor() {
    const box = document.getElementsByClassName('box');
    const inputContainer = document.getElementsByClassName('input');
    const input = document.querySelectorAll('.input--container input');

    var inputRightValue;

    for (let i = 0; i < input.length; i++) {

        if (input[i].value.split('')[0] == '#') {
            inputRightValue = '';
            inputRightValue = input[i].value.slice(1, input[i].value.length);
        } else
            inputRightValue = input[i].value;

        box[i].style.background = `#${inputRightValue}`;
        inputContainer[i].style.borderBottom = `2px solid #${inputRightValue}`;
    }

    createColorList();
}

// adiciona a cor no parágrafo
function createColorList() {
    let selectedValue = select.value;
    let inputRightValue;
    const input = document.querySelectorAll('.input--container input');

    for (let i = 0; i < selectedValue; i++) {
        // ifelse
        if (input[i + 1].value.split('')[0] == '#') {
            inputRightValue = '';
            inputRightValue = input[i + 1].value.slice(1, input[i + 1].value.length);
        } else
            inputRightValue = input[i + 1].value;

        cookedParagraphs[i].innerHTML = inputRightValue;
        cookedParagraphs[i].style.color = `#${inputRightValue}`;
    }
};

// cria uma nova caixa salva de cores no onclick do botão
function createSavedBox() {
    const titleInput = document.getElementById('palette--title');
    const savedBoxID = document.getElementById('saved--colors--box');
    const savedBoxClass = document.getElementsByClassName('saved--colors--box');
    const thisContainer = document.getElementById('save--color--container');
    const h1Title = document.getElementById('title');
    const titleClass = document.getElementsByClassName('h1Title');

    if (!titleInput.value)
        alert('give your palette a title!');
    else {
        let divCreate = document.createElement('div');

        (function createNewColorBox() {
            // create a new box
            h1Title.innerHTML = titleInput.value;
            divCreate.innerHTML = savedBoxID.innerHTML;
            divCreate.className = 'saved--colors--box';

            thisContainer.appendChild(divCreate);

            titleInput.value = '';
            titleInput.focus();
        })();

        // create a few boxes based on select value
        const colorsContainer = document.getElementsByClassName('selected--colors--container');
        const colorAndTitle = document.getElementById('color--and--title');

        let selectedValue = select.value;

        for (let i = 0; i < selectedValue; i++) {
            let divColors = document.createElement('div');

            divColors.innerHTML = colorAndTitle.innerHTML;
            divColors.className = 'color--and--title';

            colorsContainer[i].appendChild(divColors);
            divCreate.appendChild(colorsContainer[i]);
        }

        // change the P innerHTML and the .box color
        for (let j = 0; j < selectedValue; j++) {
            const input = document.querySelectorAll('.input--container input');
            const boxColorCode = document.getElementsByClassName('box--color--code');
            const boxes = document.querySelectorAll('.color--and--title .box');

            // ifelse
            if (input[j + 1].value.split('')[0] == '#') {
                inputRightValue = '';
                inputRightValue = input[j + 1].value.slice(1, input[j + 1].value.length);
            } else
                inputRightValue = input[j + 1].value;

            // slice boxes *Array*
            let boxesArr = Array.from(boxes);
            let colorCodeArr = Array.from(boxColorCode);

            boxesArr.splice(0, boxes.length - selectedValue);
            colorCodeArr.splice(0, boxes.length - selectedValue);

            colorCodeArr[j].innerHTML = `#${inputRightValue}`;
            boxesArr[j].style.background = `#${inputRightValue}`;

            // console.log(j, boxesArr, '=> boxesArr');
            // console.log(j, colorCodeArr, '=> colorCodeArr');
        }
    }
}