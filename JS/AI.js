//Симулятор муравейника

class PI {
    //Выбор действия
    select(ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else if (ant.target instanceof Colony && model.delta(ant.pos, ant.target) < 12 && ant.load && ant.color == ant.target.color)
            ant.action = Action.drop;
        else if (ant.target instanceof Ant && ant.target.color != ant.color && !ant.load && !ant.listTarget.food && ant.listTarget.alien)
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
        //Въодящая нода
        this.inputNodes = this.fillNodes(this.countIn);
        //Промежуточная нода 1
        this.hidenNodes1 = this.fillNodes(this.count1);
        //Промежуточная нода 2
        this.hidenNodes2 = this.fillNodes(this.count2);
        //Исходящая нода
        this.outputNodes = this.fillNodes(this.countOut);
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
        else {
            this.inputNodes = this.normInput(ant);

            this.hidenNodes1 = this.synapse(this.inputNodes, ant.nn.w1, this.hidenNodes1);
            this.hidenNodes1 = this.norm(this.hidenNodes1);

            this.hidenNodes2 = this.synapse(this.hidenNodes1, ant.nn.w2, this.hidenNodes2);
            this.hidenNodes2 = this.norm(this.hidenNodes2);

            this.outputNodes = this.synapse(this.hidenNodes2, ant.nn.w3, this.outputNodes);
            let maxi = Math.max(...this.outputNodes);
            let index = this.outputNodes.indexOf(maxi);
            ant.action = Action.listAction[index]; //Math.max(...arr)
        }
    }

    //Заболнение нод
    fillNodes(count) {
        let node = [];
        for (let i = 0; i < count; i++)
            node[i] = 0.0; //
        return node;
    }

    //Нормалтзация входящих данных
    normInput(ant) {
        //Нормировка входящих данные
        let node = [
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
        return node;
    }
    
    //Нормализация от 0 до 1
    norm(node) {
        let maxi = Math.max(...node);
        for (let i = 0; i < node.length; i++) {
            node[i] = node[i]/maxi;
        }
        return node;
    }

    //Расчёт данных нейронов
    synapse(start, w, finish) {
        for (let i = 0; i < start.length; i++) {
            for (let j = 0; j < finish.length; j++) {
                finish[j] += start[i] * w[i][j];
            }
        }
        return finish;
    }

    //Случайное заполнение весов
    rndSynapse(start, finish) {
        let node = [];
        //Циклы
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