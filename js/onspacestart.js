"use strict";
var GAME = {};

GAME.Init = function() {
	Mibbu.fps().canvasOff().init();
	var preload = {};
	preload.player = new Mibbu.spr('img/rocket.png', 70, 78, 2, 1),
	preload.bird = new Mibbu.spr('img/bird.png', 50, 34, 0, 0),
	preload.planet = new Mibbu.spr('img/planet.png', 142, 78, 0, 0),
	preload.bg = new Mibbu.spr('img/clouds2.png', 1, 1, 0, 0), // preload second background
	preload.background = new Mibbu.bg('img/clouds.png', 6, 90, {x:0,y:-1600});

	var menu = document.getElementById('menu');
	menu.getElementsByTagName('h1')[0].onclick = function() { GAME.Menu('game', preload); };
	menu.getElementsByTagName('h2')[0].onclick = function() { GAME.Menu('instr'); };
	menu.getElementsByTagName('h3')[0].onclick = function() { GAME.Menu('about'); };
};

GAME.Menu = function(id, preload) {
	switch(id) {
		case 'game': {
			document.getElementById('game').style.zIndex = '20';
			document.getElementById('statbar').style.zIndex = '21';
			GAME.Start(preload);
			break;
		}
		case 'instr': {
			document.getElementById('howTo').style.zIndex = '20';
			break;
		}
		case 'about': {
			document.getElementById('about').style.zIndex = '20';
			break;
		}
		default: {;}
	}
};

GAME.Start = function(preload) {
	window.focus();
	var INPUT = new GAME.Input(),
		player = preload.player,
		bird = preload.bird,
		planet = preload.planet,
		background = preload.background;
		
	var firstBg = true;

	//tmpBG.position(0,0);

	// TODO: animatable version of the bird, both directions
	bird.position(-60,-60);
	bird.flyingSpeed = 7;
	bird.width = 50;
	bird.height = 34;
	bird.hit(player, function() { GAME.gameOver('bird'); });
	
	background.speed(0).dir(90).on();
	background.width = 800;
	background.height = 400;

	planet.width = 142;
	planet.height = 78;
	planet.position(~~((background.width-planet.width)/2),background.height-planet.height+35);

	player.width = 70;
	player.height = 78;
	player.position(~~((background.width-player.width)/2), GAME.Config.data.posLimitBottom, 1).speed(0);
	
	var itemCount = 5, items = [];
	for(var i = 0; i < itemCount; i++) {
		items[i] = new Mibbu.spr('img/star.png', 25, 25, 1, 0);
		items[i].position(Math.random()*background.width, (Math.random()*background.height)-background.height-25, 0).speed(0);
		items[i].hit(player, function() { GAME.gameOver('star'); });
		items[i].movement = 0;
		// TODO: try to generate the star(s) again when it hits the player (is placed ON him) before he starts the game
	}
	GAME.Config.birdActive = false;
	
	GAME.Config.data.active = true;
	Mibbu.on();

	var gameLoop = function(){
		INPUT.frame(player,background);

		var actSpeed = background.speed(),
			actHeight = GAME.Config.data.height;

		document.getElementById('height').innerHTML = parseFloat(actHeight).toFixed(1);
		document.getElementById('speed').innerHTML = parseFloat(actSpeed).toFixed(1);

		if(actHeight < 0) {
			GAME.gameOver('crash');
		}

		// TODO: random two directions, left or right, some delay between two birds
		if(actHeight > 100 && GAME.Config.birdActive == false) {
			GAME.Config.birdActive = true;

			var dir = (~~(Math.random()*2))+1;
			bird.direction = (dir == 2) ? 'left' : 'right';

			if(bird.direction == 'left') {
				bird.position(1, 1);
			}
			else { // right
				bird.position(background.width, 1);
			}
		}
		if(GAME.Config.birdActive) {
			// TODO figure out different approach for the delay:
			if(bird.position().x < -(~~(Math.random()*background.width)) || bird.position().x > background.width*(~~(Math.random()*background.width))) { // lol, random "delay"
				GAME.Config.birdActive = false;
			}
			else {
				if(bird.direction == 'left') {
					//bird.position().x += bird.flyingSpeed;
					bird.position(bird.position().x += bird.flyingSpeed, bird.position().y += actSpeed);
				}
				else { // right
					//bird.position().x -= bird.flyingSpeed;
					bird.position(bird.position().x -= bird.flyingSpeed, bird.position().y += actSpeed);
				}
				//bird.position(bird.position().x, bird.position().y += actSpeed);
			}
			// TODO: add airplanes instead of birds after given height (500?)
		}
		
		if(actHeight > 0) {
			actSpeed -= 0.2;
			if(actSpeed < GAME.Config.data.maxFallSpeed) {
				actSpeed = GAME.Config.data.maxFallSpeed;
			}
			planet.position(planet.position().x, planet.position().y += actSpeed);
			background.speed(actSpeed);
		}

		if(actSpeed > 0) {
			actHeight += 0.2;
		}
		else if(actSpeed < 0) {
			actHeight -= 0.2;
		}

		for(var i = 0; i < itemCount; i++) {
			var difficultyLevel = 0;
			if(actHeight > 200) {
				if(items[i].movement == 0) {
					var diff = (~~(Math.random()*2))+1;
					if(diff == 2) items[i].movement = 1;
					else items[i].movement = -1;
					console.log(items[i].movement);
				}
			}
			items[i].position(items[i].position().x += items[i].movement, items[i].position().y += actSpeed);
			// TODO: when falling, generate again the stars that will disapear at the top of the page - show them randomly at the bottom
			// yeah, I hope players don't notice the different positions of once overtaken stars
			if(items[i].position().y > background.height) {
				var newItem = new Mibbu.spr('img/star.png', 25, 25, 1, 0);
				newItem.position(Math.random()*background.width, -25, 0).speed(0); // -25 * random, so the pos is something between -25 and -75 ?
				newItem.hit(player, function() { GAME.gameOver(); });
				newItem.movement = 0;
				items.splice(i,1,newItem);
			}
			// TODO: try to random a bit the Y pos of the new stars
			
			// TODO: above some given height (200 or something) start to move the stars slowly left and right
		}
		
		// TODO: change stars to something else, like balloons etc, add (generate) flying birds from given height

		if(actHeight > 100 && firstBg) {
			firstBg = false;
			console.log('bg: '+background.img());
			background.img('img/clouds2.png');
		}

/*	
		if(actHeight > 20 && firstBg) {
			firstBg = false;
			background.off();
			console.log('new background');
			var oldBackground = background;
			background = new Mibbu.bg('img/clouds2.png', 6, 90, {x:0,y:0});
			background.on();
			//background.speed(actSpeed).dir(90).on();
			background.width = 800;
			background.height = 400;
		}
*/		
		background.speed(actSpeed);
		GAME.Config.data.height = actHeight;
	}

	Mibbu.hook(gameLoop).hitsOn();
	
	player.zone(30,10,30,10);
	bird.zone(10,10,10,10);
};