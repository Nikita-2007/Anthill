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
            model.newFood({x: pos.x, y: pos.y});
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
        this.btnName();
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