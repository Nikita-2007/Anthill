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

class FlyWeidth {
    //Конструктор
    constructor() {
        this.size = 1;
        this.size5 = this.size;
        this.size10 = this.size*2;
        this.size15 = this.size*3;
        this.size18 = this.size*3.6;
        this.size20 = this.size*4;
        this.size25 = this.size*5.6;
        this.size28 = this.size*5.6;
        this.size30 = this.size*6;
        this.size32 = this.size*6.4;
        this.size40 = this.size*8;
        this.size45 = this.size*9;
        this.size50 = this.size*10;
        this.size55 = this.size*11;
        this.size65 = this.size*13;
        this.size100 = this.size*20;

    }
}