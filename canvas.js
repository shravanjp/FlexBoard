let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseDown = false;

let tool = canvas.getContext('2d');

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
