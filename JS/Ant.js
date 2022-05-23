//Симулятор муравейника

class Ant {
    constructor(colony) {
        this.color = colony.color;
        this.pos = {
            x: colony.pos.x,
            y: colony.pos.y
        };
        this.range = 60;
        this.target = {pos: model.rndPos(this.pos, this.range)};
        this.angle = this.getAngle(this.pos, this.target);
        this.action = Action.wait;
        this.timer = 0;
        this.pose = false;
        this.ai = colony.ai;
        this.goal = constructor;
        this.speed = 4;
        this.life = 100;
        this.load = false;
        this.walk = true;
        this.labelTime = 5;
        this.flex = false;
    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            if (this.life < 0) {
                this.action=Action.dead;
            }
            this.pos = {
                x: Math.floor(this.pos.x),
                y: Math.floor(this.pos.y)
            }
            model.vision(this);
            this.ai.select(this);
            this.action(this);
        }
        if (this.walk)
            this.goStep();
    }

    goStep() {
        let pos = {
            x: Math.floor(this.pos.x),
            y: Math.floor(this.pos.y)
        }
        model.map[pos.x][pos.y] = false;
        let angle = this.angle-Math.PI/2;
        this.pos.x += this.speed * Math.cos(angle);
        this.pos.y += this.speed * Math.sin(angle);
        pos = {
            x: Math.floor(this.pos.x),
            y: Math.floor(this.pos.y)
        }
        model.map[pos.x][pos.y] = this;
        this.labelTime--;
        if (this.labelTime <=0) {
            model.newLabel(pos, this.color);
            this.labelTime = 5;
        }
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

        //Груз
        if (this.load) {
            this.load.pos={
                x: x,
                y: y-fw.size32
            }
            this.load.draw(ctx);
        }

        //Данные для расчёта
        ctx.lineWidth = 2.5;
        ctx.strokeStyle='rgb(32, 16, 8)';
        ctx.fillStyle = this.color;

        //Ноги левые
        ctx.beginPath();
        ctx.moveTo(x, y+fw.size25);
        ctx.lineTo(x+fw.size30, y + !this.pose*2);
        ctx.lineTo(x+fw.size40, y-fw.size20 + !this.pose*2);

        ctx.moveTo(x, y+fw.size28);
        ctx.lineTo(x+fw.size30, y+fw.size28 + this.pose);
        ctx.lineTo(x+fw.size50, y+fw.size45 + this.pose);

        ctx.moveTo(x, y+fw.size32);
        ctx.lineTo(x+fw.size30, y+fw.size55 + !this.pose*3);
        ctx.lineTo(x+fw.size40, y+fw.size100 + !this.pose*3);

        //Ноги правые
        ctx.moveTo(x, y+fw.size25);
        ctx.lineTo(x-fw.size30, y + this.pose*2);
        ctx.lineTo(x-fw.size40, y-fw.size20 + this.pose*2);

        ctx.moveTo(x, y+fw.size28);
        ctx.lineTo(x-fw.size30, y+fw.size28 + !this.pose);
        ctx.lineTo(x-fw.size50, y+fw.size45 + !this.pose);

        ctx.moveTo(x, y+fw.size32);
        ctx.lineTo(x-fw.size30, y+fw.size55 + this.pose*2);
        ctx.lineTo(x-fw.size40, y+fw.size100 + this.pose*3);

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
        
        if (this.flex) {
            ;
            //Жёсткий танец
        }

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        if (control.info) {
            ctx.fillStyle='White';
            ctx.font = "8pt Arial";
            ctx.fillText(this.action.name + " " + this.life + " " + this.timer, x, y-20);
            ctx.strokeRect(x-this.range, y-this.range, this.range*2, this.range*2);
        }
    }

    //Расчёт угла
    getAngle(pos, target) {
        return Math.atan2(pos.y - target.pos.y, pos.x - target.pos.x) - Math.PI/2;
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