'use strict';

function Player(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.lives = lives;
    this.size = 50;
    this.x = 0;
    this.y = canvas.height-this.size;
    this.direction = 0;
    this.speed = 5;
  }
  
  Player.prototype.setDirection = function(direction) {
    // +1 right  -1 left
    if (direction === 'right'){ this.direction = 1;}
    else if (direction === 'left'){ this.direction = -1;}
  };
  
  Player.prototype.didCollide = function(enemy) {
    var playerLeft = this.x;
    var playerRight = this.x + this.size;
    var playerTop = this.y;
    var playerBottom = this.y + this.size;
  
    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + enemy.size;
    var enemyTop = enemy.y;
    var enemyBottom = enemy.y + enemy.size;
  
    var crossRight = enemyLeft <= playerRight && enemyLeft >= playerLeft;
    var crossLeft = enemyRight >= playerLeft && enemyRight <= playerRight;
    var crossTop = enemyBottom >= playerTop && enemyBottom <= playerBottom;
    var crossBottom = enemyTop <= playerBottom && enemyTop >= playerTop;
  
    if ((crossRight || crossLeft) && (crossBottom || crossTop)) {
      return true;
    }
    return false;
  };

  
  
  Player.prototype.handleScreenCollision = function() {
    this.x = this.x + this.direction * this.speed;
    var screenRight = this.canvas.width-this.size;
    var screenLeft = 0;
  
    if (this.x < screenLeft) this.direction = 1;
    else if (this.x > screenRight) this.direction = -1;
  };
  
  Player.prototype.removeLife = function() {
    this.lives -= 1;
  };
  
  Player.prototype.draw = function() {
    this.ctx.fillStyle = '#66D3FA';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  };
  