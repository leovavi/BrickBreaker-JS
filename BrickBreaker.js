window.onload = function(){
	let canvas = document.getElementById("GameCanvas");
	let ctx = canvas.getContext("2d");
	let cnvWth = canvas.width;
	let cnvHt = canvas.height;
	let dx = 2, dy = -2, lifes = 3;
	let key = [];
	fill(cnvWth, ctx);


	run(cnvHt, cnvWth, ctx, dx, dy);	
}

function run(cnvHt, cnvWth, ctx, dx, dy){
	setInterval(drawBall(cnvHt, cnvWth, ctx), 10);
	setInterval(drawPong(cnvHt, cnvWth, ctx, dx, dy), 10);
}

function fill(cnvWth, ctx){
	let ht = 25, wth = 60, x = 10, y = 10;

	for (let i = 1; i <= 8; i++) {
		for(let j = 0; j<cnvWth; j++){
			ctx.beginPath();
			ctx.fillStyle = randColor();
			ctx.rect(j*x+j*wth+x, i*y+i*ht, wth, ht);
			ctx.fill();
			ctx.closePath();
		}
	}
}

function randColor(){
	let color = ["#FF0000", "#2E2EFE", "#D7DF01", "#2E2E2E"];
	let rand = color[Math.floor(Math.random()*4)];

	return rand;
}

function drawBall(ht, wth, ctx){
	let x = wth/2, y = ht-30; 
	ctx.beginPath();
	ctx.fillStyle = "#0101DF";

	ctx.arc(x, y, 10, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
}

function drawPong(ht, wth, ctx, dx, dy){
	let pongWth = 60, pongHt = 10;
	let x = (wth-pongWth)/2, y = ht-pongHt-10;

	ctx.beginPath();
	ctx.fillStyle = "#8A0829";
	x += dx;
	y -= dy;
	ctx.rect(x, y, pongWth, pongHt);
	ctx.fill();
	ctx.closePath();
}