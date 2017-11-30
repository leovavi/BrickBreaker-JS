let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'GAME');

let back, player, ball;
let ballVelX = 200, ballVelY = -200;
let start = false;
let cursors;

let GameState = {
	preload: function(){
		game.load.image('GokuBack', 'assets/goku.jpg');
		game.load.image('player', 'assets/plat3.png');
		game.load.image("ball", "assets/ball2.png");
	},
	create: function(){
		back = game.add.tileSprite(0, 0, 1024, 600, 'GokuBack');
		
		player = game.add.tileSprite(game.world.centerX, game.world.centerY+(game.world.centerY-28), 60, 18, 'player');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		cursors = game.input.keyboard.createCursorKeys();

		ball = game.add.tileSprite(player.body.x+player.body.width/2, player.body.y-player.body.height, 20, 20, "ball");
		game.physics.enable(ball, Phaser.Physics.ARCADE);
	},
	update: function(){
		game.physics.arcade.overlap(player, ball, colPlyBall, null, true);

		move(cursors);
		if(start)
			moveBall();
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');

function move(cursors){
	player.body.velocity.x = 0;

	if(player.body.x < 0){
		player.body.x = 0;
	}

	if(player.body.x > game.world._width-player.body.width){
		player.body.x = game.world._width-player.body.width;
	}

	if(cursors.left.isDown){
		if(!start)
			start = true;
		player.body.velocity.x = -150;
	}

	if(cursors.right.isDown){
		if(!start)
			start = true;
		player.body.velocity.x = 150;
	}
}

function moveBall(){
	if(ball.body.x < 0 || ball.body.x > game.world._width-ball.body.width)
		ballVelX *= -1;

	if(ball.body.y < 0)
		ballVelY *= -1;

	if(ball.body.y > game.world._height-ball.body.height){
		ball.body.x = player.body.x+player.body.width/2;
		ball.body.y = player.body.y-player.body.height;
		
		ballVelY *= -1;
		start = false;
	}

	if(start){
		ball.body.velocity.x = ballVelX;
		ball.body.velocity.y = ballVelY;
	}else{
		ball.body.velocity.x = 0;
		ball.body.velocity.y = 0;
	}
}

function colPlyBall(player, ball){
	if(ball.body.y > player.body.y-ball.body.height)
		ballVelY *= -1;
}