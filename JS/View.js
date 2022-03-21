//Симулятор муравейника

class View {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.fw = new FlyWeidth();
    }

    draw() {
        this.ctx.fillStyle = 'darkslategray';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let colony of model.listColony) {
            for (let ant of colony.listAnt) {
                ant.draw(this.ctx, this.fw);
            }
            colony.draw(this.ctx);
        }
    }
}