//Симулятор муравейника

class Action {
    //Список действий
    static listAction = [
        Action.wait,
        Action.find,
        Action.back,
        Action.move,
        Action.grab,
        Action.kick,
        Action.drop,
        Action.info,
        Action.flex,
        Action.dead
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
        ant.score += 5;
        ant.timer = 5;
        ant.walk = false;
        let food = Math.min(ant.target.weight, ant.life/2);
        ant.target.weight -= food;
        ant.load = new Food(ant.pos, food);
        ant.speed = 2.5;
        if (ant.target.weight <= 0)
            model.delFood();
    }

    //Удар
    static kick(ant) {
        ant.target = ant.listTarget.alien;
        ant.score += 10;
        ant.timer = 5;
        ant.walk = false;
        if (model.delta(ant.pos, ant.target) < 5) {
            ant.target.life -= 20;
            console.log(ant.target.life);
            ant.target = false;
        }
        else {
            ant.action = Action.wait;
        }
    }

    //Смерть
    static dead(ant) {
        ant.timer = 20;
        ant.walk = false;
        ant.color = 'rgba(0,0,0,0.25)';
        if (ant.load)
            ant.action = Action.drop;
        ant.target = ant.pos;
        ant.pos = ant.target;
    }

    //Выброс
    static drop(ant) {
        ant.score += 20;
        ant.timer = 5;
        ant.walk = false;
        ant.target.food += ant.load.weight;
        ant.load = false;
        ant.speed = 4;
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