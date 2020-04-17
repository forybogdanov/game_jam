function setLevel(level_){
    let newLevel = parseInt(level_, 10);
    selectedLevel = newLevel-1;
    console.log(newLevel-1);
}

var isAvailable = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ], br = 100;
let time = 0;
var buttons = document.getElementsByClassName("button");
var selectedLevel = 0;

function setState(){
    for(let i=0; i<br; i++){
        if(isAvailable[i]==0){
            buttons[i].style.backgroundColor = "#999999";
            buttons[i].style.borderColor = "#737373";
        }else{
            if(i>1 && (i+1)%10==0){
                buttons[i].style.backgroundColor = "#ffcc00";
                buttons[i].style.borderColor = "#cca300";
            }else{
                buttons[i].style.backgroundColor = "#3399ff";
                buttons[i].style.borderColor = "#0066ff";
            }
        }
    }
}



function update() {
    if(buttons.length>0){
        if(time%20==0){
            if(time==0){
               buttons[99].style.fontSize = "22px";
            }
            setState();
        }
        time++;
        setTimeout(update, 10);
    }
}
function startUpdate(){
    if(time==0){
        setTimeout(update, 10);
        setTimeout(startUpdate, 10);
    }
}
setTimeout(startUpdate, 0);