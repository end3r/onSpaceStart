function onSpaceStart() {
    mibbuGame.gameData = {};
	this.initGame();
	this.generateItems(5);
	this.initPlayer();
	
	mibbuGame.hook(this.gameLoop).hitsOff();

    document.onkeypress = this.keyboardManager;
    //document.onkeyup = this.stopBackground;
}

onSpaceStart.prototype = {
    initGame: function() {
		mibbuGame.fps().init();
        mibbuGame.gameData.gameHeight = 0;
        mibbuGame.gameData.maxRiseSpeed = 20;
        mibbuGame.gameData.maxFallSpeed = -20;
        mibbuGame.gameData.background = new mibbuGame.bg('img/clouds.png', 6, 90, {x:0,y:0});
        mibbuGame.gameData.background.speed(0).dir(90).on();
		mibbuGame.on();

        //create callback for the second sprite
        //it will change the speed of animation
        //after every second full animation
        //hope I explained it clearly:)
//        items.callback(function(){
//            speed++;
//            items.speed(speed);
//        }, 2);
    },
		
	initPlayer: function() {
        var rocket = new mibbuGame.spr('img/rocket.png', 196, 218, 2, 1);
        rocket.position(300, 170, 1).speed(0);
        rocket.y = 100;
        rocket.d = 1;
        rocket.type = 0;
		rocket.moveInterval = 25;

		for(var i = 0, len = mibbuGame.gameData.items.length; i < len; i++) {
			console.log('hit check');
			rocket.hit(mibbuGame.gameData.items[i], function(){
				/*
				//change it's type
				if (rocket.type === 0) {
					rocket.type = 1;
					//rocket.change('img/rocket.png', 196, 163, 1, 0);

				} else {
					rocket.type = 0;
					//rocket.change('img/reptile2.png', 200, 200, 7, 0);
				}
				//resize it
				rocket.size(150, 150);

				//and change direction of it's movement
				//also - it is not the part of Mibbu
				rocket.d*=-1;
				items.d*=-1;*/
				console.log('HIT!');
			});
			mibbuGame.gameData.rocket = rocket;
		}
	},
		
	gameLoop: function() {
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

	keyboardManager: function(e) {
        //e.preventDefault();
		var eventObject = window.event ? event : e,
			unicode = eventObject.charCode ? eventObject.charCode : eventObject.keyCode,
			actualKey = String.fromCharCode(unicode);

        var rocket = mibbuGame.gameData.rocket;
        var background = mibbuGame.gameData.background;

		switch(actualKey) {
			case 'w': {
                rocket.speed(6);
				//rocket.frame(1);
				rocket.animation(1);
                //background.speed(10);
                var speed = mibbuGame.gameData.background.speed();
                speed += 10;
                if(speed >= mibbuGame.gameData.maxRiseSpeed) {
                    speed = mibbuGame.gameData.maxRiseSpeed;
                }
                mibbuGame.gameData.background.speed(speed);
				break;
			}
			case 's': {
				// ---
				break;
			}
			case 'a': {
				rocket.position(rocket.position().x -= rocket.moveInterval, rocket.position().y);
				break;
			}
			case 'd': {
				rocket.position(rocket.position().x += rocket.moveInterval, rocket.position().y);
				break;
			}
			default: {;}
		}
	},
		
	generateItems: function(count) {
		// generate items
		var items = [];
		for(var i = 0; i < count; i++) {
			items[i] = new mibbuGame.spr('img/star.png', 256, 256, 1, 0);		
			items[i].size(50,50);
			items[i].position(Math.random()*800, Math.random()*400, 0).speed(0);
			
			//items[i].hit(mibbuGame.gameData.rocket, function(){ console.log('hit'); });
		}
		mibbuGame.gameData.items = items;
	},
/*
    stopBackground: function() {
		// zatrzymujemy tlo
		background.speed(0);
		rocket.animation(rocket.anim);
		rocket.frame(0);
    },
*/
0:0};