class globalFn{
	resetPlayer(player, ball, height){
		player.anchor.setTo(0.5, 1);
		player.x = game.world.centerX;
		player.y = height-25;
		ball.isShot = false;

		this.resetBall(ball, player);
	}

	resetBall(ball, player){
		ball.body.velocity.set(0);
		ball.x = player.x;
		ball.y = player.y-player.height-ball.height;
	}

	movePlayer(prevX, player, playerVelX, playerHalf, width, ball, game){
		let leftKeyDown = game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
		let rightKeyDown = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
		
		if(prevX !== game.input.x)
			player.x = game.input.x;
		else if(leftKeyDown && !rightKeyDown)
			player.x -= playerVelX * game.time.physicsElapsedMS;
		else if(rightKeyDown && !leftKeyDown)
			player.x += playerVelX * game.time.physicsElapsedMS;

		prevX = game.input.x;

		if(player.x-playerHalf<0)
			player.x = 0+playerHalf;
		else if(player.x+playerHalf>width)
			player.x = width-playerHalf;

		if(!ball.isShot)
			ball.x = player.x;

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			this.shootBall(ball);

		return prevX;
	}

	startBricks(bricks, brickRows, brickCols, brickImgs, design, width){
		for(let i = 0; i<brickRows; i++){
			for(let j = 0; j<brickCols; j++){
				if(design[i][j]){
					let pos = Math.floor(Math.random()*4);
					let img = brickImgs[pos];
					let brick = bricks.create(0, 0, img);
					brick.body.immovable = true;
					let indent = (width-(brickCols*brick.width))/2;
					brick.x = brick.width*j+indent;
					brick.y = brick.height*i;
				}
			}
		}
	}

	shootBall(ball){
		if(ball.isShot){
			return;
		}

		let velX = ball.iniVelX, velY = ball.iniVelY;
		let rand = Math.floor(Math.random() * 2);

		if(rand%2 === 0)
			velX *= -1;

		ball.isShot = true;
		let state = game.state.getCurrentState();
		ball.body.velocity.set(velX, velY);
	}

	endGame(music){
		music.stop();
		game.state.start("over");

		if(lives>0)
			sfx_WinLevel.play();
		else
			sfx_LoseLevel.play();
	}
}