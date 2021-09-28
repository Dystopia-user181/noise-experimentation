let c, ctx, flat1D = true;

const Canvas = {
	load() {
		c = document.querySelector('#c');
		ctx = c.getContext('2d');
	},
	new() {
		clearInterval(Canvas.fieldAnim.intervalId);
		Canvas.fieldAnim.time = 0;
	},
	drawNoise() {
		Canvas.new();
		ctx.clearRect(0, 0, 1000, 1000);
		let noise1 = Noise(40, 20);
		for (let i = 0; i < 40; i++) {
			for (let j = 0; j < 20; j++) {
				let v = noise1[i][j]*255;
				ctx.fillStyle = `rgb(${v}, ${v}, ${v})`
				ctx.fillRect(i*25, j*25, 25, 25);
			}
		}
	},
	drawNoise1D() {
		Canvas.new();
		ctx.clearRect(0, 0, 1000, 1000);
		let noise1 = Noise(41, 1);
		for (let i = 0; i < 40; i++) {
			let v = noise1[i][0]*255;
			if (flat1D) {
				ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
				ctx.fillRect(i*25, 0, 25, 1000);
			} else {
				v *= 500/255;
				ctx.fillStyle = "#000";
				ctx.fillRect(i*25, v, 25, 500);
			}
		}
	},
	drawLight() {
		Canvas.new();
		ctx.clearRect(0, 0, 1000, 1000);
		let noise1 = Lerp(Noise(11, 6, 0.4), 100);
		let noise2 = Lerp(Noise(31, 16, 0.3), 34);
		let noise3 = Lerp(Noise(51, 26, 0.2), 20);
		let noise4 = Lerp(Noise(101, 51, 0.1), 10);
		let noise5 = Lerp(Noise(251, 126, 0.05), 4);
		for (let i = 0; i < 1000; i++) {
			for (let j = 0; j < 500; j++) {
				let v = (noise1[i][j] + noise2[i][j] + noise3[i][j] + noise4[i][j] + noise5[i][j])*255;
				ctx.fillStyle = `rgb(${v}, ${v}, ${v})`
				ctx.fillRect(i, j, 1, 1);
			}
		}
	},
	drawLines() {
		Canvas.new();
		ctx.clearRect(0, 0, 1000, 1000);
		let noise1 = Lerp(Noise(11, 11, 0.4), 100);
		let noise2 = Lerp(Noise(31, 31, 0.3), 34);
		let noise3 = Lerp(Noise(51, 51, 0.2), 20);
		for (let i = 0; i < 1000; i++) {
			for (let j = 0; j < 1000; j++) {
				let v = (Math.sin((noise1[i][j] + noise2[i][j] + noise3[i][j])*40)**4)*255;
				ctx.fillStyle = `rgb(${v}, ${v}, ${v})`
				ctx.fillRect(i, j, 1, 1);
			}
		}
	},
	drawRGB() {
		Canvas.new();
		ctx.clearRect(0, 0, 1000, 1000);
		let noiseR1 = Lerp(Noise(11, 11, 0.4), 100);
		let noiseR2 = Lerp(Noise(31, 31, 0.3), 34);
		let noiseR3 = Lerp(Noise(51, 51, 0.2), 20);
		let noiseR4 = Lerp(Noise(101, 101, 0.1), 10);
		let noiseR5 = Lerp(Noise(251, 251, 0.05), 4);

		let noiseG1 = Lerp(Noise(11, 11, 0.4), 100);
		let noiseG2 = Lerp(Noise(31, 31, 0.3), 34);
		let noiseG3 = Lerp(Noise(51, 51, 0.2), 20);
		let noiseG4 = Lerp(Noise(101, 101, 0.1), 10);
		let noiseG5 = Lerp(Noise(251, 251, 0.05), 4);

		let noiseB1 = Lerp(Noise(11, 11, 0.4), 100);
		let noiseB2 = Lerp(Noise(31, 31, 0.3), 34);
		let noiseB3 = Lerp(Noise(51, 51, 0.2), 20);
		let noiseB4 = Lerp(Noise(101, 101, 0.1), 10);
		let noiseB5 = Lerp(Noise(251, 251, 0.05), 4);
		for (let i = 0; i < 1000; i++) {
			for (let j = 0; j < 1000; j++) {
				let R = (noiseR1[i][j] + noiseR2[i][j] + noiseR3[i][j] + noiseR4[i][j] + noiseR5[i][j])*255;
				let G = (noiseG1[i][j] + noiseG2[i][j] + noiseG3[i][j] + noiseG4[i][j] + noiseG5[i][j])*255;
				let B = (noiseB1[i][j] + noiseB2[i][j] + noiseB3[i][j] + noiseB4[i][j] + noiseB5[i][j])*255;
				ctx.fillStyle = `rgb(${R}, ${G}, ${B})`
				ctx.fillRect(i, j, 1, 1);
			}
		}
	},
	drawMountain() {
		Canvas.new();
		ctx.fillStyle = "#fff"
		ctx.fillRect(0, 0, 1000, 1000);
		let noise1 = Lerp(Noise(11, 11, 0.4), 100);
		let noise2 = Lerp(Noise(21, 21, 0.3), 50);
		let noise3 = Lerp(Noise(41, 41, 0.2), 25);
		let noise4 = Lerp(Noise(101, 101, 0.1), 10);
		for (let i = 0; i < 1000; i++) {
			ctx.fillStyle = `rgba(${255 - i/4}, ${255 - i/4}, ${(255 - i/4)*1.2 + 10})`
			for (let j = 0; j < 1000; j++) {
				let v = (noise1[i][j] + noise2[i][j] + noise3[i][j] + noise4[i][j])*(200) + 300 - i/4;
				ctx.fillRect(j, 500 - v, 1, v);
			}
		}
	},
	drawArchipegalo(waterheight) {
		Canvas.new();
		ctx.fillStyle = "#fff"
		ctx.fillRect(0, 0, 1000, 1000);
		let noise1 = Lerp(Noise(6, 6, 0.4), 200);
		let noise2 = Lerp(Noise(11, 11, 0.3), 100);
		let noise3 = Lerp(Noise(41, 41, 0.2), 25);
		let noise4 = Lerp(Noise(70, 70, 0.1), 15);
		for (let i = 0; i < 1000; i++) {
			ctx.fillStyle = `rgba(${255 - i/4}, ${255 - i/4}, ${(255 - i/4)*1.2 + 10})`
			for (let j = 0; j < 1000; j++) {
				let v = (noise1[i][j] + noise2[i][j] + noise3[i][j] + noise4[i][j])*(200) + 220 - i/3;
				ctx.fillRect(j, 500 - v, 1, v);
			}
			ctx.fillStyle = `rgba(${255 - i/4}, ${Math.min(330 - i/4, 255)}, ${(400 - i/4)*1.2 + 10})`
			ctx.fillRect(0, waterheight + i/3, 1000, 500);
		}
	},
	drawField() {
		Canvas.new();
		ctx.fillStyle = "#000"
		ctx.fillRect(0, 0, 1000, 1000);

		ctx.lineWidth = 3;
		ctx.lineCap = "round";

		let noise1 = Lerp(Noise(3, 3, 0.8), 25);
		let noise2 = Lerp(Noise(5, 5, 0.5), 13);
		let noise3 = Lerp(Noise(11, 11, 0.3), 5);
		for (let i = 0; i < 50; i++) {
			for (let j = 0; j < 50; j++) {
				let n = noise1[i][j] + noise2[i][j] + noise3[i][j], v = n*Math.PI*2;
				ctx.strokeStyle = `hsl(${n*360}, ${Math.cos(v*4)*30 + 70}%, ${Math.cos(v*4)*20 + 50}%)`;

				ctx.beginPath();
				ctx.moveTo(i*20 - Math.cos(v)*10 + 10, j*20 - Math.sin(v)*10 + 10);
				ctx.lineTo(i*20 + Math.cos(v)*10 + 10, j*20 + Math.sin(v)*10 + 10);
				ctx.stroke();
			}
		}
	},
	fieldAnim: {
		lattice: [],
		time: 0,
		intervalId: 0,
		draw() {
			Canvas.new();
			ctx.fillStyle = "#000"
			ctx.fillRect(0, 0, 1000, 1000);

			ctx.lineWidth = 3;
			ctx.lineCap = "round";
			let noise1 = Lerp3D(Noise3D(3, 3, 6, 0.8), 25, 160);
			let noise2 = Lerp3D(Noise3D(5, 5, 17, 0.3), 13, 50);
			let noise3 = Lerp3D(Noise3D(11, 11, 26, 0.1), 5, 32);
			this.lattice = noise1.map((i, x) => i.map((j, y) => j.map((k, z) => k + noise2[x][y][z] + noise3[x][y][z])));
			this.intervalId = setInterval(this.drawFrame, 20);
		},
		drawFrame() {
			ctx.fillStyle = "#000"
			ctx.fillRect(0, 0, 1000, 1000);
			let time = Canvas.fieldAnim.time;

			for (let i = 0; i < 50; i++) {
				for (let j = 0; j < 50; j++) {
					let n = Canvas.fieldAnim.lattice[i][j][time],
						v = n*Math.PI*2;

					ctx.strokeStyle = `hsl(${n*360}, ${Math.cos(v*4)*30 + 70}%, ${Math.cos(v*4)*20 + 50}%)`;
					if (time < 50) ctx.strokeStyle += ('0' + Math.floor(Lerp1d(0, 255, time/50)).toString(16)).slice(-2);
					else if (time > 750) ctx.strokeStyle += ('0' + Math.floor(Lerp1d(255, 0, (time - 750)/50)).toString(16)).slice(-2);

					ctx.beginPath();
					ctx.moveTo(i*20 - Math.cos(v)*10 + 10, j*20 - Math.sin(v)*10 + 10);
					ctx.lineTo(i*20 + Math.cos(v)*10 + 10, j*20 + Math.sin(v)*10 + 10);
					ctx.stroke();
				}
			}

			Canvas.fieldAnim.time++;
			if (time > 800) Canvas.fieldAnim.time = 0;
		}
	},
	drawDS1D() {
		Canvas.new();
		ctx.fillStyle = "#fff"
		ctx.fillRect(0, 0, 1000, 1000);

		ctx.fillStyle = "#000";

		let noise1 = ds1D(10);
		for (let i = 0; i < 1000; i++) {
			let v = noise1[i]*500;
			ctx.fillRect(i, 500 - v, 1, v);
		}
	}
}