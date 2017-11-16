window.onload = function(){
	let canvas = document.getElementById("GameCanvas");
	let ctx = canvas.getContext("2d");
	let cnvWth = canvas.width;

	/*ctx.beginPath();
	ctx.rect(20, 40, 60, 25);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();*/

	fill(cnvWth, ctx);
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