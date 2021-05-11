import Constantes from '../constantes';
import GestorBD from "../basedatos/gestorbd";

export default class Menu extends Phaser.Scene{

    private width: number;
    private height: number;

    //Fondo
    private imagenFondo: Phaser.GameObjects.TileSprite;  

    //BBDD
    private mibd: GestorBD;

    //Audio
    public menuAudio: Phaser.Sound.BaseSound;

    constructor(){
        super(Constantes.ESCENAS.MENU);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        //BBDD
        this.mibd = new GestorBD();

        //Audio 
        this.sound.stopAll();              
        this.menuAudio = this.sound.add(Constantes.SONIDOS.BANDASONORA + 4, {loop:true, volume:0});
        if (!this.mibd.datos.musica){
            this.menuAudio.stop();
        }
    }

    create(){

        this.creaBandasonora();   

        //Fondo
        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);

        //Titulo 
        const logo = this.add.image(this.width/2, 120, Constantes.MENU.TITULO);

        //Botón de Jugar
        const jugarTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText( 0, this.height - 300, Constantes.FUENTES.BITMAP, Constantes.MENU.JUGAR, 27).setInteractive();
        this.cambiarEscena(jugarTxt, Constantes.ESCENAS.SELECCIONNIVEL);
        jugarTxt.setX((this.width/2) - (jugarTxt.width/2));
        
        //Botón de Ajustes
        const ajustesTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(0, this.height - 240, Constantes.FUENTES.BITMAP, Constantes.MENU.AJUSTES, 27).setInteractive();
        this.cambiarEscena(ajustesTxt, Constantes.ESCENAS.AJUSTES, false);
        ajustesTxt.setX((this.width/2) - (ajustesTxt.width/2));

        //Botón de Controles
        const controlesTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText( 0, this.height - 180, Constantes.FUENTES.BITMAP, Constantes.MENU.CONTOLES, 27).setInteractive();
        this.cambiarEscena(controlesTxt, Constantes.ESCENAS.CONTROLES, false);
        controlesTxt.setX((this.width/2) - (controlesTxt.width/2));

        //Botón de Créditos
        const creditosTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText( 0, this.height - 120, Constantes.FUENTES.BITMAP, Constantes.MENU.CREDITOS, 27).setInteractive();
        this.cambiarEscena(creditosTxt, Constantes.ESCENAS.CREDITOS, false);
        creditosTxt.setX((this.width/2) - (creditosTxt.width/2));
    }

    /**
     * Cuando se pulse sobre el texto nos va a llevar a la escena indicada.
     * @param texto 
     * @param escena 
     */
    cambiarEscena(texto: Phaser.GameObjects.BitmapText, escena: string, hud: boolean = true) {
        texto.on('pointerdown', () => { 
            this.scene.start(escena);
        });
    }

    creaBandasonora(): void {

        //Muestra sonido si la configuración es ON
        if (this.mibd.datos.musica){

           //Carga sonido y lo ejecuta en loop
           this.menuAudio.play();
           
           //Fade IN Sonido
           this.tweens.add({
               targets: this.menuAudio,
               volume: 0.3,
               duration: 900

           });

        }

   }
    
    update(): void{
        //Movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;
   }
}