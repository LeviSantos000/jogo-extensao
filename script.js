const gameBackground = document.querySelector(".game-background");
const game = document.querySelector(".game");
const botaoJogo = document.querySelector(".botao-jogar");
const overlay = document.querySelector(".overlay");
const monitor = document.querySelector(".monitor");
const gabinete = document.querySelector(".gabinete");
const gabineteAberto = document.querySelector(".gabinete-aberto");
const pontuacao = document.querySelector(".pontuacao");
const timer = document.querySelector(".tempo");
const textoProblema = document.querySelector(".texto-problema");
const gameOver = document.querySelector(".game-over");
const scoreFinal = document.querySelector(".score");
const botaoReiniciar = document.querySelector(".botao-reiniciar")
const iconeJogo = document.querySelector(".icone-jogo")
const hardwareBackground = document.querySelector(".hardware-background")

let perguntas = [
    {
        enunciado: "O Computador está reiniciando sozinho, qual o erro?",
        alternativas: ["Memória RAM", "Fonte de Alimentação", "HD", "Placa de Vídeo"],
        respostaCorreta: "Fonte de Alimentação"
    },
    {
        enunciado: "O PC não liga, qual o erro?",
        alternativas: ["Fonte de Alimentação", "Monitor", "Teclado", "Processador"],
        respostaCorreta: "Fonte de Alimentação"
    },
    {
        enunciado: "A Máquina está desligando após alguns minutos de uso, qual o erro?",
        alternativas: ["Memória RAM", "Superaquecimento", "HD", "Placa Mãe"],
        respostaCorreta: "Superaquecimento"
    },
    {
        enunciado: "O Sistema está muito lento para abrir arquivos, qual o erro?",
        alternativas: ["Memória RAM", "HD falhando", "Fonte", "Placa de Vídeo"],
        respostaCorreta: "HD falhando"
    },
    {
        enunciado: "O Computador não inicializa, apita mas não mostra vídeo. Qual o erro?",
        alternativas: ["Placa Mãe", "Fonte", "Memória RAM", "Monitor"],
        respostaCorreta: "Memória RAM"
    },
    {
        enunciado: "O Jogo trava e aparecem falhas gráficas na tela. Qual o erro?",
        alternativas: ["Fonte", "Memória RAM", "Placa de Vídeo", "Processador"],
        respostaCorreta: "Placa de Vídeo"
    }
];

let tempo = 60;
let pontuacaoAtual = 0;
let perguntaAtual;
let intervaloId;

function iniciarTempo() {
    if (tempo > 0) {
        tempo--;
        timer.textContent = "Tempo: " + tempo;
    } else {
        // Fim do Jogo
        gameOver.classList.add('visivel-flex')
        gameBackground.classList.add('oculto')
        if (intervaloId) {
            clearInterval(intervaloId);
        }
        if (scoreFinal) {
            scoreFinal.textContent = pontuacaoAtual;
        }
    }
}

function iniciarJogo() {
    botaoJogo.classList.add('oculto');
    iconeJogo.classList.add('oculto')
    game.classList.add('visivel-flex')
    timer.classList.add('visivel-block');
    pontuacao.classList.add('visivel-block')
    textoProblema.classList.add('visivel-block')

    gabinete.classList.add('visivel-block')
    monitor.classList.add('visivel-block')

    pontuacao.textContent = "Pontuação: " + pontuacaoAtual;

    intervaloId = setInterval(iniciarTempo, 1000);

    roletarPergunta();
}

function reiniciarJogo() {
    tempo = 60
    timer.textContent = "Tempo: " + tempo
    pontuacaoAtual = 0
    gameOver.classList.remove('visivel-flex')
    gameBackground.classList.remove('oculto')
    iniciarJogo()
}

function roletarPergunta() {
    perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];
}

function abrirGabinete() {
    monitor.classList.remove('visivel-block')
    criarPergunta()
}

function criarPergunta() {
    // Enunciado
    textoProblema.textContent = perguntaAtual.enunciado

    // Container das alternativas em grid
    const alternativasContainer = document.createElement("div");
    alternativasContainer.id = "alternativas-container";
    hardwareBackground.appendChild(alternativasContainer);

    // Cria as alternativas em si
    let botoes = perguntaAtual.alternativas.map(alternativa => {
        const botao = document.createElement("button");
        botao.className = "opcao";
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(alternativa, botoes);
        alternativasContainer.appendChild(botao);
        return botao;
    });

    // Mensagem de acerto ou erro das alternativas
    const divMensagem = document.createElement("div");
    divMensagem.id = "mensagem";
    overlay.appendChild(divMensagem);
}

function verificarResposta(respostaUsuario, botoes) {
    const divMensagem = document.getElementById("mensagem");
    const alternativasContainer = document.getElementById("alternativas-container")

    overlay.classList.add("visivel-flex")

    if (respostaUsuario === perguntaAtual.respostaCorreta) {
        pontuacaoAtual += 100;
        pontuacao.textContent = "Pontuação: " + pontuacaoAtual;
        divMensagem.innerHTML = "<p style='color:greenyellow; padding:10px; font-size:50px;'>✅ Acertou! Parabéns.</p>";
    } else {
        if (pontuacaoAtual > 0) {
            pontuacaoAtual -= 50;
            pontuacao.textContent = "Pontuação: " + pontuacaoAtual;
        }
        divMensagem.innerHTML = "<p style='color:red; padding:10px; font-size:50px;'>❌ Errou! Resposta correta: " + perguntaAtual.respostaCorreta + "</p>";
    }

    botoes.forEach(botao => {
        botao.classList.add('desativado')
    });

    // Roletando novas perguntas
    setTimeout(() => {
        textoProblema.textContent = "Clique no gabinete para ver a pergunta!"
        alternativasContainer.remove()
        overlay.classList.remove('visivel-flex')
        gabinete.classList.add('visivel-block')
        monitor.classList.add('visivel-block')
        roletarPergunta();
    }, 2000);
}

// Botões Events
botaoJogo.addEventListener("click", iniciarJogo)
botaoReiniciar.addEventListener("click", reiniciarJogo)

// Images Events
gabinete.addEventListener("click", abrirGabinete);

gabinete.addEventListener("mouseenter", opacityMonitor);
gabinete.addEventListener("mouseleave", removeOpacityMonitor);
monitor.addEventListener("mouseenter", opacityGabinete);
monitor.addEventListener("mouseleave", removeOpacityGabinete);

function opacityMonitor() { monitor.classList.add('opacidade-50') }
function removeOpacityMonitor() { monitor.classList.remove('opacidade-50') }
function opacityGabinete() { gabinete.classList.add('opacidade-50') }
function removeOpacityGabinete() { gabinete.classList.remove('opacidade-50') }
