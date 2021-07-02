const coin = document.querySelector("#coin");
const player = document.querySelector("#player");
const avatar = document.querySelector("#avatar");
const redCoin = document.querySelector("#redCoin");
const images = document.querySelector("img");

let isPoisoned = false;

redCoin.style.display = "none";

function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}
player.style.top = "100px";
player.style.left = "100px";
images.style.width = "50px";
player.style.width = "50px";

let score = document.querySelector("#score");
let shrink = document.querySelector("#shrink");

shrink.innerText = 5;
score.innerText = 0;
window.addEventListener("keypress", function (e) {
	let vertical = 0;
	let horizontal = 0;
	if (e.key === "ArrowDown" || e.key === "s") {
		if(isPoisoned)
		vertical -=50;
		else
		vertical += 50;
	}
	else if (e.key === "ArrowUp" || e.key === "w") {
		if(isPoisoned)
		vertical += 50;
		else
		vertical -= 50;
	}
	else if (e.key === "ArrowLeft" || e.key === "a") {
		if(isPoisoned)
		horizontal += 50;
		else
		horizontal -= 50;
	}
	else if (e.key === "ArrowRight" || e.key === "d") {
		if(isPoisoned)
		horizontal -= 50;
		else
		horizontal += 50;
	}
	else if (e.key === "5") {
		if (images.style.width == "50px") {
			if (shrink.innerText > 0) {
				images.style.width = "10px";
				window.setTimeout(() => images.style.width = "50px", 7000);
				shrink.innerText--;
			}
		}
	}
	move(vertical, horizontal);
	if (isTouching(coin, avatar)) {
		moveCoin(coin);
		score.innerText++;
		displayRedCoin();
		const randomNumber = Math.floor(Math.random() * 10) + 1;
		if(randomNumber < 2.3){
			poisonCoin();
		}
	}
	if (isTouching(redCoin, avatar)) {
		// moveCoin(redCoin);
		moveCoin(coin);
		redCoin.style.display = "none";
		displayRedCoin();
		score.innerText -= 5;
	}
});

const displayRedCoin = () => {
	redCoin.style.display = "none";
	const randomNumber = Math.floor(Math.random() * 10) + 1;
	console.log(randomNumber);
	if (randomNumber < 4) {
		redCoin.style.display = "block";
	}
}

//A7ot red coin lw etakhdet in 5 seconds tena2as points (done)
//Akhaly el coin leha chance 23% enaha teb2a poisonus (almost done)
//Akhaly enemies tegry warak or add traps (lesa)

const move = (el, am) => {
	const ver = getPos(player.style.top);
	const hor = getPos(player.style.left);
	if (ver + el > window.innerHeight - 100 || ver + el < -100) {
		el = 0;
	}
	else if (hor + am > window.innerWidth - 100 || hor + am < -100) {
		am = 0;
	}

	player.style.top = `${ver + el}px`;
	player.style.left = `${hor + am}px`;
	console.log(window.innerHeight);
	console.log(player.style.top);
	if (am < 0)
		avatar.style.transform = "scaleX(-1)";
	else if (am > 0)
		avatar.style.transform = "scaleX(1)";
}

const getPos = (item) => {
	return parseInt(item.slice(0, -2));
}

const moveCoin = (item) => {
	const height = Math.abs(Math.floor(Math.random() * window.innerHeight - 300));
	const width = Math.abs(Math.floor(Math.random() * window.innerWidth - 300));
	// const coin = document.querySelector("#coin");
	item.style.top = `${height}px`;
	item.style.left = `${width}px`;
}

const poisonCoin = () => {
	isPoisoned = true;
	setTimeout(() => isPoisoned = false, 10000);
}