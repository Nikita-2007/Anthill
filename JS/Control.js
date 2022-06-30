//Симулятор муравейника

class Control {
    //Конструктор
    constructor() {
        this.fps = 128;
        this.play = false;
        this.focus = false;
        this.info = false;
        this.label = false;

        this.btnPlay = document.getElementById('play');
        this.btnClear = document.getElementById('clear');
        this.btnSave = document.getElementById('save');
        this.btnPlay.addEventListener('click', this.Game.bind(this));
        this.btnClear.addEventListener('click', this.Clear.bind(this));
        this.btnSave.addEventListener('click', this.Save.bind(this));

        setInterval(() => this.update(), this.fps);
        onclick = (e) => this.onClick(e);
        onkeydown = (e) => this.onKeyDown(e);
        //this.Load();
    }

    //Обновление
    update() {
        if (this.play == false)
            model.update();
        view.draw();
    }

    //Отлавливание кликка
    onClick(e) {
        if (!this.focus) {
            let pos = {x: e.clientX, y: e.clientY}
            if (model.map[pos.x][pos.y])
                pos = model.rndPos(pos, 4)
            model.newFood({x: pos.x, y: pos.y}, 50);
        }
        this.focus = false;
    }

    //Отлавливание кнопок
    onKeyDown(e) {
        if (e.keyCode == 17)
            this.info = !this.info;
        if (e.keyCode == 32)
            this.label = !this.label;
    }

    //Кнопка "Game"
    Game() {
        this.focus = true;
        this.btnName();
        this.play = !this.play;
    }

    //Кнопка "Save"
    Save() {
        this.focus = true;
        this.play = false;
        this.btnName();
        //Выбор лучших интелектов
        let file = 'save_00.js';
        //let file = 'safe_' + new Date().toJSON().slice(0, 10) + '.js';
        var blob = new Blob([
            'save_nn=' + JSON.stringify(model.listColony[1].listAnt[0])
        ], { type: "text/plain;charset=utf-8" });
        saveAs(blob, file);
        console.log('Файл', file, 'cохранён')
    }

    Load() {
        this.focus = true;
        let script = document.createElement('script');
        script.src = 'Save/save_00.js';
        script.type = 'application/javascript';
        document.body.appendChild(script);
        //Раздача интелектра мууравьям
        console.log('Файл загружен');
    }

    //Кнопка "Clear"
    Clear() {
        this.focus = true;
        this.btnName()
        model = new Model();
    }

    //Пуск/Пуск
    btnName() {
        if (!this.play)
            this.btnPlay.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
        else
            this.btnPlay.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>';
    }
}