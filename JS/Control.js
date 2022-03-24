//Симулятор муравейника

class Control {
    constructor() {
        this.fps = 128;
        this.play = false;
        this.focus = false;

        this.btnPlay = document.getElementById('play');
        this.btnClear = document.getElementById('clear');
        this.btnPlay.addEventListener('click', this.Game.bind(this));
        this.btnClear.addEventListener('click', this.Clear.bind(this));

        setInterval(() => this.update(), this.fps);
        onclick = (e) => this.onClick(e);
    }

    update() {
        if (this.play == false)
            model.update();
        view.draw();
    }

    onClick=(e) => {
        if (!this.focus) {
            let pos = {
                x: e.clientX,
                y: e.clientY
            };
            console.log(pos);
        }
        this.focus = false;
    }

    Game() {
        this.focus = true;
        this.play = !this.play;
        this.btnName();
    }

    Clear() {
        this.focus = true;
        this.btnName()
        model = new Model();
    }

    btnName() {
        if (this.play)
            this.btnPlay.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
        else
            this.btnPlay.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>';
    }
}