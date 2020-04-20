var clickedAt = {x:0, y:0}, offset = {x: -200, y: -300}, drawCurrentShape = false, mode = "create", currentShape = "rectangle", currSubType = "rectangle", currType = "rectangle", doorColor = "red", buttonSize = {x: 50, y: 10},  rectangleColor = "black", buttonColor = "blue", selectedObjectId, movingObject = false, whichPartOfObjectIsSelected, copiedObject;
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
            if (objects[selectedObjectId].type == "buttonAndDoor") {
                if (whichPartOfObjectIsSelected == 0) {
                    objects[selectedObjectId].bX = mouseX - buttonSize.x/2 + offset.x;
                    objects[selectedObjectId].bY = mouseY - buttonSize.y/2 + offset.y;
                }
                if (whichPartOfObjectIsSelected == 1) {
                    objects[selectedObjectId].dX = mouseX - objects[selectedObjectId].sizeX/2 + offset.x;
                    objects[selectedObjectId].dY = mouseY - objects[selectedObjectId].sizeY/2 + offset.y;
                }
            }
        }
        if (isKeyPressed[87]) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].height -= 1;
            }
            if (objects[selectedObjectId].type == "buttonAndDoor" && whichPartOfObjectIsSelected == 1) {
                objects[selectedObjectId].sizeY -= 1;
            }
        }
        if (isKeyPressed[83]) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].height += 1;
            }
            if (objects[selectedObjectId].type == "buttonAndDoor" && whichPartOfObjectIsSelected == 1) {
                objects[selectedObjectId].sizeY += 1;
            }
        }
        if (isKeyPressed[65]) {
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].width -= 1;
            }
            if (objects[selectedObjectId].type == "buttonAndDoor" && whichPartOfObjectIsSelected == 1) {
                    objects[selectedObjectId].sizeX -= 1;
                }
        }
        if (isKeyPressed[68]) {
            console.log(selectedObjectId);
            if (objects[selectedObjectId].type == "rectangle") {
                objects[selectedObjectId].width += 1;
            }
            if (objects[selectedObjectId].type == "buttonAndDoor" && whichPartOfObjectIsSelected == 1) {
                objects[selectedObjectId].sizeX += 1;
            }
        }
    }
}

function draw() {
    // This is how you draw a rectangle
    context.strokeStyle = context.fillStyle;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == "rectangle") {
            if (objects[i].subType == "rectangle") context.strokeStyle = rectangleColor;
            if (objects[i].subType == "endLevelButt") context.strokeStyle = "#ff9300";
            context.strokeRect(objects[i].x - offset.x, objects[i].y - offset.y, objects[i].width, objects[i].height);
        }
        if (objects[i].type == "buttonAndDoor") {
            context.strokeStyle = buttonColor;
            context.strokeRect(objects[i].bX - offset.x, objects[i].bY - offset.y, buttonSize.x, buttonSize.y);
            context.strokeStyle = doorColor;
            context.strokeRect(objects[i].dX - offset.x, objects[i].dY - offset.y, objects[i].sizeX, objects[i].sizeY);
        }
    }
    if (drawCurrentShape && clickedAt.x < 800 && clickedAt.y < 600) {
        if (currType == "rectangle" || currType == "buttonAndDoor") context.strokeRect(clickedAt.x, clickedAt.y, mouseX - clickedAt.x, mouseY - clickedAt.y);
    }
    context.fillStyle = "black";
    context.fillRect(-15 - offset.x, -15 - offset.y, 30, 30);
};
function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
    if (key == 67 && isKeyPressed[17] && selectedObjectId != undefined) {
        copiedObject = JSON.parse(JSON.stringify(objects[selectedObjectId]));
    }
    if (key == 86 && isKeyPressed[17] && selectedObjectId != undefined) {
        copiedObject.x = mouseX + offset.x;
        copiedObject.y = mouseY + offset.y;
        objects.push(JSON.parse(JSON.stringify(copiedObject)));
    }
    if (key == 46 && selectedObjectId != undefined) {
        objects[selectedObjectId] = objects[objects.length - 1];
        objects.pop();
        selectedObjectId = undefined;
    }
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
        if (objects[selectedObjectId].type == "buttonAndDoor")
        if (areColliding(objects[selectedObjectId].bX - offset.x, objects[selectedObjectId].bY - offset.y, buttonSize.x, buttonSize.y, mouseX, mouseY, 1, 1) && whichPartOfObjectIsSelected == 0) {
            movingObject = true;
        }
        if (areColliding(objects[selectedObjectId].dX - offset.x, objects[selectedObjectId].dY - offset.y, objects[selectedObjectId].sizeX, objects[selectedObjectId].sizeY, mouseX, mouseY, 1, 1) && whichPartOfObjectIsSelected == 1) {
            movingObject = true;
        }
    }
};
function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);

    if (mode == "create" && mouseX <= 800 && mouseY <= 600) {
        if (currType == "rectangle") {
            let width = mouseX - clickedAt.x, height = mouseY - clickedAt.y;
            objects.push({type: currType, subType: currSubType, x: clickedAt.x + offset.x, y: clickedAt.y +  + offset.y, width: width, height: height});
            drawCurrentShape = false;
        }
        if (currType == "buttonAndDoor") {
            let width = mouseX - clickedAt.x, height= mouseY - clickedAt.y;
            objects.push({type: "buttonAndDoor", subType: "buttonAndDoor", bX: clickedAt.x + offset.x, bY: clickedAt.y + offset.y - 15, dX: clickedAt.x + offset.x, dY: clickedAt.y + offset.y, sizeX: width, sizeY: height});
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
            if (objects[i].type == "buttonAndDoor") {
                if (areColliding(objects[i].bX - offset.x, objects[i].bY - offset.y, buttonSize.x, buttonSize.y, mouseX, mouseY, 1, 1)) {
                    selectedObjectId = i;
                    whichPartOfObjectIsSelected = 0;
                }
                if (areColliding(objects[i].dX - offset.x, objects[i].dY - offset.y, objects[i].sizeX, objects[i].sizeY, mouseX, mouseY, 1, 1)) {
                    selectedObjectId = i;
                    whichPartOfObjectIsSelected = 1;
                }
            }
        }
    }
};
