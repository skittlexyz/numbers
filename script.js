const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const sizeInput = document.getElementById("size");
const decimalsInput = document.getElementById("decimals");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const bgColorInput = document.getElementById("bg-color");
const textColorInput = document.getElementById("text-color");
const delayInput = document.getElementById("delay");

sizeInput.addEventListener("change", () => {
    document.querySelectorAll(".number").forEach((element) => {
        element.className = `number text-${sizeInput.value}xl`
    })
})

bgColorInput.addEventListener("input", () => {
    document.querySelector("main").style.backgroundColor = bgColorInput.value;
});

textColorInput.addEventListener("input", () => {
    document.querySelector("main").style.color = textColorInput.value;
    document.querySelector("#menu").style.color = textColorInput.value;
    document.querySelector("#open-menu").style.color = textColorInput.value;
    document.querySelector("#close-menu").style.color = textColorInput.value;
    document.querySelectorAll(".number").forEach((element) => {
        element.style.color = textColorInput.value;
    })
});

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
rowElement.className = "flex justify-content items-center space-between"

let numbers = [1];

const numberElement = document.createElement("span");
numberElement.className = "number font-3xl"

rowElement.append(numberElement);
rowElement.append(numberElement);
document.querySelector("main").append(rowElement);
numberElement.innerText = "13.43269"

function start() {
    if (numbers.length != 0) setInterval(() => {
        document.querySelectorAll(".number").forEach((element) => {
            numbers.push(element);
        })
        for (let i = 0; i < numbers.length; i++) {
            const factor = Math.pow(10, decimalsInput.value);
            let randomFloatString = (Math.floor((Math.random() * (maxInput.value - minInput.value) + minInput.value) * factor) / factor + parseInt(minInput.value)).toFixed(decimalsInput.value).toString().split(".");
            numbers[i].innerText = randomFloatString[0].padStart(2, "0") + "." + randomFloatString[1];
        }
        numbers = [1];
    }, parseInt(delayInput.value));
    else {
        const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) { window.clearInterval(i); }
    }
}

start();