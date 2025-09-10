// DOM
const botaojogo = document.querySelector("#botao-jogar")
const overlay = document.querySelector("#overlay")
const monitorgabinete = document.querySelector("#monitor-gabinete")
const gabineteAberto = document.querySelector("#gabinete-aberto")
const timer = document.querySelector("#tempo")
const texto = document.querySelector("#texto-problema")

let tempo = 60

function iniciarTempo() {
    if (tempo != 0) {
        tempo--
        timer.textContent = tempo
    }
}

function iniciarJogo() {
    botaojogo.style.display = "none"
    overlay.style.display = "none"
    monitorgabinete.style.display = "block"
    texto.style.display = "block"
    timer.style.display = "block"
    setInterval(iniciarTempo, 1000)
}

function abrirGabinete() {
    monitorgabinete.style.display = "none"
    gabineteAberto.style.display = "block"
}

function fecharGabinete() {
    monitorgabinete.style.display = "block"
    gabineteAberto.style.display = "none"
}