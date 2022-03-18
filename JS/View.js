//Симулятор муравейника

class View {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    }

    draw() {
        this.ctx.fillStyle = 'darkslategray';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        model.ant.draw(300, 300, 1.0, 'red');
    }
}