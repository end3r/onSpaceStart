"use strict";
var GAME = {};

GAME.Init = function() {
	Mibbu.fps().canvasOff().init();
	var preload = {};
	preload.player = new Mibbu.spr('img/rocket.png', 70, 78, 2, 1),
	//preload.bird = new Mibbu.spr('img/bird.png', 43, 35, 2, 1),
	//preload.plane = new Mibbu.spr('img/plane.png', 73, 48, 1, 1),
	preload.bird = new Mibbu.spr('img/satellite.png', 116, 53, 0, 0),
	preload.planet = new Mibbu.spr('img/earth.png', 800, 144, 0, 0),
	preload.background = new Mibbu.bg('img/bg_clouds.png', 6, 90, {x:0,y:-600}), // start from the bottom
	preload.bg2 = new Mibbu.spr('img/bg_transition.png', 1, 1, 0, 0), // preload second background
	preload.bg3 = new Mibbu.spr('img/bg_stars.png', 1, 1, 0, 0); // preload third background

	GAME.keyboard = new GAME.Input();
	var menu = document.getElementById('menu');
	menu.getElementsByTagName('h1')[0].onclick = function() { GAME.Menu('game', preload); };
	menu.getElementsByTagName('h2')[0].onclick = function() { GAME.Menu('instructions'); };
	menu.getElementsByTagName('h3')[0].onclick = function() { GAME.Menu('about'); };
	GAME.Utils.LinkBackToMenu('howTo');
	GAME.Utils.LinkBackToMenu('about');
};

GAME.Menu = function(id, preload) {
	switch(id) {
		case 'game': {
			document.getElementById('game').style.zIndex = '20';
			document.getElementById('statbar').style.zIndex = '21';
			GAME.Start(preload);
			break;
		}
		case 'instructions': {
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
		plane = preload.plane,
		planet = preload.planet,
		background = preload.background,
		item_height = 80;

//	bird.width = 43;
//	bird.height = 35;
//	bird.width = 73;
//	bird.height = 48;
	bird.width = 116;
	bird.height = 53;
	bird.flyingSpeed = 7;
	bird.position(-bird.width,-bird.height, 4);
	bird.hit(player, function() { GAME.Utils.GameOver('bird'); });
	bird.zone(15,15,15,15);
	bird.speed(3);

//	plane.width = 146;
//	plane.height = 96;
//	plane.flyingSpeed = 7;
//	plane.position(-plane.width,-plane.height, 4);
//	plane.hit(player, function() { GAME.Utils.GameOver('plane'); });
//	plane.zone(5,5,5,5);

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
		items[i].hit(player, function() { GAME.Utils.GameOver('balloon'); });
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
			bird.direction = GAME.Utils.PlusMinus();
			var posX = (bird.direction+1) ? -bird.width : background.width;
			var anim = (bird.direction+1) ? 0 : 1;
			bird.animation(anim);
			bird.position(posX, 1);
		}

		if(GAME.Config.birdActive) {
			if(bird.position().x + bird.width < 0 || bird.position().x - bird.width > background.width) {
				GAME.Config.birdActive = false;
			}
			else {
				bird.position(bird.position().x += bird.flyingSpeed*bird.direction, bird.position().y += actSpeed);
			}
			// TODO: add airplanes and then satellites instead of birds after given height
		}
		
		if(actHeight > 0) {
			actSpeed -= GAME.Config.gravity;
			if(actSpeed < GAME.Config.maxFallSpeed) {
				actSpeed = GAME.Config.maxFallSpeed;
			}
			planet.position(planet.position().x, planet.position().y += actSpeed);
			background.speed(actSpeed);
			// TODO: if planet is not visible - remove it?
			// TODO: lower height when the player is falling
		}

		if(actSpeed > 0) {
			actHeight += GAME.Config.heightDifference;
		}
		else if(actSpeed < 0) {
			actHeight -= GAME.Config.heightDifference;
		}

		for(var i = 0; i < GAME.Config.itemCount; i++) {
			// TODO: think about the situation when the user is falling and don't see the items...
			if(items[i].position().y > background.height) {
				var newItem = GAME.Utils.UpdateItem(items[i], ~~(Math.random()*background.width), ~~(-(25*Math.random()+25)), i),
					itemType = (GAME.Config.height < GAME.Config.activate.meteors) ? 'balloon' : 'meteor';
				newItem.hit(player, function() { GAME.Utils.GameOver(itemType); });
				if(actHeight > GAME.Config.activate.movement) {
					newItem.movement = GAME.Utils.PlusMinus()*GAME.Config.difficultyLevel;
				}
				items.splice(i,1,newItem);
			}
			items[i].position(items[i].position().x += items[i].movement, items[i].position().y += actSpeed);
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
			background.img('img/bg_stars.png');
			background.y = GAME.Config.activate.thirdBG;
		}

		background.speed(actSpeed);
		GAME.Config.height = actHeight;
	}

	Mibbu.hook(gameLoop).hitsOn();
};