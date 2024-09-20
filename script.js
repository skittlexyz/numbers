function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

const { ColorTranslator } = colortranslator;

const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const sizeInput = document.getElementById("size");
const decimalsInput = document.getElementById("decimals");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const bgColorInput = document.getElementById("bg-color");
const textColorInput = document.getElementById("text-color");
const delayInput = document.getElementById("delay");
const shadeInput = document.getElementById("shade");
const boldInput = document.getElementById("bold");
const randomBoldInput = document.getElementById("random-bold");
const xGapInput = document.getElementById("x-gap");
const yGapInput = document.getElementById("y-gap");

function setup() {
    document.querySelectorAll(".number").forEach((element) => {
        element.className = `number text-${sizeInput.value}xl`
        if (boldInput.checked) element.className += " font-bold"
    });
    document.querySelector("main").style.backgroundColor = bgColorInput.value;
    document.querySelector("main").style.color = textColorInput.value;
}

function size() {
    numbers = [];
    document.querySelector("main").innerHTML = "";
    for (let i = 0; i < rowsInput.value; i++) {
        let tempRow = rowElement.cloneNode(false);
        tempRow.id = `tempRow-${i}`;
        for (let j = 0; j < columnsInput.value; j++) {
            let tempNumber = numberElement.cloneNode(false);
            tempNumber.id = `tempNumber-${j}`
            numbers.push(tempNumber);
            tempRow.append(tempNumber);
        }
        document.querySelector("main").append(tempRow);
    }
    setup();
}

function bolds() {
    if (randomBoldInput.checked) {
        boldInput.checked = false;
        document.querySelectorAll(".number").forEach((element) => {
            if (Math.random() < 0.5) {
                element.classList.toggle("font-bold");
            }
        });
    } else {
        document.querySelectorAll(".number").forEach((element) => {
            element.classList.remove("font-bold");
        });
    }
}

function colors() {
    if (!shadeInput.checked) {
        document.querySelectorAll(".number").forEach((element) => {
            element.style.color = textColorInput.value;
        })
        return
    }
    let tints = ColorTranslator.getTints(textColorInput.value, 2);
    document.querySelectorAll(".number").forEach((element) => {
        element.style.color = tints[Math.floor(Math.random() * tints.length)];
    })
}

function start() {
    if (numbers.length != 0) setInterval(() => {
        for (let i = 0; i < numbers.length; i++) {
            const factor = Math.pow(10, decimalsInput.value);
            let randomFloatString = (Math.floor((Math.random() * (maxInput.value - minInput.value) + minInput.value) * factor) / factor + parseInt(minInput.value)).toFixed(decimalsInput.value).toString().split(".");
            numbers[i].innerText = randomFloatString[0].padStart(2, "0") + (randomFloatString[1] ? "." : "") + (randomFloatString[1] ? randomFloatString[1] : "");
        }
        colors();
        bolds();
        document.querySelectorAll(".row").forEach((element) => {
            element.style.gap = xGapInput.value + "px";
        });
        document.querySelector("main").style.gap = yGapInput.value + "px";
    }, parseInt(delayInput.value));
    else {
        const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) { window.clearInterval(i); }
    }
}

sizeInput.addEventListener("change", setup);

bgColorInput.addEventListener("input", setup);
textColorInput.addEventListener("input", colors);

rowsInput.addEventListener("input", size);
columnsInput.addEventListener("input", size);

boldInput.addEventListener("input", setup);

randomBoldInput.addEventListener("input", bolds);

xGapInput.addEventListener("change", () => {
    document.querySelectorAll(".row").forEach((element) => {
        element.style.gap = xGapInput.value + "px";
    })
});

yGapInput.addEventListener("change", () => {
    document.querySelector("main").style.gap = yGapInput.value + "px";
})

document.querySelector("#open-menu").addEventListener("click", () => {
    document.querySelector("#menu").classList.remove("hide");
    document.querySelector("#open-menu").classList.add("hide");
});

document.querySelector("#close-menu").addEventListener("click", () => {
    document.querySelector("#menu").classList.add("hide");
    document.querySelector("#open-menu").classList.remove("hide");
});

delayInput.addEventListener("input", () => {
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) { window.clearInterval(i); }
    start();
})

const rowElement = document.createElement("div");
rowElement.className = "row flex justify-content items-center space-between gap-[" + xGapInput.value + "px]"

document.querySelector("main").className += "gap-[" + yGapInput.value + "px]"

let numbers = [];

const numberElement = document.createElement("span");
numberElement.className = "number font-3xl"

const player = new Plyr("#music", {});

size();
setup();
start();