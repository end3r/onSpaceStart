GAME.Config = {
	input: {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		/*PAUSE: 80,*/
		PAUSE: 32
	},
	data: {
		active: false,
		height: 0,
        thrust: 0.5,
        maxRiseSpeed: 20,
        maxFallSpeed: -20,
        moveInterval: 12,
        playerRise: 1,
        playerFall: 2,
        posLimitTop: 50,
        posLimitBottom: 300
	},
};

GAME.Alert = function(title,message) {
	var div = document.getElementById('message');
	if(title) { // show
		div.style.zIndex = '20';
		div.innerHTML = '<h3>'+title+'</h3><p>'+message+'</p>';
	}
	else { // hide
		div.style.zIndex = '5';
	}
};

GAME.gameOver = function(what) {
	var msg = '',
		score = parseFloat(GAME.Config.data.height).toFixed(1),
		defaultMsg = "Congratz, you've scored "+score+" metres!";

	switch(what) {
		case 'star': {
			msg = "You hit the star! "+defaultMsg;
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
	GAME.Alert('GAME OVER!', msg);
}