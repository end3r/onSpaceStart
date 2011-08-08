GAME.Utils = {};

GAME.Utils.Alert = function(title, message) {
	var div = document.getElementById('message');
	if(title) { // show
		div.style.zIndex = '20';
		div.innerHTML = '<h3>'+title+'</h3><p>'+message+'</p>';
	}
	else { // hide
		div.style.zIndex = '5';
	}
};

GAME.Utils.GameOver = function(what) {
	var msg = '',
		score = parseFloat(GAME.Config.height).toFixed(1),
		defaultMsg = "Congratz, you've scored "+score+" metres!";

	switch(what) {
		case 'item': {
			msg = "You hit the balloon! "+defaultMsg;
			break;
		}
		case 'crash': {
			msg = "Oh noes, You crashed your spaceship!";
			break;
		}
		case 'bird': {
			msg = "You killed that poor bird! "+defaultMsg;
			break;
		}
		default: {
			msg = defaultMsg;
		}
	}
	Mibbu.off();
	GAME.Utils.Alert('GAME OVER!', msg+' <a href="">Try again?</a>');
};

GAME.Utils.NewItem = function(posX, posY, animation) {
	var newItem = new Mibbu.spr('img/balloons.png', 30, 80, 0, 4);
	newItem.position(posX, posY, 2).speed(1);
	newItem.movement = 0;
	newItem.zone(0,0,43,0);
	newItem.animation(animation);
	return newItem;
};