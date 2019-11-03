'use strict';

function Food(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 10;
    this.y = 0;
    this.x = x;
    this.speed = speed;
  }
  
  Food.prototype.draw = function() {
    this.ctx.fillStyle = '#77557';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  };
  
  Food.prototype.updatePosition = function() {
    this.y = this.y + this.speed;
  };
  
  Food.prototype.isInsideScreen = function() {
    // if y plus half of its size is smaller then 0 return
    return this.y + this.size / 2 > 0;
  };