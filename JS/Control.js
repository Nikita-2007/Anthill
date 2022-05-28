//Симулятор муравейника

class Control {
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

    update() {
        if (this.play == false)
            model.update();
        view.draw();
    }

    onClick(e) {
        if (!this.focus) {
            let pos = {x: e.clientX, y: e.clientY}
            if (model.map[pos.x][pos.y])
                pos = model.rndPos(pos, 4)
            model.newFood({x: pos.x, y: pos.y});
        }
        this.focus = false;
    }

    onKeyDown(e) {
        if (e.keyCode == 17)
            this.info = !this.info;
        if (e.keyCode == 32)
            this.label = !this.label;
    }

    Game() {
        this.focus = true;
        this.btnName();
        this.play = !this.play;
    }

    Save() {
        this.focus = true;
        this.btnName();
    }

    Clear() {
        this.focus = true;
        this.btnName()
        model = new Model();
    }

    btnName() {
        if (!this.play)
            this.btnPlay.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
        else
            this.btnPlay.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>';
    }
}