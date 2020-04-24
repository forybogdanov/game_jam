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
levels[0] = new Level("Level 1", [new Rectangle(270,40,570,15),new EndLevelButt(530,10,45,45)]);
levels[1] = new Level("Level 2", [new Rectangle(80,20,200,15),new Rectangle(340,20,200,15),new EndLevelButt(400,-10,45,45)]);
levels[2] = new Level("Level 3", [new Rectangle(85,25,200,15),new Rectangle(177.5,-45,15,-153.5),new Rectangle(280,-115,220,15),new EndLevelButt(365,-145,45,45)]);
levels[3] = new Level("Level 4", [new Rectangle(270,40,600,15),new ButtonAndDoor(235,-100,280,-25,15,100),new EndLevelButt(540,10,45,45)]);
levels[4] = new Level("Level 5", [new Rectangle(60,30,150,15),new Rectangle(200,-10,50,15),new Rectangle(300,-60,50,15),new Rectangle(405,-100,50,15),new Rectangle(515,-155,50,15),new Rectangle(670,-205,130,15),new EndLevelButt(710,-235,45,45)]);
levels[5] = new Level("Level 6", [new Rectangle(60,30,150,15),new Rectangle(200,-10,50,15),new Rectangle(300,-60,50,15),new Rectangle(405,-100,50,15),new Rectangle(515,-155,50,15),new Rectangle(670,-205,130,15),new EndLevelButt(710,-235,45,45)]);

