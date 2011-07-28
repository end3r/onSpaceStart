function onSpaceStart(MB) {
    mibbuGame.gameData = {};

    document.onkeypress = this.keyboardManager;
    //document.onkeyup = this.stopBackground;
}

onSpaceStart.prototype = {
    init: function() {
        mibbuGame.gameData.gameHeight = 0;
        mibbuGame.gameData.maxRiseSpeed = 20;
        mibbuGame.gameData.maxFallSpeed = -20;

        mibbuGame.fps().init();

        var rocket = new mibbuGame.spr('img/rocket.png', 196, 218, 2, 1);

        mibbuGame.gameData.background = new mibbuGame.bg('img/clouds.png', 6, 90, {x:0,y:0});

        rocket.position(300, 170, 1).speed(0);
        rocket.y = 100;
        rocket.d = 1;
        rocket.type = 0;
		rocket.moveInterval = 25;

        var speed = 0;

        mibbuGame.gameData.background.speed(0).dir(90).on();
        //start main game loop
        mibbuGame.on();

        // called on each frame of main game loop
        var additionalLoop = function(){
			var actSpeed = mibbuGame.gameData.background.speed(),
				actHeight = mibbuGame.gameData.gameHeight;

			actSpeed1 = parseFloat(actSpeed).toFixed(1);
			actHeight1 = parseFloat(actHeight).toFixed(1);
			
            document.getElementById('height').innerHTML = actHeight1;
            document.getElementById('speed').innerHTML = actSpeed1;

            if(actHeight < 0) {
                alert('GAME OVER!');
            }

            if(actHeight > 0) {
                actSpeed -= 0.2;
                if(actSpeed < mibbuGame.gameData.maxFallSpeed) {
                    actSpeed = mibbuGame.gameData.maxFallSpeed;
                }
                mibbuGame.gameData.background.speed(actSpeed);
            }

            if(actSpeed > 0) {
                actHeight += 0.2;
            }
            else if(actSpeed < 0) {
                actHeight -= 0.2;
            }
			
			mibbuGame.gameData.background.speed(actSpeed);
			mibbuGame.gameData.gameHeight = actHeight;
        }
        //now add that function to the loop
        //and start checking for the collisions
        mibbuGame.hook(additionalLoop).hitsOn();
		
		/*
        //if 'rocket' will collide with 'sprite2' then:
        rocket.hit(sprite2, function(){
            //change it's type
            if (rocket.type === 0) {
                rocket.type = 1;
                //rocket.change('img/rocket.png', 196, 163, 1, 0);

            } else {
                rocket.type = 0;
                //rocket.change('img/reptile2.png', 200, 200, 7, 0);
            }
            //resize it
            rocket.size(150, 150);

            //and change direction of it's movement
            //also - it is not the part of Mibbu
            rocket.d*=-1;
            sprite2.d*=-1;
        });

        //create callback for the second sprite
        //it will change the speed of animation
        //after every second full animation
        //hope I explained it clearly:)
        sprite2.callback(function(){
            speed++;
            sprite2.speed(speed);
        }, 2);*/
        mibbuGame.gameData.rocket = rocket;
    },

	keyboardManager: function(e) {
        //e.preventDefault();
		var eventObject = window.event ? event : e,
			unicode = eventObject.charCode ? eventObject.charCode : eventObject.keyCode,
			actualKey = String.fromCharCode(unicode);

        var rocket = mibbuGame.gameData.rocket;
        var background = mibbuGame.gameData.background;

		switch(actualKey) {
			case 'w': {
                rocket.speed(6);
				//rocket.frame(1);
				rocket.animation(1);
                //background.speed(10);
                var speed = mibbuGame.gameData.background.speed();
                speed += 10;
                if(speed >= mibbuGame.gameData.maxRiseSpeed) {
                    speed = mibbuGame.gameData.maxRiseSpeed;
                }
                mibbuGame.gameData.background.speed(speed);
				break;
			}
			case 's': {
				// ---
				break;
			}
			case 'a': {
                //console.log('left');
				//var pos = rocket.position();
				//	pos.x -= 15;
				//	rocket.position(pos.x,pos.y);
				rocket.position(rocket.position().x -= rocket.moveInterval, rocket.position().y);
				//console.log(rocket.position());
				// sprawdzamy i ustawiamy kierunek przesuwania tla
				//if(rocket.dir != 'E') {
				//	rocket.dir = 'E';
				//	background.dir('E');
				//}
				// ustawienia dla ruchu w lewo
				//background.speed(3);
				break;
			}
			case 'd': {
                //console.log('right');
				rocket.position(rocket.position().x += rocket.moveInterval, rocket.position().y);
				// sprawdzamy i ustawiamy kierunek przesuwania tla
			//	if(rocket.dir != 'W') {
			//		rocket.dir = 'W';
			//		background.dir('W');
			//	}
				// ustawienia dla ruchu w prawo
			//	background.speed(3);
			//	rocket.anim = 0;
			//	rocket.frame(1);
			//	rocket.animation(rocket.anim);
				break;
			}
			default: {;}
		}
	},
		
	generateItems: function(count) {
		// generate items
	},
/*
    stopBackground: function() {
		// zatrzymujemy tlo
		background.speed(0);
		rocket.animation(rocket.anim);
		rocket.frame(0);
    },
*/
0:0};