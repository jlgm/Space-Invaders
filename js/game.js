var NUM_MONSTERS1 = 30;
var NUM_MONSTERS2 = 20;
var maxX = 468; 
var maxY = 425;
var movetime = 1000;
var speed = 10;
var end = false;
var dead = 0;

var monstersDir = 1;

// var initDocument = $.extend(true, {}, document);

//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

$(document).ready(function(){
	document.body.appendChild(canvas);
});


//background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

//allien1 image
var a1Ready = false;
var a1Image = new Image();
a1Image.onload = function () {
	a1Ready = true;
};
a1Image.src = "images/a1.png";

//allien2 image
var a2Ready = false;
var a2Image = new Image();
a2Image.onload = function () {
	a2Ready = true;
};
a2Image.src = "images/a2.png";

//allien3 image
var a3Ready = false;
var a3Image = new Image();
a3Image.onload = function () {
	a3Ready = true;
};
a3Image.src = "images/a3.png";

//allien4 image
var a4Ready = false;
var a4Image = new Image();
a4Image.onload = function () {
	a4Ready = true;
};
a4Image.src = "images/a4.png";

//enemy shot
var shotReady = false;
var shotImage = new Image();
shotImage.onload = function () {
	shotReady = true;
};
shotImage.src = "images/enemyshot.png";

//hero shot
var heroshotReady = false;
var heroshotImage = new Image();
heroshotImage.onload = function () {
	heroshotReady = true;
};
heroshotImage.src = "images/heroshot.png";

//monster destroyed
var monsterDestroyedReady = false;
var monsterDestroyedImage = new Image();
monsterDestroyedImage.onload = function () {
	monsterDestroyedReady = true;
};
monsterDestroyedImage.src = "images/dying.png";

//congratulations
var congratulationsReady = false;
var congratulationsImage = new Image();
congratulationsImage.onload = function () {
	congratulationsReady = true;
};
congratulationsImage.src = "images/congratulations.png";

//gameover
var gameoverReady = false;
var gameoverImage = new Image();
gameoverImage.onload = function () {
	gameoverReady = true;
};
gameoverImage.src = "images/gameover.png";


//game objects
var hero = {
	speed: 1,
	x: (canvas.width / 2),
	y: (canvas.height -50),
	shootX: 0,
	shootY: 0,
	isShooting: false
};

var monsters = new Array();

var tmp = {
		speed: 3,
		x: 32,
		y: 32,
		shootX: 500, //bullet coordinates
		shootY: 500,
		shootDir: 1, //shoot direction
		last: false,
		isShooting: true,
		image: (Math.ceil(Math.random()*4) >= 2),
		isAlive: true,
		scoreValue: 20,
		destroyed: 0
};
monsters.push(tmp);
	
for (var i = 1;  i < NUM_MONSTERS1; i++) {
	var obj = {
		speed: 3,
		x: (monsters[i-1].last)?32:monsters[i-1].x + 32,
		y: (monsters[i-1].last)?monsters[i-1].y+32:monsters[i-1].y,
		shootX: 500, //bullet coordinates
		shootY: 500,
		shootDir: 1, //shoot direction
		last: ((i+1)%10 == 0),
		isShooting: true,
		image: (Math.floor(Math.random()*4) >= 2),
		isAlive: true,
		scoreValue: 20,
		destroyed: 0
	};
	monsters.push(obj);
}

var monsters2 = new Array();

var tmp2 = {
		speed: 3,
		x: 32,
		y: 32*(NUM_MONSTERS1/10 +1),
		shootX: 500, //bullet coordinates
		shootY: 500,
		shootDir: 1, //shoot direction
		last: false,
		isShooting: true,
		image: (Math.ceil(Math.random()*4) >= 2),
		isAlive: true,
		scoreValue: 10,
		destroyed: 0
};
monsters2.push(tmp2);
	
for (var i = 1;  i < NUM_MONSTERS2; i++) {
	var obj = {
		speed: 3,
		x: (monsters2[i-1].last)?32:monsters2[i-1].x + 32,
		y: (monsters2[i-1].last)?monsters2[i-1].y+32:monsters2[i-1].y,
		shootX: 500, //bullet coordinates
		shootY: 500,
		shootDir: 1, //shoot direction
		last: ((i+1)%10 == 0),
		isShooting: true,
		image: (Math.floor(Math.random()*4) >= 2),
		isAlive: true,
		scoreValue: 10,
		destroyed: 0
	};
	monsters2.push(obj);
}

var score = 0;
var shots = 0;

//handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


//whenever the monster m is shot or collide with the hero
//this function is called
var reset = function () {
	hero.shootX = hero.x+12;
	hero.shootY = hero.y;
};

var count = 0, path = 0, changed = false;

var update = function (modifier) {
	if (37 in keysDown) { //left
		hero.x -= (hero.speed*1);
		hero.x = Math.max(hero.x, 15);
	}
	
	if (39 in keysDown) { //right
		hero.x += (hero.speed*1);
		hero.x = Math.min(hero.x, 468);
	}
	
	if (32 in keysDown) { //hero shooting (space bar)
		
		if (!hero.isShooting) {
			hero.isShooting = true;
			hero.shootX = hero.x+12; //initial position of the shoot will be the hero's position
			hero.shootY = hero.y;
		}
		
	}
	
	var move = speed;
	
	if (count < movetime) move = 0;
	else {
		count = 0;
		path++;
	}
	
	if (path >= 10) {
		monstersDir*=(-1), path = 0;
		for (var i = 0; i < NUM_MONSTERS1; i++) {
			monsters[i].y += 10;
		}
		for (var i = 0; i < NUM_MONSTERS2; i++) {
			monsters2[i].y += 10;
		}
		changed = true;
	}
	
	//making the monsters move
	for (var i = 0; i < NUM_MONSTERS1; i++) {
	
		if (!monsters[i].isAlive) continue;
		
		if (i*i*i*(Math.ceil(Math.random()*100)) == count) monsters[i].isShooting = true;
		
		if (monsters[i].isShooting) monsters[i].shootY += monsters[i].shootDir;
		
		if (!count) monsters[i].image = !monsters[i].image;
		
		// if (monsters[i].isShooting) ctx.drawImage(shotImage, monsters[i].shootX, monsters[i].shootY);
		
		//making the monster[i] shoot again
		if (monsters[i].shootY > 700) {
			monsters[i].isShooting = false;
			monsters[i].shootX = monsters[i].x; 
			monsters[i].shootY = monsters[i].y+5;
			// monsters[i].shootDir = (monsters[i].shootY < hero.y)?(1):(-1);
		}
		
		if (!changed) monsters[i].x += move*monstersDir;//, monsters[i].shootX +=(monsters[i].isShooting?0:move);
		
		if (monsters[i].y > maxY-40) gameover(0);
	}
		
	for (var i = 0; i < NUM_MONSTERS2; i++) {
	
		if (!monsters2[i].isAlive) continue;
		
		if (i*i*i*(Math.ceil(Math.random()*100)) == count) monsters2[i].isShooting = true;
		
		if (monsters2[i].isShooting) monsters2[i].shootY += monsters2[i].shootDir;
		
		if (!count) monsters2[i].image = !monsters2[i].image;
		
		//making the monster2[i] shoot again
		if (monsters2[i].shootY > 700) {
			monsters2[i].isShooting = false;
			monsters2[i].shootX = monsters2[i].x; 
			monsters2[i].shootY = monsters2[i].y+5;
			// monsters2[i].shootDir = (monsters2[i].shootY < hero.y)?(1):(-1);
		}
		
		if (!changed) monsters2[i].x += move*monstersDir;//, monsters2[i].shootX +=(monsters2[i].isShooting?0:move);;
		
		if (monsters2[i].y > maxY-40) gameover(0);
		
	}

	count++;
	
	changed = false;
		
	//moving the hero's bullet
	if (hero.isShooting) {
			hero.shootY-=3;
			if (hero.shootY < 0) hero.isShooting = false; //ready to shoot another time
	}
	
	//detecting shoots
	for (var i = 0; i < NUM_MONSTERS1; i++) {
	// if (monsters[i].isShooting) render();
		if (!monsters[i].isShooting) continue;
		if (!monsters[i].isAlive) continue;
		if (Math.abs(hero.x-monsters[i].shootX) <= 20 && Math.abs(hero.y-monsters[i].shootY) <= 20 && monsters[i].shootY > hero.y) {
			gameover(0);
		}
	}
	
	for (var i = 0; i < NUM_MONSTERS1; i++) {
		if (!monsters[i].isAlive) {	dead++; continue; }
		if (hero.shootX <= (monsters[i].x + 20)
			&& monsters[i].x <= (hero.shootX + 20)
			&& hero.shootY <= (monsters[i].y + 20)
			&& monsters[i].y <= (hero.shootY + 20)) {
			if (hero.isShooting) { 
				score+=monsters[i].scoreValue;
				// ctx.clearRect(monsters[i].x,monsters[i].y, monsters[i].x + 30 , monsters[i].y + 32 );
			}
			reset();
			hero.isShooting = false;
			monsters[i].isShooting = false;
			monsters[i].isAlive = false;
			movetime-=20;
			// speed+=2;
		}
	}
		
	for (var i = 0; i < NUM_MONSTERS2; i++) {
		// if (monsters2[i].isShooting) render();
		if (!monsters2[i].isShooting) continue;
		if (!monsters2[i].isAlive) continue;
		if (Math.abs(hero.x-monsters2[i].shootX) <= 20 && Math.abs(hero.y-monsters2[i].shootY)  <= 20 && monsters2[i].shootY > hero.y) {
			gameover(0);
		}
	}
	
	for (var i = 0; i < NUM_MONSTERS2; i++) {
	if (!monsters2[i].isAlive) {	dead++; continue; }
		if (hero.shootX <= (monsters2[i].x + 20)
			&& monsters2[i].x <= (hero.shootX + 20)
			&& hero.shootY <= (monsters2[i].y + 20)
			&& monsters2[i].y <= (hero.shootY + 20)) {
			if (hero.isShooting) { 
				score+=monsters2[i].scoreValue;
				// ctx.clearRect(monsters2[i].x,monsters2[i].y, monsters2[i].x + 30 , monsters2[i].y + 32 );
			}
			reset();
			hero.isShooting = false;
			monsters2[i].isShooting = false;
			monsters2[i].isAlive = false;
			movetime-=20;
			// speed+=2;
		}
	}
	
	
	if (dead == NUM_MONSTERS1 + NUM_MONSTERS2) gameover(1);
	else dead = 0;
	
};

//draw everything

var count = 0;

var render = function () {
	
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
		if (hero.isShooting) if (heroshotReady) ctx.drawImage(heroshotImage, hero.shootX, hero.shootY);
	}
	for (var i = 0; i < NUM_MONSTERS1; i++) {
		if (a1Ready) {
			var tmp = false;
			if (monsters[i].isAlive) {
				ctx.drawImage(monsters[i].image?a1Image:a2Image, monsters[i].x, monsters[i].y);
				if (monsters[i].isShooting) ctx.drawImage(shotImage, monsters[i].shootX, monsters[i].shootY);
			}
			else if (monsters[i].destroyed <= 10) {
				ctx.drawImage(monsterDestroyedImage, monsters[i].x, monsters[i].y);
				tmp = true;
			}
			if (tmp) monsters[i].destroyed++;
		}
	}
	
	for (var i = 0; i < NUM_MONSTERS2; i++) {
		if (a3Ready) {
			var tmp = false;
			if (monsters2[i].isAlive) {
				ctx.drawImage(monsters2[i].image?a3Image:a4Image, monsters2[i].x, monsters2[i].y);
				if (monsters2[i].isShooting) ctx.drawImage(shotImage, monsters2[i].shootX, monsters2[i].shootY);
			}
			else if (monsters2[i].destroyed <= 10) {
				ctx.drawImage(monsterDestroyedImage, monsters2[i].x, monsters2[i].y);
				tmp = true;
			}
			if (tmp) monsters2[i].destroyed++;
		}
	}
	
	//score
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	ctx.fillText("Score: " + score, 32, 32);
	
	count++;
	
};

var renderGameOver = function() {
	ctx.drawImage(gameoverImage, 0, 0);
	ctx.drawImage(monsterDestroyedImage, hero.x, hero.y);
	if (32 in keysDown) { //hero shooting (space bar)
		
		location.reload();
		
	}
	
}

var renderGameComplete = function() {
	ctx.drawImage(congratulationsImage, 0, 0);
	if (32 in keysDown) { //hero shooting (space bar)
		
		location.reload();
		
	}
	
}

var gameover = function(i) {
	clearInterval(program);
	if (i == 0) setInterval(renderGameOver, 1);
	else setInterval(renderGameComplete, 1);
}

//the main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	if (!end) {
		update(delta / 1000);
		render();
	}
	then = now;
};

var then = Date.now();

var program = setInterval(main, 5);
program;













