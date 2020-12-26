import Phaser from "phaser";
import splash from "./assets/splash.png";

export default class TheEnd extends Phaser.Scene {

    constructor() {
        super({
            key: 'TheEnd'
        })
    }

    preload() {
        this.load.image('splash', splash);
    }

    create() {
        this.add.image(400, 300, 'splash')
    }

}