// Game Functions
const GRASS_COUNT = 50;
const BALL_COUNT = 15;
const GRASS_CLASS = "grass";
const BALL_CLASS = "pokeball";
const player = document.querySelector(".player");
const PLAYER_SPEED = 1.8;
const SOUND = new Audio("assets/coin.mp3");
let score = document.querySelector("h1 > span");

const START_PLAYER_POS = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  
}
let playerPos = {
  x: 0,
  y:0,
}
let playerVel = {
  x: 0,
  y:0,
}
function start() {
  generateRandomElements(GRASS_CLASS,GRASS_COUNT);
  generateRandomElements(BALL_CLASS, BALL_COUNT);
  playerPos = START_PLAYER_POS;
}
function update() {
  playerPos.x += playerVel.x;
  playerPos.y += playerVel.y;
  player.style.left = playerPos.x + "px";
  player.style.top = playerPos.y + "px";
  checkCollisions();
  requestAnimationFrame(update);
}
function checkCollisions() {
  balls = document.querySelectorAll(".pokeball");
  balls.forEach(ball => {
    if (collision(ball, player)) {
      score.textContent= Number(score.textContent) + 1;
    ball.style.left = Math.random() * 100 + "%";
      ball.style.top = Math.random() * 100 + "%";
      SOUND.play();
    }  
  });
}
// Check Collision between 2   divs 
function collision(div1, div2) {
  let rect1 = div1.getBoundingClientRect();
  let rect2 = div2.getBoundingClientRect();

  return !(
    rect1.bottom < rect2.top || 
    rect1.top > rect2.bottom || 
    rect1.right < rect2.left || 
    rect1.left > rect2.right
  );
}

// Handle movment
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    playerVel.y = -1 * PLAYER_SPEED;
    player.style.backgroundImage="url('assets/player_front.png')";

  }
  if (e.key == "ArrowDown") {
    playerVel.y = 1 * PLAYER_SPEED;
        player.style.backgroundImage="url('assets/player_back.png')";

  }
  if (e.key == "ArrowRight") {
    playerVel.x = 1 * PLAYER_SPEED;
        player.style.backgroundImage="url('assets/player_right.png')";

  }
  if (e.key == "ArrowLeft") {
    playerVel.x = -1 * PLAYER_SPEED;
    player.style.backgroundImage = "url('assets/player_left.png')";
    

  }
  player.classList.add("player-walk");
});
window.addEventListener("keyup", (e) => {
  playerVel.x = 0;
  playerVel.y = 0;
    player.classList.remove("player-walk");

})

function generateRandomElements(className,elementsCount) {
  for (let count = 0; count < elementsCount; ++count){
    const newElement = document.createElement("div");
    newElement.classList.add(className);
    newElement.style.left = Math.random() * 100 + "%";
    newElement.style.top = Math.random() * 100 + "%";
    document.body.appendChild(newElement)
      ;  }
}

start();
update();