const colorInput = document.getElementById("colorPicker");
const colorCircle = document.getElementById("colorCircle");
const colorCode = document.getElementById("colorCode");
const checkCircle = document.getElementById("checkCircle");

const style = document.createElement("style");
document.head.appendChild(style);

function updateBrandStyles(color){
    colorCode.value = color;
    colorCircle.style.backgroundColor = color;
    checkCircle.style.backgroundColor = color;

    style.innerHTML = `
    .bg-brand { background-color: ${color} !important; }
    .border-brand { border-color: ${color} !important; }
    `;
}

colorInput.addEventListener("input", (e) => {
    updateBrandStyles(e.target.value);
});

updateBrandStyles(colorInput.value);