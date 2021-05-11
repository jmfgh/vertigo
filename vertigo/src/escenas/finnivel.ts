import Constantes from "../constantes";
import GestorBD from "../basedatos/gestorbd";

export default class FinNivel extends Phaser.Scene 
{  
    private width: number;
    private height: number; 

    //BBDD
    private mibd: GestorBD;

    //Nivel
    private imagenFondo: Phaser.GameObjects.TileSprite;
    private nombreFondoNivel: string;
    private nombreNivel: string;

    //Resultado
    private esWin: boolean;
    private puntuacion: number;

    //Audio
    public gameoverAudio: Phaser.Sound.BaseSound;
    public winAudio: Phaser.Sound.BaseSound;

    constructor () {
        super(Constantes.ESCENAS.FINNIVEL);        
    }

    init(data: any):void{
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        //BBDD
        this.mibd = new GestorBD();

        //Nivel
        this.nombreNivel = data.nombreNivel;
        this.nombreFondoNivel = data.nombreFondoNivel;      

        //Resultado
        this.esWin = data.esWin;
        this.puntuacion = data.puntuacion;
  
        //Audio
        this.gameoverAudio = this.sound.add(Constantes.SONIDOS.EFECTOS.GAMEOVER);
        this.winAudio = this.sound.add(Constantes.SONIDOS.EFECTOS.WIN);

    }

    create (): void {        

        //Fondo nivel
        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,this.nombreFondoNivel).setOrigin(0,0).setDepth(-1);  

        //Puntuación
        let puntosPad: string = Phaser.Utils.String.Pad(this.puntuacion, 5, '0', 1);
        let textoPuntuacion: string  = Constantes.FINNIVEL.PUNTOS + " " + puntosPad;

        //Si el nivel es WIN
        if (this.esWin){

            if (this.mibd.datos.musica){
                //Música de victoria
                this.winAudio.play();
            }

            let nivel: string = this.nombreNivel.split(' ').join('').toLowerCase();

            //Si la puntuación es mayor a la que hay en BBDD
            //la guarda y escribe mensaje de Récord
            if (this.puntuacion > parseInt(this.mibd.datos.puntuaciones[nivel])){
                textoPuntuacion += "\n\n" + Constantes.FINNIVEL.BESTSCORE;
                this.mibd.datos.puntuaciones[nivel] = this.puntuacion;
                this.mibd.grabarBD();
            }            

            //Texto resultado
            const winTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(100, 100 , Constantes.FUENTES.BITMAP, Constantes.FINNIVEL.WIN, 40).setTint(0xFFD600).setScale(1.3);  
            winTxt.setX(this.width/2 - winTxt.width/2);
            const puntosTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(110, 210 , Constantes.FUENTES.BITMAP2, textoPuntuacion , 20).setTint(0x000000);
            puntosTxt.setX(this.width/2 - puntosTxt.width/2);

            //Imagen personaje
            const logo: Phaser.GameObjects.Image = this.add.image(this.width - 180, this.height, Constantes.OBJETOS.GANA).setScale(2.4);  
            logo.setX(this.width/2 - logo.width/2);
            logo.setY(this.height/2 - (logo.height/2 - 140));


        }else{
            if (this.mibd.datos.musica){
                //Música de Game Over
                this.gameoverAudio.play();
            }

            //Texto resultado
            const gameOverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(this.width/2 -300, this.height/2 -150 , Constantes.FUENTES.BITMAP, Constantes.FINNIVEL.GAMEOVER, 40).setTint(0xF62F40).setScale(1.5);            
            gameOverTxt.setX(this.width/2 - gameOverTxt.width/2);

            //Imagen personaje
            const logo: Phaser.GameObjects.Image = this.add.image(this.width - 180, this.height, Constantes.OBJETOS.MUERTO).setScale(2.4);  
            logo.setX(this.width/2 - logo.width/2);
            logo.setY(this.height/2 - (logo.height/2 - 70));

        }
        
        //Volver a Menú
        const volverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, this.height -80 , Constantes.FUENTES.BITMAP, Constantes.VOLVER, 27).setInteractive();

        volverTxt.on('pointerdown', () => {    
            this.cameras.main.fade(700, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {                              
                this.scene.start(Constantes.ESCENAS.MENU);            
            });
        });
        
    }

    update(): void{
        //movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

    }


}