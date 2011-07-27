function onSpaceStart() {
    console.log('start');
    mibbuGame.gameData = {};

    document.onkeypress = this.keyboardManager;
    document.onkeyup = this.stopBackground;
}

onSpaceStart.prototype = {
    init: function() {
        console.log('init from prototype');

        mibbuGame.gameData.gameHeight = 0;
        mibbuGame.gameData.maxRiseSpeed = 20;
        mibbuGame.gameData.maxFallSpeed = -20;

        mibbuGame.fps().init();

        var sprite = new mibbuGame.spr('img/rocket.png', 196, 218, 2, 1);//,

        mibbuGame.gameData.background = new mibbuGame.bg('img/clouds.png', 6, "S", {x:0,y:0});

            //this.background = background;
        //set position of 1st sprite to (100, 100) and
        //it's x-index to 2
        //then speed of redrwing the sprite frames
            sprite.position(300, 170, 1).speed(0);
            //rocket.position(10, 10, 0);
        //sprite2.position(-200, -200, 0).speed(0);

        //extend sprite object with some additional
        //variables fr control movement etc.
        //it is up to you how you will achieve this -
        //- it is not part of Mibbu
        sprite.y = 100;
        sprite.d = 1;
        sprite.type = 0;

        //the same here
        //but we create variable for the speed of the animation
        //we will use it later
        var speed = 0;

    //    sprite2.speed(4).position(100, 300, 2);
    //    sprite2.y = 300;
    //    sprite2.d = -1;

        //resize second sprite and remember
        //it's size in the file (functions like
        //size(), frames(), etc. return
        //their values when you call them
        //without parameters, like sprite2.size();
        //We use chaining in here, so to receive
        //size we have to use that dirty hack with
        //calling one function twice
    //    var size = sprite2.size(100, 100).size();

        //start moving background
        //and setting random direction and speed
            //background.speed(~~(Math.random()*10)+1).dir(~~(Math.random()*180)).on();
            mibbuGame.gameData.background.speed(0).dir(90).on();
        //start main game loop
            mibbuGame.on();

        //now we will create additional function
        //to be called on each frame of main game loop
        var additionalLoop = function(){
            //if (sprite.y < 0) sprite.d*=-1;

        //    if (sprite2.y > 500-size.height) sprite2.d*=-1;

            //sprite.y+=sprite.d*4;
        //    sprite2.y+=sprite2.d*2;
            document.getElementById('height').innerHTML = parseInt(mibbuGame.gameData.gameHeight);
            //we move the sprites by changing it's
            //positions
            //sprite.position(100, sprite.y);
        //    sprite2.position(100, sprite2.y);

            if(mibbuGame.gameData.gameHeight < 0) {
                alert('GAME OVER!');
            }

            var actSpeed = mibbuGame.gameData.background.speed();

            if(mibbuGame.gameData.gameHeight > 0) {
                actSpeed -= 0.2;
                if(actSpeed < mibbuGame.gameData.maxFallSpeed) {
                    actSpeed = mibbuGame.gameData.maxFallSpeed;
                }
                mibbuGame.gameData.background.speed(actSpeed);
            }

            if(actSpeed > 0) {
                mibbuGame.gameData.gameHeight += 0.2;
            }
            else if(actSpeed < 0) {
                mibbuGame.gameData.gameHeight -= 0.2;
            }

            
            //console.log(mibbuGame.gameData.gameHeight);
        }
        //now add that function to the loop
        //and start checking for the collisions
        mibbuGame.hook(additionalLoop).hitsOn();


/*
        //if 'sprite' will collide with 'sprite2' then:
        sprite.hit(sprite2, function(){
            //change it's type
            if (sprite.type === 0) {
                sprite.type = 1;
                //sprite.change('img/rocket.png', 196, 163, 1, 0);

            } else {
                sprite.type = 0;
                //sprite.change('img/reptile2.png', 200, 200, 7, 0);
            }
            //resize it
            sprite.size(150, 150);

            //and change direction of it's movement
            //also - it is not the part of Mibbu
            sprite.d*=-1;
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
        mibbuGame.gameData.sprite = sprite;
    },

	keyboardManager: function(e) {
		// odczytujemy wcisniety klawisz
        //e.preventDefault();
		var eventObject = window.event ? event : e,
			unicode = eventObject.charCode ? eventObject.charCode : eventObject.keyCode,
			actualKey = String.fromCharCode(unicode);

        var sprite = mibbuGame.gameData.sprite;
        var background = mibbuGame.gameData.background;

		switch(actualKey) {
			case 'w': {
				// zmniejszamy obrazek
				//sprite.size(75,75);
                sprite.speed(6);
				//sprite.frame(1);
				sprite.animation(1);
                console.log('up');
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
				// zwiekszamy obrazek
				//sprite.size(125,125);
				break;
			}
			case 'a': {
                console.log('left');
				// sprawdzamy i ustawiamy kierunek przesuwania tla
				//if(sprite.dir != 'E') {
				//	sprite.dir = 'E';
				//	background.dir('E');
				//}
				// ustawienia dla ruchu w lewo
				//background.speed(3);
				break;
			}
			case 'd': {
                console.log('right');
				// sprawdzamy i ustawiamy kierunek przesuwania tla
			//	if(sprite.dir != 'W') {
			//		sprite.dir = 'W';
			//		background.dir('W');
			//	}
				// ustawienia dla ruchu w prawo
			//	background.speed(3);
			//	sprite.anim = 0;
			//	sprite.frame(1);
			//	sprite.animation(sprite.anim);
				break;
			}
			default: {;}
		}
	},
/*
    stopBackground: function() {
		// zatrzymujemy tlo
		background.speed(0);
		sprite.animation(sprite.anim);
		sprite.frame(0);
    },
*/
0:0};