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
     
    overlay.innerHTML = "<p id='pergunta'>A memória ___ é responsável por armazenar temporariamente os dados e as instruções que o computador utiliza para executar o sistema operacional, os programas e as tarefas <br></br> De que peça estámos falando ?</p>" 

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
    monitorgabinete.style.display = "block"
    gabineteAberto.style.display = "none"
}