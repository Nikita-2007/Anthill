//Симулятор муравейника

class Model {
    constructor() {
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.base = 3;
        this.food = 10;
        this.numFood = 250;
        this.numRock = 350;
        this.numBlock = 300;
        
        this.map = [];
        this.air = [];
        this.listColony = [];
        this.listFood = [];
        this.listRock = [];
        this.listBlock = [];
        
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
            for(let ant of colony.listAnt)
                ant.update();
            colony.update();
        }
    }

    vision(ant) {
        this.sector = this.getSector(ant.pos, ant.range);
        for (let x = this.sector.left; x < this.sector.right; x++) {
            for (let y = this.sector.top; y < this.sector.bottom; y++) {
                if (this.map[x][y] instanceof ant.goal) {
                    ant.target.pos = this.map[x][y];
                    break;
                }
            }
        }
    }

    rndPos(pos, range) {
        this.sector = this.getSector(pos, range);
        return {
            x: Math.round(Math.random() * (this.sector.right - this.sector.left)+this.sector.left),
            y: Math.round(Math.random() * (this.sector.bottom - this.sector.top)+this.sector.top)
        };
    }
    
    getSector(pos, range) {
        return {
            left: Math.max(0, pos.x-range),
            right: Math.min(this.size.width, pos.x+range),
            top: Math.max(0, pos.y+range),
            bottom: Math.min(this.size.height, pos.y-range)}
    }
}
