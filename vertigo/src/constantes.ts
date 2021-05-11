const Constantes = {
    EVENTOS:{
        VIDAS: 'cambiaVidas',
        PUNTUACION: 'cambiaPuntuacion',
        RELOJ: 'reloj',
    },
    MENU:{
        JUGAR: 'JUGAR',
        TITULO: 'VERTIGO!',
        AJUSTES: 'AJUSTES',
        CONTOLES: 'CONTROLES',
        CREDITOS: 'CREDITOS'
    },
    HUD:{
        VIDAS: 'vidasImg',
        PUNTOS: 'puntosImg'
    },    
    ESCENAS:{
        CARGA: 'Carga',
        INICIO: 'INICIO',
        MENU: 'Menu',
        NIVEL1: 'NIVEL 1',
        NIVEL2: 'NIVEL 2',
        NIVEL3: 'NIVEL 3',
        NIVEL4: 'NIVEL 4',
        HUD: 'HUD',
        AJUSTES: 'Ajustes',
        CONTROLES: 'Controles',
        CREDITOS: 'Creditos',
        SELECCIONNIVEL: 'SeleccionNivel',
        FINNIVEL: 'FinNivel'
    },
    REGISTRO:{
        VIDAS: 'vidas',
        PUNTUACION: 'puntuacion',
        RELOJ: 'reloj',
        MUSICA: 'musica',
        EFECTOS: 'efectos',

    },
    MAPAS:{
        NIVEL1:{
            TILEMAPJSON: 'mapaNivel1', 
            CANCION: '0'            
        },
        NIVEL2:{
            TILEMAPJSON: 'mapaNivel2', 
            CANCION: '1'    
        },
        NIVEL3:{
            TILEMAPJSON: 'mapaNivel3',
            CANCION: '2'    
        },
        NIVEL4:{
            TILEMAPJSON: 'mapaNivel4',
            CANCION: '3'    
        },
        CAPAPLATAFORMAS: 'Plataformas',
        TILESET: 'nivelestileset',
        POSICIONFINAL: 'posicionfinal',
        ENEMIGOS: 'enemigos',
        PLATAFORMASMOVILES: 'plataformasmoviles',
        PLATAFORMAVERTICAL: 'vertical',
        PLATAFORMAHORIZONTAL: 'horizontal',
        RECOLECTABLES: 'recolectables'
    },
    FONDOS:{
        NIVEL1: 'Jungla',
        NIVEL2: 'Hielo',
        NIVEL3: 'Ruinas',
        NIVEL4: 'Ciudad',
        CIELO: 'cielo',
        EDIFICIO: 'edificio',
        MENU: 'Menu'
    },
    FUENTES:{
        JSON: 'fuenteJSON',
        JSON2: 'fuenteJSON2',
        IMAGEN: 'imagenFuente',
        IMAGEN2: 'imagenFuente2',
        BITMAP: 'fuentePixel',
        BITMAP2: 'fuentePixel2'
    },
    JUGADOR:{
        ID: 'jugador',
        ANIMACION:{
            ESPERA: 'idle',
            CORRER: 'run',
            SALTO: 'jump-0'
        }
    },
    OBJETOS:{
        FINAL: 'final',
        MUERTO: 'muerto',
        GANA: 'gana'
    },
    ENEMIGOS:{
        CAMALEON:{
            ID:'camaleon',
            ANIM:'camaleonRun',
            VELOCIDAD: 95,
            ANCHO: 35,
            ALTO: 37,
            OFFSETX: 4,
            OFFSETY: 0               
        },
        RINO:{
            ID:'rino',
            ANIM:'rinoRun',
            VELOCIDAD: 200,
            ANCHO: 52,
            ALTO: 34,
            OFFSETX: 0,
            OFFSETY: 0     
        },
        MOSQUITO:{
            ID:'mosquito',
            ANIM:'mosquitoRun',
            VELOCIDAD: 110,
            ANCHO: 24,
            ALTO: 35,
            OFFSETX: 3,
            OFFSETY: 5     
        },
        OGRO:{
            ID:'ogro',
            ANIM:'ogroRun',
            VELOCIDAD: 110,
            ANCHO: 33,
            ALTO: 28,
            OFFSETX: 0,
            OFFSETY: 3     
        },
        OSO:{
            ID:'oso',
            ANIM:'osoRun',
            VELOCIDAD: 170,
            ANCHO: 38,
            ALTO: 26,
            OFFSETX: 5,
            OFFSETY: 7 
        },
        PIG:{
            ID:'pig',
            ANIM:'pigRun',
            VELOCIDAD: 120,
            ANCHO: 34,
            ALTO: 30,
            OFFSETX: 0,
            OFFSETY: 0 
        },
        FUEGO:{
            ID:'fuego',
            ANIM:'fuegoRun',
            VELOCIDAD: 180,
            ANCHO: 19,
            ALTO: 36,
            OFFSETX: 5,
            OFFSETY: 3     
        },
        GHOST:{
            ID:'ghost',
            ANIM:'ghostRun',
            VELOCIDAD: 250,
            ANCHO: 33,
            ALTO: 37,
            OFFSETX: 4,
            OFFSETY: 3 
        },
        ROCA:{
            ID:'roca',
            ANIM:'rocaRun',
            VELOCIDAD: 100,
            ANCHO: 36,
            ALTO: 36,
            OFFSETX: 0,
            OFFSETY: 0 
        },
        BIRD:{
            ID:'bird',
            ANIM:'birdRun',
            VELOCIDAD: 180,
            ANCHO: 40,
            ALTO: 50,
            OFFSETX: 0,
            OFFSETY: 3     
        },
        PLANTA:{
            ID:'planta',
            ANIM:'plantaRun',
            VELOCIDAD: 150,
            ANCHO: 25,
            ALTO: 36,
            OFFSETX: 10,
            OFFSETY: 5 
        },
        SLIME:{
            ID:'slime',
            ANIM:'slimeRun',
            VELOCIDAD: 210,
            ANCHO: 44,
            ALTO: 30,
            OFFSETX: 0,
            OFFSETY: 0 
        },
        EXPLOSION:{
            ID:'explosion',
            ANIM:'explota'
        }
    },
    PLATAFORMAMOVIL:{
        NIVEL1:{
            ID:'plataformamovil',
            VELOCIDAD: 100
        }, 
        NIVEL2:{
            ID:'plataformamovil2',
            VELOCIDAD: 110 
        },
        NIVEL3:{
            ID:'plataformamovil3',
            VELOCIDAD: 150 
        },
        NIVEL4:{
            ID:'plataformamovil4',
            VELOCIDAD: 200 
        }
    },
    SONIDOS:{
        EFECTOS:{
            SALTAR:'saltar',
            CAERSOBREENEMIGO: 'caersobre',
            QUITARVIDA:'vida',
            RECOLECTAR: 'recolectar',
            RECUPERA: 'recupera',
            OPCION: 'opcion',
            GAMEOVER: 'gameover',
            WIN: 'win'
        },
        BANDASONORA:'bandasonora'
    },
    RECOLECTABLES:{
        ORO:{
            ID:'oro',
            ANIM:'oroAnim'            
        },
        JOYA:{
            ID:'joya',
            ANIM:'joyaAnim'            
        },
        CORAZON:{
            ID:'corazon',
            ANIM:'corazonAnim'            
        },
        FINAL: {
            ID:'objetoFinal',
            ANIM:'finalAnim'  
        }
    },
    AJUSTES: {
        MUSICA: 'MUSICA',
        EFECTOS: 'EFECTOS',
        SONIDOON: 'sonidoon',
        SONIDOOFF: 'sonidoff'
    },
    CREDITOS: {
        GAMEDEV: 'Jose Manuel Fernandez Garcia',
        CREADOPOR: 'CREADOR : JOSE MANUEL FERNANDEZ GARCIA\n\n          CON PHASER 3.50 Y TYPESCRIPT',
        ASSETS: 'SPRITES : BAZZY1985, BENJAMIN PICKHARDT,\n\n          LUIS ZUNO, PIXELFROG\n\n\nMUSICA : ANDY RHODE, DANIEL NORONHA,\n\n         HYBRID V, PASCAL BELISLE',
        BASADO: 'BASADO EN : CODIGO FUENTE DE SERGIFLAGS', 
    }, 
    FINNIVEL: {
        PUNTOS: 'PUNTUACION : ',
        WIN: 'HAS GANADO!',
        GAMEOVER: 'GAME OVER!',
        BESTSCORE: 'NUEVO RECORD!'
    },
    BASEDATOS: {
        NOMBRE: 'VERTIGOBBDD'
    },    
    CONTROL: {
        SALTO: 'controlSalto',
        IZQUIERDA: 'controlIzda',
        DERECHA: 'controlDcha'
    }, 
    CONTROLES: 'DESP. DERECHA : FLECHA DERECHA\n\n                TECLA D\n\n\nDESP. IZQUIERDA : FLECHA IZQUIERDA\n\n                  TECLA A\n\n\nSALTO: FLECHA ARRIBA\n\n       TECLA W\n\n       BARRA ESPACIADORA',
    VOLVER: 'VOLVER'
};
export default Constantes;