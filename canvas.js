let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColorElems = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let pencilWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let pencilColor = "red";
let eraserColor = "white";
let mouseDown = false;

let tool = canvas.getContext('2d');


tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
    beginPath({
        x : e.clientX,
        y : e.clientY
    });
})

canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){ 
        drawStroke({
            x : e.clientX,
            y : e.clientY
        });
    }
})

canvas.addEventListener("mouseup",(e)=>{
    mouseDown = false;
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}

pencilColorElems.forEach((pencilColorElem) => {
    pencilColorElem.addEventListener("click",(e)=>{
        pencilColor = pencilColorElem.classList[0];
        tool.strokeStyle = pencilColor;
    })
})

pencilWidthElem.addEventListener("change",(e)=>{
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth;
})

eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

//  "eraser" and "eraserToolFlag" from tool.js
eraser.addEventListener("click",(e)=>{
    if(eraserToolFlag){
        tool.strokeStyle = "white";
        tool.lineWidth = eraserWidth;
    }
    else{
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth;
    }
})
