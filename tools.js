// "use strict"
let optionContainer = document.querySelector(".option-container");
let toolBoxContainer = document.querySelector(".toolbox-container");
let pencil = document.getElementById("pencil");
let eraser = document.getElementById("eraser");
let pencilToolContainer = document.querySelector(".pencil-tool-container");
let eraserToolContainer = document.querySelector(".eraser-tool-container");


let optionFlag = true;
let pencilToolFlag=false;
let eraserToolFlag=false;

// console.log(pencilToolContainer);
// console.log(optionContainer);
// optionFlag:  true->show toolbox false->hide toolbox
optionContainer.addEventListener("click",(e)=>{
    optionFlag = !optionFlag;
    if(optionFlag){
        openToolbox();
    }
    else{
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

// eraserToolContainer.addEventListener("click",(e)=>{

// })

function openToolbox(){
    let iconElement = optionContainer.children[0];
    console.log(iconElement);
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolBoxContainer.style.display="flex";
   // pencilToolContainer.style.display("none");
    //eraserToolContainer.style.display("none");
}
function closeToolbox(){
    let iconElement = optionContainer.children[0];
    console.log(iconElement);
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolBoxContainer.style.display="none";
   // pencilToolContainer.style.display("none");
    //eraserToolContainer.style.display("none");

}
