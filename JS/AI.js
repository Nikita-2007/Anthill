//Симулятор муравейника

class PI {
    //Выбор действия
    select(ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else if (ant.target instanceof Colony && model.delta(ant.pos, ant.target) < 12 && ant.load && ant.color == ant.target.color)
            ant.action = Action.drop;
        else if (ant.target instanceof Food && !ant.load && !ant.listTarget.food && ant.listTarget.alien)
            ant.action = Action.kick;         
        else if (ant.load instanceof Food)
            ant.action = Action.back;
        else if (ant.target instanceof Food && model.delta(ant.pos, ant.target) < 12 && !ant.laod)
            ant.action = Action.grab;
        else if (false)
            ant.action = Action.info;
        else if (!ant.load && false) 
            ant.action = Action.flex;
        else if (!ant.load)
            ant.action = Action.find;
        else
            ant.action = Action.wait;
    }
}

class AI {
    countIn = 11; //life,target, load, listTarget - Входные данные
    count1 = 6;//Нейронов в первой ноде
    count2 = 8;//Нейронов во второй ноде
    countOut = 9;//Все деййствия муравья

    //Конструктор
    constructor(ant) {
        //Входящие данные
        /*
        this.inputNodes = [
            ant.life/=100,
            !!ant.target,
            ant.load instanceof Food,
            ant.load instanceof Rock,
            !!ant.listTarget.colony,
            !!ant.listTarget.ally,
            !!ant.listTarget.alien,
            !!ant.listTarget.food,
            !!ant.listTarget.rock,
            !!ant.listTarget.labFood,
            !!ant.listTarget.labAnt,
        ];
        */

        this.hidenNodes1 = new Array(6);

        this.hidenNodes2 = new Array(8);

        //Выходящие данные
        this.outputNodes = [
            Action.wait,
            Action.find,
            Action.back,
            Action.move,
            Action.grab,
            Action.kick,
            Action.drop,
            Action.info,
            Action.flex
        ];
    }

    //Инициализация
    init(ant) {
        ant.nn.w1 = this.rndSynapse(this.countIn, this.count1);
        ant.nn.w2 = this.rndSynapse(this.count1, this.count2);
        ant.nn.w3 = this.rndSynapse(this.count2, this.countOut);
    }

    //Выбор действия
    select(ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else
            ant.action = Action.listAction[Math.floor((Action.listAction.length-1)*Math.random())];
    }

    rndSynapse(start, finish) {
        let node = [];
        //Цикл
        for (let i = 0; i < start; i++) {
            node[i] = [];
            for (let j = 0; j < finish; j++) {
                node[i][j] = Math.random();
            }
        }
        return node;
    }
}

class RI {
    //Выбор действия
    select(ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else
            ant.action = Action.listAction[Math.floor((Action.listAction.length-1)*Math.random())];
    }
}