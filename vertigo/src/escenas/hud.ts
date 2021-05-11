import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';
import GestorBD from "../basedatos/gestorbd";

export default class HUD extends Phaser.Scene{

    private width: number;
    private height: number;

    //controles
    private controlIzda: Phaser.GameObjects.Sprite;
    private controlDcha: Phaser.GameObjects.Sprite;
    private controlSalto: Phaser.GameObjects.Sprite;   

    //BBDD
    private mibd: GestorBD;

    //Imágenes HUD
    private vidaImg : Phaser.GameObjects.Image;
    private puntosImg : Phaser.GameObjects.Image;

    //Texto HUD
    private vidasTxt : Phaser.GameObjects.BitmapText;
    private puntuacionTxt : Phaser.GameObjects.BitmapText;
    private relojTxt : Phaser.GameObjects.BitmapText;
    private volverTxt : Phaser.GameObjects.BitmapText;

    //Nivel
    private nombreNivel: string;
    private nivel: ManejadorNivel;

    //Audio
    private opcionAudio: Phaser.Sound.BaseSound;

    constructor(){
        super(Constantes.ESCENAS.HUD);
    }

    init(data){

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        //Nivel
        this.nombreNivel = data.nombreNivel;

        //BBDD
        this.mibd = new GestorBD();

        //Audio               
        this.opcionAudio = this.sound.add(Constantes.SONIDOS.EFECTOS.OPCION);
    }

    create(): void{

        //Detecta pantalla táctil y crea controles
        if (this.sys.game.device.input.touch) {
            this.crearControles();
        }

        this.nivel = <ManejadorNivel>this.scene.get(this.nombreNivel);
        this.nivel.events.on(Constantes.EVENTOS.VIDAS, this.actualizaVidas, this);
        this.nivel.events.on(Constantes.EVENTOS.PUNTUACION, this.actualizaPuntuacion, this);
        this.nivel.events.on(Constantes.EVENTOS.RELOJ, this.actualizaReloj, this);

        this.vidasTxt = this.add.bitmapText(35,20, Constantes.FUENTES.BITMAP, "X" + this.registry.get(Constantes.REGISTRO.VIDAS), 20);
        this.puntuacionTxt = this.add.bitmapText(this.width - 75 ,20, Constantes.FUENTES.BITMAP, '000', 20);
        this.relojTxt = this.add.bitmapText(this.width /2 - 25,20,Constantes.FUENTES.BITMAP, '05:00', 20);
        this.vidaImg = this.add.image(10,20, Constantes.HUD.VIDAS).setOrigin(0);
        this.puntosImg = this.add.image(this.width - 100, 20, Constantes.HUD.PUNTOS).setOrigin(0).setScale(1.2);
        this.volverTxt = this.add.bitmapText(10,50, Constantes.FUENTES.BITMAP, Constantes.VOLVER, 20).setInteractive();
        this.volverTxt.on('pointerdown', () => {  
            this.volverTxt.setTint(0xFFD600);                    
            this.cameras.main.fade(1000, 0, 0, 0);
            if (this.mibd.datos.efectos){
                this.opcionAudio.play();
            }
            this.cameras.main.on('camerafadeoutcomplete', () => {            
                this.sound.stopAll();
                this.scene.stop(this.nombreNivel);
                this.scene.stop(Constantes.ESCENAS.HUD);
                this.scene.start(Constantes.ESCENAS.MENU);
            });         
        });
    }

    crearControles() {
        
        //Para que admita usar dos controles a la vez    
        this.input.addPointer(2);  
        
        //Controles
        this.controlIzda = this.add.sprite(100, 0, Constantes.CONTROL.IZQUIERDA).setInteractive();
        this.controlDcha = this.add.sprite(350, 0, Constantes.CONTROL.DERECHA).setInteractive();
        this.controlSalto = this.add.sprite(1200 , 0, Constantes.CONTROL.SALTO).setInteractive();

        //Eventos de los controles
        this.controlIzda.on('pointerdown', () => {
            this.nivel.jugador.controlIzda = true;            
        });
        this.controlIzda.on('pointerup', () => {
            this.nivel.jugador.controlIzda = false;
        });

        this.controlIzda.on('pointerout', () => {
            this.nivel.jugador.controlIzda = false;
        });

        this.controlDcha.on('pointerdown', () => {
            this.nivel.jugador.controlDcha = true;
        });
        this.controlDcha.on('pointerup', () => {
            this.nivel.jugador.controlDcha = false;
        });

        this.controlDcha.on('pointerout', () => {
            this.nivel.jugador.controlDcha = false;
        });

        this.controlSalto.on('pointerdown', () => {
            this.nivel.jugador.controlSalto = true;
        });
        this.controlSalto.on('pointerup', () => {
            this.nivel.jugador.controlSalto = false;
        });
        this.controlSalto.on('pointerout', () => {
            this.nivel.jugador.controlSalto = false;
        });

        //Posición de los controles
        const controlContainer = this.add.container(75, 540);
        controlContainer.add([
            this.controlIzda,
            this.controlDcha,
            this.controlSalto
        ]);
        controlContainer
            .setScale(.5)
            .setAlpha(0.3)
            .setScrollFactor(0)
            .setDepth(5);

    }

    private actualizaVidas():void{
        this.vidasTxt.text = "X" + this.registry.get(Constantes.REGISTRO.VIDAS);
    }

    private actualizaPuntuacion():void{
        this.puntuacionTxt.text = Phaser.Utils.String.Pad(this.registry.get(Constantes.REGISTRO.PUNTUACION), 3, '0', 1);
    }

    private actualizaReloj(): void {
        this.relojTxt.text =  this.registry.get(Constantes.REGISTRO.RELOJ);
    }
    
}