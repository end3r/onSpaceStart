GAME.Input = function(){
	document.onkeydown = this.keydown.bind(this);
	document.onkeyup = this.keyup.bind(this);
	document.onkeypress = function(e){
	    switch (e.keyCode) {
			case GAME.Config.input.LEFT:
			case GAME.Config.input.UP:
			case GAME.Config.input.RIGHT:
			case GAME.Config.input.DOWN:
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
		
		if (GAME.Config.data.height) { // background.speed()
			if ( (this.pressed.left || this.held.left)) {
				player.position(player.position().x -= GAME.Config.data.moveInterval, player.position().y);
				if(player.position().x < 0) {
					player.position(0, player.position().y);
				}
			} else if (this.pressed.right || this.held.right) {
				player.position(player.position().x += GAME.Config.data.moveInterval, player.position().y);
				if(player.position().x > background.width-player.width) {
					player.position(background.width-player.width, player.position().y);
				}
			}
		}
		if (this.pressed.up || this.held.up) {
			if(player.speed() != 5) player.speed(5);
			if(player.animation() != 1) player.animation(1);
			var speed = background.speed();
			speed += GAME.Config.data.thrust;
			if(speed >= GAME.Config.data.maxRiseSpeed) {
				speed = GAME.Config.data.maxRiseSpeed;
			}
			background.speed(speed);
			player.position(player.position().x, player.position().y -= 1);
			if(player.position().y < 50)
				player.position(player.position().x, 50);
		}
		else if(this.pressed.down || this.held.down) {
			player.position(player.position().x, player.position().y += 2);
			if(player.position().y > player.startY)
				player.position(player.position().x, player.startY);
		}
		else {
			player.speed(0);
			player.animation(0);
			player.frame(0);
			player.position(player.position().x, player.position().y += 1);
			if(player.position().y > player.startY)
				player.position(player.position().x, player.startY);
		}
		this.pressed = {};
	}
};