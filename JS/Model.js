//Симулятор муравейника

class Model {
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
            let colony = new Colony(this.food);
            this.listColony.push(colony);
            this.map[colony.pos.x][colony.pos.y] = colony;
        }
        for (let i = 0; i < this.numFood; i++) {
            let food = new Food();
            this.listFood.push(food);
            this.map[food.pos.x][food.pos.y] = food;
        }
        for (let i = 0; i < this.numRock; i++) {
            let rock = new Rock();
            this.listRock.push(rock);
            this.map[rock.pos.x][rock.pos.y] = rock;
        }
        for (let i = 0; i < this.numBlock; i++) {
            let block = new Block();
            this.listBlock.push(block);
            this.map[block.pos.x][block.pos.y] = block;
        }
    }

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

    vision(ant) {
        ant.target = {pos: this.rndPos(ant.pos, ant.range)};
        this.sector = this.getSector(ant.pos, ant.range);
        for (let x = this.sector.left; x < this.sector.right; x++) {
            for (let y = this.sector.top; y < this.sector.bottom; y++) {
                if (this.map[x][y] instanceof ant.goal) {
                    ant.target = this.map[x][y];
                    break;
                }
            }
        }
    }

    newLabel(pos, color) {
        let label = new Label(pos, color);
        if (!this.air[Math.round(pos.x)][Math.round(pos.y)]) {
            this.listLabel.push(label);
            this.air[Math.round(pos.x)][Math.round(pos.y)] = label;
        }
        else if (label.color == color) {
            label.weight += 1024;
        }
        else if (this.air[Math.round(pos.x)][Math.round(pos.y)].weight > 1024) {
            this.air[Math.round(pos.x)][Math.round(pos.y)].weight -= 1024;
        }
        else {
            this.air[Math.round(pos.x)][Math.round(pos.y)].weight = 1024 - this.air[Math.round(pos.x)][Math.round(pos.y)].weight;
            this.air[Math.round(pos.x)][Math.round(pos.y)].color = color;
        }
    }
    
    rndPos(pos, range) {
        this.sector = this.getSector(pos, range);
        let collision = true; 
        while (collision) {
            pos = {
                x: Math.round(Math.random() * (this.sector.right - this.sector.left)+this.sector.left),
                y: Math.round(Math.random() * (this.sector.bottom - this.sector.top)+this.sector.top)
            }
            if (this.map[pos.x][pos.y] === false)
                collision = false;
        }
        return {
            x: pos.x,
            y: pos.y
        };
    }
    
    getSector(pos, range) {
        return {
            left: Math.max(50, pos.x-range),
            right: Math.min(this.size.width-50, pos.x+range),
            top: Math.max(50, pos.y-range),
            bottom: Math.min(this.size.height-50, pos.y+range)}
    }

    delta(pos, target) {
        return Math.sqrt(Math.pow(pos.x - target.pos.x, 2) + Math.pow(pos.y - target.pos.y, 2)); 
    }
}