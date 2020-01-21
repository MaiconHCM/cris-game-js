window.onload = function () {
	//Constantes que armazenam o código de cada seta do teclado
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");
	var zezim = new SpriteSheet();
	zezim.addSprite([
		{
			src:"img/1.png",
			order:0,
			delay:10,
			group:"right"
		},
		{
			src:"img/2.png",
			order:0,
			delay:10,
			group:"right"
		},
		{
			src:"img/3.png",
			order:0,
			delay:150,
			group:"right"
		},
	])
	var scene = new Image();
	scene.src = "img/scene.png";
	window.addEventListener("keydown", keydownHandler, false);
	window.addEventListener("keyup", keyupHandler, false);

	function keydownHandler(e) {
		switch (e.keyCode) {
			case RIGHT:
				zezim.mvRight = true;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = false;
				break;
			case LEFT:
				zezim.mvRight = false;
				zezim.mvLeft = true;
				zezim.mvUp = false;
				zezim.mvDown = false;
				break;
			case UP:
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = true;
				zezim.mvDown = false;
				break;
			case DOWN:
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = true;
				break;
		}
	}

	function keyupHandler(e) {
		switch (e.keyCode) {
			case RIGHT:
				zezim.mvRight = false;
				break;
			case LEFT:
				zezim.mvLeft = false;
				break;
			case UP:
				zezim.mvUp = false;
				break;
			case DOWN:
				zezim.mvDown = false;
				break;
		}
	}

	//Inicio
	init();
	zezim.posX = zezim.posY = 150;


	function init() {
		loop();
	}

	function update() {
		zezim.move();
	}

	function draw() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		ctx.drawImage(scene, 0, 0, scene.width, scene.height, 0, 0, scene.width, scene.height);
		zezim.draw(ctx);
	}

	function loop() {
		window, requestAnimationFrame(loop, cnv);
		update();
		draw();
	}
}
