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
levels[1] = new Level("Level 1", [new Rectangle(206.5,64,721,46),new Rectangle(453.5,-68,-59,178),new Rectangle(556,-231.5,62,235),new Rectangle(646,-398.5,34,295),new Rectangle(715,-569,42,272),new Rectangle(777,-717.5,-26,297),new ButtonAndDoor(65,-216,195,-22,-18,86),new Rectangle(182,-84.5,86,17),new Rectangle(67.5,-195.5,121,-11),new Rectangle(7,-246,-14,62),new Rectangle(120,-241,22,60),new EndLevelButt(794.5,-949.5,43,47)]);