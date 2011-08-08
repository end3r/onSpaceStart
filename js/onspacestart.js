"use strict";
var GAME = {};

GAME.Init = function() {
	Mibbu.fps().canvasOff().init();
	var preload = {};
	preload.player = new Mibbu.spr('img/rocket.png', 70, 78, 2, 1),
	preload.bird = new Mibbu.spr('img/bird.png', 50, 34, 0, 0),
	preload.planet = new Mibbu.spr('img/earth.png', 800, 144, 0, 0),
	preload.background = new Mibbu.bg('img/bg_clouds.png', 6, 90, {x:0,y:-600}), // start from the bottom
	preload.bg2 = new Mibbu.spr('img/bg_transition.png', 1, 1, 0, 0), // preload second background
	preload.bg3 = new Mibbu.spr('img/bg_stars.png', 1, 1, 0, 0); // preload third background

	GAME.keyboard = new GAME.Input();
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
	var	player = preload.player,
		bird = preload.bird,
		planet = preload.planet,
		background = preload.background,
		item_height = 80;

	// TODO: animatable version of the bird, both directions
	// TODO: fix movement
	bird.position(-60,-60);
	bird.flyingSpeed = 7;
	bird.width = 50;
	bird.height = 34;
	bird.hit(player, function() { GAME.Utils.GameOver('bird'); });
	bird.zone(10,10,10,10);
	
	background.speed(0).dir(90).on();
	background.width = 800;
	background.height = 400;

	planet.width = 800;
	planet.height = 144;
	planet.position(~~((background.width-planet.width)/2),background.height-planet.height, 1);

	player.width = 70;
	player.height = 78;
	player.position(~~((background.width-player.width)/2), GAME.Config.posLimitBottom, 5).speed(0);
	player.zone(30,10,30,10);

	for(var i = 0, items = []; i < GAME.Config.itemCount; i++) {
		items[i] = GAME.Utils.NewItem(Math.random()*background.width, (Math.random()*background.height)-(background.height+item_height), i, player);
		items[i].hit(player, function() { GAME.Utils.GameOver('item'); });
	}
	GAME.Config.active = true;
	Mibbu.on();

	var gameLoop = function(){
		GAME.keyboard.frame(player,background);

		var actSpeed = background.speed(),
			actHeight = GAME.Config.height;

		document.getElementById('height').innerHTML = parseFloat(actHeight).toFixed(1);
		document.getElementById('speed').innerHTML = parseFloat(actSpeed).toFixed(1);

		if(actHeight < 0) {
			GAME.Utils.GameOver('crash');
		}

		if(actHeight > GAME.Config.activate.birds && GAME.Config.birdActive == false) {
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
			// TODO: add airplanes and then airplanes instead of birds after given height
		}
		
		if(actHeight > 0) {
			actSpeed -= GAME.Config.gravity;
			if(actSpeed < GAME.Config.maxFallSpeed) {
				actSpeed = GAME.Config.maxFallSpeed;
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

		for(var i = 0; i < GAME.Config.itemCount; i++) {
			var difficultyLevel = 0;
			if(actHeight > GAME.Config.activate.movement) {
				if(items[i].movement == 0) {
					var diff = (~~(Math.random()*2))+1;
					if(diff == 2) items[i].movement = 1;
					else items[i].movement = -1;
					console.log(items[i].movement);
				}
			}
			items[i].position(items[i].position().x += items[i].movement, items[i].position().y += actSpeed);

			// TODO: think about the situation when the user is falling and don't see the items...
			if(items[i].position().y > background.height) {
				var newItem = GAME.Utils.NewItem(~~(Math.random()*background.width), ~~(-(25*Math.random()+25)), i);
				newItem.hit(player, function() { GAME.Utils.GameOver('item'); });
				items.splice(i,1,newItem);
			}
		}

		if(actHeight > GAME.Config.activate.secondBG && GAME.Config.firstBG) {
			GAME.Config.firstBG = false;
			GAME.Config.secondBG = true;
			background.img('img/bg_transition.png');
			background.y = GAME.Config.activate.secondBG;
		}

		if(actHeight > GAME.Config.activate.thirdBG && GAME.Config.secondBG) {
			GAME.Config.secondBG = false;
			GAME.Config.thirdBG = true;
			background.img('img/bg_transition.png');
			background.y = GAME.Config.activate.thirdBG;
		}

		background.speed(actSpeed);
		GAME.Config.height = actHeight;
	}

	Mibbu.hook(gameLoop).hitsOn();
};