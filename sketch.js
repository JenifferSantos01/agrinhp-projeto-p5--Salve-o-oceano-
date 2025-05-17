let turtle;
let jellyfishes = [];
let plastics = [];
let score = 0;
let gameOver = false;
let turtleImg;

function preload() {
  // Carregue sua imagem da tartaruga aqui
  turtleImg = loadImage('foto1.png'); // Certifique-se que o nome do arquivo esteja certo
}

function setup() {
  createCanvas(600, 400);
  turtle = new Turtle();

  for (let i = 0; i < 5; i++) {
    jellyfishes.push(new Jellyfish());
  }

  for (let i = 0; i < 3; i++) {
    plastics.push(new PlasticBag());
  }
}

function draw() {
  background(0, 100, 200); // azul oceano

  if (gameOver) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("☠️ Poluição matou a tartaruga\nPontuação: " + score, width / 2, height / 2 - 30);
    textSize(16);
    text("Evite jogar plástico no oceano!\nPressione R para recomeçar", width / 2, height / 2 + 40);
    noLoop();
    return;
  }

  turtle.update();
  turtle.display();

  // Águas-vivas
  for (let i = jellyfishes.length - 1; i >= 0; i--) {
    jellyfishes[i].move();
    jellyfishes[i].display();

    if (turtle.collects(jellyfishes[i])) {
      score++;
      jellyfishes.splice(i, 1);
      jellyfishes.push(new Jellyfish());
    }
  }

  // Sacolas plásticas
  for (let plastic of plastics) {
    plastic.move();
    plastic.display();

    if (turtle.hits(plastic)) {
      gameOver = true;
    }
  }

  // Pontuação
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("🌊 Pontos: " + score, 10, 20);
}

function keyPressed() {
  if (key === 'R' || key === 'r') {
    restartGame();
  }
}

function restartGame() {
  score = 0;
  gameOver = false;
  jellyfishes = [];
  plastics = [];

  for (let i = 0; i < 5; i++) {
    jellyfishes.push(new Jellyfish());
  }

  for (let i = 0; i < 3; i++) {
    plastics.push(new PlasticBag());
  }

  loop();
}

// ===== CLASSES =====

class Turtle {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.size = 80; // Tamanho aumentado
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  display() {
    image(turtleImg, this.x, this.y, this.size, this.size);
  }

  collects(jellyfish) {
    return dist(this.x, this.y, jellyfish.x, jellyfish.y) < this.size / 2;
  }

  hits(plastic) {
    return dist(this.x, this.y, plastic.x, plastic.y) < this.size / 2;
  }
}

class Jellyfish {
  constructor() {
    this.x = random(width);
    this.y = random(-200, -20);
    this.size = 25;
    this.speed = random(1, 3);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, -20);
      this.x = random(width);
    }
  }

  display() {
    fill(255, 100, 200);
    ellipse(this.x, this.y, this.size, this.size);
    stroke(255, 100, 200);
    for (let i = 0; i < 5; i++) {
      line(this.x - 5 + i * 2, this.y + 10, this.x - 5 + i * 2, this.y + 20);
    }
    noStroke();
  }
}

class PlasticBag {
  constructor() {
    this.x = random(width);
    this.y = random(-300, -50);
    this.size = 30;
    this.speed = random(1.5, 3);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, -50);
      this.x = random(width);
    }
  }

  display() {
    fill(200, 200, 255, 150);
    rect(this.x, this.y, this.size, this.size - 10, 5);
    fill(180, 180, 255, 150);
    ellipse(this.x, this.y, 10, 10);
    ellipse(this.x + this.size, this.y, 10, 10);
  }
}
