let gtxtLives = "Lives: ";
let gtxtPoints = " points";
let currentLevel = 0;
let gtxtWin = "Congratulations! You've passed level ";
let gtxtGO = "GAME OVER";

let menuMusic, lvl1Music, lvl2Music, lvl3Music;
let sfx_HitPly, sfx_HitBrick, sfx_breakBrick, sfx_LoseLife, sfx_WinLevel;

let out = 0, over = 1, down = 2;
let lives = 3, points = 0;

let txtLivesConfig = {
	font: "18px sans-serif",
	fill: "#f44141",
	align: "left"
};

let txtPointsConfig = {
	font: "18px sans-serif",
	fill: "#f44141",
	align: "right"	
};

let txtOverConfig = {
	font: "40px sans-serif",
	fill: "#f44141",
	align: "center"	
};