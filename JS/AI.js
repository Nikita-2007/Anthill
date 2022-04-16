//Симулятор муравейника

class PI {
    select(ant) {
        if (ant.pose) {
            ant.action=Action.wait;
            ant.timer = 20;
        } else {
            ant.action=Action.find;
            ant.timer = 20;

            ant.target = {
                x: Math.floor(Math.random() * window.innerWidth),
                y: Math.floor(Math.random() * window.innerHeight)
            };
        }
        ant.pose = !ant.pose;
    }
}

class AI {
    select(ant) {
        ant.action = Action.listAction[Math.floor(Action.listAction.length*Math.random())];
    }
}