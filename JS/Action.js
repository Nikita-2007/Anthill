//Симулятор муравейника

class Action {
    //Список действий
    static listAction = [
        Action.wait,
        Action.find,
        Action.back,
        Action.grab,
        Action.kick,
        Action.drop,
        Action.info,
        Action.flex
        //Action.dead
    ];

    //Ожидание
    static wait(ant) {
        ant.timer = 20;
        ant.walk = false;
    }

    //Поиск
    static find(ant) {
        if (ant.listTarget.food)
            ant.target = ant.listTarget.food;
        else if (ant.listTarget.alien)
            ant.target = ant.listTarget.alien;
        else
            ant.target = ant.listTarget.random;
        ant.score += 1;
        ant.walk = true;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.timer = Math.round(model.delta(ant.pos, ant.target)/ant.speed);
    }

    //Возврат
    static back(ant) {
        if (ant.listTarget.colony)
            ant.target = ant.listTarget.colony;
        else
            ant.target = ant.listTarget.random;
        ant.score += 1;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.timer = Math.round(model.delta(ant.pos, ant.target)/ant.speed);
        ant.walk = true;
    }

    //Поднятие
    static grab(ant) {
        if (ant.target instanceof Food) {
            ant.score += 5;
            let food = Math.min(ant.target.weight, ant.life/2);
            ant.target.weight -= food;
            ant.load = new Food(ant.pos, food);
            ant.speed = 1.5;
            if (ant.target.weight <= 0)
                model.delFood();
        }
        ant.timer = 5;
        ant.walk = false;
    }

    //Удар
    static kick(ant) {
        if (ant.target instanceof Ant && ant.target.color != ant.color) {
            ant.listTarget.alien = ant.target;
            ant.angle = ant.getAngle(ant.pos, ant.target);
            ant.target.life -= 10;
            ant.score += 100
            if (ant.target.life <= 0) {
                ant.kill += 1;
                ant.colony.kills += 1;
                ant.target.colony.lose += 1;
                ant.action = this.wait;
            }
        }
        ant.walk = false;
        ant.timer = 10;
    }

    //Смерть
    static dead(ant) {
        ant.walk = false;
        ant.color = 'rgba(0,0,0,0.25)';
        if (ant.load)
            ant.action = model.newFood(model.rndPos(ant.pos, 4), ant.load.weight);
        ant.load = false;
    }

    //Выброс
    static drop(ant) {
        if (ant.target instanceof Colony) {
            ant.score += 20;
            ant.target.food += ant.load.weight;
            ant.load = false;
            ant.speed = 2;
        }
        
        ant.timer = 5;
        ant.walk = false;
    }

    //Учение
    static info(ant) {
        ant.score += 15;
        ant.timer = 20;
        ant.walk = false;
    }

    //Нереальный жёсткий экстремальный экслюзивный эпический огненый сногсшабательынй танец
    static flex(ant) {
        ant.timer = 50;
        ant.walk = false;
        ant.flex = true;
    }
}