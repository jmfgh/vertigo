import Constantes from "../constantes";
import GestorBD from "../basedatos/gestorbd";

export default class Ajustes extends Phaser.Scene {  

    private width: number;
    private height: number;   

    //BBDD
    private mibd: GestorBD;

    //Fondo
    private imagenFondo: Phaser.GameObjects.TileSprite;

    constructor () {
        super(Constantes.ESCENAS.AJUSTES);        
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create (): void {  

        //BBDD
        this.mibd = new GestorBD();

        //Fondo
        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);

        //Volver a Menú
        const volverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, this.height -80 , Constantes.FUENTES.BITMAP, Constantes.VOLVER, 27).setInteractive();
        volverTxt.on('pointerdown', () => {   
            this.sound.stopAll();                   
            this.scene.start(Constantes.ESCENAS.MENU);            
        });

        //Sonidos y Efectos
        const musicatxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(70, 80 , Constantes.FUENTES.BITMAP2, Constantes.AJUSTES.MUSICA, 20).setInteractive();
        const efectostxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(240, 80 , Constantes.FUENTES.BITMAP2, Constantes.AJUSTES.EFECTOS, 20).setInteractive();
        
        //Imágenes de ajustes
        let musicaOnOff: Phaser.GameObjects.Image = this.add.image(130, 150, this.getImagenSonido(this.mibd.datos.musica)).setScale(0.5).setInteractive();
        let efectosOnOff: Phaser.GameObjects.Image = this.add.image(310, 150, this.getImagenSonido(this.mibd.datos.efectos)).setScale(0.5).setInteractive();

        musicaOnOff.on('pointerdown', () => { 
            this.mibd.datos.musica = !this.mibd.datos.musica;
            this.mibd.grabarBD(); 
            musicaOnOff.setTexture(this.getImagenSonido(this.mibd.datos.musica));
        });

        efectosOnOff.on('pointerdown', () => { 
            this.mibd.datos.efectos = !this.mibd.datos.efectos;
            this.mibd.grabarBD();                        
            efectosOnOff.setTexture(this.getImagenSonido(this.mibd.datos.efectos));
        });        

    }

    update(): void{
        //Movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;
    }

    getImagenSonido(encendido: boolean): string{
        return (encendido)? Constantes.AJUSTES.SONIDOON : Constantes.AJUSTES.SONIDOOFF;
    }


}