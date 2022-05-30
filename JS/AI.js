//Симулятор муравейника

class PI {
    //Выбор действия
    select(ant) {
        if (ant.life <= 0)
            ant.action = Action.dead;
        else if (model.delta(ant.pos, ant.target) < 12 && ant.target instanceof Colony && ant.load && ant.color == ant.target.color)
            ant.action = Action.drop;
        else if (false)
            ant.action = Action.kick;            
        else if (ant.load instanceof Food)
            ant.action = Action.back;
        else if (model.delta(ant.pos, ant.target) < 12 && ant.target instanceof Food && !ant.laod)
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
    //Выбор действия
    select(ant) {
        ant.action = Action.listAction[Math.floor(Action.listAction.length*Math.random())];
    }
}