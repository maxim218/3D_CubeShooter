"use strict";

function elem(s){
    s = s.toString();
    return document.getElementById(s);
}

function hideAllBoxes(){
    let arr = document.getElementsByClassName("myBox");
    for(let i = 0; i < arr.length; i++){
        const box = arr[i];
        box.hidden = true;
    }
}

