function setLevel(level_){
    let newLevel = parseInt(level_, 10);
    selectedLevel = newLevel-1;
    console.log(newLevel-1);
}

var isAvailable = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], br = 100;
let time = 0;
var pairOfButtons = document.getElementsByClassName("pairOfButton");
var buttons = document.getElementsByClassName("button");
var buttonLinks = document.getElementsByClassName("buttonLink");
var unactiveButtons = document.getElementsByClassName("unactiveButton");
var menu = document.getElementById("Menu");
let allCookies;

class levelInfo{
    constructor(){
        this.selectedLevel = 0;
        this.isAvailable = [];
        this.brLevels = 100;
        for(let i=0; i<this.brLevels; i++){
            if(i==0){
                this.isAvailable[i] = 1;   
            }else{
                this.isAvailable[i] = 0;
            }
        }
    }
}
var info = new levelInfo();

function setCookie(name,value,expires){
    document.cookie = name + "=" + value + ((expires==null) ? "" : ";expires=" + expires.toGMTString());
}
function getCookieObject(){
    let str = document.cookie;
    str = str.split('; ');
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
}

function setCookies(){
    allCookies = getCookieObject();
    if(allCookies.selectedLevel == undefined){
        alert("This site is using cookies for progress tracking.");
    }
    setCookie("selectedLevel", info.selectedLevel);
    setCookie("isAvailable", info.isAvailable);
    setCookie("brLevels", info.brLevels);
}
function applyCookies(){
    allCookies = getCookieObject();
    if(allCookies.selectedLevel != undefined){
        info.isAvailable = JSON.parse("[" + allCookies.isAvailable + "]");
        info.selectedLevel = parseInt(allCookies.selectedLevel, 10);
    }
}

applyCookies();
setCookies();

function setLevel(level_){
    let newLevel = parseInt(level_, 10);
    info.selectedLevel = newLevel-1;
    console.log(newLevel-1);
    setCookies();
}

function fillLevels(){
    for(let i=1; i<info.brLevels; i++){
        if(pairOfButtons.length>0 && menu!=null){
            let newRow = pairOfButtons[0].cloneNode(true);
            menu.appendChild(newRow);

            pairOfButtons = document.getElementsByClassName("pairOfButton");
            buttons = document.getElementsByClassName("button");
            buttonLinks = document.getElementsByClassName("buttonLink");
            unactiveButtons = document.getElementsByClassName("unactiveButton");

            buttons[i].innerHTML = i+1;
            unactiveButtons[i].innerHTML = i+1;
            if((i+1)%10==0){
                buttons[i].style.backgroundColor = "#ffcc00";
                buttons[i].style.borderColor = "#cca300";       
            }
            if(info.isAvailable[i]==0){
                buttonLinks[i].style.display = "none";
                unactiveButtons[i].style.display = "inline";
            }else{
                buttonLinks[i].style.display = "inline";
                unactiveButtons[i].style.display = "none";
            }
        }
    }
}

function setState(){
    for(let i=0; i<info.brLevels; i++){
        if(info.isAvailable[i]==0){
            buttonLinks[i].style.display = "none";
            unactiveButtons[i].style.display = "inline";
        }else{
            buttonLinks[i].style.display = "inline";
            unactiveButtons[i].style.display = "none";
        }
    }
}



function update() {
    if(pairOfButtons.length>0 && menu!=null){
        if(time%20==0){
            if(time==0){
                fillLevels();
                buttons[99].style.fontSize = "22px";
            }
            setState();
        }
        time++;
        setTimeout(update, 10);
    }else{
        menu = document.getElementById("Menu");
    }
}
function startUpdate(){
    if(time==0){
        setTimeout(update, 10);
        setTimeout(startUpdate, 10);
    }
}
setTimeout(startUpdate, 0);