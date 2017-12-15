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

		this.txt = game.add.text(0, 0, "Loading Files...", txtOverConfig);
		this.txt.anchor.set(0.5);
		this.txt.x = game.world.centerX;
		this.txt.y = game.world.centerY - 50;

		this.goku = game.add.image(0, 0, "gokuLoad");
		this.goku.anchor.set(0.5, 0.5);
		this.goku.x = game.world.centerX - 145;
		this.goku.y = game.world.centerY + 20;

		//Image Files
		game.load.image("bkg", "assets/back.png");
		game.load.image("logo", "assets/logo.png");
		game.load.image("paddle", "assets/menu.png");
		game.load.image("level1Back", "assets/goku.jpg");
		game.load.image("bkgBlack", "assets/bkgBlack.png");
		game.load.image("player", "assets/paddle.png");
		game.load.image("slowP", "assets/slowP.png");
		game.load.image("fastP", "assets/fastP.png");
		game.load.image("slowB", "assets/slowB.png");
		game.load.image("fastB", "assets/fastB.png");
		game.load.image("oneUp", "assets/1Up.png");
		game.load.image("oneDown", "assets/1Down.png");
		game.load.image("doubleP", "assets/DP.png");
		game.load.image("img_bRed", "assets/Bricks/rojo.png");
		game.load.image("img_bRed2", "assets/Bricks/rojo3.png");
		game.load.image("img_bRed3", "assets/Bricks/rojo4.png");
		game.load.image("img_bGreen", "assets/Bricks/verde.png");
		game.load.image("img_bGreen2", "assets/Bricks/verde3.png");
		game.load.image("img_bGreen3", "assets/Bricks/verde4.png");
		game.load.image("img_bPurple", "assets/Bricks/morado.png");
		game.load.image("img_bPurple2", "assets/Bricks/morado3.png");
		game.load.image("img_bPurple3", "assets/Bricks/morado4.png");
		game.load.image("img_bYellow", "assets/Bricks/amarillo.png");
		game.load.image("img_bYellow2", "assets/Bricks/amarillo3.png");
		game.load.image("img_bYellow3", "assets/Bricks/amarillo4.png");
		game.load.image("ball", "assets/ball3.png");
		game.load.image("bkg", "assets/back.png");
		game.load.image("level2Back", "assets/dk.jpg");
		game.load.image("level3Back", "assets/sonic.jpg");
		game.load.image("sonicMove", "assets/sonicMove.jpg");
		game.load.image("dkMove", "assets/dkMove.jpg");
		game.load.image("pause", "assets/btn_pause.png");

		//SpriteSheet Files
		game.load.spritesheet("start", "assets/btn_start.png", 190, 49);
		game.load.spritesheet("back", "assets/btn_back.png", 190, 49);
		game.load.spritesheet("nxtLvl", "assets/btn_Nxt.png", 190, 49);
		game.load.spritesheet("cont", "assets/btn_cont.png", 190, 49);

		//Audio Files
		game.load.audio("music", "sound/One.ogg");
		game.load.audio("dbz", "sound/dbz.ogg");
		game.load.audio("dk", "sound/dk theme.ogg");
		game.load.audio("sonic", "sound/sonic.ogg");
		game.load.audio("hitPly", "sound/hit.wav");
		game.load.audio("hitBrick", "sound/brick.wav");
		game.load.audio("breakBrick", "sound/break.mp3");
		game.load.audio("loseLife", "sound/loseLife.ogg");
		game.load.audio("lifeUp", "sound/1Up.mp3");
		game.load.audio("lifeDown", "sound/pipe.mp3");
		game.load.audio("winLevel", "sound/win.ogg");
		game.load.audio("loseLevel", "sound/loseGame.ogg");
		game.load.audio("fast", "sound/fast.mp3");
		game.load.audio("slow", "sound/slow.mp3");
		game.load.audio("coin", "sound/mariocoin.mp3");
		game.load.audio("kame", "sound/kamehameha.mp3");
		game.load.audio("star", "sound/star.mp3");
	},

	create: function(){
		// Create Audio Files
		menuMusic = game.add.audio("music");
		menuMusic.loop = true;

		lvl1Music = game.add.audio("dbz");
		lvl1Music.loop = true;

		sfx_HitPly = game.add.audio("hitPly");
		sfx_HitBrick = game.add.audio("hitBrick");
		sfx_breakBrick = game.add.audio("breakBrick");
		sfx_LoseLife = game.add.audio("loseLife");
		sfx_LoseLevel = game.add.audio("loseLevel");
		sfx_WinLevel = game.add.audio("winLevel");
		sfx_Fast = game.add.audio("fast");
		sfx_Slow = game.add.audio("slow");
		sfx_LifeUp = game.add.audio("lifeUp");
		sfx_LifeDown = game.add.audio("lifeDown");
		sfx_DP = game.add.audio("coin");
		sfx_GokuS = game.add.audio("kame");
		sfx_Star = game.add.audio("star");
		sfx_Star.loop = true;

		this.txt.text = "Decoding Audio...";
		game.sound.setDecodedCallback([menuMusic, lvl1Music], this.showMenu, this);
	},

	showMenu: function(){
		game.state.start("menu");
	}
}