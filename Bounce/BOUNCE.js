var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
const gravityStrength =  0.1;
const maximumVel = 6
var cursorX = 0;
var cursorY = 0;

canvas.addEventListener('mousemove', e=> {
  cursorX = e.offsetX;
  cursorY = e.offsetY;
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Shape {
  //show
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  //polymorphism the act of preventing stupid programmers from being stupid!!!!!!!!!!!!!!!!!!!!!!!!!! and also stop reading my code plz get help
  drawer() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill();
  }
  move() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = this.velX * -1;
    }
    if (this.y + this.size >= height) {
      this.velY = this.velY * -1
    }
    if (this.y - this.size <= 0) {
      this.velY = this.velY * -1
    }
  
    this.x += this.velX;
    this.y += this.velY;
    this.velY += gravityStrength
  }

  collide() {
    for (var j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        var dy = Math.abs((balls[j].y) - (this.y))
        var dx = Math.abs((balls[j].x) - (this.x))
        var distance = Math.sqrt((dy * dy) + (dx * dx));
        if (distance < balls[j].size + this.size) {
          var tempX = balls[j].velX;
          var tempY = balls[j].velY;
          balls[j].velX += 0.25 * this.velX
          balls[j].velY += 0.25 * this.velY
          this.velX = -(this.velX);
          this.velY = -(this.velY);
          this.velX += 0.25 * balls[j].velX;
          this.velY += 0.25 * balls[j].velY;
          while (distance < balls[j].size + this.size) {
            dy = Math.abs((balls[j].y) - (this.y))
            dx = Math.abs((balls[j].x) - (this.x))
            distance = Math.sqrt((dy * dy) + (dx * dx));
            this.x += this.velX;
            this.y += this.velY
          }
        }
        var cursordy = Math.abs((cursorY) - (this.y))
        var cursordx = Math.abs((cursorX) - (this.x))
        var cursorDistance = Math.sqrt((cursordx*cursordx) + (cursordy * cursordy));
        if(cursorDistance <= this.size){
          this.velX = -(this.velX)
          this.velY = -(this.velY)
        }
        }
    }
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, colour, size) {
    super(x, y, velX, velY, colour, size)
  }
}
class Square extends Shape {
  constructor(x, y, velX, velY, colour, size) {
    super(x, y, velX, velY, colour, size * 2)
  }
  drawer() {
    ctx.beginPath()
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

var balls = [];
var squares = [];
const size = 20;
const ballNum = 5;
while (balls.length < ballNum) {
  var ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5),
    random(-5, 5),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size
  );
  var square = new Square(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5),
    random(-5, 5),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size
  )
  balls.push(ball);
  balls.push(square);
}

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for (var i = 0; i < balls.length; i++) {
    balls[i].drawer()
    balls[i].move()
    balls[i].collide()
  }

  requestAnimationFrame(loop);
}

loop();

//pain
