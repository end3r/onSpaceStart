GAME.Alert = function(title, message) {
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
};