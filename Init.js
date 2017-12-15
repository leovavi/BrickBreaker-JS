let game;

window.onload = function(){
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Brick Breaker Game');
	game.state.add("init", Init);
	game.state.add("load", Load);
	game.state.add("menu", MainMenu);
	game.state.add("lvl1", Lvl1);
	game.state.add("lvl2", Lvl2);
	game.state.add("lvl3", Lvl3);
	game.state.add("over", GameOver);
	game.state.start("init");
}

let Init = {
	preload: function(){
		game.load.image("void", "assets/progBar_void.png");
		game.load.image("full", "assets/progBar_full.png");
		game.load.image("gokuLoad", "assets/gokuLoading.png");
	},

	create: function(){
		game.state.start("load");
	}
}