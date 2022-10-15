window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener("keydown", (e) => {
        this.game.lastKey = "P" + e.key;
      });

      window.addEventListener("keyup", (e) => {
        this.game.lastKey = "R" + e.key;
      });
    }
  }

  class Owlbear {
    constructor(game) {
      this.game = game;
      this.width = 100;
      this.height = 100;
      this.x = 200;
      this.y = 200;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 10;
    }

    draw(context) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }

    setSpeed(speedX, speedY) {
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update() {
      if (this.game.lastKey == "PArrowLeft") {
        this.setSpeed(-this.maxSpeed, 0);
      } else if (this.game.lastKey == "PArrowRight") {
        this.setSpeed(this.maxSpeed, 0);
      } else if (this.game.lastKey == "PArrowUp") {
        this.setSpeed(0, -this.maxSpeed, 0);
      } else if (this.game.lastKey == "PArrowDown") {
        this.setSpeed(0, this.maxSpeed, 0);
      } else {
        this.setSpeed(0, 0);
      }
      this.x += this.speedX;
      this.y += this.speedY;

      // horizontal boundaries
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.game.width - this.width) {
        this.x = this.game.width - this.width;
      }

      // vertical bounderies
      if (this.y < this.game.topMargin) {
        this.y = this.game.topMargin;
      } else if (this.y > this.game.height - this.height) {
        this.y = this.game.height - this.height;
      }
    }
  }

  class Object {}

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.topMargin = 200;
      this.lastKey = undefined;
      this.input = new InputHandler(this);
      this.owlbear = new Owlbear(this);
    }
    render(context) {
      this.owlbear.draw(context);
      this.owlbear.update();
    }
  }

  const game = new Game(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
