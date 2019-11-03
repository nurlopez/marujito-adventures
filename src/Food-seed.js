'use strict';

function Food(canvas, y, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.radius = 10;
    this.centerX = canvas.width / 2;
    this.centerY = y;
    this.speed = speed;
}

Food.prototype.draw = function () {
    this.ctx.fillStyle = '#A6CFD5';
    // fillRect(x, y, width, height)
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
};

Food.prototype.updatePosition = function () {
    this.x = this.x - this.speed;
};

Food.prototype.isInsideScreen = function () {
    // if y plus half of its size is smaller then 0 return
    return this.y + this.radius > 0;
};