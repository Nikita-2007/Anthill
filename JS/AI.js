//Симулятор муравейника

class PI {
    select(ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;

        else if (ant.load = true & true)
            ant.action = Action.drop;

        else if (true)
            ant.action = Action.kick;

        else if (true)
            ant.action = Action.move;

        else if (true)
            ant.action = Action.grab;

        else if (true)
            ant.action = Action.back;

        else if (true)
            ant.action = Action.info;

        else if (true) 
            ant.action = Action.flex;
        else if (!ant.load)
            ant.action = Action.find;

        else
            ant.action = Action.wait;

    
    }
}

class AI {
    select(ant) {
        ant.action = Action.listAction[Math.floor(Action.listAction.length*Math.random())];
    }
}