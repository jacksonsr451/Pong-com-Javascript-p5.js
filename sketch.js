// constantes referente a tela
const LARGURA_TELA = 600
const ALTURA_TELA = 400

// variaveis para a bolinha
let raio = 15
let diametro = 2 * raio

// variaveis para bolinha
let x_bolinha = LARGURA_TELA / 2
let y_bolinha = ALTURA_TELA / 2

// constante para velocidade
const VELOCIDADE = 5

// variaveis de velocidade de bolinha
let x_velocidade = VELOCIDADE
let y_velocidade = VELOCIDADE

// variaveis para a raquete
const LARGURA_RAQUETE = 10
const ALTURA_RAQUETE = 80
const VALOR_INICIAL_RAQUETE = 10
// constante referente ao meio da raquete
const MEIO_RAQUETE = ALTURA_RAQUETE / 2

// variaveis da minha raquete 
let x_minha_raquete = VALOR_INICIAL_RAQUETE
let y_minha_raquete = (ALTURA_TELA / 2) - MEIO_RAQUETE

// variaveis da raquete do oponente
let x_raquete_oponente = (LARGURA_TELA - LARGURA_RAQUETE) - VALOR_INICIAL_RAQUETE
let y_raquete_oponente = (ALTURA_TELA / 2) - MEIO_RAQUETE

// constante para movimento de raquete
const VALOR_DE_MOVIMENTO_DE_RAQUETE = 10

// variaveis de pontuação
let meus_pontos = 0
let pontos_do_oponente = 0


//sons do jogo
let raquetada = ""
let ponto = ""
let trilha = ""

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

// função setup para iniciar uma janela na tela
function setup() {
  createCanvas(LARGURA_TELA, ALTURA_TELA)// adciona a janela com as constantes LARGURA_TELA e
  // ALTURA_TELA
  
  // Inicia trilha de fundo com loop infinito
  trilha.loop()
}
// função draw, desenha na tela em tempo de execução
// sempre que esta rodando o código, ela esta constante mente se alterando
function draw() {
  background(0, 0, 0) // define um cenário, ou cor de fundo
    
  bolinha() // chamando a função bolinha para desenhar na tela
  verSeColideTela() // verifica se ha à colição entre a bolinha a cada atualização da função draw
  raquetes(x_minha_raquete, y_minha_raquete) // desenhando na tela uma
  // das raquetes
  // desenhando a segunda raquete na tela
  raquetes(x_raquete_oponente, y_raquete_oponente)
  
  // Movimenta a minha raquete com as relativas teclas de entrada KeyUP e KeyDown
  movimentaMinhaRaquete()
  
  // Movimenta a raquete do oponente e add y de bolinha como atributo
  movimentaRaqueteOponente(y_bolinha)
  
  // Incluindo pontuação
  incluiPlacar()
  
  // Atualizar pontuação
  marcaPonto()
}

// Função que cria a bolinha
function bolinha() {
  circle(x_bolinha, y_bolinha, diametro)
  x_bolinha += x_velocidade
  y_bolinha += y_velocidade
}

// Função para ver colição entre a bolinha e a tela
function verSeColideTela() {
  // Verifica se bolinha colide nas bordas do eixo x
  if((x_bolinha + raio) >= LARGURA_TELA || (x_bolinha - raio) <= 0) {
     x_velocidade *= -1
  }
 
  // Verifica se bolinha colide nas bordas do eixo y
  if((y_bolinha + raio) >= ALTURA_TELA || (y_bolinha - raio) <= 0) {
     y_velocidade *= -1
  }
  
  // Verifica colisão da minha raquete com bolinha
  if (collideRectCircle(x_minha_raquete, y_minha_raquete, LARGURA_RAQUETE, ALTURA_RAQUETE, x_bolinha, y_bolinha, diametro)) {
    raquetada.play()
    x_velocidade *= -1
  }
  
  // Verifica colisão da raquete do oponente com a bolinha
  if (collideRectCircle(x_raquete_oponente, y_raquete_oponente, LARGURA_RAQUETE, ALTURA_RAQUETE, x_bolinha, y_bolinha, diametro)) {
    raquetada.play()
    x_velocidade *= -1
  }
}

// Função que cria todas as raquetes
function raquetes(x ,y) {
  rect(x , y, LARGURA_RAQUETE, ALTURA_RAQUETE)
}

// Função de movimento para as raquetes 
function movimentaMinhaRaquete() {
  // Verifica de Tecla Pressionada for UP_ARROW
  if (keyIsDown(UP_ARROW)) {
    y_minha_raquete -= VALOR_DE_MOVIMENTO_DE_RAQUETE
  }
  
  // Verifica de Tecla Pressionada for DOWN_ARROW
  if (keyIsDown(DOWN_ARROW)) {
    y_minha_raquete += VALOR_DE_MOVIMENTO_DE_RAQUETE
  }
}

// Função para movimentar raquete do oponente, recebe o y da bolinha como parametro
function movimentaRaqueteOponente(y) {
  // Para movimento dinamico da raquete
  // se a posição y de bolinha for maior que y da raquete: add +10 a y da raquete
  if (y > y_raquete_oponente) {
      y_raquete_oponente += VALOR_DE_MOVIMENTO_DE_RAQUETE
  }
  
  // se a posição y da bolinha for menor que y da raquete: add -10 a y da raquete
  if (y < y_raquete_oponente) {
      y_raquete_oponente -= VALOR_DE_MOVIMENTO_DE_RAQUETE
  }
}

// Inclue placar
function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meus_pontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontos_do_oponente, 470, 26);
}
        
// Função para marcar pontuação
function marcaPonto() {
  // Verifica se x bolinha é maior que a largura da tela - 20 
  if (x_bolinha > LARGURA_TELA - 20) {
      meus_pontos += 1;
      x_velocidade *= -1
      retorna_ao_centro()
      ponto.play();
  }
  
  // Verifica se x bolinha é menor que 20
  if (x_bolinha < 20) {
      pontos_do_oponente += 1;
      x_velocidade *= -1
      retorna_ao_centro()
      ponto.play();
  }
}

// Função para retornar ao centro a bolinha
function retorna_ao_centro() {
  x_bolinha = LARGURA_TELA / 2
  y_bolinha = ALTURA_TELA / 2
}