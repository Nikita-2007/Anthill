//Симулятор муравейника

class Colony {
    constructor(food) {
        this.food = food;
        this.color = ('#'+Math.floor(Math.random()*16777216).toString(16).padStart(6, '0'));
        this.pos = {
            x: Math.round(Math.random()*window.innerWidth),
            y: Math.round(Math.random()*window.innerHeight)
        };
        this.listAnt = [];
        this.timer = 100;
        this.delay = Math.round(this.timer/6,666666666666667);
        this.ai = new PI();
    }

    update() {
        let listAnt = [];
        for(let ant of this.listAnt) {
            ant.update();
            if (ant.life > -10)
                listAnt.push(ant)
            else {
                let food = new Food();
                food.pos = {
                    x: Math.round(ant.pos.x),
                    y: Math.round(ant.pos.y)
                };
                food.weight = 100+ant.load.weight;
                model.listFood.push(food);
                model.map[food.pos.x][food.pos.y] = food;
            }
        }
        if (this.listAnt.length == 0 && this.food < 100 && this.food > 0) {
            this.color = 'rgba(0,0,0,0.5)';
            let food = new Food();
            food.pos = {
                x: Math.round(this.pos.x),
                y: Math.round(this.pos.y)
            };
            food.weight = this.food;
            this.food = 0;
            model.listFood.push(food);
            model.map[food.pos.x][food.pos.y] = food;
        }
        this.listAnt = listAnt;
        if (this.food > 100) {
            this.delay--;
            if (this.delay < 0) {
                let ant = new Ant(this);
                ant.pos.y = this.pos.y + 5;
                this.listAnt.push(ant);
                this.food -= 100;
                this.delay = Math.round(this.timer/6,666666666666667);
            }
        }
    }

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
            ctx.fillText(this.listAnt.length, this.pos.x, this.pos.y);
        }
    }
}
