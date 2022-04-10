//Симулятор муравейника

class PI {
    select(ant) {
        if (ant.pose) {
            ant.action=()=>Action.wait(ant);
            ant.timer = 20;
        } else {
            ant.action=()=>Action.find(ant);
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
        ;
    }
}