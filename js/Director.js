import {DataStore} from "./base/DataStore.js";
import {Uppencil} from "./runtime/Uppencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    /**
     * 单例
     * @returns {Director}
     */
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        let canvas = document.getElementById("game_canvas");
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
        this.canvasWidth = canvas.offsetWidth;
        this.canvasHeight = canvas.offsetHeight;
    }

    createPencil() {
        const minTop = Director.getInstance().canvasHeight / 8;
        const maxTop = Director.getInstance().canvasHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new Uppencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    run() {
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
            }

            if (pencils[0].x <= (Director.getInstance().canvasWidth - pencils[0].width) / 2 && pencils.length === 2) {
                this.createPencil();
            }

            this.dataStore.get('pencils').forEach((value) => {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put("timer", timer);
        } else {
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }
    }
}