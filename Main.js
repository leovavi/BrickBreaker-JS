let game;

window.onload = function(){
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Brick Breaker Game');
	game.state.add("mainState", mainState);
	game.state.start("mainState");
}

let mainState = {
	preload: function(){
		game.load.image("level1Back", "assets/goku.jpg");
		game.load.image("bkgBlack", "assets/bkgBlack.png");
		game.load.image("player", "assets/paddle.png");
		game.load.image("img_bRed", "assets/bRed.png");
		game.load.image("img_bGreen", "assets/bGreen.png");
		game.load.image("img_bPurple", "assets/bPurple.png");
		game.load.image("img_bYellow", "assets/bYellow.png");
		game.load.image("ball", "assets/ball3.png");
		game.load.audio("sonic", "sound/sonic_theme.mp3");
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.width = game.world.width, this.height = game.world.height, this.playerVelX = 0.5, prevX = game.input.x;
		this.brickCols = 12, this.brickRows = 5, this.lives = 3, this.points = 0;

		this.background = game.add.tileSprite(0, 0, this.width, this.height, "level1Back");
		
		this.player = game.add.sprite(0, 0, "player");
		this.playerHalf = this.player.width/2;
		game.physics.arcade.enable(this.player);
		this.player.body.enable = true;
		this.player.body.immovable = true;

		this.blackLine = game.add.tileSprite(0, 0, this.width, this.player.height, "bkgBlack");
		this.blackLine.anchor.set(0, 1);
		this.blackLine.y = this.height;

		this.ball = game.add.sprite(0, 0, "ball");
		game.physics.arcade.enable(this.ball);
		this.ball.body.enable = true;
		this.ball.body.bounce.set(1);
		this.ball.body.collideWorldBounds = true;
		this.ball.iniVelX = 200;
		this.ball.iniVelY = -300;
		this.ball.isShot = false;

		this.bricks = game.add.group();
		this.brickImgs = ["img_bRed", "img_bGreen", "img_bPurple", "img_bYellow"];
		this.bricks.enableBody = true;
		this.bricks.bodyType = Phaser.Physics.ARCADE;

		game.input.onDown.add(this.shootBall, this);
		game.physics.arcade.collide(this.ball, this.player);
		game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);
		game.physics.arcade.checkCollision.down = false;

		let txtConfig = {
			font: "18px sans-serif",
			fill: "#f44141",
			align: "right"
		};

		this.txtLives = game.add.text(0, 0, gtxtLives+this.lives, txtConfig);
		this.txtLives.align = "left";
		this.txtLives.anchor.set(0, 1);
		this.txtLives.y = this.height;

		this.txtPoints = game.add.text(0, 0, this.points+gtxtPoints, txtConfig);
		this.txtPoints.anchor.set(1);
		this.txtPoints.y = this.height;
		this.txtPoints.x = this.width;

		this.resetPlayer();
		this.startBricks();
	},

	update: function(){
		game.physics.arcade.collide(this.ball, this.player);
		game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);

		this.movePlayer();
	},

	resetPlayer: function(){
		this.player.anchor.setTo(0.5, 1);
		this.player.x = game.world.centerX;
		this.player.y = this.height-25;

		this.resetBall();
	},

	resetBall: function(){
		this.ball.body.velocity.set(0);
		this.ball.x = this.player.x;
		this.ball.y = this.player.y-this.player.height-this.ball.height;
	},

	movePlayer: function(){
		let leftKeyDown = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
		let rightKeyDown = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
		
		if(this.prevX !== game.input.x){
			this.player.x = game.input.x;
		}
		else if(leftKeyDown && !rightKeyDown)
			this.player.x -= this.playerVelX * game.time.physicsElapsedMS;
		else if(rightKeyDown && !leftKeyDown)
			this.player.x += this.playerVelX * game.time.physicsElapsedMS;

		this.prevX = game.input.x;

		if(this.player.x-this.playerHalf<0)
			this.player.x = 0+this.playerHalf;
		else if(this.player.x+this.playerHalf>this.width)
			this.player.x = this.width-this.playerHalf;

		if(!this.ball.isShot)
			this.ball.x = this.player.x;

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			this.shootBall();
	},

	startBricks: function(){
		for(let i = 0; i<this.brickRows; i++){
			let img = this.brickImgs[i%this.brickImgs.length];

			for(let j = 0; j<this.brickCols; j++){
				let brick = this.bricks.create(0, 0, img);
				brick.body.immovable = true;
				let indent = (this.width-(this.brickCols*brick.width))/2;
				brick.x = brick.width*j+indent;
				brick.y = brick.height*i;
			}
		}
	},

	shootBall: function(){
		if(this.ball.isShot){
			return;
		}

		let velX = this.ball.iniVelX, velY = this.ball.iniVelY;
		let rand = Math.floor(Math.random() * 2);

		if(rand%2 === 0)
			velX *= -1;

		this.ball.isShot = true;
		let state = game.state.getCurrentState();
		this.ball.body.velocity.set(velX, velY);
	},

	removeBrick: function(ball, brick){
		brick.kill();
		this.points += 10;
	}
}