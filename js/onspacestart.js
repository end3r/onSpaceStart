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

gameConfig = {
	input: {
		LEFT: 65,
		UP: 87,
		RIGHT: 68,
		DOWN: 83
		/* ARROWS instead of WASD:
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40*/
	}
};

gameInput = function(){
    var wrapper = document.getElementById('canvas');
    wrapper.focus();
	document.onkeydown = this.keydown.bind(this);
	document.onkeyup = this.keyup.bind(this);
	document.onkeypress = function(e){
	    switch (e.keyCode) {
			case gameConfig.input.LEFT:
			case gameConfig.input.UP:
			case gameConfig.input.RIGHT:
			case gameConfig.input.DOWN:
			    return false;
		}
	};
};

gameInput.prototype = {
	held: {},
	pressed: {},
	keydown: function(e) {
		switch (e.keyCode) {
			case gameConfig.input.LEFT: {
				this.pressed.left = true;
				this.pressed.right = false;
				this.held.left = true;
				this.held.right = false;
				break;
			}
			case gameConfig.input.UP: {
				this.pressed.up = true;
				this.pressed.down = false;
				this.held.up = true;
				this.held.down = false;
				break;
			}
			case gameConfig.input.RIGHT: {
				this.pressed.right = true;
				this.pressed.left = false;
				this.held.right = true;
				this.held.left = false;
				break;
				}
			case gameConfig.input.DOWN: {
				this.pressed.down = true;
				this.pressed.up = false;
				this.held.down = true;
				this.held.up = false;
				break;
				}
			default: { return; }
		}
		return false;
	},
	keyup: function(e) {
		switch (e.keyCode) {
			case gameConfig.input.LEFT: {
				this.held.left = false;
				break;
			}
			case gameConfig.input.UP: {
				this.held.up = false;
				break;
			}
			case gameConfig.input.RIGHT: {
				this.held.right = false;
				break;
			}
			case gameConfig.input.DOWN: {
				this.held.down = false;
				break;
			}
			default: { return; }
		}
		return false;
	},
	frame: function() {
        var rocket = mibbuGame.gameData.rocket;
        var background = mibbuGame.gameData.background;
		
		if (!this.pressed.up && !this.held.up) {
			rocket.speed(0);
			rocket.animation(0);
			rocket.frame(0);
		} if (!this.held.down) {
			if (this.pressed.left || this.held.left) {
				rocket.position(rocket.position().x -= rocket.moveInterval, rocket.position().y);
			} else if (this.pressed.right || this.held.right) {
				rocket.position(rocket.position().x += rocket.moveInterval, rocket.position().y);
			}
			if (this.pressed.up || this.held.up) {
                if(rocket.speed() != 5) rocket.speed(5);
				if(rocket.animation() != 1) rocket.animation(1);
                var speed = mibbuGame.gameData.background.speed();
                speed += mibbuGame.gameData.addSpeed;
                if(speed >= mibbuGame.gameData.maxRiseSpeed) {
                    speed = mibbuGame.gameData.maxRiseSpeed;
                }
                mibbuGame.gameData.background.speed(speed);
			}
		}
		this.pressed = {};
		mibbuGame.gameData.rocket = rocket;
        mibbuGame.gameData.background = background;
	}
};