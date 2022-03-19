//Симулятор муравейника

class Ant {
    constructor() {
        this.x = Math.round(Math.random()*window.innerWidth);
        this.y = Math.round(Math.random()*window.innerHeight);
        this.ang = Math.round(Math.random()*Math.PI*2);
        this.col = ('#'+Math.floor(Math.random()*16777216).toString(16).padStart(6, '0'));
        this.pose = false;
    }

    draw(fw) {
        let x = this.x;
        let y = this.y;
        let ang = this.ang;
        let col = this.col;
        //Данные для расчёта
        let ctx = view.ctx;
        this.pose = !this.pose;

        ctx.lineWidth = 1.5;
        ctx.strokeStyle='rgb(32, 16, 8)';
        ctx.fillStyle = col;

        //Поворот
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang*Math.random()*2);
        ctx.translate(-x, -y);

        ctx.beginPath();

        //Ноги левые
        ctx.moveTo(x, y+fw.size25);
        ctx.lineTo(x+fw.size30, y);
        ctx.lineTo(x+fw.size40, y-fw.size20);

        ctx.moveTo(x, y+fw.size28);
        ctx.lineTo(x+fw.size30, y+fw.size28);
        ctx.lineTo(x+fw.size50, y+fw.size45);

        ctx.moveTo(x, y+fw.size32);
        ctx.lineTo(x+fw.size30, y+fw.size55);
        ctx.lineTo(x+fw.size40, y+fw.size100);

        //Ноги правые
        ctx.moveTo(x, y+fw.size25);
        ctx.lineTo(x-fw.size30, y);
        ctx.lineTo(x-fw.size40, y-fw.size20);

        ctx.moveTo(x, y+fw.size28);
        ctx.lineTo(x-fw.size30, y+fw.size28);
        ctx.lineTo(x-fw.size50, y+fw.size45);

        ctx.moveTo(x, y+fw.size32);
        ctx.lineTo(x-fw.size30, y+fw.size55);
        ctx.lineTo(x-fw.size40, y+fw.size100);

        ctx.stroke();
        ctx.closePath();

        //Телo
        ctx.beginPath();
        ctx.ellipse(x, y, fw.size10, fw.size10, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(x, y+fw.size28, fw.size10, fw.size18, 0, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.ellipse(x, y+fw.size65, fw.size15, fw.size20, 0, 0, Math.PI*2);
        
        //Усики
        ctx.moveTo(x-fw.size5, y-fw.size5);
        ctx.lineTo(x-fw.size15 + this.pose, y-fw.size30);

        ctx.moveTo(x+fw.size5, y-fw.size5);
        ctx.lineTo(x+fw.size15 - this.pose, y-fw.size30);
        
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore()
    }
}

class FlyWeidth {
    constructor() {
        this.size = 1;
        this.size5 = this.size;
        this.size10 = this.size*2;
        this.size15 = this.size*3;
        this.size18 = this.size*3.6;
        this.size20 = this.size*4;
        this.size25 = this.size*5.6;
        this.size28 = this.size*5.6;
        this.size30 = this.size*6;
        this.size32 = this.size*6.4;
        this.size40 = this.size*8;
        this.size45 = this.size*9;
        this.size50 = this.size*10;
        this.size55 = this.size*11;
        this.size65 = this.size*13;
        this.size100 = this.size*20;

    }
}