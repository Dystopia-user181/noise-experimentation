function randomNoiseBit() {
	return Math.random();
	s += v;
	return (s%d)/d
}
let d = 7919;
let v = 1299709;
let s = 0;

function Noise(x, y, scalar=1) {
	let map = [];
	for (let i = 0; i < x; i++) {
		map.push([]);
		for (let j = 0; j < y; j++) {
			map[i][j] = randomNoiseBit()*scalar;
		}
	}
	return map;
}
function Noise3D(x, y, z, scalar=1) {
	let map = [];
	for (let i = 0; i < x; i++) {
		map.push([]);
		for (let j = 0; j < y; j++) {
			map[i].push([]);
			for (let k = 0; k < z; k++) map[i][j][k] = randomNoiseBit()*scalar;
		}
	}
	return map;
}

function Lerp1d(px, py, pp) {
	if (pp == 0) return px;
	if (pp == 1) return py;
	let f = 0.5 - Math.cos(pp*Math.PI)*0.5;
	return px*(1 - f) + py*f;
}
function Lerp(noise, interval) {
	let map = [];
	let w = noise.length*interval - interval;
	let h = noise[0].length*interval - interval;

	let c = 1/interval;
	for (let i = 0; i < w; i++) {
		map.push([]);
		let lerpPosX = i%interval, tilePosX = (i - lerpPosX)/interval;
		for (let j = 0; j < h; j++) {
			let lerpPosY = j%interval, tilePosY = (j - lerpPosY)/interval;

			let leftValue = Lerp1d(noise[tilePosX][tilePosY], noise[tilePosX][tilePosY + 1], lerpPosY*c);
			let rightValue = Lerp1d(noise[tilePosX + 1][tilePosY], noise[tilePosX + 1][tilePosY + 1], lerpPosY*c);
			map[i][j] = Lerp1d(leftValue, rightValue, lerpPosX*c);
		}
	}

	return map;
}
function Lerp3D(noise, interval, intervalZ) {
	if (intervalZ == undefined) intervalZ = interval;
	let map = [];
	let w = noise.length*interval - interval;
	let h = noise[0].length*interval - interval;
	let l = noise[0][0].length*intervalZ - intervalZ;

	let c = 1/interval,
	cZ = 1/intervalZ;
	for (let i = 0; i < w; i++) {
		map.push([]);
		let lerpPosX = i%interval, tPosX = (i - lerpPosX)/interval;
		for (let j = 0; j < h; j++) {
			map[i].push([]);
			let lerpPosY = j%interval, tPosY = (j - lerpPosY)/interval;
			for (let k = 0; k < l; k++) {
				let lerpPosZ = k%intervalZ, tPosZ = (k - lerpPosZ)/intervalZ;

				let leftValueNorth = Lerp1d(noise[tPosX][tPosY][tPosZ], noise[tPosX][tPosY][tPosZ + 1], lerpPosZ*cZ),
					rightValueNorth = Lerp1d(noise[tPosX + 1][tPosY][tPosZ], noise[tPosX + 1][tPosY][tPosZ + 1], lerpPosZ*cZ);
				let leftValueSouth = Lerp1d(noise[tPosX][tPosY + 1][tPosZ], noise[tPosX][tPosY + 1][tPosZ + 1], lerpPosZ*cZ),
					rightValueSouth = Lerp1d(noise[tPosX + 1][tPosY + 1][tPosZ], noise[tPosX + 1][tPosY + 1][tPosZ + 1], lerpPosZ*cZ);

				let northValue = Lerp1d(leftValueNorth, rightValueNorth, lerpPosX*c);
				let southValue = Lerp1d(leftValueSouth, rightValueSouth, lerpPosX*c);
				map[i][j][k] = Lerp1d(northValue, southValue, lerpPosY*c);
			}
		}
	}

	return map;
}

function ds1D(n, s=randomNoiseBit(), e=randomNoiseBit()) {
	let arr = new Array(2**n + 1),
	i = 2**n;

	arr[0] = s; arr[i] = e;

	for (let j = 0; j < n; j++) {
		for (let k = 0; k < 2**j; k++) {
			let valN = (arr[k*2**(n - j)]*2 + arr[(k + 1)*2**(n - j)]);
			arr[2**(n - j - 1) + k*2**(n - j)] = valN/3;
		}
	}

	return arr;
}