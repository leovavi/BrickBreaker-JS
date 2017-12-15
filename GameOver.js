let GameOver = {
	preload: function(){
		
	},

	create: function(){
		let width = game.world.width, height = game.world.height;

		this.bkg = game.add.tileSprite(0, 0, width, height, "bkg");

		this.btnStr = "";

		if(lives <= 0 || currentLevel == 3)
			this.btnStr = "back";
		else
			this.btnStr = "nxtLvl";

		this.btn = game.add.button(0, 0, this.btnStr, this.nextState, this, over, out, down);
		this.btn.anchor.set(0.5, 1);
		this.btn.x = game.world.centerX;
		this.btn.y = game.world.height-200;

		if(lives > 0 && currentLevel !== 3){
			this.btnBack = game.add.button(0, 0, "back", this.main, this, over, out, down);
			this.btnBack.anchor.set(0.5, 1);
			this.btnBack.x = game.world.centerX;
			this.btnBack.y = game.world.height-130;
		}

		this.txtOver = game.add.text(0, 0, gtxtGO, txtOverConfig);
		this.txtOver.anchor.x = 0.5;
		this.txtOver.x = game.world.centerX;
		this.txtOver.y = 200;

		if (lives > 0) {
			this.txtOver.fill = "#e0d700";
			this.txtOver.text = gtxtWin+currentLevel;
			if(currentLevel === 3)
				this.txtOver.text = "Congratulations! You've passed the game!";
		}

		this.txtPoints = game.add.text(0, 0, points+gtxtPoints, txtPointsConfig);
		this.txtPoints.align = "center";
		this.txtPoints.fontSize = 28;
		this.txtPoints.anchor.x = 0.5;
		this.txtPoints.x = game.world.centerX;
		this.txtPoints.y = game.world.centerY-20;
	},

	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			this.nextState();
		this.bkg.tilePosition.y += 2;
	},

	nextState: function(){
		if(lives == 0)
			game.state.start("menu");
		else if(currentLevel == 1)
			game.state.start("lvl2");
		else if(currentLevel == 2)
			game.state.start("lvl3");
	},

	main: function(){
		game.state.start("menu");
	}
};