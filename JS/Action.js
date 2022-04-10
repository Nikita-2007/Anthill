//Симулятор муравейника

class Action {
    static wait(ant) {
        console.log('Жду');
    }

    static find(ant) {
        console.log('Ищу');
        let angle = ant.ang-Math.PI/2;
        ant.pos.x += ant.speed * Math.cos(angle);
        ant.pos.y += ant.speed * Math.sin(angle);
    }

    static back() {
        console.log('Возращаюсь');
    }

    static move() {
        console.log('Иду');
        ant.pose = !ant.pose
    }

    static grab() {
        console.log('Беру');
    }

    static kick() {
        console.log('Атакую');
    }

    static dead() {
        console.log('Умер :c');
    }

    static drop() {
        console.log('Бросаю');
    }
}