//Симулятор муравейника

class View {
    //Конструктор
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = model.size.width;
        this.canvas.height = model.size.height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.fw = new FlyWeidth();
    }

    //Отрисовка
    draw() {
        this.ctx.fillStyle = 'darkslategray';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (control.label)
            for (let label of model.listLabel)
                label.draw(this.ctx);
        for (let food of model.listFood) {
            food.draw(this.ctx);
        }
        for (let rock of model.listRock) {
            rock.draw(this.ctx);
        }
        for (let block of model.listBlock) {
            block.draw(this.ctx);
        }
        for (let colony of model.listColony) {
            for (let ant of colony.listAnt) {
                ant.draw(this.ctx, this.fw);
            }
            colony.draw(this.ctx);
        }
    }
}