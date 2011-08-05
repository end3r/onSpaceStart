var GAME = {};

GAME.Init = function() {
	var INPUT = new GAME.Input();
	document.getElementsByTagName('body')[0].focus();
	Mibbu.canvasOff().init();

	var player = new Mibbu.spr('img/rocket.png', 98, 109, 2, 1),
		bird = new Mibbu.spr('img/bird.png', 50, 34, 0, 0),
		background = new Mibbu.bg('img/clouds.png', 6, 90, {x:0,y:0});

	// TODO: animatable version of the bird, both directions
	bird.position(-60,-60);
	bird.flyingSpeed = 7;
	bird.hit(player, function() { GAME.gameOver('bird'); });

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
		items[i].hit(player, function() { GAME.gameOver('star'); });
		// TODO: try to generate the star(s) again when it hits the player (is placed ON him) before he starts the game
	}
	GAME.Config.birdActive = false;
	
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
			GAME.gameOver('crash');
		}

		// TODO: random two directions, left or right, some delay between two birds
		if(actHeight > 10 && GAME.Config.birdActive == false) {
			GAME.Config.birdActive = true;
			bird.position(5, 5);
		}
		if(GAME.Config.birdActive) {
			if(bird.position().x > background.width*2) { // bg*2 => lol, delay (TODO: add some randomness?)
				GAME.Config.birdActive = false;
			}
			else {
				bird.position(bird.position().x += bird.flyingSpeed, bird.position().y += actSpeed);
			}
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
			// TODO: when falling, generate again the stars that will disapear at the top of the page - show them randomly at the bottom
			// yeah, I hope players don't notice the different positions of once overtaken stars
			if(items[i].position().y > background.height) {
				newItem = new Mibbu.spr('img/star.png', 25, 25, 1, 0);
				newItem.position(Math.random()*background.width, 0, 0).speed(0);
				newItem.hit(player, function() { GAME.gameOver(); });
				items.splice(i,1,newItem);
			}
			// TODO: try to random a bit the Y pos of the new stars
		}
		
		// TODO: change stars to something else, like balloons etc, add (generate) flying birds from given height
	
		background.speed(actSpeed);
		GAME.Config.data.height = actHeight;
	}

	Mibbu.hook(gameLoop).hitsOn();
	
	player.zone(30,10,30,10);
	bird.zone(10,10,10,10);
	
	var msg = 'Fly as high as You can using keyboard arrows. And remember to avoid the stars and other flying shit!';
	console.log(msg);
}

GAME.gameOver = function(what) {
	var msg = '', score = parseFloat(GAME.Config.data.height).toFixed(1),
		defaultMsg = "Congratz, you've scored "+score+" metres!";
	switch(what) {
		case 'star': {
			msg = "GAME OVER! You hit the star! "+defaultMsg;
			break;
		}
		case 'crash': {
			msg = "GAME OVER! Oh noes, You crashed your spaceship!";
			break;
		}
		case 'bird': {
			msg = "GAME OVER! You killed that poor bird! "+defaultMsg;
			break;
		}
		default: {
			msg = defaultMsg;
		}
	}
	alert(msg);
}