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

	locatePowerUps(design, brickRows, brickCols, cant, tamPU){
		let powerUps = [];
		for(let i = 0; i<brickRows; i++){
			powerUps.push([]);
			for(let j = 0; j<brickCols; j++){
				powerUps[i].push(-1);
			}
		}
				

		for(let i = 0; i<cant; i++){
			let randX = Math.floor(Math.random()*brickRows);
			let randY = Math.floor(Math.random()*brickCols);
			let randPU = Math.floor(Math.random()*tamPU);

			while(!design[randX][randY] || powerUps[randX][randY] != -1){
				randX = Math.floor(Math.random()*brickRows);
				randY = Math.floor(Math.random()*brickCols);
			}

			powerUps[randX][randY] = randPU;
		}

		return powerUps;
	}

	startBricks(bricks, brickRows, brickCols, design, width, powerUps){
		for(let i = 0; i<brickRows; i++){
			for(let j = 0; j<brickCols; j++){
				if(design[i][j]){
					let pos = Math.floor(Math.random()*4);
					let img = brickImgs[pos];
					let brick = bricks.create(0, 0, img);
					brick.body.immovable = true;
					brick.powerUp = powerUps[i][j];
					let indent = (width-(brickCols*brick.width))/2;
					brick.x = brick.width*j+indent;
					brick.y = brick.height*i;
				}
			}
		}
	}

	removeBrick(ball, brick, powers, pos3T, pos2T){
		if(brick.key.includes(brickImgs[pos3T])){
			if(brick.key === brickImgs[pos3T]){
				brick.loadTexture(brickImgs[pos3T]+"2");
				sfx_breakBrick.play();
				return false;
			}
			else if(brick.key === brickImgs[pos3T]+"2"){
				brick.loadTexture(brickImgs[pos3T]+"3");
				sfx_breakBrick.play();
				return false;
			}
		}
		else if(brick.key === brickImgs[pos2T]){
			brick.loadTexture(brickImgs[pos2T]+"3");
			sfx_breakBrick.play();
			return false;
		}

		if(brick.powerUp != -1){
			let power = powers.create(0, 0, powerImgs[brick.powerUp]);
			power.x = brick.x;
			power.y = brick.y;
			power.checkWorldBounds = true;
			power.events.onOutOfBounds.add(this.removePower, this);
			power.body.velocity.y = 50;
		}

		brick.kill();

		return true;
	}

	removePower(power){
		power.kill();
	}

	power(player, power, ball, playerVelX, txtLives){
		let velX = ball.body.velocity.x, velY = ball.body.velocity.y;
		let newVelX, newVelY, newPlayerVelX = -1;

		switch(power.key){
			case "slowP":
				newPlayerVelX = playerVelX-incVelP<minVelP ? minVelP : playerVelX -= incVelP;
				sfx_Slow.play();
				break;
			case "fastP":
				newPlayerVelX = playerVelX+incVelP>maxVelP ? maxVelP : playerVelX += incVelP;
				sfx_Fast.play();
				break;
			case "fastB":
				if(velX < maxVelXB){
					newVelX = velX+((velX < 0) ? incVelB*-1 : incVelB);
					newVelY = velY+((velY < 0) ? incVelB*-1 : incVelB);

					ball.body.velocity.set(newVelX, newVelY);
				}
				sfx_Fast.play();
				break;
			case "slowB":
				if(ball.body.velocity.x > minVelXB || ball.body.velocity.x < minVelXB*-1){
					newVelX = velX+((velX < 0) ? incVelB : incVelB*-1);
					newVelY = velY+((velY < 0) ? incVelB : incVelB*-1);

					ball.body.velocity.set(newVelX, newVelY);
				}
				sfx_Slow.play();
				break;
			case "doubleP":
				if(timer.running)
					this.stopTime();
				
				timer.start();
				sfx_DP.play();
				sfx_Star.play();
				break;

			case "oneUp":
				lives++;
				txtLives.text = gtxtLives+lives;
				sfx_LifeUp.play();
				break;

			case "oneDown":
				lives--;
				txtLives.text = gtxtLives+lives;
				sfx_LifeDown.play();

				if(lives === 0)
					this.endGame(lvl1Music, timer);
				break;
		}

		power.kill();

		return newPlayerVelX;
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
		if(timer.running)
			timer.stop();

		if(lives>0)
			sfx_WinLevel.play();
		else
			sfx_LoseLevel.play();
	}

	stopTime(){
		timer.stop();
		sfx_Star.stop();
		this.addTimerDelay();
	}

	addTimerDelay(){
		timer.add(Phaser.Timer.SECOND * 20, this.stopTime, this);
	}

	// nextLevel(music,currentLevel){
	// 	music.stop();
	// 	if(currentLevel == 1)
	// 		game.state.start("lvl2");
	// 	else if (currentLevel == 2)
	// 		game.state.start("lvl3");
			
	// 	if(lives>0)
	// 		sfx_WinLevel.play();
	// 	else
	// 		sfx_LoseLevel.play();
	// }
}