//Симулятор муравейника

class Colony {
    constructor(family) {
        this.col = ('#'+Math.floor(Math.random()*16777216).toString(16).padStart(6, '0'));
        this.pos = {
            x: Math.round(Math.random()*window.innerWidth),
            y: Math.round(Math.random()*window.innerHeight)
        };
        this.listAnt = [];
        for (let i = 0; i < family; i++) {
            let ant = new Ant(this.col, this.pos.x, this.pos.y);
            this.listAnt.push(ant);
        }
    }

    draw(ctx) {
        let grad = ctx.createRadialGradient(this.pos.x, this.pos.y, 8, this.pos.x, this.pos.y, 32);
        grad.addColorStop(0, this.col);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle=grad;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 32, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}
