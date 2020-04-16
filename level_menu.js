var clickedAt = {x:0, y:0}, offset = {x: 0, y: 0}, drawCurrentShape = false, mode = "create", currentShape = "rectangle", doorColor = "red", rectangleColor = "black", buttonColor = "blue";
// Creating variables
var objects=[], levelScript = "", rectBeginningText = "new Rectangle(", bdBegginningText = "new ButtonAndDoor(";
function update() {
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
