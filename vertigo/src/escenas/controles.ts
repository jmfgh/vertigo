import Constantes from "../constantes";

export default class Controles extends Phaser.Scene {  

    private width: number;
    private height: number;   

    //Fondo
    private imagenFondo: Phaser.GameObjects.TileSprite;

    constructor () {
        super(Constantes.ESCENAS.CONTROLES);        
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create (): void {        

        //Fondo
        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);

        //Texto controles
        const controlesTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, 100 , Constantes.FUENTES.BITMAP2, Constantes.CONTROLES, 16);  

        //Volver a Menú
        const volverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, this.height -80 , Constantes.FUENTES.BITMAP, Constantes.VOLVER, 27).setInteractive();

        volverTxt.on('pointerdown', () => {     
            this.sound.stopAll();                  
            this.scene.start(Constantes.ESCENAS.MENU);            
        });

    }

    update(): void{
        //Movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

    }

}