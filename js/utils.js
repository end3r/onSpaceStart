GAME.Utils = {};

GAME.Utils.Alert = function(title, message) {
	var div = GAME._id('message');
	if(title) { // show
		div.style.zIndex = '20';
		div.innerHTML = '<div class="box">'+title+message+'</div><div class="shadow"></div>';
	}
	else { // hide
		div.style.zIndex = '5';
	}
};

GAME.Utils.GameOver = function(what) {
	var msg = '',
		score = parseFloat(GAME.Config.height).toFixed(1),
		defaultMsg = '<p>'+(GAME.Config.msg.congratulations).replace('#',score)+'</p>';

	switch(what) {
		case 'balloon': {
			msg = GAME.Config.msg.hitBalloon+defaultMsg;
			break;
		}
		case 'meteor': {
			msg = GAME.Config.msg.hitMeteor+defaultMsg;
			break;
		}
		case 'crash': {
			msg = GAME.Config.msg.hitGround;
			break;
		}
		case 'bird': {
			msg = GAME.Config.msg.hitBird+defaultMsg;
			break;
		}
		case 'plane': {
			msg = GAME.Config.msg.hitPlane+defaultMsg;
			break;
		}
		case 'satellite': {
			msg = GAME.Config.msg.hitSatellite+defaultMsg;
			break;
		}
		default: { msg = defaultMsg; }
	}
	Mibbu.off();
	GAME.Utils.Alert(GAME.Config.msg.gameOver, msg+GAME.Config.msg.tryAgain);
};

GAME.Utils.NewItem = function(posX, posY, animation, type) {
	if(type == 'balloon') {
		var newItem = new Mibbu.spr('img/balloons.png', 30, 80, 0, 4);
		newItem.zone(0,0,43,0);
		newItem.animation(animation);
	}
	else { // meteor
		var newItem = new Mibbu.spr('img/meteor.png', 42, 41, 0, 0);
		newItem.zone(0,0,0,0);
	}
	newItem.position(posX, posY, 2).speed(1);
	newItem.movement = 0;
	newItem.type = type;
	return newItem;
};

GAME.Utils.UpdateItem = function(item) {
	item.position(item.posX, item.posY, 2).speed(1);
	item.movement = 0;
	return item;
};

GAME.Utils.LinkBackToMenu = function(id) {
	GAME._id(id).onclick = function() {
		GAME._id(id).style.zIndex = '5';
	};
};

GAME.Utils.PlusMinus = function() {
	return (~~(Math.random()*2)*2)-1;
};