// "use strict"
let optionContainer = document.querySelector(".option-container");
let toolBoxContainer = document.querySelector(".toolbox-container");
let bodyContainer = document.getElementsByTagName("body")[0];
let pencil = document.getElementById("pencil");
let eraser = document.getElementById("eraser");
let stickynote = document.getElementById("stickynote");
let upload = document.getElementById("upload");
let pencilToolContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");

let optionFlag = true;         // optionFlag:  true->show toolbox false->hide toolbox
let pencilToolFlag=false;      // pencilToolFlag: true->show pencil toolbox false->hide
let eraserToolFlag=false;      // eraserToolFlag: true->show eraser toolbox false->hide


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
    closeAll();
    let stickyContainer = document.createElement("div");
    stickyContainer.setAttribute("class","sticky-note-container");
    stickyContainer.innerHTML = `
        <div class = "sticky-header-wrapper">
            <div class = "dragspace"></div>
            <div class="note-action-container">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
        </div>
        <div class="note-area-container">
            <textarea></textarea>
        </div>
    `;
    document.body.appendChild(stickyContainer);
    let dragspace = stickyContainer.querySelector(".dragspace");
    let minimize = stickyContainer.querySelector(".minimize");
    let remove = stickyContainer.querySelector(".remove");

    
    noteActions(stickyContainer,minimize,remove);

    dragspace.onmousedown = function(event) {
        dragAndDrop(stickyContainer,event);
    };
      
    dragspace.ondragstart = function() {
        return false;
    };

})

upload.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        closeAll();
        let stickyContainer = document.createElement("div");
        stickyContainer.setAttribute("class","sticky-note-container");
        stickyContainer.innerHTML = `
            <div class = "sticky-header-wrapper">
                <div class = "dragspace"></div>
                <div class="note-action-container">
                    <div class="minimize"></div>
                    <div class="remove"></div>
                </div>
            </div>
            <div class="note-area-container">
                <img src="${url}"/>
            </div>
        `;
        document.body.appendChild(stickyContainer);
        let dragspace = stickyContainer.querySelector(".dragspace");
        let minimize = stickyContainer.querySelector(".minimize");
        let remove = stickyContainer.querySelector(".remove");

    
        noteActions(stickyContainer,minimize,remove);

        dragspace.onmousedown = function(event) {
            dragAndDrop(stickyContainer,event);
        };
      
        dragspace.ondragstart = function() {
            return false;
        };

    })
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

function noteActions(stickyContainer, minimize, remove){
    remove.addEventListener("click",(e)=>{
        stickyContainer.remove();
    })
    minimize.addEventListener("click",(e)=>{
        let noteTextAreaContainer = stickyContainer.querySelector(".note-area-container");
        let displayProperty = getComputedStyle(noteTextAreaContainer).getPropertyValue("display");
        if(displayProperty === "none"){
            noteTextAreaContainer.style.display = "block";
            stickyContainer.classList.remove("boxshadow-none");
        }
        else{
            noteTextAreaContainer.style.display = "none";
            stickyContainer.classList.add("boxshadow-none");
        }
    })
}