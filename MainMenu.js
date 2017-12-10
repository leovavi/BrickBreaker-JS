let MainMenu = {
	preload: function(){
		menuMusic.play();
	},

	create: function(){
		let width = game.world.width, height = game.world.height;

		this.bkg = game.add.tileSprite(0, 0, width, height, "bkg");

		this.logo = game.add.image(0, 0, "logo");
		this.logo.anchor.x = 0.5;
		this.logo.x = game.world.centerX;
		this.logo.y = 100;

		this.paddle = game.add.sprite(0, 0, "paddle");
		this.paddle.anchor.set(0.5, 1);
		this.paddle.x = game.world.centerX;
		this.paddle.y = height-20;

		this.btnStart = game.add.button(0, 0, "start", this.startGame, this, over, out, down);
		this.btnStart.anchor.x = 0.5;
		this.btnStart.x = game.world.centerX;
		this.btnStart.y = game.world.centerY;

		lvl2Music = game.add.audio("dk");
		lvl2Music.loop = true;

		lvl3Music = game.add.audio("sonic");
		lvl3Music.loop = true;
	},

	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			this.startGame();
		this.bkg.tilePosition.y += 2;
	},

	startGame: function(){
		game.state.start("mainState");
		menuMusic.stop();
	}
};