//Симулятор муравейника

class Items {
    //Конструктор
    constructor(pos) {
        this.pos = {
            x: pos.x,
            y: pos.y
        };
        this.color = 'White';
        this.Pi2 = Math.PI*2;
    }

    //Отрисовка
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, 3, 3, 0, 0, this.Pi2);
        ctx.fill();
        ctx.closePath();
    }
}

class Food extends Items {
    static color = 'Crimson';

    //Конструктор
    constructor(pos, weight) {
        super(pos);
        this.color = Food.color;
        this.weight = weight;
    }
    //Отрисовка
    draw(ctx) {
        super.draw(ctx);
        if (control.info) {
            ctx.fillStyle='White';
            ctx.font = "6pt Arial"
            ctx.fillText(Math.round(this.weight), this.pos.x, this.pos.y-5);
        }
    }
}

class Rock extends Items {
    //Конструктор
    constructor(pos) {
        super(pos);
        this.color = 'DimGrey'
    }
}

class Block extends Items {
    //Конструктор
    constructor(pos) {
        super(pos);
        this.color = 'Black'
    }
}

class Label {
    //Конструктор
    constructor(pos, color) {
        this.color = color;
        this.pos = {
            x: pos.x,
            y: pos.y
        };
        this.weight = 1024;
    }

    //Обновление
    update() {
        this.weight--;
    }
    //Отрисовка
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
        ctx.fill();
        ctx.closePath();
    }
}