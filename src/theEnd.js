import Phaser from "phaser";
import newLogo from "./assets/logo.png";

export default class TheEnd extends Phaser.Scene {

    constructor() {
        super({
            key: 'TheEnd'
        })
    }

    preload() {
        this.load.image('newLogo', newLogo);
    }

    create() {
        let Header = this.scene.get('Header');
        Header.setLevelText("THE END");
        this.add.image(400, 350, 'newLogo').setScale(0.5);

    }

}