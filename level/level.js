var clickedAt = {x:0, y:0}, offset = {x: 0, y: 0}, drawCurrentShape = false, mode = "create", currentShape = "rectangle", doorColor = "red", rectangleColor = "black", buttonColor = "blue";
// Creating variables
var objects=[], levelScript = "", rectBeginningText = "new Rectangle(", bdBegginningText = "new ButtonAndDoor(";
function update() {
}

function draw() {
    // This is how you draw a rectangle
    context.strokeStyle = context.fillStyle;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == "rectangle") {
            context.strokeStyle = rectangleColor;
            context.strokeRect(objects[i].x - offset.x, objects[i].y - offset.y, objects[i].width, objects[i].height);
        }
        if (objects[i].type == "buttonAndDoor") {
            context.fillStyle = buttonColor;
            context.fillRect(objects[i].bX, objects[i].bY, 50, 10);
            context.fillStyle = doorColor;
            context.fillRect(objects[i].dX, objects[i].dY, objects[i].sizeX, objects[i].sizeY);
        }
    }
    if (drawCurrentShape) {
        if (currentShape == "rectangle" || currentShape == "buttonAndDoor") context.strokeRect(clickedAt.x, clickedAt.y, mouseX - clickedAt.x, mouseY - clickedAt.y);
    }
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
