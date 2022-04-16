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
        ant.timer = 20;
        ant.walk = true;
        ant.target = ant.getTarget(ant.pos);
        ant.angle = ant.getAngle(ant.pos, ant.target);
    }

    static back(ant) {
        ant.timer = 20;
        ant.food = 1;
        ant.walk = true;
    }

    static move(ant) {
        ant.pose = !ant.pose
        ant.timer = 20;
        ant.walk = true;
    }

    static grab(ant) {
        ant.timer = 5;
        ant.walk = false;
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
        ant.food = 0;
        ant.walk = false;
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