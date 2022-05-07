//Симулятор муравейника

class Action {

    static listAction = [
        Action.wait,
        Action.find,
        Action.back,
        Action.move,
        Action.grab,
        Action.kick,
        Action.dead,
        Action.drop,
        Action.info,
        Action.flex
    ];

    static wait(ant) {
        ant.timer = 20;
        ant.walk = false;
    }

    static find(ant) {
        ant.goal = Food;
        ant.timer = 20;
        ant.walk = true;
        ant.target = {pos: model.rndPos(ant.pos, ant.range)};
        ant.angle = ant.getAngle(ant.pos, ant.target);
    }

    static back(ant) {
        ant.goal = Colony;
        ant.target = {pos: model.rndPos(ant.pos, ant.range)};
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.timer = 20;
        ant.walk = true;
    }

    static move(ant) {
        ant.timer = Math.round(model.delta(ant.pos, ant.target)/ant.speed-10);
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.walk = true;
    }

    static grab(ant) {
        ant.goal = Colony;
        ant.timer = 5;
        ant.walk = false;
        let food = Math.min(ant.target.weight, ant.life/2);
        ant.target.weight -= food;
        ant.load = new Food();
        ant.load.weight = food;
        ////Удалить корм с карты если он закончился\\\\
    }

    static kick(ant) {
        ant.timer = 5;
        ant.walk = false;
    }

    static dead(ant) {
        ant.timer = 0;
        ant.walk = false;
    }

    static drop(ant) {
        ant.timer = 5;
        ant.walk = false;
        ant.target.food += ant.load.weight;
        ant.load = false;
    }

    static info(ant) {
        ant.timer = 20;
        ant.walk = false;
    }

    static flex(ant) {
        ant.timer = 50;
        ant.walk = false;
    }
}