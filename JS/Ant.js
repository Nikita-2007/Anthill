//Симулятор муравейника

class Ant {
    constructor(ctx) {
        this.ctx = ctx;
    }
    draw() {
        this.ctx.lineWidht = 5;
        this.ctx.strokeStyle="red";

        this.ctx.beginPath();
        this.ctx.moveTo(100, 100);
        this.ctx.lineTo(100, 150);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(120, 100);
        this.ctx.lineTo(130, 150);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(80, 100);
        this.ctx.lineTo(125, 150);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(100, 70);
        this.ctx.lineTo(100, 50);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(1000, 70);
        this.ctx.lineTo(2000, 200);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(1000, 70);
        this.ctx.lineTo(2000, 200);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(125, 100, 15, 0, 2*Math.PI);
        this.ctx.fill()
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(100, 100, 15, 0, 2*Math.PI);
        this.ctx.fill()
        this.ctx.stroke();
        this.ctx.closePath();
    }
}