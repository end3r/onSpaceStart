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
		
		if (mibbuGame.gameData.background.speed()) {
			if (this.pressed.left || this.held.left) {
				rocket.position(rocket.position().x -= rocket.moveInterval, rocket.position().y);
			} else if (this.pressed.right || this.held.right) {
				rocket.position(rocket.position().x += rocket.moveInterval, rocket.position().y);
			}
		}
		if (!this.pressed.up && !this.held.up) {
			rocket.speed(0);
			rocket.animation(0);
			rocket.frame(0);
		} else if (this.pressed.up || this.held.up) {
			if(rocket.speed() != 5) rocket.speed(5);
			if(rocket.animation() != 1) rocket.animation(1);
			var speed = mibbuGame.gameData.background.speed();
			speed += mibbuGame.gameData.addSpeed;
			if(speed >= mibbuGame.gameData.maxRiseSpeed) {
				speed = mibbuGame.gameData.maxRiseSpeed;
			}
			mibbuGame.gameData.background.speed(speed);
		}
		this.pressed = {};
		mibbuGame.gameData.rocket = rocket;
        mibbuGame.gameData.background = background;
	}
};