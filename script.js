// SENHAS

const senhaUsuario = "1013947"
const senhaTI = "258852"

// LOGIN

function entrarSistema(){

  const senha = document.getElementById("senha").value

  const erro = document.getElementById("erro")

  if(
    senha === senhaUsuario ||
    senha === senhaTI
  ){

    document.getElementById("loginArea")
    .style.display = "none"

    document.getElementById("sistema")
    .style.display = "block"

  }else{

    erro.innerText = "Senha inválida"

  }

}

// FORMULÁRIO

document
.getElementById("ticketForm")
.addEventListener("submit", async function(e){

  e.preventDefault()

  const btn =
  document.getElementById("btnEnviar")

  btn.disabled = true
  btn.innerText = "Enviando..."

  const dados = {

    titulo: this.titulo.value,
    descricao: this.descricao.value,
    nome: this.nome.value,
    setor: this.setor.value,
    urgencia: this.urgencia.value,
    importancia: this.importancia.value

  }

  try{

    // URL DA API APPS SCRIPT
    const response = await fetch("https://script.google.com/macros/s/AKfycbxGvzgRVF0EyC7sEguHjgIbYQbNT3GDasuOezLnqgg-ECz-iXHCa2i9ZyYSxh4wl76mWg/exec", {

      method:"POST",

      body: JSON.stringify(dados)

    })

    const resultado = await response.json()

    alert(resultado.message)

    this.reset()

  }catch(error){

    alert("Erro ao enviar ticket.")

    console.error(error)

  }

  btn.disabled = false
  btn.innerText = "Abrir Ticket"

})