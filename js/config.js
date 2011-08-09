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
		planes: 400,
		satellites: 600,
		meteors: 50,
		movement: 100,
		secondBG: 300,
		thirdBG: 500
	}
};