//Симулятор муравейника
class Colony {
    palet = [
    'DarkKhaki',
    'NavajoWhite',
    'Grey',
    'OliveDrab'];

    //Конструктор
    constructor(food, pos, i) {
        this.food = food;
        this.color = this.getColor(i);
        this.listAnt = [];
        this.timer = 100;
        this.delay = Math.round(this.timer/6,666666666666667);
        this.ai = new PI();
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.lose = 0;
        this.kills = 0;
    }

    //Обновление
    update() {
        let listAnt = [];
        for(let ant of this.listAnt) {
            ant.pos = model.intPos(ant.pos);
            if (ant.timer < -200)
                model.newFood({x:ant.pos.x, y :ant.pos.y}, 100);
            else {
                listAnt.push(ant);
                ant.update();
            }
        }
        if (this.listAnt.length == 0 && this.food < 100 && this.food > 0) {
            this.color = 'rgba(0,0,0,0.5)';
            model.newFood(model.rndPos(this.pos, 4), this.food);
            this.food = 0;
        }
        this.listAnt = listAnt;
        if (this.food > 100) {
            this.delay--;
            if (this.delay < 0) {
                let ant = new Ant(this);
                this.listAnt.push(ant);
                this.food -= 100;
                this.delay = Math.round(this.timer/6,666666666666667);
            }
        }
        model.map[this.pos.x][this.pos.y] = this;
    }

    //Отрисовка
    draw(ctx) {
        let grad = ctx.createRadialGradient(this.pos.x, this.pos.y, 8, this.pos.x, this.pos.y, 40);
        grad.addColorStop(0.25, this.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle=grad;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 40, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        if (control.info) {
            ctx.fillStyle='White';
            ctx.font = "8pt Arial"
            ctx.fillText(this.listAnt.length, this.pos.x, this.pos.y-10);
            ctx.fillStyle='Black';
            ctx.fillText(this.lose, this.pos.x-10, this.pos.y);
            ctx.fillStyle='Red';
            ctx.fillText(this.kills, this.pos.x+10, this.pos.y);
            ctx.fillStyle='Blue';
            ctx.fillText(Math.round(this.kills/Math.max(this.lose, 1)*10)/10, this.pos.x, this.pos.y+10);
        }
    }
    //Выбор цвета
    getColor(i) {
        if (i < this.palet.length)
            return this.palet[i];
        else
            return ('#'+Math.floor(Math.random()*16777216).toString(16).padStart(6, '0'));
    }
}
