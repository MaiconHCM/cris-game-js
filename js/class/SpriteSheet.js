class SpriteSheet {
	constructor(img) {
		//Atributos ****************
		this.mvLeft = this.mvUp = this.mvRight = this.mvDown = false;

		//Origem para captura da imagem a ser exibida
		this.srcX = this.srcY = 0;
		//Posição no canvas onde a figura será exibida
		this.posX = this.posY = 0;
		this.width = 32;
		this.height = 32;
		this.speed = 1;
		this.sprites = {};
		this.img = new Image();
		this.spriteGroup = "right";
		this.countAnim = 0;


		//Métodos *****************
		//Desenha a figura
		this.draw = function (ctx) {
			ctx.drawImage(this.img,	//Imagem de origem
				//Captura da imagem
				this.srcX,	//Origem da captura no eixo X
				this.srcY,	//Origem da captura no eixo Y
				this.width,	//Largura da imagem que será capturada
				this.height,//Altura da imagem que será capturada
				//Exibição da imagem
				this.posX,	//Posição no eixo X onde a imagem será exibida 
				this.posY,	//Posição no eixo Y onde a imagem será exibida 
				this.width,	//Largura da imagem a ser exibida 
				this.height	//Altura da imagem a ser exibida 
			);
			this.animation();
		}
	}
	addSprite(array) {
		//Sprite=[{src,order,delay,group}]
		for (let index = 0; index < array.length; index++) {
			const obj = array[index];
			if (!this.sprites[obj.group]) {
				let a = { 'sprites': [], 'count': 0 };
				this.sprites[obj.group] = a;
			}
			this.sprites[obj.group]['sprites'].push(new Sprite(obj));

			let count = 0;
			for (let index = 0; index < this.sprites[obj.group]['sprites'].length; index++) {
				count += this.sprites[obj.group]['sprites'][index].delay;
				this.sprites[obj.group]['sprites'][index].time = count;
			}
			this.sprites[obj.group]['count'] = count;
		}

	}
	//Move a figura
	move() {
		if (this.mvRight) {
			this.posX += this.speed;
			this.spriteGroup = 'right';
		} else if (this.mvLeft) {
			this.posX -= this.speed;
			this.spriteGroup = 'left';
		} else if (this.mvUp) {
			this.posY -= this.speed;
			this.spriteGroup = 'up';
		} else if (this.mvDown) {
			this.posY += this.speed;
			this.spriteGroup = 'down';
		}
	}

	//Anima a figura
	animation() {
		if (this.mvLeft || this.mvUp || this.mvRight || this.mvDown) {
			//Caso qualquer seta seja pressionada, o contador de animação é incrementado
			this.countAnim++;
			if (this.countAnim >= this.sprites[this.spriteGroup].count) {
				this.countAnim = 0;
			}

			let turn=0;
			for (let index = 0; index < this.sprites[this.spriteGroup]['sprites'].length; index++) {
				turn=index;
				if (this.sprites[this.spriteGroup]['sprites'][index].time > this.countAnim) {
					break;
				}
			}
			this.img = this.sprites[this.spriteGroup]['sprites'][turn].img;
		} else {
			this.countAnim = 0;
		}
	}
}
