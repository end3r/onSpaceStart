var GAME = {};

GAME.Init = function() {
	var INPUT = new GAME.Input();
	document.getElementsByTagName('body')[0].focus();
	Mibbu.canvasOff().init();

	var player = new Mibbu.spr('img/rocket.png', 98, 109, 2, 1),
		background = new Mibbu.bg('img/clouds.png', 6, 90, {x:0,y:0});

	background.speed(0).dir(90).on();
	background.width = 800;
	background.height = 400;

	player.y = 100;
	player.d = 1;
	player.type = 0;
	player.width = 98;
	player.height = 109;
	player.position((background.width-player.width)/2, 280, 1).speed(0);
	// tmp:
	player.size(69,75);

	var itemCount = 5, items = [];
	for(var i = 0; i < itemCount; i++) {
		items[i] = new Mibbu.spr('img/star.png', 25, 25, 1, 0);
		items[i].position(Math.random()*800, Math.random()*400, 0).speed(0);
		items[i].hit(player, function() { GAME.gameOver(); });
	}
	
	Mibbu.on();

	var gameLoop = function(){
		INPUT.frame(player,background);

		var actSpeed = background.speed(),
			actHeight = GAME.Config.data.height;

		actSpeed1 = parseFloat(actSpeed).toFixed(1);
		actHeight1 = parseFloat(actHeight).toFixed(1);
			
		document.getElementById('height').innerHTML = actHeight1;
		document.getElementById('speed').innerHTML = actSpeed1;

		if(actHeight < 0) {
			alert('GAME OVER!');
		}

		if(actHeight > 0) {
			actSpeed -= 0.2;
			if(actSpeed < GAME.Config.data.maxFallSpeed) {
				actSpeed = GAME.Config.data.maxFallSpeed;
			}
			background.speed(actSpeed);
		}

		if(actSpeed > 0) {
			actHeight += 0.2;
		}
		else if(actSpeed < 0) {
			actHeight -= 0.2;
		}

		for(var i = 0; i < itemCount; i++) {
			items[i].position(items[i].position().x, items[i].position().y += actSpeed);
			if(items[i].position().y > 400) {
				newItem = new Mibbu.spr('img/star.png', 25, 25, 1, 0);
				newItem.position(Math.random()*800, 0, 0).speed(0);
				newItem.hit(player, function() { GAME.gameOver(); });
				items.splice(i,1,newItem);
			}
		}
		
		// TODO: change stars to something else, like balloons etc, add (generate) flying birds from given height
	
		background.speed(actSpeed);
		GAME.Config.data.height = actHeight;
	}

	Mibbu.hook(gameLoop).hitsOn();
	
	player.zone(30,10,30,10);
}

GAME.gameOver = function(id) { alert('GAME OVER! ;('); }