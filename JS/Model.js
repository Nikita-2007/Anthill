//Симулятор муравейника

class Model {
    constructor() {
        this.family = 100;
        this.colony = 2;
        this.numFood = 250;
        this.numRock = 350;
        this.numBlock = 300;
        this.listColony = [];
        this.listFood = [];
        this.listRock = [];
        this.listBlock = [];

        for (let i = 0; i < this.colony; i++) {
            let col = new Colony(this.family);
            this.listColony.push(col);
        }
        for (let i = 0; i < this.numFood; i++) {
            let food = new Food();
            this.listFood.push(food);
        }
        for (let i = 0; i < this.numRock; i++) {
            let rock = new Rock();
            this.listRock.push(rock);
        }
        for (let i = 0; i < this.numBlock; i++) {
            let block = new Block();
            this.listBlock.push(block);
        }
    }
    update() {
        for (let colony of this.listColony) {
            for(let ant of colony.listAnt) {
                ant.update();
            }
        }
    }
}