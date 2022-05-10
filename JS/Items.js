//Симулятор муравейника

class Items {
    constructor() {
        this.pos = {
            x: Math.round(Math.random()*window.innerWidth),
            y: Math.round(Math.random()*window.innerHeight)
        };
        this.color = 'White'
        this.Pi2 = Math.PI*2
    }


    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, 3, 3, 0, 0, this.Pi2);
        ctx.fill();
        ctx.closePath();
    }
}

class Food extends Items {
    constructor() {
        super();
        this.color = 'Crimson'
        this.weight = Math.round(Math.random() * 200 + 100);
    }

    draw(ctx) {
        super.draw(ctx);
        if (control.info) {
            ctx.fillStyle='White';
            ctx.font = "6pt Arial"
            ctx.fillText(this.weight, this.pos.x, this.pos.y-5);
        }
    }
}

class Rock extends Items {
    constructor() {
        super();
        this.color = 'DimGrey'
    }
}

class Block extends Items {
    constructor() {
        super();
        this.color = 'Black'
    }
}

class Label {
    constructor(ant) {
        this.color = ant.color;
        this.pos = {
            x: ant.pos.x,
            y: ant.pos.y
        };
        this.weight = 1024;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
        ctx.fill();
        ctx.closePath();
    }
}