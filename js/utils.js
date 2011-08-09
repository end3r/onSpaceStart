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
		defaultMsg = (GAME.Config.msg.congratulations).replace('#',score);

	switch(what) {
		case 'balloon': {
			msg = GAME.Config.msg.hitBalloon+' '+defaultMsg;
			break;
		}
		case 'meteor': {
			msg = GAME.Config.msg.hitMeteor+' '+defaultMsg;
			break;
		}
		case 'crash': {
			msg = GAME.Config.msg.hitGround;
			break;
		}
		case 'bird': {
			msg = GAME.Config.msg.hitBird+' '+defaultMsg;
			break;
		}
		case 'plane': {
			msg = GAME.Config.msg.hitPlane+' '+defaultMsg;
			break;
		}
		case 'satellite': {
			msg = GAME.Config.msg.hitSatellite+' '+defaultMsg;
			break;
		}
		default: { msg = defaultMsg; }
	}
	Mibbu.off();
	GAME.Utils.Alert(GAME.Config.msg.gameOver, msg+' <a href="">'+GAME.Config.msg.tryAgain+'</a>');
};

GAME.Utils.NewItem = function(posX, posY, animation) {
	if(GAME.Config.height < GAME.Config.activate.meteors) { // balloons
		var newItem = new Mibbu.spr('img/balloons.png', 30, 80, 0, 4);
		newItem.position(posX, posY, 2).speed(1);
		newItem.movement = 0;
		newItem.zone(0,0,43,0);
		newItem.animation(animation);
	}
	else {// meteors
		//GAME.Config.difficultyLevel = 2; // random movement for higher difficulty levels, eg. lvl3 from 1 to 3
		var newItem = new Mibbu.spr('img/meteor.png', 30, 37, 0, 0);
		newItem.position(posX, posY, 2).speed(1);
		newItem.movement = 0;
		newItem.zone(0,0,0,0);
	}
	return newItem;
};

GAME.Utils.LinkBackToMenu = function(id) {
	document.getElementById(id).onclick = function() {
		document.getElementById(id).style.zIndex = '5';
	};
};

GAME.Utils.PlusMinus = function() {
	return (~~(Math.random()*2)*2)-1;
};