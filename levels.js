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
        this.subType = "buttonAndDoor";
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
        this.subType = "rectangle";
    }
}
class EndLevelButt {
    constructor(x, y, width, height) {
        this.body = Matter.Bodies.rectangle(x, y, width, height, {isStatic:true});
        this.type = "rectangle";
        this.subType = "endLevelButt";
    }
}
var levels = [];
levels[0] = new Level("Level 1", [new Rectangle(170.5,118.5,367,79),new Rectangle(249.5,-62.5,35,157),new EndLevelButt(287.5,-189,55,48)]);
levels[1] = new Level("Level 1", [new Rectangle(434,101,0,0),new Rectangle(180.5,94.5,439,57),new Rectangle(463,-58.5,-52,217),new Rectangle(-106.5,-75,57,314),new Rectangle(176.5,-213.5,419,31)]);