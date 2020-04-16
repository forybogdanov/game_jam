class Level {
    constructor(_name, _objects) {
        this.name = _name;
        this.objects = _objects;
    }
}
class ButtonAndDoor {
    constructor(bX, bY, dX, dY, sizeX, sizeY) {
        this.bX = bX;
        this.bY = bY;
        this.dX = dX;
        this.dY = dY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.type = "buttonAndDoor";
        this.button = Matter.Bodies.rectangle(this.bX, this.bY, 50, 10, {isStatic: true, 
        render:{
                fillStyle: "#ff0062",
                strokeStyle: "#ff0062"
               }
        });
        this.door = Matter.Bodies.rectangle(this.dX, this.dY, this.sizeX, this.sizeY, {isStatic: true, 
        render:{
                fillStyle: "#ff0062",
                strokeStyle: "#ff0062"
               }
        });
        this.openDoor = function() {
            Matter.Composite.remove(engine.world, this.door);
        }
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.body = Matter.Bodies.rectangle(x, y, width, height, {isStatic:true});
        this.type = "rectangle";
    }
}
var levels = [];
levels[0] = new Level("Level 1", [new Rectangle(218,184.5,436,81),new Rectangle(276,314,-346,-56)]);