fillVal = 126;
let timer = 40
let score_timer = timer
let x = 110
let y = 100
let score = 0
let timeLastUpdated = Date.now()
let timetemp = 0
let words = ['up', 'down', 'left', 'right'];
let directions = [1, 2, 3, 4];
let word = words[0];
let direction = directions[0];
// let scores = ['18/20', '19/20', '17/20'];
// let score = scores[0];
const TIME_BETWEEN = 2000;

function setup() {
  createCanvas(1200, 1200);
  
  frameRate(0.5);
}

function draw() {
  
  if(timer > 0)
  {
  background(color(198, 221, 240));
    textFont('Helvetica');
  textSize(30);
  text(timer, 50, 40);
  strokeWeight(4);
stroke('#222222');
  rectMode(CENTER);
  rect(100*4,100*4,100*4,100*4);
  strokeWeight(0);
stroke(51);
  if(timer%2 == 0){
    word = random(words);
    direction = random(directions);
  }    
   
  if (direction == 1) {
    //right
    if (keyCode === RIGHT_ARROW) {
    score++;
      // background(color(178, 230, 212));
    }
      x = 470;
    y = 400;
  }
  if (direction == 2) {
    //left
    if (keyCode === LEFT_ARROW) {
    score++;
      // background(color(178, 230, 212));
    }
      x = 220;
    y = 400;
  }
  if (direction == 3) {
    //up
     if (keyCode === UP_ARROW) {
    score++;
      // background(color(178, 230, 212));
    }
    x = 340;
    y = 260;
  }
  if (direction == 4) {
    //down
     if (keyCode === DOWN_ARROW) {
    score++;
      // background(color(178, 230, 212));
    }
      x = 340;
    y = 560;
  }
  textSize(50);
  text(word, x, y);
}
if (timer == 0) {
  textFont('Helvetica');
  stroke(0);
  textSize(30);
  if (score < score_timer/2)
    text("You can do better than that!\nYour score is:", 300, 680);
  else {
    if (score > score_timer/2)
      score = score_timer/2;
      text("Great job!\nYour score is:", 300, 680);
  }
    text(score, 480, 718);
    text("/", 515, 718)
    text(score_timer/2, 525, 718);
   
  }
if (timer > 0) {
    timer--;
}
if(timer == 0){
    score = score;  
  }
}