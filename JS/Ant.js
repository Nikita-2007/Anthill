//Симулятор муравейника

class Ant {
    constructor(colony) {
        this.color = colony.color;
        this.pos = {
            x: colony.pos.x,
            y: colony.pos.y
        };
        this.target = this.getTarget(this.pos);
        this.angle = this.getAngle(this.pos, this.target);
        this.action=Action.wait;
        this.timer = 0;
        this.pose = false;
        this.ai = colony.ai;
        this.speed = 4;
        this.life = 100;
        this.load = false;
        this.walk = true;
        this.range = 30;
        this.listItems = []; /////////////////////////////////|
    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            if (this.life < 0)
                this.action=Action.dead;
            else {
                this.pos = {
                    x: Math.round(this.pos.x),
                    y: Math.round(this.pos.y)
                }
                model.vision(this);
                this.ai.select(this);
                this.action(this);
                console.log(this.action.name, this.listItems);
            }
        }
        if (this.walk)
            this.goStep();
    }

    goStep() {
        let angle = this.angle-Math.PI/2;
        this.pos.x += this.speed * Math.cos(angle);
        this.pos.y += this.speed * Math.sin(angle);
        this.pose = !this.pose;
    }

    draw(ctx, fw) { 
        let x = this.pos.x;
        let y = this.pos.y;

        //Поворот
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.translate(-x, -y);

        if (this.load) {
            this.load.pos={
                x: x,
                y: y-fw.size32
            }
            this.load.draw(ctx);
        }


        //Корм
        /*if (this.food > 0) {
            ctx.beginPath();
            ctx.fillStyle = 'Crimson';//Food.color;
            ctx.ellipse(x, y-fw.size10, fw.size28, fw.size28, 0, 0, Math.PI*2);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }*/

        //Данные для расчёта
        ctx.lineWidth = 2.5;
        ctx.strokeStyle='rgb(32, 16, 8)';
        ctx.fillStyle = this.color;

        //Ноги левые
        ctx.beginPath();
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
        ctx.restore();   
    }

    //Расчёт цели
    getTarget(pos) {
        return {
            x: Math.floor(Math.random() * 100 + pos.x - 50),
            y: Math.floor(Math.random() * 100 + pos.y - 50)
        };
    }

    //Расчёт угла
    getAngle(pos, target) {
        return Math.atan2(pos.y - target.y, pos.x - target.x) + Math.PI/2;
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