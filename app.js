const coin = document.querySelector("#coin");
const player = document.querySelector("#player");
const avatar = document.querySelector("#avatar");
const redCoin = document.querySelector("#redCoin");

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
let score = document.querySelector("#score");
score.innerText = 0;
window.addEventListener("keydown", function (e) {
	let vertical = 0;
	let horizontal = 0;
	if (e.key === "ArrowDown" || e.key === "s") {
		vertical += 50;
	}
	else if (e.key === "ArrowUp" || e.key === "w") {
		vertical -= 50;
	}
	else if (e.key === "ArrowLeft" || e.key === "a") {
		horizontal -= 50;
	}
	else if (e.key === "ArrowRight" || e.key === "d") {
		horizontal += 50;
	}
	move(vertical, horizontal);
	if (isTouching(coin, avatar)) {
		moveCoin(coin);
		score.innerText++;
		displayRedCoin();
	}
	if (isTouching(redCoin, avatar)) {
		moveCoin(redCoin);
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

const move = (el, am) => {
	const ver = getPos(player.style.top);
	const hor = getPos(player.style.left);
	player.style.top = `${ver + el}px`;
	player.style.left = `${hor + am}px`;
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
	const height = Math.floor(Math.random() * window.innerHeight);
	const width = Math.floor(Math.random() * window.innerWidth);
	// const coin = document.querySelector("#coin");
	item.style.top = `${height}px`;
	item.style.left = `${width}px`;
}