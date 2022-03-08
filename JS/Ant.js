//Симулятор муравейника

class Ant {
    constructor(ctx) {
        this.ctx = ctx;
    }
    draw() {
        this.ctx.lineWidht = 5;
        this.ctx.strokeStyle='rgb(64, 32, 16)';
        this.ctx.fillStyle = 'Sienna'

        this.ctx.beginPath();

        //Ноги левые
        this.ctx.moveTo(125, 100);
        this.ctx.lineTo(100, 130);
        this.ctx.moveTo(100, 130);
        this.ctx.lineTo(80, 140);

        this.ctx.moveTo(128, 100);
        this.ctx.lineTo(128, 130);
        this.ctx.moveTo(128, 130);
        this.ctx.lineTo(125, 150);


        this.ctx.moveTo(132, 100);
        this.ctx.lineTo(155, 130);
        this.ctx.moveTo(155, 130);
        this.ctx.lineTo(175, 140);

        //Ноги правые
        this.ctx.moveTo(125, 100);
        this.ctx.lineTo(100, 70);
        this.ctx.moveTo(100, 70);
        this.ctx.lineTo(80, 60);

        this.ctx.moveTo(128, 100);
        this.ctx.lineTo(128, 70);
        this.ctx.moveTo(128, 70);
        this.ctx.lineTo(125, 50);


        this.ctx.moveTo(132, 100);
        this.ctx.lineTo(155, 70);
        this.ctx.moveTo(155, 70);
        this.ctx.lineTo(175, 60);

        //Усики
        this.ctx.moveTo(95, 95);
        this.ctx.lineTo(70, 85);

        this.ctx.moveTo(95, 105);
        this.ctx.lineTo(70, 115);


        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        //Телo
        this.ctx.beginPath();
        this.ctx.ellipse(100, 100, 10, 10, 0, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.ellipse(128, 100, 18, 10, 0, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.ellipse(165, 100, 20, 15, 0, 0, Math.PI*2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }
}