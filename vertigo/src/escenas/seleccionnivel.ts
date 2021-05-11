import Constantes from "../constantes";
import GestorBD from "../basedatos/gestorbd";

export default class SeleccionNivel extends Phaser.Scene {  

    private width: number;
    private height: number; 

    //Fondo
    private imagenFondo: Phaser.GameObjects.TileSprite;

    //BBDD
    private mibd: GestorBD;  

    //Audio
    private opcionAudio: Phaser.Sound.BaseSound; 

    constructor () {
        super(Constantes.ESCENAS.SELECCIONNIVEL);        
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        
        //Audio               
        this.opcionAudio = this.sound.add(Constantes.SONIDOS.EFECTOS.OPCION);
    }

    create (): void {      
        
        //BBDD
        this.mibd = new GestorBD();  

        //Fondo
        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);

        const nivel1Txt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(80, 80 , Constantes.FUENTES.BITMAP2, Constantes.ESCENAS.NIVEL1, 20).setInteractive();
        this.cambiarEscena(nivel1Txt, Constantes.ESCENAS.NIVEL1);
        this.escribirMejorPuntuacion(nivel1Txt);
        
        const nivel2Txt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(80, 180 , Constantes.FUENTES.BITMAP2, Constantes.ESCENAS.NIVEL2, 20).setInteractive();
        this.cambiarEscena(nivel2Txt, Constantes.ESCENAS.NIVEL2);
        this.escribirMejorPuntuacion(nivel2Txt);
        
        const nivel3Txt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(80, 280 , Constantes.FUENTES.BITMAP2, Constantes.ESCENAS.NIVEL3, 20).setInteractive();
        this.cambiarEscena(nivel3Txt, Constantes.ESCENAS.NIVEL3);
        this.escribirMejorPuntuacion(nivel3Txt);

        const nivel4Txt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(80, 380 , Constantes.FUENTES.BITMAP2, Constantes.ESCENAS.NIVEL4, 20).setInteractive();
        this.cambiarEscena(nivel4Txt, Constantes.ESCENAS.NIVEL4);
        this.escribirMejorPuntuacion(nivel4Txt);

        const volverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, this.height -80 , Constantes.FUENTES.BITMAP, Constantes.VOLVER, 27).setInteractive();
        this.cambiarEscena(volverTxt, Constantes.ESCENAS.MENU, false);
        
    }

    update(): void{
        //Movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

    }

    /**
     * Cuando se pulsa sobre el texto enlace se va hacia la escena indicada
     * @param texto 
     * @param nuevaEscena 
     */
    cambiarEscena(texto: Phaser.GameObjects.BitmapText, nuevaEscena : string, hud: boolean = true) : void {
        texto.on('pointerdown', () => {
            this.sound.stopAll();   
            if (!hud){
                this.scene.start(nuevaEscena);                    
            } else {
                //Se pone el texto en amarillo y se hace un fundido a negro
                texto.setTint(0xFFD600);
                this.cameras.main.fade(700, 0, 0, 0);
                if (this.mibd.datos.efectos){
                    this.opcionAudio.play();
                }
                this.cameras.main.on('camerafadeoutcomplete', () => {                                
                    this.scene.start(nuevaEscena);              
                    this.scene.start(Constantes.ESCENAS.HUD, {nombreNivel:nuevaEscena});
                    this.scene.bringToTop(Constantes.ESCENAS.HUD);                    
                });
            }
        });
    }

    escribirMejorPuntuacion(nivelTxt: Phaser.GameObjects.BitmapText): void{
        let nivelbd: string = nivelTxt.text.split(' ').join('').toLowerCase();        

        if (this.mibd.datos.puntuaciones[nivelbd] > 0){
            let mejorResultado: string = "RECORD: " + Phaser.Utils.String.Pad(this.mibd.datos.puntuaciones[nivelbd], 5, '0', 1)+ " PUNTOS";
            const nivelPuntuacion : Phaser.GameObjects.BitmapText = this.add.bitmapText(nivelTxt.x + 200, nivelTxt.y , Constantes.FUENTES.BITMAP2, mejorResultado , 20);
        }

    }

}