GAME.Config = {
	input: {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		PAUSE: 32,
		START: 13
	},

	height: 0,
	thrust: 0.5,
	gravity: 0.2,
	heightDifference: 0.2,
	difficultyLevel: 1,
	maxRiseSpeed: 20,
	maxFallSpeed: -20,
	moveInterval: 12,
	playerRise: 1,
	playerFall: 2,
	posLimitTop: 50,
	posLimitBottom: 300,
	itemCount: 5,
	itemStart: 200,

	active: false,
	firstBG: true,
	secondBG: false,
	thirdBG: false,
	birdActive: false,
	
	activate: {
		birds: 50,
		planes: 100,
		satellites: 150,
		meteors: 50,
		movement: 50,
		secondBG: 100,
		thirdBG: 150
	},
	
	msg: {
		pausedTitle: 'PAUSED',
		pausedText: 'Press [spacebar] again to get back to the game.',
		congratulations: "Congratz, you've scored # metres!",
		hitBalloon: "You hit the balloon!",
		hitMeteor: "You hit that meteor!",
		hitGround: "Oh noes, You crashed your spaceship!",
		hitBird: "You killed that poor bird!",
		hitPlane: "You crashed into the plane!",
		hitSatellite: "You crashed into the satellite!",
		gameOver: 'GAME OVER!',
		tryAgain: 'Try again?'
	}
};