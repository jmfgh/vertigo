import Constantes from '../constantes';
import Nivel1 from '../escenas/nivel1';
import GestorBD from "../basedatos/gestorbd";

export default class Jugador extends Phaser.Physics.Arcade.Sprite{
    
    //Control de entrada
    private cursores: Phaser.Types.Input.Keyboard.CursorKeys;
    private teclasWASD: any;
    private teclaEspacio: Phaser.Input.Keyboard.Key;

    //controles tactiles    
    public controlIzda : boolean;
    public controlDcha : boolean;
    public controlSalto : boolean;

    //BBDD
    private mibd: GestorBD;

    //Nivel inicial
    private escena: Nivel1;

    //Colisiones
    private tiempoEsperaColisionActivo: boolean;  
    private recolectando: boolean;  

    //Audio
    private saltarAudio: Phaser.Sound.BaseSound;
    private caerSobreAudio: Phaser.Sound.BaseSound;
    private recolectarAudio: Phaser.Sound.BaseSound;   
    private recuperaAudio: Phaser.Sound.BaseSound;   
    private vidaAudio: Phaser.Sound.BaseSound; 

    //Espera para saltar
    private espera: boolean;

    constructor(config: any){
        super(config.escena, config.x, config.y, config.texture);
    
        this.escena = config.escena;
        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);

        //Control de entrada
        this.cursores = this.escena.input.keyboard.createCursorKeys();
        this.teclasWASD = this.escena.input.keyboard.addKeys('W,A,S,D');
        this.teclaEspacio = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
                
        //BBDD
        this.mibd = new GestorBD();

        //Jugador
        this.body.setSize(25,64);
        this.body.setOffset(20,3);
        this.setCollideWorldBounds(true);
        this.flipX = true;

        this.play(Constantes.JUGADOR.ANIMACION.ESPERA);
        
        //Tiempo de espera para colisiones
        this.tiempoEsperaColisionActivo = false;
        this.recolectando = false;

        //Sonidos                
        this.saltarAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.SALTAR);
        this.caerSobreAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.CAERSOBREENEMIGO);
        this.recolectarAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.RECOLECTAR);
        this.recuperaAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.RECUPERA);
        this.vidaAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.QUITARVIDA);

        //Espera para saltar
        this.espera = true;
    }

    update(): void{

         //Control de Movimiento
         if(this.teclasWASD.A.isDown || this.cursores.left.isDown || this.controlIzda){
            this.setVelocityX(-200);
            if(this.body.blocked.down){
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRER, true);
            }
            this.flipX = false;

        }else if(this.teclasWASD.D.isDown || this.cursores.right.isDown || this.controlDcha){
            this.setVelocityX(200);
            if(this.body.blocked.down){
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRER, true);
            }
            this.flipX = true;
        }else{
            this.setVelocityX(0);
            if(this.body.blocked.down){
                this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERA, true)
            }
        }

        if((this.teclaEspacio.isDown || this.teclasWASD.W.isDown || this.cursores.up.isDown || this.controlSalto) && this.body.blocked.down){
           
            if(this.espera){

                this.espera = false;

                this.setVelocityY(-350);
                this.anims.stop();
                this.setTexture(Constantes.JUGADOR.ID, Constantes.JUGADOR.ANIMACION.SALTO);
                this.reproduceAudio(this.saltarAudio); 

                //Añade evento de espera para volver a saltar
                this.escena.time.addEvent({
                    delay: 800,
                    callback: () => {
                        this.espera = true;
                    }
                });
            }

           

        }

    }

    /**
     * Método que maneja la colisión entre el jugador y un objeto enemigo
     * Se quita vida al jugador si enemigo toca al jugador
     * Si jugador toca al enemigo desde arriba elimina enemigo e incrementa puntos
     * El contexto this es desde dónde se llama por eso hay que usar jugador en lugar de this
     * @param jugador 
     * @param enemigo 
     */
         public enemigoToca(jugador: Jugador, enemigo: Phaser.Physics.Arcade.Sprite): void{

            //Hace desaparecer al enemigo si salta sobre él
            if (jugador.body.velocity.y>100 && 
                enemigo.body.touching.up && jugador.body.touching.down ){                                                             
                if (!jugador.tiempoEsperaColisionActivo){     
                    
                    jugador.reproduceAudio(jugador.caerSobreAudio);
                    let posX = enemigo.x;
                    let posY = enemigo.y;
                    enemigo.destroy();
                    
                    //Incrementa marcador 100 puntos
                    jugador.escena.puntuacion += 100;
                    jugador.escena.registry.set(Constantes.REGISTRO.PUNTUACION, jugador.escena.puntuacion);
                    jugador.escena.events.emit(Constantes.EVENTOS.PUNTUACION);
        
                    //Añade efecto explosión con una animación que cuando se completa desaparece
                    let explosion: Phaser.GameObjects.Sprite = jugador.escena.add.sprite(posX, posY , Constantes.ENEMIGOS.EXPLOSION.ID);                                          
                    explosion.play(Constantes.ENEMIGOS.EXPLOSION.ANIM);                            
                    explosion.once('animationcomplete', () => {                                
                        explosion.destroy();                            
                    });
                }
            }else if (!jugador.tiempoEsperaColisionActivo){            
                //Quita vidas y actualiza HUD
                if(jugador.escena.vidas > 0) {
                    jugador.escena.vidas--; 
                    jugador.reproduceAudio(jugador.vidaAudio);
                }           
                jugador.escena.registry.set(Constantes.REGISTRO.VIDAS, jugador.escena.vidas);
                jugador.escena.events.emit(Constantes.EVENTOS.VIDAS);
                
                //Activa tiempoEspera ya que al ser un overlap está colisionando constantemente
                jugador.tiempoEsperaColisionActivo = true;
                //Tiñe de rojo al jugador
                jugador.tint = 0xff0000; 
    
                //Añade evento de espera para volver a la normalidad
                jugador.escena.time.addEvent({
                    delay: 600,
                    callback: () => {
                        jugador.tiempoEsperaColisionActivo = false;
                        jugador.tint = 0xffffff; 
                    }
                });
            }
    
        }    
        
        public recolecta(jugador: Jugador, objeto: Phaser.Physics.Arcade.Sprite): void{   
            if (!jugador.recolectando){

                jugador.recolectando = true;

                //Si coge un corazón recupera 1 vida
                if(objeto.name === 'corazon'){

                    if(jugador.escena.vidas < 3){
                        jugador.reproduceAudio(jugador.recuperaAudio);
                        jugador.escena.vidas++;
                        jugador.escena.registry.set(Constantes.REGISTRO.VIDAS, jugador.escena.vidas);
                        jugador.escena.events.emit(Constantes.EVENTOS.VIDAS);
                    }else{
                        jugador.reproduceAudio(jugador.recolectarAudio);

                        //Si ya tiene 3 vidas, incrementa el marcador 10 puntos en vez de aumentar la vida
                        jugador.escena.puntuacion += 10;
                        jugador.escena.registry.set(Constantes.REGISTRO.PUNTUACION, jugador.escena.puntuacion);
                        jugador.escena.events.emit(Constantes.EVENTOS.PUNTUACION);
                    }

                }else{

                    jugador.reproduceAudio(jugador.recolectarAudio);

                    if(objeto.name === 'oro'){
                        //Incrementa marcador 20 puntos
                        jugador.escena.puntuacion += 20;
                    }else{
                        //Incrementa marcador 50 puntos
                        jugador.escena.puntuacion += 50;
                    }

                    jugador.escena.registry.set(Constantes.REGISTRO.PUNTUACION, jugador.escena.puntuacion);
                    jugador.escena.events.emit(Constantes.EVENTOS.PUNTUACION);
                }
                
                //Realiza una animación para desaparecer
                jugador.escena.tweens.add({
                    targets: objeto,
                    y: objeto.y - 100,
                    alpha: 0,
                    duration: 200,
                    ease: "Cubic.easeOut",
                    callbackScope: this,
                    onComplete: function(){                
                        jugador.recolectando = false;
                        objeto.destroy();                                 
                    }
                });
            }        
    
        }

        reproduceAudio(audio: Phaser.Sound.BaseSound): void{
            if (this.mibd.datos.efectos){
                audio.play();
            }
        }
    
}