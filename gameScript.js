"use strict";

function getRandomColor(){
    const arr = ["#FF0000","#00FF00","#0000FF"];
    const number = parseInt(Math.random() * 10000) % 3;
    return arr[number];
}

let scene;
let camera;
let renderer;

let mainInterval;
let generateInterval;

function initGameProperties(){
    const ww = 800;
    const hh = 600;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, ww / hh, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("#FFFFFF");
    renderer.setSize(ww, hh);
    document.getElementById("centerBoxForGame").append(renderer.domElement);

    let axes = new THREE.AxisHelper(100);
    // scene.add(axes);

    camera.rotation.x = -Math.PI / 2;
    camera.rotation.y = 0;
    camera.rotation.z = 0;

    camera.position.x = 10;
    camera.position.y = 250;
    camera.position.z = 10;

    let sizeOfOneKv = 140;
    let divisions = 14;
    let color_1 = "#2549ff";
    let color_2 = "#00FF00";
    let gridHelper_1 = new THREE.GridHelper( sizeOfOneKv, divisions, color_1, color_2);

    // scene.add(gridHelper_1);

    let spotLight = new THREE.SpotLight("#ffffff");
    spotLight.position.set( camera.position.x, camera.position.y, camera.position.z );
    scene.add(spotLight);

    renderer.render(scene, camera);
}




let objects = [];
let mass = [];

let speedYYY = 0;
let score = 0;

function createCube(xx, zz){
    const cubeColor = getRandomColor();
    const cubeGeometry = new THREE.CubeGeometry(12, 12, 12);
    const cubeMaterial = new THREE.MeshLambertMaterial({color: cubeColor});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = xx;
    cube.position.y = 0;
    cube.position.z = zz;
    scene.add(cube);
    objects.push(cube);
}

function startGame(){
    mainInterval = setInterval(repeatFunctionMain, 45);
    generateInterval = setInterval(generateFunctionMain, 1000);

    speedYYY = 1;
    objects = [];
    mass = [];

    score = 0;
    document.getElementById("scoreGameBox").innerHTML = "Набрано очков: " + score;

    console.log("Start game");
}

function stopGame(){
    clearInterval(mainInterval);
    clearInterval(generateInterval);

    for(let i = 0; i < objects.length; i++){
        scene.remove(objects[i]);
    }

    renderer.render(scene, camera);

    speedYYY = 0;
    objects = [];
    mass = [];

    console.log("__________________________");
    console.log("Objects length:  " + objects.length);
    console.log("Mass length:  " + mass.length);
    console.log("Stop game");
    console.log("__________________________");

    hideAllBoxes();
    elem("gameResultBox").hidden = false;
    elem("centerBox").hidden = false;
    elem("gameBox").hidden = true;

    elem("resultLabel").innerHTML = "ты набрал " + score + " очков";

    addVariableToStorage(score);
}


function repeatFunctionMain(){
    for(let i = 0; i < objects.length; i++){
        objects[i].position.y += mass[i].speedY;

        objects[i].rotation.x += 0.1;
        objects[i].rotation.y += 0.1;

        if(objects[i].position.y >= 153){
            stopGame();
        }
    }

    console.log("Objects length:  " + objects.length);

    renderer.render(scene, camera);
}

function createFinalReadyCube(){
    if(objects.length <= 5) {
        let xx = parseInt(Math.random() * 10000) % 80 - 40;
        let zz = parseInt(Math.random() * 10000) % 80 - 40;
        createCube(xx, zz);

        let cubePropertiesObj = {
            speedY: speedYYY,
            deleted: false
        };

        mass.push(cubePropertiesObj);
    }
}

function generateFunctionMain(){
    let n = (Math.random() * 10000) % 3 + 1;
    for(let i = 0; i < n; i++) {
        createFinalReadyCube();
    }

    speedYYY += 0.05;
    console.log("Speed: " + speedYYY);
}


let projector = new THREE.Projector();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();


function clickInGame(xMouse, yMouse){
    const ww = 800;
    const hh = 600;

    mouse.x = ( xMouse / ww ) * 2 - 1;
    mouse.y = - ( yMouse / hh ) * 2 + 1;

    renderer.render(scene, camera);

    raycaster.setFromCamera( mouse, camera );

    let intersects = raycaster.intersectObjects( objects );

    let objectsForDeleting = [];

    if (intersects.length > 0 ) {
        score++;
        document.getElementById("scoreGameBox").innerHTML = "Набрано очков: " + score;

        let answer = intersects[0];
        for(let i = 0; i < objects.length; i++){
            if(answer.object === objects[i]){
                mass[i].deleted = true;
                objectsForDeleting.push(objects[i]);
            }
        }
    }

    let bufferObjects = [];
    let bufferMass = [];

    for(let i = 0; i < objects.length; i++){
        if(mass[i].deleted === false){
            bufferObjects.push(objects[i]);
            bufferMass.push(mass[i]);
        }
    }

    for(let i = 0; i < objectsForDeleting.length; i++){
        scene.remove(objectsForDeleting[i]);
    }

    objects = bufferObjects;
    mass = bufferMass;

}


