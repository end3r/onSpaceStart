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
	bgHeight: 1000,

	active: false,
	firstBG: true,
	secondBG: false,
	thirdBG: false,
	flyActive: false,
	
	activate: {
		birds: 1,
		planes: 2,
		satellites: 1,
		meteors: -1,
		movement: 3,
		secondBG: 4
	},
	
	msg: {
		pausedTitle: "<h2>PAUSED</h2>",
		pausedText: "<p>Press [spacebar] again to get back to the game.</p><p>Or get back to the <a href=''>main menu</a>?</p>",
		congratulations: "<p>Congratulations, you've reached <span>#</span> metres!</p>",
		hitBalloon: "<p>You hit the balloon!</p>",
		hitMeteor: "<p>You hit that meteor!</p>",
		hitGround: "<p>Oh no! You crashed your spaceship!</p>",
		hitBird: "<p>You killed that poor bird!</p>",
		hitPlane: "<p>You crashed into the plane!</p>",
		hitSatellite: "<p>You crashed into the satellite!</p>",
		gameOver: "<h1>GAME OVER!</h1>",
		tryAgain: "<p><a href=''>Try again?</a></p>"
	}
};