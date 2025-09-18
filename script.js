const gameBackground = document.querySelector("#game-background");
const game = document.querySelector("#game");
const botaoJogo = document.querySelector("#botao-jogar");
const overlay = document.querySelector("#overlay");
const monitor = document.querySelector("#monitor");
const gabinete = document.querySelector("#gabinete");
const gabineteAberto = document.querySelector("#gabinete-aberto");
const pontuacao = document.querySelector("#pontuacao");
const timer = document.querySelector("#tempo");
const textoProblema = document.querySelector("#texto-problema");
const gameOver = document.querySelector("#game-over");
const scoreFinal = document.querySelector("#score");
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
let intervaloId = null;
function iniciarTempo() {
    if (tempo > 0) {
        tempo--;
        timer.textContent = "Tempo: " + tempo;
    } else {
        // fim do jogo
        if (intervaloId) clearInterval(intervaloId);
        gameOver.style.display = "flex";
        gameBackground.style.display = "none";
        if (scoreFinal) scoreFinal.textContent = pontuacaoAtual;
    
    }
}

function iniciarJogo() {
    botaoJogo.style.display = "none";
    game.style.display = "flex";
    textoProblema.style.display = "block";
    pontuacao.style.display = "block";
    timer.style.display = "block";

    gabinete.style.display = "block";
    monitor.style.display = "block";
    gabineteAberto.style.display = "none"; 

    pontuacao.textContent = "Pontuação: " + pontuacaoAtual;
    textoProblema.textContent = "Clique no gabinete para ver a pergunta!";

    // inicia o tempo cronometro
    if (!intervaloId) intervaloId = setInterval(iniciarTempo, 1000);

    iniciarRodada();
}


function iniciarRodada() {
    perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];
    textoProblema.textContent = "Clique no gabinete para ver a pergunta!";
}

function abrirGabinete() {
    gabinete.style.display = "none";
    monitor.style.display = "none";
    gabineteAberto.style.display = "block";

    overlay.innerHTML = "";

    // E nunciado
    const p = document.createElement("p");
    p.id = "pergunta";
    p.textContent = perguntaAtual.enunciado;
    overlay.appendChild(p);

    // Container das alternativas em grid
    const alternativasContainer = document.createElement("div");
    alternativasContainer.id = "alternativas-container";

    // cria botões e add ao container
    perguntaAtual.alternativas.forEach(alternativa => {
        const botao = document.createElement("button");
        botao.className = "opcao";
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(alternativa);
        alternativasContainer.appendChild(botao);
    });

    overlay.appendChild(alternativasContainer);

    //(mensagens de acerto/erro)
    const divMensagem = document.createElement("div");
    divMensagem.id = "mensagem";
    overlay.appendChild(divMensagem);

    // mostra overlay (vai respeitar CSS dele)
    overlay.style.display = "flex";
}

// coloquei a verificação da resposta atrelada
function verificarResposta(respostaUsuario) {
    const divMensagem = document.getElementById("mensagem");

    if (respostaUsuario === perguntaAtual.respostaCorreta) {
        pontuacaoAtual += 10;
        pontuacao.textContent = "Pontuação: " + pontuacaoAtual;
        divMensagem.innerHTML = "<p style='color:darkgreen; border:2px solid white; padding:10px; border-radius:5px; background-color:white;'>✅ Acertou! Parabéns.</p>";
    } else {
        pontuacaoAtual -= 5;
        pontuacao.textContent = "Pontuação: " + pontuacaoAtual;
        divMensagem.innerHTML = "<p style='color:red; border:2px solid white; padding:10px; border-radius:5px; background-color:white;'>❌ Errou! Resposta correta: " + perguntaAtual.respostaCorreta + "</p>";
    }

    // nova rodad
    setTimeout(() => {
        overlay.style.display = "none";
        gabinete.style.display = "block";
        monitor.style.display = "block";
        gabineteAberto.style.display = "none";
        iniciarRodada();
    }, 2000);
}

function fecharGabinete() {
    gabinete.style.display = "block";
    gabineteAberto.style.display = "none";
}

gabinete.addEventListener("mouseenter", opacityMonitor);
gabinete.addEventListener("mouseleave", invertOpacityMonitor);
monitor.addEventListener("mouseenter", opacityGabinete);
monitor.addEventListener("mouseleave", invertOpacityGabinete);

function opacityMonitor() { monitor.style.filter = "opacity(50%)"; }
function invertOpacityMonitor() { monitor.style.filter = "opacity(100%)"; }
function opacityGabinete() { gabinete.style.filter = "opacity(50%)"; }
function invertOpacityGabinete() { gabinete.style.filter = "opacity(100%)"; }
