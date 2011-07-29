function onSpaceStart() {
    mibbuGame.gameData = {};
	this.initGame();
	//this.generateItems(5);
	this.initPlayer();
	mibbuGame.hook(this.gameLoop).hitsOff();
}

onSpaceStart.prototype = {
    initGame: function() {
		mibbuGame.fps().init();
        mibbuGame.gameData.gameHeight = 0;
        mibbuGame.gameData.addSpeed = 0.5;
        mibbuGame.gameData.maxRiseSpeed = 20;
        mibbuGame.gameData.maxFallSpeed = -20;
        mibbuGame.gameData.background = new mibbuGame.bg('img/clouds.png', 6, 90, {x:0,y:0});
        mibbuGame.gameData.background.speed(0).dir(90).on();
		mibbuGame.on();
    },
		
	initPlayer: function() {
        var rocket = new mibbuGame.spr('img/rocket.png', 196, 218, 2, 1);
        rocket.position(300, 170, 1).speed(0);
        rocket.y = 100;
        rocket.d = 1;
        rocket.type = 0;
		rocket.moveInterval = 15;
		rocket.size(98,109);

		if(mibbuGame.gameData.items)
		for(var i = 0, len = mibbuGame.gameData.items.length; i < len; i++) {
			//console.log('hit check');
			rocket.hit(mibbuGame.gameData.items[i], function(){
				console.log('HIT!');
			});
		}
		mibbuGame.gameData.rocket = rocket;
	},
		
	gameLoop: function() {
		var input = new gameInput();
			input.frame();
		
		var actSpeed = mibbuGame.gameData.background.speed(),
			actHeight = mibbuGame.gameData.gameHeight;

		actSpeed1 = parseFloat(actSpeed).toFixed(1);
		actHeight1 = parseFloat(actHeight).toFixed(1);
			
		document.getElementById('height').innerHTML = actHeight1;
		document.getElementById('speed').innerHTML = actSpeed1;

		if(actHeight < 0) {
			alert('GAME OVER!');
		}

		if(actHeight > 0) {
			actSpeed -= 0.2;
			if(actSpeed < mibbuGame.gameData.maxFallSpeed) {
				actSpeed = mibbuGame.gameData.maxFallSpeed;
			}
			mibbuGame.gameData.background.speed(actSpeed);
		}

		if(actSpeed > 0) {
			actHeight += 0.2;
		}
		else if(actSpeed < 0) {
			actHeight -= 0.2;
		}
			
		mibbuGame.gameData.background.speed(actSpeed);
		mibbuGame.gameData.gameHeight = actHeight;
	},
		
	generateItems: function(count) {
		var items = [];
		for(var i = 0; i < count; i++) {
			items[i] = new mibbuGame.spr('img/star.png', 256, 256, 1, 0);		
			items[i].size(50,50);
			items[i].position(Math.random()*800, Math.random()*400, 0).speed(0);
			//items[i].hit(mibbuGame.gameData.rocket, function(){ console.log('hit'); });
		}
		mibbuGame.gameData.items = items;
	},

0:0};