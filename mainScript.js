"use strict";


function addListenersToButtons(){
    elem("b4").addEventListener("click", function(){
        hideAllBoxes();
        elem("aboutCreator").hidden = false;
    });

    elem("b3").addEventListener("click", function(){
        hideAllBoxes();
        elem("aboutGame").hidden = false;
    });

    elem("b5").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;
    });

    elem("b6").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;
    });

    elem("b9").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;
    });

    elem("b7").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;
    });

    elem("b2").addEventListener("click", function(){
        hideAllBoxes();
        elem("scoreOfUser").hidden = false;

        const resultsString = readVariableFromStorage();

        if(localStorage.getItem("x") !== ""){
            elem("resultsList").innerHTML = resultsString;
        }
    });

    elem("b1").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;

        elem("centerBox").hidden = true;
        elem("centerBoxForGame").hidden = false;
        elem("gameBox").hidden = false;

        startGame();
    });
}

window.addEventListener("load", function () {

    console.log("Колотовкин Максим");

    createStorageVariable();

    elem("centerBox").hidden = false;
    addListenersToButtons();

    initGameProperties();

    elem("centerBoxForGame").addEventListener("click",function(event){
        const xMouse = parseInt(event.offsetX);
        const yMouse = parseInt(event.offsetY);
        clickInGame(xMouse, yMouse);
    });

});

