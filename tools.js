// "use strict"
let optionContainer = document.querySelector(".option-container");
let toolBoxContainer = document.querySelector(".toolbox-container");
let bodyContainer = document.getElementsByTagName("body")[0];
let pencil = document.getElementById("pencil");
let eraser = document.getElementById("eraser");
let stickynote = document.getElementById("stickynote");
let pencilToolContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");

let optionFlag = true;
let pencilToolFlag=false;
let eraserToolFlag=false;

// optionFlag:  true->show toolbox false->hide toolbox
optionContainer.addEventListener("click",(e)=>{
    optionFlag = !optionFlag;
    if(optionFlag){
        openToolbox();
    }
    else{
        toolBoxContainer.classList.add("shrink-tools");
        closeToolbox();
    }
})

//pencilToolFlag: true->show false->hide
pencil.addEventListener("click",(e)=>{
    pencilToolFlag = ! pencilToolFlag;
    if(pencilToolFlag){
        if(eraserToolFlag){
            eraserToolContainer.classList.remove("open-tool");
            eraserToolContainer.classList.add("close-tool");
            eraserToolFlag = ! eraserToolFlag;
        }
        pencilToolContainer.classList.remove("close-tool");
        pencilToolContainer.classList.add("open-tool");
        
    }
    else{
        pencilToolContainer.classList.remove("open-tool");
        pencilToolContainer.classList.add("close-tool");
        
    }
})

eraser.addEventListener("click",(e)=>{
    eraserToolFlag = ! eraserToolFlag;
    if(eraserToolFlag){
        if(pencilToolContainer){
            pencilToolContainer.classList.remove("open-tool");
            pencilToolContainer.classList.add("close-tool");
            pencilToolFlag = ! pencilToolFlag;
        }
        eraserToolContainer.classList.remove("close-tool");
        eraserToolContainer.classList.add("open-tool");
    }
    else{
        eraserToolContainer.classList.remove("open-tool");
        eraserToolContainer.classList.add("close-tool");
    }
})

stickynote.addEventListener("click",(e)=>{
    let stickyContainer = document.createElement("div");
    stickyContainer.setAttribute("class","sticky-note-container");
    stickyContainer.innerHTML = `
        <div class="note-header-container">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-area-container">
            <textarea></textarea>
        </div>
    `;

    document.body.appendChild(stickyContainer);

    stickyContainer.onmousedown = function(event) {
        dragAndDrop(stickyContainer,event);
    };
      
    stickyContainer.ondragstart = function() {
        return false;
    };


})


function closeAll(){
    pencilToolContainer.classList.remove("open-tool");
    eraserToolContainer.classList.remove("open-tool");
    pencilToolFlag=false;
    eraserToolFlag=false;
}
    
function openToolbox(){
    // toolBoxContainer.classList.remove("shrink-tools");
    let iconElement = optionContainer.children[0];
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolBoxContainer.style.display="flex";
    closeAll();   
}

function closeToolbox(){
    // toolBoxContainer.classList.remove("scale-tools");
    let iconElement = optionContainer.children[0];
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolBoxContainer.style.display="none";
    closeAll();
}
    
function dragAndDrop(element, event){
    
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
}