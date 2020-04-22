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
levels[1] = new Level("Level 1", [new Rectangle(104,32,344,-12),new Rectangle(304,-23,8,387),new Rectangle(374,-483,8,387),new Rectangle(468,-908,8,387),new EndLevelButt(545,-1144,24,11)]);
levels[2] = new Level("Level 1", [new Rectangle(162,9,155,30),new Rectangle(293,-71,155,30),new Rectangle(436,-151,155,30),new Rectangle(9,28.5,70,-1)]);

