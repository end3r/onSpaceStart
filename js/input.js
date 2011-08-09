GAME.Input = function(){
	document.onkeydown = this.keydown.bind(this);
	document.onkeyup = this.keyup.bind(this);
	document.onkeypress = function(e){
	    switch (e.keyCode) {
			case GAME.Config.input.LEFT:
			case GAME.Config.input.UP:
			case GAME.Config.input.RIGHT:
			case GAME.Config.input.DOWN:
			case GAME.Config.input.PAUSE:
			case GAME.Config.input.START:
			    return false;
		}
	};
};

GAME.Input.prototype = {
	held: {},
	pressed: {},
	keydown: function(e) {
		switch (e.keyCode) {
			case GAME.Config.input.LEFT: {
				this.pressed.left = true;
				this.pressed.right = false;
				this.held.left = true;
				this.held.right = false;
				break;
			}
			case GAME.Config.input.UP: {
				this.pressed.up = true;
				this.pressed.down = false;
				this.held.up = true;
				this.held.down = false;
				break;
			}
			case GAME.Config.input.RIGHT: {
				this.pressed.right = true;
				this.pressed.left = false;
				this.held.right = true;
				this.held.left = false;
				break;
			}
			case GAME.Config.input.DOWN: {
				this.pressed.down = true;
				this.pressed.up = false;
				this.held.down = true;
				this.held.up = false;
				break;
			}
			case GAME.Config.input.PAUSE: {
				if(GAME.Config.active) {
					GAME.Config.active = false;
					GAME.Utils.Alert('PAUSED','Press [spacebar] again to get back to the game.');
					Mibbu.off();
				} else {
					GAME.Config.active = true;
					GAME.Utils.Alert();
					Mibbu.on();
				//	GAME.keyboard.held = {};
				//	GAME.keyboard.pressed = {};
				}
				break;
			}
			case GAME.Config.input.START: {
				if(!GAME.Config.active)
					document.getElementById('menu').getElementsByTagName('h1')[0].onclick();
				break;
			}
			default: { return; }
		}
		return false;
	},
	keyup: function(e) {
		switch (e.keyCode) {
			case GAME.Config.input.LEFT: {
				this.held.left = false;
				break;
			}
			case GAME.Config.input.UP: {
				this.held.up = false;
				break;
			}
			case GAME.Config.input.RIGHT: {
				this.held.right = false;
				break;
			}
			case GAME.Config.input.DOWN: {
				this.held.down = false;
				break;
			}
			default: { return; }
		}
		return false;
	},
	frame: function(player,background) {
		// TODO: reset held/pressed keys when lost focus OR pause game
		if (GAME.Config.height) {
			if ( (this.pressed.left || this.held.left)) {
				player.position(player.position().x -= GAME.Config.moveInterval, player.position().y);
				if(player.position().x <= 0) {
					player.position(1, player.position().y);
				}
			} else if (this.pressed.right || this.held.right) {
				player.position(player.position().x += GAME.Config.moveInterval, player.position().y);
				if(player.position().x > background.width-player.width-1) {
					player.position(background.width-player.width-1, player.position().y);
				}
			}
		}
		if (this.pressed.up || this.held.up) {
			player.speed(5);
			player.animation(1);
			var speed = background.speed();
			speed += GAME.Config.thrust;
			if(speed >= GAME.Config.maxRiseSpeed) {
				speed = GAME.Config.maxRiseSpeed;
			}
			background.speed(speed);
			player.position(player.position().x, player.position().y -= GAME.Config.playerRise);
			if(player.position().y < GAME.Config.posLimitTop)
				player.position(player.position().x, GAME.Config.posLimitTop);
		}
		else if(this.pressed.down || this.held.down) {
			player.position(player.position().x, player.position().y += GAME.Config.playerFall);
			if(player.position().y > GAME.Config.posLimitBottom)
				player.position(player.position().x, GAME.Config.posLimitBottom);
		}
		else {
			player.speed(0);
			player.animation(0);
			player.frame(0);
			player.position(player.position().x, player.position().y += GAME.Config.playerRise);
			if(player.position().y > GAME.Config.posLimitBottom)
				player.position(player.position().x, GAME.Config.posLimitBottom);
		}
		this.pressed = {};
	}
};