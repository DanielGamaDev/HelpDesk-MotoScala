// SENHAS

const senhaUsuario = "1013947"
const senhaTI = "258852"

// LOGIN

function entrarSistema() {

  const senha =
    document.getElementById("senha").value

  const erro =
    document.getElementById("erro")

  // USUÁRIO COMUM

  if (senha === senhaUsuario) {

    localStorage.setItem("tipoUsuario", "user")

    document.getElementById("loginArea")
      .style.display = "none"

    document.getElementById("sistema")
      .style.display = "block"

  }

  // TI

  else if (senha === senhaTI) {

    localStorage.setItem("tipoUsuario", "ti")

    document.getElementById("loginArea")
      .style.display = "none"

    document.getElementById("sistema")
      .style.display = "block"

  }

  else {

    erro.innerText = "Senha inválida"

  }

}

// FORMULÁRIO

document
  .getElementById("ticketForm")
  .addEventListener("submit", async function (e) {

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

    try {

      // SUA URL APPS SCRIPT

      const response = await fetch(
        "COLE_SUA_URL_AQUI",
        {
          method: "POST",
          body: JSON.stringify(dados)
        }
      )

      const resultado =
        await response.json()

      alert(resultado.message)

      this.reset()

    } catch (error) {

      alert("Erro ao enviar ticket")

      console.error(error)

    }

    btn.disabled = false
    btn.innerText = "Abrir Ticket"

  })

// IR PARA CHAMADOS

function irParaChamados() {

  window.location.href =
    "chamados.html"

}