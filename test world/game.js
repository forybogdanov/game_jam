let Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies;
var mouseX = 0, mouseY =  0, portalColor = '#e5fa45', tramplinsColor = '#ff5c5c';
var selectedLevel = 0;
// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
	element: document.body,
	engine: engine,
    options:{hasBounds: true, wireframes: false}
});
render.options.background = "#adffa2";

var buttonsAndDoors = [];
var cannonballs = [], lastBall = 0;
var vector = {x: 0, y: 0};
function shoot() {
    if (mouseX < 800 && !isPaused) {
        let bulletSpeed = 12;
        //console.log(mouseX, mouseY);
        mX = mouseX + render.bounds.min.x;
        mY = mouseY + render.bounds.min.y;
        vector = {x: mX - player.position.x, y: mY-player.position.y};
        vector.x /= Math.sqrt((vector.x * vector.x + vector.y * vector.y));
        vector.y /= Math.sqrt((vector.x * vector.x + vector.y * vector.y));
        //console.log(vector);
        cannonballs[cannonballs.length]  = Bodies.circle(player.position.x + vector.x * 20, 
                                                         player.position.y + vector.y * 20, 10, { restitution: 0.5 });
        World.add(engine.world, cannonballs[cannonballs.length - 1]);
        Matter.Body.setVelocity(cannonballs[cannonballs.length - 1], {x: vector.x * bulletSpeed,
                                             y: vector.y * bulletSpeed});
        if(cannonballs.length > 50){
            Matter.Composite.remove(engine.world, cannonballs[lastBall]);
            lastBall++;
        }
    }
}
// 20, 0
var player = Bodies.rectangle(0, 0, 30, 30);
var playerIsOnGround = false;
World.add(engine.world, player);

window.addEventListener('keydown', handleKeyDown);
var keyPressed = {}
function handleKeyDown(event) {
	if(event.key == "d" || event.key == "D") {
		keyPressed.d = true;
	}
	if(event.key == "a" || event.key == "A") {
		keyPressed.a = true;
	}
	if(event.key == "w" || event.key == "W") {
		keyPressed.w = true;
	}
}

window.addEventListener('keyup', handleKeyUp);
function handleKeyUp(event) {
	if(event.key == "d" || event.key == "D") {
		keyPressed.d = false;
	}
	if(event.key == "w" || event.key == "W") {
		keyPressed.w = false;
	}
	if(event.key == "a" || event.key == "A") {
		keyPressed.a = false;
	}
}

var boxes = [], traplins = [], portals = [];
var brBoxes = 0;
var lastPlaced;
window.addEventListener('mousemove', handleMouseMove);
function handleMouseMove(event) {
	var currTime = new Date();
	if(false && lastPlaced == undefined || currTime - lastPlaced > 100) {
		boxes[brBoxes] = Bodies.rectangle(event.x, event.y, 15, 15, { restitution: 0.8 });
		World.add(engine.world, boxes[brBoxes]);
		brBoxes ++;
		lastPlaced = currTime;
	}
    mouseX = event.x;
    mouseY = event.y;
}

window.addEventListener('mousedown', shoot);

function update() {
	let speed = 2;
    if (!isPaused) {
        if(keyPressed.d) {
            Matter.Body.setVelocity(player, {x: speed, y: player.velocity.y});
            //Matter.Body.applyForce(player, {x: 0, y: 0}, {x: 0.001, y: 0});
        }
        if(keyPressed.a) {
            Matter.Body.setVelocity(player, {x: -speed, y: player.velocity.y});
            //Matter.Body.applyForce(player, {x: 0, y: 0}, {x: -10, y: 0});
        }
        if(keyPressed.w && playerIsOnGround) {
            Matter.Body.setVelocity(player, {x: 0, y: -7});
        }
        if(player.position.y > 2000) {
            Matter.Body.setPosition(player, {x: 60, y: -500});
        }
    }
    var cameraSizeX = 800, cameraSizeY = 600;
    render.bounds.min.x = player.position.x - cameraSizeX/2;
    render.bounds.max.x = cameraSizeX/2 + player.position.x;
    render.bounds.min.y = player.position.y - cameraSizeY/2;
    render.bounds.max.y = cameraSizeY/2 + player.position.y;
}

setInterval(update, 2);

Matter.Events.on(engine, 'collisionStart', collisionStartHandler);
function collisionStartHandler(ev) {
	for(let i = 0;i < ev.pairs.length; i++) {
////////////////// kod za skachane tramolini ////////////////////////////////////////
        for( let m = 0; m < traplins.length; m++){
            if(ev.pairs[i].bodyA.id == traplins[m].id){
                Matter.Body.setVelocity(ev.pairs[i].bodyB, {x: 0, y:  - 15}); 
            }
            if(ev.pairs[i].bodyB.id == traplins[m].id){
                Matter.Body.setVelocity(ev.pairs[i].bodyA, {x: 0, y: - 15}); 
            }
        }
        /*for(let n = 0; n < 1; n++){
                if(ev.pairs[i].bodyA.id == portals[n][0].id){
                    if(ev.pairs[i].bodyB.position.x < ev.pairs[i].bodyA.position.x){
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][1].position.x + 50,
                                                             y: portals[n][1].position.y});
                    }else{
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][1].position.x - 50,
                                                             y: portals[n][1].position.y});

                    }
                } 
                if(ev.pairs[i].bodyB.id == portals[n][0].id){
                    if(ev.pairs[i].bodyA.position.x < ev.pairs[i].bodyB.position.x){
                        Matter.Body.setPosition(ev.pairs[i].bodyA, {x: portals[n][1].position.x + 50,
                                                         y: portals[n][1].position.y});
                    }else{
                        Matter.Body.setPosition(ev.pairs[i].bodyA, {x: portals[n][1].position.x - 50,
                                                         y: portals[n][1].position.y});
                    }
                }
                if(ev.pairs[i].bodyA.id == portals[n][1].id){
                    if(ev.pairs[i].bodyB.position.x < ev.pairs[i].bodyA.position.x){
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][0].position.x + 50,
                                                         y: portals[n][0].position.y});
                    }else{
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][0].position.x - 50,
                                                         y: portals[n][0].position.y});
                    }
                }
                if(ev.pairs[i].bodyB.id == portals[n][1].id){
                    if(ev.pairs[i].bodyA.position.x < ev.pairs[i].bodyB.position.x){
                        Matter.Body.setPosition(ev.pairs[i].bodyA, {x: portals[n][0].position.x + 50,
                                                         y: portals[n][0].position.y});
                    }else{
                        Matter.Body.setPosition(ev.pairs[i].bodyA, {x: portals[n][0].position.x - 50,
                                                         y: portals[n][0].position.y});
                    }
                }
            if(ev.pairs[i].bodyA.id == portals[n][0].id){
                    if(ev.pairs[i].bodyB.position.y < ev.pairs[i].bodyA.position.y){
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][1].position.x,
                                                             y: portals[n][1].position.y + 50});
                        console.log("right teleport");
                    }else{
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][1].position.x,
                                                             y: portals[n][1].position.y} - 50);
                        console.log("left teleport");

                    }
                } 
                if(ev.pairs[i].bodyB.id == portals[n][0].id){
                    if(ev.pairs[i].bodyA.position.y < ev.pairs[i].bodyB.position.y){
                        Matter.Body.setPosition(ev.pairs[i].bodyA, {x: portals[n][1].position.x ,
                                                         y: portals[n][1].position.y + 50});
                        console.log("right teleport");
                    }else{
                        Matter.Body.setPosition(ev.pairs[i].bodyA, {x: portals[n][1].position.x,
                                                         y: portals[n][1].position.y - 50});
                        console.log("left teleport");
                    }
                }
                if(ev.pairs[i].bodyA.id == portals[n][1].id){
                    if(ev.pairs[i].bodyB.position.y < ev.pairs[i].bodyA.position.y){
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][0].position.x,
                                                         y: portals[n][0].position.y + 50});
                        console.log("right teleport");
                    }else{
                        Matter.Body.setPosition(ev.pairs[i].bodyB, {x: portals[n][0].position.x,
                                                         y: portals[n][0].position.y - 50});
                        console.log("left teleport");
                    }
                }
        }*/
		if(ev.pairs[i].bodyA.id == player.id || ev.pairs[i].bodyB.id == player.id) {
            let t = 0;
            for (let b = 0; b < cannonballs.length; b++) {
                if (ev.pairs[i].bodyA.id != cannonballs[b].id && ev.pairs[i].bodyB.id != cannonballs[b].id) {
                    t++;
                }
            }
            if (t == cannonballs.length) {
                playerIsOnGround = true;
            }
		}
		for(let j = 0;j < brBoxes;j ++) {
			if(boxes[j].id == ev.pairs[i].bodyA.id || boxes[j].id == ev.pairs[i].bodyB.id) {
				setTimeout(function(id) {
					Matter.Body.setStatic(boxes[id], true);
				}, 200, j);
			}
		}
        for (let h = 0; h < buttonsAndDoors.length; h++) {
            if (ev.pairs[i].bodyA.id == buttonsAndDoors[h].button.id 
                || ev.pairs[i].bodyB.id == buttonsAndDoors[h].button.id) {
                buttonsAndDoors[h].openDoor();
            }
        }
	}
};

Matter.Events.on(engine, 'collisionEnd', collisionEndHandler);
function collisionEndHandler(ev) {
	for(var i = 0;i < ev.pairs.length;i ++) {
		/*
		if((ev.pairs[i].bodyA.id == ground.id && ev.pairs[i].bodyB.id == player.id) ||
		   (ev.pairs[i].bodyA.id == player.id && ev.pairs[i].bodyB.id == ground.id)) {
			playerIsOnGround = false;
		}
		*/
		if(ev.pairs[i].bodyA.id == player.id || ev.pairs[i].bodyB.id == player.id) {
			playerIsOnGround = false;
		}
	}
}
function loadLevel() {
    for (let i = 0; i < levels[selectedLevel].objects.length; i++) {
        if (levels[selectedLevel].objects[i].type == "rectangle") {
            World.add(engine.world, levels[selectedLevel].objects[i].body);
        }
        if (levels[selectedLevel].objects[i].type == "buttonAndDoor") {
            buttonsAndDoors.push(levels[selectedLevel].objects[i]);
            World.add(engine.world, levels[selectedLevel].objects[i].button);
            World.add(engine.world, levels[selectedLevel].objects[i].door);
        }
    }
};
loadLevel();
Engine.run(engine);
Render.run(render);