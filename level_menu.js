function setLevel(level_){
    let newLevel = parseInt(level_, 10);
    if(isAvailable[newLevel-1]==1){
        selectedLevel = newLevel-1;
    }
}

var isAvailable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ], br = 100;
let time = 0;
var buttons = document.getElementsByClassName("button");
console.log(buttons[0]);

function setState(){
    for(let i=0; i<br; i++){
        console.log(i, buttons[i], buttons[0]);
        if(isAvailable[i]==0){
            buttons[i].style.backgroundColor = "#999999";
            buttons[i].style.borderColor = "#737373";
        }else{
            if(i>1 && i%9==0){
                buttons[i].style.backgroundColor = "#ffcc00";
                buttons[i].style.borderColor = "#cca300";
            }else{
                buttons[i].style.backgroundColor = "#3399ff";
                buttons[i].style.borderColor = "#0066ff";
            }
        }
    }
}

setState();

function update() {
    time++;
    if(time%20==0){
       setState();
    }
}

function draw() {
    // This is how you draw a rectangle
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};
function mousedown() {
};
function mouseup() {
    // Show coordinates of mouse on click
    //Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    console.log("Mouse clicked at", mouseX, mouseY);
};
