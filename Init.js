let game;

window.onload = function(){
	game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Brick Breaker Game');
	game.state.add("init", Init);
	game.state.add("load", Load);
	game.state.add("menu", MainMenu);
	game.state.add("mainState", mainState);
	game.state.add("over", GameOver);
	game.state.start("init");
}

let Init = {
	preload: function(){
		game.load.image("void", "assets/progBar_void.png");
		game.load.image("full", "assets/progBar_full.png");
	},

	create: function(){
		game.state.start("load");
	}
}