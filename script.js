const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const sizeInput = document.getElementById("size");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const bgColorInput = document.getElementById("bg-color");
const textColorInput = document.getElementById("text-color");

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

const rowElement = document.createElement("div");
rowElement.className = "flex justify-content items-center space-between"

const numberElement = document.createElement("span");
numberElement.className = "number font-3xl"

rowElement.append(numberElement);
document.querySelector("main").append(rowElement);
numberElement.innerText = "13.43269"