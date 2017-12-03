let Load = {
	preload: function(){
		this.progVoid = game.add.image(0, 0, "void");
		this.progVoid.x = game.world.centerX-this.progVoid.width/2;
		this.progVoid.y = game.world.centerY;

		this.progFull = game.add.image(0, 0, "full");
		this.progFull.anchor.x = this.progVoid.anchor.x;
		this.progFull.x = this.progVoid.x;
		this.progFull.y = this.progVoid.y;

		game.load.setPreloadSprite(this.progFull);

		//Image Files
		game.load.image("bkg", "assets/back.png");
		game.load.image("logo", "assets/logo.png");
		game.load.image("paddle", "assets/menu.png");
		game.load.image("level1Back", "assets/goku.jpg");
		game.load.image("bkgBlack", "assets/bkgBlack.png");
		game.load.image("player", "assets/paddle.png");
		game.load.image("img_bRed", "assets/bRed.png");
		game.load.image("img_bGreen", "assets/bGreen.png");
		game.load.image("img_bPurple", "assets/bPurple.png");
		game.load.image("img_bYellow", "assets/bYellow.png");
		game.load.image("ball", "assets/ball3.png");
		game.load.image("bkg", "assets/back.png");

		//SpriteSheet Files
		game.load.spritesheet("start", "assets/btn_start.png", 190, 49);
		game.load.spritesheet("back", "assets/btn_back.png", 190, 49);

		//Audio Files
		game.load.audio("music", "sound/One.mp3");
		game.load.audio("dbz", "sound/dbz.mp3"); 
		game.load.audio("dbz2", "sound/dbz2.mp3")
		game.load.audio("dbz3", "sound/dbz3.mp3");
		game.load.audio("hitPly", "sound/hit.wav");
		game.load.audio("hitBrick", "sound/brick.wav");
		game.load.audio("loseLife", "sound/loseLife.ogg");
		game.load.audio("winLevel", "sound/win.ogg");
		game.load.audio("loseLevel", "sound/loseGame.ogg");

		//Create Audio Files
		menuMusic = game.add.audio("music");
		menuMusic.loop = true;

		lvl1Music = game.add.audio("dbz");
		lvl1Music.loop = true;
	},

	create: function(){
		game.state.start("menu")
	}
}