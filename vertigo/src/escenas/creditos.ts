import Constantes from "../constantes";

export default class Creditos extends Phaser.Scene {  

    private width: number;
    private height: number;   

    //Fondo
    private imagenFondo: Phaser.GameObjects.TileSprite;

    //Texto créditos
    private texto: Phaser.GameObjects.Container;

    constructor () {
        super(Constantes.ESCENAS.CREDITOS);        
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create (): void {        

        //Fondo
        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);

        //Texto créditos
        const realizadoTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, 100 , Constantes.FUENTES.BITMAP2, Constantes.CREDITOS.CREADOPOR, 16);     
        const assetsTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, 200 , Constantes.FUENTES.BITMAP2, Constantes.CREDITOS.ASSETS, 16);
        const basadoTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, 400 , Constantes.FUENTES.BITMAP2, Constantes.CREDITOS.BASADO, 16);
        
        //Volver a Menú
        const volverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, this.height -80 , Constantes.FUENTES.BITMAP, Constantes.VOLVER, 27).setInteractive();

        volverTxt.on('pointerdown', () => {     
            this.sound.stopAll();                  
            this.scene.start(Constantes.ESCENAS.MENU);            
        });
        
        //Contenedor que almacena todo el texto
        this.texto = this.add.container(0, 500);

        this.texto.add([
            realizadoTxt,
            assetsTxt,
            basadoTxt,
            volverTxt
        ]);
        this.tweens.add({
            //Movimiento de scroll del texto
            targets: this.texto,
            y: '-=500',
            ease        : 'Linear',
            duration    : 7000,
        });
        
    }

    update(): void{
        //Movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

    }

}