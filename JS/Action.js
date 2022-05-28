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
        ant.score += 1;
        ant.goal = Food;
        ant.walk = true;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.timer = Math.round(model.delta(ant.pos, ant.target)/ant.speed);
    }

    static back(ant) {
        ant.score += 1;
        ant.goal = Colony;
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.timer = Math.round(model.delta(ant.pos, ant.target)/ant.speed);
        ant.walk = true;
    }

    static move(ant) {
        ant.score += 1  ;
        ant.timer = Math.round(model.delta(ant.pos, ant.target)/ant.speed-10);
        ant.angle = ant.getAngle(ant.pos, ant.target);
        ant.walk = true;
    }

    static grab(ant) {
        ant.score += 5;
        ant.goal = Colony;
        ant.timer = 5;
        ant.walk = false;
        let food = Math.min(ant.target.weight, ant.life/2);
        ant.target.weight -= food;
        ant.load = new Food(ant.pos, food);
        ant.speed = 2.5;
        if (ant.target.weight <= 0)
            model.map[ant.target.pos.x][ant.target.pos.y] = false;
    }

    static kick(ant) {
        ant.score += 10;
        ant.timer = 5;
        ant.walk = false;
    }

    static dead(ant) {
        ant.timer = 20;
        ant.walk = false;
        ant.color = 'rgba(0,0,0,0.25)';
        if (ant.load)
            ant.action = Action.drop;
        ant.target = ant.pos;
        ant.pos = ant.target;
    }

    static drop(ant) {
        ant.score += 20;
        ant.timer = 5;
        ant.walk = false;
        ant.target.food += ant.load.weight;
        ant.load = false;
        ant.speed = 4;
    }

    static info(ant) {
        ant.score += 15;
        ant.timer = 20;
        ant.walk = false;
    }

    static flex(ant) {
        ant.timer = 50;
        ant.walk = false;
        ant.flex = true;
    }
}