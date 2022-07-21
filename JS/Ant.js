//Симулятор муравейника

class Ant {
    //Конструктор
    constructor(colony) {
        this.colony = colony;
        this.color = this.colony.color;
        this.pos = model.rndPos(this.colony.pos, 4);
        this.action = Action.wait;
        this.ai = this.colony.ai;
        this.life = 100;
        this.range = 60;
        this.target = {pos: model.rndPos(this.pos, this.range)};
        this.angle = this.getAngle(this.pos, this.target);
        this.timer = 0;
        this.pose = false;
        this.speed = 2;
        this.load = false;
        this.walk = true;
        this.labelTime = 5;
        this.flex = false;
        this.score = 0;
        this.listTarget = this.vision();
        if (this.ai instanceof AI) {
            this.nn = {
                w1: [],
                w2: [],
                w3: []
            };
            this.ai.init(this);
        }
        this.kill = 0;
    }

    //Обновление
    update() {
        this.timer--;
        if (this.timer <= 0) {
            if (this.life < 0) {
                this.action=Action.dead;
            }
            this.pos = model.intPos(this.pos);
            this.vision();
            this.ai.select(this);
            this.action(this);
        }
        if (this.walk)
            this.goStep();
    }

    //Шаг
    goStep() {
        this.life -= 0.05;
        let pos = model.intPos(this.pos);
        model.map[pos.x][pos.y] = false;
        let angle = this.angle-Math.PI/2;
        this.pos.x += this.speed * Math.cos(angle);
        this.pos.y += this.speed * Math.sin(angle);
        this.pos = model.rndPos(this.pos, 2);
        pos = model.intPos(this.pos);
        model.map[pos.x][pos.y] = this;
        this.labelTime--;
        if (this.labelTime <=0) {
            if (this.pose)
                model.newLabel(pos, this.color);
            else if (this.load instanceof Food)
                model.newLabel(pos, Food.color);
            this.labelTime = 5;
        }
        this.pose = !this.pose;
    }

    //Отрисовка
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
            ctx.fillText(this.kill, x, y-20);
            ctx.fillText("+", this.target.pos.x, this.target.pos.y);
            ctx.strokeRect(x-this.range, y-this.range, this.range*2, this.range*2);
        }
    }

    //Обзор
    vision() {
        this.listTarget = {
            colony: false,
            ally : false,
            alien: false,
            food: false,
            rock: false,
            labFood: false,
            labAnt: false,
            random: false
        }
        //this.pos = model.intPos(this.pos);
        for (let i = 1; i <= this.range; i++) {
            let sector = model.getSector(this.pos, i)
            for (let j = sector.left; j <= sector.right; j++) {
                this.memory(model.map[j][sector.top], model.air[j][sector.top]);
                this.memory(model.map[j][sector.bottom], model.air[j][sector.botton]);
            }
            for (let j = sector.top+1; j <= sector.bottom-1; j++) {
                this.memory(model.map[sector.left][j], model.air[sector.left][j]);
                this.memory(model.map[sector.right][j], model.air[sector.right][j]);
            }
        }
        if (!this.load)
            this.listTarget.random = {pos: model.rndPos(this.pos, this.range)};
        else {
            let dCol = model.delta(this.colony.pos, this);
            let dRnd = dCol;
            let limit = 3;
            while(dCol <= dRnd && limit >= 0) {
                this.listTarget.random = {pos: model.rndPos(this.pos, this.range)};
                dRnd = model.delta(this.colony.pos, this.listTarget.random);
                limit--;
            }
        }
        return this.listTarget;
    }

    //Запоминание объектов
    memory(point, smell) {
        if (point instanceof Colony && point.color == this.color)
            this.listTarget.colony = point;
        else if (point instanceof Ant && point.color == this.color)
            this.listTarget.ally = point;
        else if (point instanceof Ant && point.load instanceof Food)
            this.listTarget.alien = point;
        else if (point instanceof Food)
            this.listTarget.food = point;
        else if (point instanceof Rock)
            this.listTarget.rock = point;
        if (smell instanceof Label && smell.color == Food.color)
            this.listTarget.labFood = smell;
        else if (smell instanceof Label)
            this.listTarget.labAnt = smell;
    }

    //Расчёт угла
    getAngle(pos, target) {
        return Math.atan2(pos.y - target.pos.y, pos.x - target.pos.x) - Math.PI/2;
    }
}