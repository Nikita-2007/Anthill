//Симулятор муравейника

class Items {
    constructor() {
        this.pos = {
            x: Math.round(Math.random()*window.innerWidth),
            y: Math.round(Math.random()*window.innerHeight)
        };
        this.color = 'White'
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.pos.x, this.pos.y, 5, 5);
        ctx.fill();
        ctx.closePath();
    }
}

class Food extends Items {
    constructor() {
        super();
        this.color = 'Crimson'
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