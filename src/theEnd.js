import Phaser from "phaser";
import splash from "./assets/splash.jpg";

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
        let Header = this.scene.get('Header');
        Header.setLevelText("THE END");
        this.add.image(0, 50, 'splash')
            .setOrigin(0)
    }

}