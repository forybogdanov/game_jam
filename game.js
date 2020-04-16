var clickedAt = {x:0, y:0}, offset = {x: 0, y: 0}, drawCurrentShape = false, mode = "create", currentShape = "rectangle", doorColor = "red", buttonSize = {x: 50, y: 10},  rectangleColor = "black", buttonColor = "blue", selectedObjectId, movingObject = false;
// Creating variables
var objects=[], levelScript = "", rectBeginningText = "new Rectangle(", bdBegginningText = "new ButtonAndDoor(";
function update() {
    if (isKeyPressed[39]) {
        offset.x += 2;
    }
    if (isKeyPressed[37]) {
        offset.x -= 2;
    }
    if (isKeyPressed[40]) {
        offset.y += 2;
    }
    if (isKeyPressed[38]) {
        offset.y -= 2;
    }
    if (mode == "edit") {
        if  (movingObject) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].x = mouseX - objects[selectedObjectId].width/2 + offset.x;
                objects[selectedObjectId].y = mouseY - objects[selectedObjectId].height/2 + offset.y;
            }
        }
        if (isKeyPressed[87]) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].height -= 1;
            }
        }
        if (isKeyPressed[83]) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].height += 1;
            }
        }
        if (isKeyPressed[65]) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].width -= 1;
            }
        }
        if (isKeyPressed[68]) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].width += 1;
            }
        }
    }
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
            context.fillRect(objects[i].bX - offset.x, objects[i].bY - offset.y, buttonSize.x, buttonSize.y);
            context.fillStyle = doorColor;
            context.fillRect(objects[i].dX - offset.x, objects[i].dY - offset.y, objects[i].sizeX, objects[i].sizeY);
        }
    }
    if (drawCurrentShape && clickedAt.x < 800 && clickedAt.y < 600) {
        if (currentShape == "rectangle" || currentShape == "buttonAndDoor") context.strokeRect(clickedAt.x, clickedAt.y, mouseX - clickedAt.x, mouseY - clickedAt.y);
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};
function mousedown() {
    if (mode == "create") {
        clickedAt.x = mouseX;
        clickedAt.y = mouseY;
        drawCurrentShape = true;
    }
    if (mode == "edit" && selectedObjectId != undefined) {
        if (objects[selectedObjectId].type == "rectangle" && areColliding(objects[selectedObjectId].x - offset.x, objects[selectedObjectId].y - offset.y, objects[selectedObjectId].width, objects[selectedObjectId].height, mouseX, mouseY, 1, 1)) {
            movingObject = true;
        }
    }
};
function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);

    if (mode == "create" && mouseX <= 800 && mouseY <= 600) {
        if (currentShape == "rectangle") {
            let width = mouseX - clickedAt.x, height= mouseY - clickedAt.y;
            objects.push({type: "rectangle", x: clickedAt.x + offset.x, y: clickedAt.y +  + offset.y, width: width, height: height});
            drawCurrentShape = false;
        }
        if (currentShape == "buttonAndDoor") {
            let width = mouseX - clickedAt.x, height= mouseY - clickedAt.y;
            objects.push({type: "buttonAndDoor", bX: clickedAt.x + offset.x, bY: clickedAt.y + offset.y - 15, dX: clickedAt.x + offset.x, dY: clickedAt.y + offset.y, sizeX: width, sizeY: height});
            drawCurrentShape = false;
        }
    }
    if (mode == "edit") {
        if (movingObject == true) {
            movingObject = false;
            selectedObjectId = undefined;
        }
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == "rectangle") {
                if (areColliding(objects[i].x - offset.x, objects[i].y - offset.y, objects[i].width, objects[i].height, mouseX, mouseY, 1, 1)) {
                    selectedObjectId = i;
                }
            }
        }
    }
};
