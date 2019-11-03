"use strict";

function Game() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.food = [];
    this.player = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
}


Game.prototype.start = function () {

    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = this.gameScreen.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');


    this.livesElement = this.gameScreen.querySelector('.lives .value');
    this.scoreElement = this.gameScreen.querySelector('.score .value');


    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);

    this.player = new Player(this.canvas, 1);


    this.handleKeyDown = function (event) {
        if (this.ready) {
            if (event.key === 'ArrowLeft') {
            // move left
            }  if (event.key === 'ArrowRight'); { 
            // move right
            }  if (event.key === 'ArrowDown') {
            //;
        }
        }
    };

    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));


    this.startLoop();
};

Game.prototype.startLoop = function () {
    var loop = function () {

        if (Math.random() > 0.98) {
            var randomY = this.canvas.height * Math.random();
            this.enemies.push(new Enemy(this.canvas, randomY, 5));
        }


        this.checkCollisions();

        this.player.handleScreenCollision();


        this.enemies = this.enemies.filter(function (enemy) {
            enemy.updatePosition();
            return enemy.isInsideScreen();
        });


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.player.draw();


        this.enemies.forEach(function (item) {
            item.draw();
        });

        if (!this.gameIsOver) {
            window.requestAnimationFrame(loop);
        }


        this.updateGameStats();
    }.bind(this);


    window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function () {
    this.enemies.forEach(function (enemy) {
        if (this.player.didCollide(enemy)) {
            this.player.removeLife();

            enemy.x = 0 - enemy.size;

            if (this.player.lives === 0) {
                this.gameOver();
            }
        }
    }, this);
};

Game.prototype.passGameOverCallback = function (callback) {
    this.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {

    this.gameIsOver = true;


    this.onGameOverCallback();
};

Game.prototype.removeGameScreen = function () {
    this.gameScreen.remove();
};

Game.prototype.updateGameStats = function () {
    this.score += 1;
    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
};