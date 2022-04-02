// вайт, финд, бек, муве, граб, кик, деад, квит

class Action {
    static wait(ant) {
        console.log('Жду');
        this.target = {
            x: Math.floor(Math.random() * window.innerWidth),
            y: Math.floor(Math.random() * window.innerHeight)
        };
        if (ant.timer < 15) {
        this.find(ant)
        }
    }

    static find(ant) {
        console.log('Ищу');
        ant.pos.x = Math.round(ant.pos.x + ant.speed * Math.cos(ant.ang-Math.PI/2));
        ant.pos.y = Math.round(ant.pos.y + ant.speed * Math.sin(ant.ang-Math.PI/2));
        if (Math.abs(ant.pos.x - ant.target.x) < ant.speed*2 && Math.abs(ant.pos.y - ant.target.y < ant.speed*2)) {
            ant.target = {
                x: Math.floor(Math.random() * innerWidth),
                y: Math.floor(Math.random() * innerHeight)
            };
         }
    }

    static back() {
        console.log('Возращаюсь');
    }

    static move() {
        console.log('Иду');
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

    static quit() {
        console.log('Бросаю');
    }
}