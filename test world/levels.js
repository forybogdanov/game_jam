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
levels[0] = new Level("Level 1", [new Rectangle(97,97,140,233),new Rectangle(331,240,115,326),new Rectangle(602,414,-412,43),new Rectangle(92,444,176,43),new Rectangle(688,478,33,55),new Rectangle(692,409,-83,-37),new Rectangle(426,346,-203,46),new Rectangle(197,410,-13,31),new Rectangle(266,477,16,-3),new Rectangle(348,457,125,5),new Rectangle(534,454,14,-58),new Rectangle(551,360,0,-39),new ButtonAndDoor(537,144,537,159,10,167)]);