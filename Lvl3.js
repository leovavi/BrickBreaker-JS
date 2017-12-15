let Lvl3 = {
	preload: function(){
		lvl3Music.play();
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.fn = new globalFn();

		this.width = game.world.width, this.height = game.world.height, this.playerVelX = 0.5, prevX = game.input.x;
		this.brickCols = 12, this.brickRows = 11, streak = 0, T = true, F = false;
		let pos3T, pos2T;
		currentLevel = 3;

		this.design = [];
		this.design.push(
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, F, F, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T],
			[T, T, T, T, T, T, T, T, T, T, T, T]);

		this.background = game.add.tileSprite(0, 0, this.width, this.height, "level3Back");
		
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
		this.ball.checkWorldBounds = true;
		this.ball.events.onOutOfBounds.add(this.loseLife, this);

		this.bricks = game.add.group();
		this.bricks.enableBody = true;
		this.bricks.bodyType = Phaser.Physics.ARCADE;

		this.powers = game.add.group();
		this.powerUps = this.fn.locatePowerUps(this.design, this.brickRows, this.brickCols, 20, 7);
		this.powers.enableBody = true;
		this.powers.bodyType = Phaser.Physics.ARCADE;

		game.input.onDown.add(this.shootBall, this);
		game.physics.arcade.collide(this.ball, this.player);
		game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);
		game.physics.arcade.collide(this.player, this.powers, this.power, null, this);
		game.physics.arcade.checkCollision.down = false;

		this.txtLives = game.add.text(0, 0, gtxtLives+lives, txtLivesConfig);
		this.txtLives.anchor.set(0, 1);
		this.txtLives.y = this.height;

		this.txtPoints = game.add.text(0, 0, points+gtxtPoints, txtPointsConfig);
		this.txtPoints.anchor.set(1);
		this.txtPoints.y = this.height;
		this.txtPoints.x = this.width;

		this.timer = game.timer.create(false);
		this.fn.addTimerDelay(this.timer);

		this.fn.resetPlayer(this.player, this.ball, this.height);
		this.startBricks();
	},

	update: function(){
		game.physics.arcade.collide(this.ball, this.player, this.hitPlayer, null, this);
		game.physics.arcade.collide(this.ball, this.bricks, this.removeBrick, null, this);
		game.physics.arcade.collide(this.player, this.powers, this.power, null, this);

		this.prevX = this.fn.movePlayer(this.prevX, this.player, this.playerVelX, this.playerHalf, this.width, this.ball, game);
	},

	startBricks: function(){
		pos3T = Math.floor(Math.random()*4);
		pos2T = Math.floor(Math.random()*4);

		while(pos2T == pos3T){
			pos2T = Math.floor(Math.random()*4);
		}

		this.fn.startBricks(this.bricks, this.brickRows, this.brickCols, this.design, this.width, this.powerUps);
	},

	shootBall: function(){
		this.fn.shootBall(this.ball);
	},

	removeBrick: function(ball, brick){
		if(this.fn.removeBrick(ball, brick, this.powers, pos3T, pos2T)){
			points += 10;
			streak++;
		
			if(streak >= 10 || this.timer.running)
				points += 10;

			this.txtPoints.text = points+gtxtPoints;
			sfx_HitBrick.play();

			if(this.bricks.countLiving() == 0)
				this.fn.endGame(lvl3Music, this.timer);
		}
	},

	hitPlayer: function(ball, player){
		sfx_HitPly.play();
		streak = 0;
	},

	loseLife: function(){
		this.fn.resetPlayer(this.player, this.ball, this.height);
		lives--;
		points -= 50;
		streak = 0;
		if(points < 0)
			points = 0;
		this.txtLives.text = gtxtLives+lives;
		this.txtPoints.text = points+gtxtPoints;
		this.playerVelX = 0.5;
		sfx_LoseLife.play();

		if(this.timer.running)
			this.fn.stopTime(this.timer);
		if(lives === 0)
			this.fn.endGame(lvl1Music, this.timer);
	},

	power: function(player, power){
		newPlayerVelX = this.fn.power(player, power, this.ball, this.playerVelX, this.txtLives, this.timer, lvl3Music);

		if(newPlayerVelX !== -1)
			this.playerVelX = newPlayerVelX;
	}
}