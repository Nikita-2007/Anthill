//Симулятор муравейника

class Model {
    //Конструктор
    constructor() {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.base = 3;
        this.food = 256;
        this.numFood = 256;
        this.numRock = 212;
        this.numBlock = 128;
        
        this.map = [];
        this.air = [];
        this.listColony = [];
        this.listFood = [];
        this.listRock = [];
        this.listBlock = [];
        this.listLabel = [];
        
        this.sector = {
            left:0,
            right:0,
            top:0,
            bottom:0
        };
        this.init();
    }

    //Добовление на карту
    init() {
        for (let x = 0; x < this.size.width; x++) {
            this.map[x] = [];
            this.air[x] = [];
            for (let y = 0; y < this.size.height; y++) {
                this.map[x][y] = false;
                this.air[x][y] = false;
            }
        }
        for (let i = 0; i < this.base; i++) {
            let segment = 2*Math.PI/this.base*i+-Math.PI/2 + Math.PI/this.base*((this.base+1)%2);
            let radius = (this.base - 1)*(Math.min(this.size.width, this.size.height)/2/this.base);
            let colony = new Colony(this.food, {
                x: Math.round(this.size.width/2+radius*Math.cos(segment)),
                y: Math.round(this.size.height/2+radius*Math.sin(segment))
            }, i);
            this.listColony.push(colony);
            this.map[colony.pos.x][colony.pos.y] = colony;
        }
        for (let i = 0; i < this.numFood/2; i++) {
            this.newFood(this.rndPos());
            this.newFood(this.rndPos({x: this.size.width/2, y: this.size.height/2}, 100));
        }
        for (let i = 0; i < this.numRock; i++) {
            let rock = new Rock(this.rndPos());
            this.listRock.push(rock);
            this.map[rock.pos.x][rock.pos.y] = rock;
        }
        for (let i = 0; i < this.numBlock; i++) {
            let block = new Block(this.rndPos());
            this.listBlock.push(block);
            this.map[block.pos.x][block.pos.y] = block;
        }
    }
    
    //Обновление
    update() {
        for (let colony of this.listColony) {
            colony.update();
        }

        let listLabel = [];
        for (let label of this.listLabel) {
            label.update();
            if (label.weight <= 0) {
                delete this.air[label.pos.x][label.pos.y];
                this.air[label.pos.x][label.pos.y] = false;
            } else
                listLabel.push(label);
        }
        this.listLabel = listLabel;
    }

    //Создание метки
    newLabel(pos, color) {
        let label = new Label(pos, color);
        pos = this.intPos(pos);
        if (!this.air[pos.x][pos.y]) {
            this.listLabel.push(label);
            this.air[pos.x][pos.y] = label;
        }
        else if (label.color == color && label.weight < 8192) {
            label.weight += 1024;
        }
        else if (this.air[pos.x][pos.y].weight > 1024) {
            this.air[pos.x][pos.y].weight -= 1024;
        }
        else {
            this.air[pos.x][pos.y].weight = 1024 - this.air[pos.x][pos.y].weight;
            this.air[pos.x][pos.y].color = color;
        }
    }

    //Создание еды
    newFood(pos, weight = Math.round(Math.random() * 200 + 100)) {
        let food = new Food(pos, weight);
        this.listFood.push(food);
        this.map[food.pos.x][food.pos.y] = food;
    }

    //Удаление еды
    delFood() {
        let listFood = [];
        for (let food of this.listFood)
            if (food.weight > 0) 
                listFood.push(food);
            else
                this.map[food.pos.x][food.pos.y] = false;
        this.listFood = listFood;
    }

    //Выбор случайной позиции
    rndPos(pos = {x: this.size.width/2, y: this.size.height/2}, range = Math.max(this.size.width, this.size.height)) {
        this.sector = this.getSector(pos, range);
        pos = this.intPos(pos);
        while (this.map[pos.x][pos.y] != false) {
            pos = {
                x: Math.random() * (this.sector.right - this.sector.left)+this.sector.left,
                y: Math.random() * (this.sector.bottom - this.sector.top)+this.sector.top
            }
            pos = this.intPos(pos);
        }
        return pos;
    }

    //Округление координат
    intPos(pos) {
        return {
            x: Math.round(pos.x),
            y: Math.round(pos.y),
        }
    }
    
    //Проверка на края  карты
    getSector(pos, range) {
        return {
            left: Math.max(0, pos.x-range),
            right: Math.min(this.size.width-1, pos.x+range),
            top: Math.max(0, pos.y-range),
            bottom: Math.min(this.size.height-1, pos.y+range)}
    }
    //Длинна до цели
    delta(pos, target) {
        return Math.sqrt(Math.pow(pos.x - target.pos.x, 2) + Math.pow(pos.y - target.pos.y, 2)); 
    }
}