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
        "https://script.google.com/macros/s/AKfycbxGvzgRVF0EyC7sEguHjgIbYQbNT3GDasuOezLnqgg-ECz-iXHCa2i9ZyYSxh4wl76mWg/exec",
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

// VOLTAR

function voltarInicio() {

  window.location.href = "index.html"

}

// CARREGAR CHAMADOS

async function carregarChamados() {

  const tabela =
    document.getElementById("ticketsBody")

  if (!tabela) return

  tabela.innerHTML =
    "<tr><td colspan='6'>Carregando...</td></tr>"

  try {

    // URL APPS SCRIPT

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxGvzgRVF0EyC7sEguHjgIbYQbNT3GDasuOezLnqgg-ECz-iXHCa2i9ZyYSxh4wl76mWg/exec"
    )

    const dados =
      await response.json()

    tabela.innerHTML = ""

    const tipoUsuario =
      localStorage.getItem("tipoUsuario")

    dados.forEach(ticket => {

      let statusHTML = ""

      // TI PODE EDITAR

      if (tipoUsuario === "ti") {

        statusHTML = `

        <select
        class="status-select"
        onchange="alterarStatus(${ticket.linha}, this.value)">

          <option ${ticket.status === "Em espera"
            ? "selected" : ""
          }>
          Em espera
          </option>

          <option ${ticket.status === "Em andamento"
            ? "selected" : ""
          }>
          Em andamento
          </option>

          <option ${ticket.status === "Finalizado"
            ? "selected" : ""
          }>
          Finalizado
          </option>

          <option ${ticket.status === "Rejeitado"
            ? "selected" : ""
          }>
          Rejeitado
          </option>

        </select>

        `

      }

      // USUÁRIO APENAS VÊ

      else {

        statusHTML = `
        <span class="status">
          ${ticket.status}
        </span>
        `

      }

      tabela.innerHTML += `

      <tr>

        <td>${ticket.titulo}</td>

        <td>${ticket.nome}</td>

        <td>${ticket.setor}</td>

        <td>${ticket.prioridade}</td>

        <td>${statusHTML}</td>

        <td>

          ${tipoUsuario === "ti"
          ? "Pode editar"
          : "Somente leitura"
        }

        </td>

      </tr>

      `

    })

  } catch (error) {

    console.error(error)

    tabela.innerHTML =
      "<tr><td colspan='6'>Erro ao carregar chamados</td></tr>"

  }

}

// ALTERAR STATUS

async function alterarStatus(linha, status) {

  try {

    await fetch(
      "https://script.google.com/macros/s/AKfycbxGvzgRVF0EyC7sEguHjgIbYQbNT3GDasuOezLnqgg-ECz-iXHCa2i9ZyYSxh4wl76mWg/exec",
      {

        method: "POST",

        body: JSON.stringify({
          linha,
          status
        })

      }
    )

    alert("Status atualizado!")

  } catch (error) {

    console.error(error)

    alert("Erro ao atualizar status")

  }

}

// AUTO LOAD

carregarChamados()