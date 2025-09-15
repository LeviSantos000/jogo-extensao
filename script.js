// DOM
const gameBackground = document.querySelector("#game-background")
const botaojogo = document.querySelector("#botao-jogar")
const overlay = document.querySelector("#overlay")
const monitor = document.querySelector("#monitor")
const gabinete = document.querySelector("#gabinete")
const gabineteAberto = document.querySelector("#gabinete-aberto")
const pontuacao = document.querySelector("#pontuacao")
const timer = document.querySelector("#tempo")
const texto = document.querySelector("#texto-problema")
const gameOver = document.querySelector("#game-over")

// Randomização de Problemas
var erros = [
    "Memória RAM",
    "Fonte de Alimentação",
    "Superaquecimento",
    "HD falhando",
    "Placa Mãe falhando",
    "Placa de Vídeo falhando"
]

const indiceAleatorio = Math.floor(Math.random() * erros.length)
const erroEscolhido = erros[indiceAleatorio]
texto.textContent = erroEscolhido

// Funções e DOM Events

let tempo = 60

function iniciarTempo() {
    if (tempo != 0) {
        tempo--
        timer.textContent = "Tempo: " + tempo
    } else {
        gameOver.style.display = "block"
        gameBackground.style.display = "none"
    }
}

function iniciarJogo() {
    botaojogo.style.display = "none"
    overlay.style.display = "none"
    gabinete.style.display = "block"
    monitor.style.display = "block"
    texto.style.display = "block"
    pontuacao.style.display = "block"
    timer.style.display = "block"
    setInterval(iniciarTempo, 1000)
}

function abrirGabinete() {
    gabinete.style.display = "none"
    monitor.style.display = "none"
    gabineteAberto.style.display = "block"
     
    overlay.innerHTML = "<p id='pergunta'>A memória ___ é responsável por armazenar temporariamente os dados e as instruções que o computador utiliza para executar o sistema operacional, os programas e as tarefas <br></br> De que peça estamos falando ?</p>" 

    let inputElement = document.createElement("input")
    inputElement.type = "text"
    inputElement.placeholder = "Digite aqui"
    inputElement.id = "resposta"

    let botaoResponder = document.createElement("button")
    botaoResponder.textContent = "Responder"
    botaoResponder.onclick = verificarResposta

    let divMensagem = document.createElement("div")
    divMensagem.id = "mensagem"

    overlay.appendChild(inputElement)
    overlay.appendChild(botaoResponder)
    overlay.appendChild(divMensagem)
    overlay.style.display="flex"

}

function verificarResposta(){
    
    let resposta = document.getElementById("resposta").value.toLowerCase()
    let divMensagem = document.getElementById("mensagem")
    divMensagem.innerHTML = "" 
    
    if (resposta.includes("ram")) {
        divMensagem.innerHTML = "<p style='color:lightgreen'>🎉 Parabéns! Você acertou: o problema era na RAM.</p>"
    }
     else {
      divMensagem.innerHTML = "<p style='color:red'>❌ Resposta errada. Tente novamente!</p>"

    }
    
}

function fecharGabinete() {
    gabinete.style.display = "block"
    gabineteAberto.style.display = "none"
}

gabinete.addEventListener("mouseenter", opacityMonitor)
gabinete.addEventListener("mouseleave", aopacityMonitor)
monitor.addEventListener("mouseenter", opacityGabinete)
monitor.addEventListener("mouseleave", aopacityGabinete)

function opacityGabinete() {
    gabinete.style.filter = "opacity(50%)"
}

function opacityMonitor() {
    monitor.style.filter = "opacity(50%)"
}

function aopacityGabinete() {
    gabinete.style.filter = "opacity(100%)"
}

function aopacityMonitor() {
    monitor.style.filter = "opacity(100%)"
}