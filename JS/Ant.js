//Симулятор муравейника

class Ant {
    constructor() {
        this.pose = false;
        this.size = 1;
    }

    draw(x, y, ang, col) {
        
        //Данные для расчёта
        let ctx = view.ctx;
        this.pose = !this.pose;
        let size5 = this.size;
        let size10 = this.size*2;
        let size15 = this.size*3;
        let size18 = this.size*3.6;
        let size20 = this.size*4;
        let size25 = this.size*5.6;
        let size28 = this.size*5.6;
        let size30 = this.size*6;
        let size32 = this.size*6.4;
        let size40 = this.size*8;
        let size45 = this.size*9;
        let size50 = this.size*10;
        let size55 = this.size*11;
        let size65 = this.size*13;
        let size100 = this.size*20;

        ctx.lineWidth = 1.5;
        ctx.strokeStyle='rgb(32, 16, 8)';
        ctx.fillStyle = col;

        //Поворот
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.translate(-x, -y);

        ctx.beginPath();

        //Ноги левые
        ctx.moveTo(x, y+size25);
        ctx.lineTo(x+size30, y);
        ctx.lineTo(x+size40, y-size20);

        ctx.moveTo(x, y+size28);
        ctx.lineTo(x+size30, y+size28);
        ctx.lineTo(x+size50, y+size45);

        ctx.moveTo(x, y+size32);
        ctx.lineTo(x+size30, y+size55);
        ctx.lineTo(x+size40, y+size100);

        //Ноги правые
        ctx.moveTo(x, y+size25);
        ctx.lineTo(x-size30, y);
        ctx.lineTo(x-size40, y-size20);

        ctx.moveTo(x, y+size28);
        ctx.lineTo(x-size30, y+size28);
        ctx.lineTo(x-size50, y+size45);

        ctx.moveTo(x, y+size32);
        ctx.lineTo(x-size30, y+size55);
        ctx.lineTo(x-size40, y+size100);

        ctx.stroke();
        ctx.closePath();

        //Телo
        ctx.beginPath();
        ctx.ellipse(x, y, size10, size10, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(x, y+size28, size10, size18, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(x, y+size65, size15, size20, 0, 0, Math.PI*2);
        
        //Усики
        ctx.moveTo(x-size5, y-size5);
        ctx.lineTo(x-size15 + this.pose, y-size30);

        ctx.moveTo(x+size5, y-size5);
        ctx.lineTo(x+size15 - this.pose, y-size30);
        
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore()
    }
}