//Симулятор муравейника

class Model {
    constructor() {
        this.family = 54;
        this.colony = 3;
        this.listColony = [];

        for (let i = 0; i < this.colony; i++) {
            let col = new Colony(this.family);
            this.listColony.push(col);
        }
    }
}