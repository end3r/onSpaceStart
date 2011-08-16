"use strict";
var GAME = {};

GAME._id = function(id) { return document.getElementById(id); };
GAME._tag = function(tag, container) { return (container || document).getElementsByTagName(tag)[0]; };

GAME.Init = function() {
	Mibbu.canvasOff().init();
	var preload = {};
	preload.player = new Mibbu.spr('img/rocket.png', 70, 78, 2, 1),
	preload.fly = new Mibbu.spr('img/bird.png', 43, 35, 2, 1),
	preload.planet = new Mibbu.spr('img/earth.png', 800, 144, 0, 0),
	preload.background = new Mibbu.bg('img/bg_clouds.jpg', 6, 90, {x:0,y:-600}), // start from the bottom
	preload.bg2 = new Mibbu.spr('img/bg_transition.jpg', 1, 1, 0, 0), // preload second background
	preload.bg3 = new Mibbu.spr('img/bg_stars.jpg', 1, 1, 0, 0); // preload third background

	GAME.keyboard = new GAME.Input();
	var menu = GAME._id('menu');
	GAME._tag('h1', menu).onclick = function() { GAME.Menu('game', preload); };
	GAME._tag('h2', menu).onclick = function() { GAME.Menu('instructions'); };
	GAME._tag('h3', menu).onclick = function() { GAME.Menu('about'); };
	GAME.Utils.LinkBackToMenu('howTo');
	GAME.Utils.LinkBackToMenu('about');
};

GAME.Menu = function(id, preload) {
	switch(id) {
		case 'game': {
			GAME._id('game').style.zIndex = '20';
			GAME._id('statbar').style.zIndex = '21';
			GAME.Start(preload);
			break;
		}
		case 'instructions': {
			GAME._id('howTo').style.zIndex = '20';
			break;
		}
		case 'about': {
			GAME._id('about').style.zIndex = '20';
			break;
		}
		default: {;}
	}
};

GAME.Start = function(preload) {
	window.focus();
	var	player = preload.player,
		fly = preload.fly,
		planet = preload.planet,
		background = preload.background,
		balloon_height = 80;

	fly.width = 43;
	fly.height = 35;
	fly.flyingSpeed = 6;
	fly.position(-fly.width,-fly.height, 4);
	fly.hit(player, function() { GAME.Utils.GameOver('bird'); });
	fly.zone(5,5,5,5);
	fly.speed(4);

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
		var posX = Math.random()*background.width,
			posY = (Math.random()*background.height)-(background.height+balloon_height);
		items[i] = GAME.Utils.NewItem(posX, posY, i, 'balloon');
		items[i].hit(player, function() { GAME.Utils.GameOver('balloon'); });
	}
	GAME.Config.active = true;
	Mibbu.on();

	var activateSatellites = GAME.Config.activate.satellites*GAME.Config.bgHeight,
		activatePlanes = GAME.Config.activate.planes*GAME.Config.bgHeight,
		activateBirds = GAME.Config.activate.birds*GAME.Config.bgHeight,
		activateMeteors = GAME.Config.activate.meteors*GAME.Config.bgHeight,
		activateMovement = GAME.Config.activate.movement*GAME.Config.bgHeight,
		activateSecondBg = GAME.Config.activate.secondBG*GAME.Config.bgHeight-600,
		switchedToSatellites = false,
		switchedToPlanes = false,
		switchedToBirds = true;
	
	var gameLoop = function(){
		GAME.keyboard.frame(player,background);

		var actSpeed = background.speed(),
			actHeight = GAME.Config.height,
			actBgHeight = background.position().y;

		GAME._id('height').innerHTML = parseFloat(actHeight).toFixed(1);
		GAME._id('speed').innerHTML = parseFloat(actSpeed).toFixed(1);

		if(actHeight < 0) {
			GAME.Utils.GameOver('crash');
		}

		if(!GAME.Config.flyActive) {
			if(actBgHeight > activateSatellites && !switchedToSatellites && GAME.Config.thirdBG) {
				switchedToSatellites = true;
				fly.width = 116;
				fly.height = 53;
				fly.change('img/satellite.png', fly.width, fly.height, 0, 0);
				fly.hit(player, function() { GAME.Utils.GameOver('satellite'); });
				fly.zone(15,15,15,15);
				fly.speed(0);
			}
			else if(actBgHeight > activatePlanes && !switchedToPlanes && GAME.Config.firstBG) {
				switchedToPlanes = true;
				fly.width = 73;
				fly.height = 48;
				fly.change('img/plane.png', fly.width, fly.height, 1, 1);
				fly.hit(player, function() { GAME.Utils.GameOver('plane'); });
				fly.zone(5,5,5,5);
			}
		}
		
		if( ( (actBgHeight > activateBirds && GAME.Config.firstBG) || (actBgHeight > activateSatellites && GAME.Config.thirdBG) ) && !GAME.Config.flyActive) {
			GAME.Config.flyActive = true;
			fly.direction = GAME.Utils.PlusMinus();
			var posX = (fly.direction+1) ? -fly.width : background.width;
			var anim = (fly.direction+1) ? 0 : 1;
			fly.animation(anim);
			fly.position(posX, 1);
		}

		if(GAME.Config.flyActive) {
			if(fly.position().x + fly.width < 0 || fly.position().x - fly.width > background.width) {
				GAME.Config.flyActive = false;
			}
			else {
				fly.position(fly.position().x += fly.flyingSpeed*fly.direction, fly.position().y += actSpeed);
			}
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
			actHeight += GAME.Config.heightDifference;
		}
		else if(actSpeed < 0) {
			actHeight -= GAME.Config.heightDifference;
		}

		for(var i = 0; i < GAME.Config.itemCount; i++) {
			if(items[i].position().y > background.height) {
				var newType = (actBgHeight < activateMeteors || !(GAME.Config.secondBG || GAME.Config.thirdBG) ) ? 'balloon' : 'meteor';
				items[i].posX = ~~(Math.random()*background.width);
				items[i].posY = ~~(-(25*Math.random()+25));

				if(items[i].type == newType) {
					var newItem = GAME.Utils.UpdateItem(items[i]);
				}
				else {
					var newItem = GAME.Utils.NewItem(items[i].posX, items[i].posY, i, newType);
					newItem.type = newType;
				}

				newItem.hit(player, function() { GAME.Utils.GameOver(newItem.type); });
				if(actBgHeight > activateMovement) {
					newItem.movement = GAME.Utils.PlusMinus()*GAME.Config.difficultyLevel;
				}
				items.splice(i,1,newItem);
			}
			items[i].position(items[i].position().x += items[i].movement, items[i].position().y += actSpeed);
		}

		if(GAME.Config.firstBG && actBgHeight > activateSecondBg) {
			GAME.Config.firstBG = false;
			GAME.Config.secondBG = true;
			background.img('img/bg_transition.jpg');
			actBgHeight = -800;
			background.position(background.position().x, actBgHeight);
		}

		if(GAME.Config.secondBG && actBgHeight > 0) {
			GAME.Config.secondBG = false;
			GAME.Config.thirdBG = true;
			background.img('img/bg_stars.jpg');
			background.position(background.position().x, 0);
		}

		background.speed(actSpeed);
		GAME.Config.height = actHeight;
	}

	Mibbu.hook(gameLoop).hitsOn();
};