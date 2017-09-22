"use strict";

function createStorageVariable(){
    const x = localStorage.getItem("x");
    if(x === null || x === undefined || x !== x){
        console.log("NO X");
        localStorage.setItem("x","");
    } else {
        console.log("YES X");
    }
}


function addVariableToStorage(n){
    n = n.toString();
    let x = localStorage.getItem("x");
    x = x + n + "_";
    localStorage.setItem("x", x);
}


function readVariableFromStorage(){
    let x = localStorage.getItem("x");

    let mmm = [];
    mmm = x.split("_");

    let answer = "";

    for(let i = 0; i < mmm.length; i++){
        if(mmm[i] !== ""){
            answer = answer + "<p style = 'background-color: #50f2ff; padding: 15px;'>Игра " + (i + 1) + ": &nbsp;&nbsp;&nbsp;" + mmm[i] + "</p>";
        }
    }

    answer = "<div style = 'overflow-y: scroll; background-color: #5faaff; width: 650px; height: 250px; padding-left: 25px; padding-right: 25px;'>" + answer + "</div>";

    return answer.toString();
}

