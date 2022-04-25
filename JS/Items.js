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