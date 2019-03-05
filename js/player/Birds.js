import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height);
        //小鸟宽34，高24，上下边距10，左右边距9
        this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18];
        this.clippingY = [9, 9, 9];
        this.clippingWidth = [34, 34, 34];
        this.clippingheight = [24, 24, 24];
        const birdX = Director.getInstance().canvasWidth / 4;
        this.birdsX = [birdX, birdX, birdX];
        const birdY = Director.getInstance().canvasHeight / 2;
        this.birdsY = [birdY, birdY, birdY];
        const birdWith = 34;
        this.birdsWidth = [birdWith, birdWith, birdWith];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.y = [birdY, birdY, birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        //切换小鸟速度
        const speed = 0.2;
        this.count += speed;
        if (this.index >= 2) {
            this.count = 0;
        }
        this.index = Math.floor(this.count);
        //模拟重力加速度
        const g = 0.98 / 2.4;
        //向上稍微移动的偏移量
        const offSetUp = 30;
        //小鸟位移
        const offsetY = (g * this.time * (this.time - offSetUp)) / 2;

        //三只小鸟的位置下落变化
        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }

        this.time++;

        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingheight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        )
    }
}