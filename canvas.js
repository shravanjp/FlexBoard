let canvas = document.querySelector("canvas");
let download = document.getElementById("download");
let undo = document.getElementById("undo");
let redo = document.getElementById("redo");

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

let undoRedoTracker = [] //contains url for each draw and erase action of mouse
let tracker =0; //represents at which action you are in

let tool = canvas.getContext('2d');


tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

canvas.addEventListener("mousedown",(e)=>{
    tool.strokeStyle = (eraserToolFlag) ? eraserColor : pencilColor;
    tool.lineWidth = (eraserToolFlag)? eraserWidth : pencilWidth;
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
    
    //for undo and redo
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    tracker = undoRedoTracker.length -1;
    // console.log(tracker);
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

        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
   
})

download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

undo.addEventListener("click",(e)=>{
    if(tracker > 0){
        tracker--;
    }
        let trackerObj={
            trackerValue : tracker,
            undoRedoTracker
        };

        undoRedoCanvas(trackerObj);
    
    
})

redo.addEventListener("click", (e)=> {
    if(tracker < undoRedoTracker.length-1){
        tracker++;
    }
        let trackerObj={
            trackerValue : tracker,
            undoRedoTracker
        };
        undoRedoCanvas(trackerObj);
    
    
})

function undoRedoCanvas(trackerObj){
    tracker = trackerObj.trackerValue;
    console.log("canvas "+tracker);
    undoRedoTracker = trackerObj.undoRedoTracker;
    let url = undoRedoTracker[tracker];
    let img = new Image();
    img.src = url;
    img.onload = () => {
        // console.log("inside onload")
        tool.drawImage(img,0,0,);
    }
}