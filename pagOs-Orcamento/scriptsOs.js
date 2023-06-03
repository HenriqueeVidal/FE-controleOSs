

function atualizarOrdens() {
    const ul = document.getElementById('listaOrdens')
    ul.innerHTML = ''

    fetch('https://pi2sem-sistemaos.onrender.com/ordensdeservico')
        .then(resposta => resposta.json())
        .then(ordens => {
            ordens.forEach(ordem => {
                const li = document.createElement('li')
                li.innerText = `${ordem.cliente_id} | ${ordem.produto_id} | ${ordem.data_abertura} | ${ordem.status}`

                // btn excluir
                const btnDelete = document.createElement('button')
                btnDelete.innerText = "Excluir ordem"
                btnDelete.addEventListener('click', () =>
                    deletarOrdem(ordem.id))
                li.appendChild(btnDelete)

                ul.appendChild(li)
            });
        })
}

const formOrdem = document.getElementById('CadastroOrdem')
formOrdem.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarOrdem(event)
})

function cadastrarOrdem(form) {
    const novaOrdem = {
        cliente_id: form.target.cliente_id.value,
        produto_id: form.target.produto_id.value,
        data_abertura: form.target.data_abertura.value,
        data_pronto: form.target.data_pronto.value,
        data_saida: form.target.data_saida.value,
        status: form.target.status.value,
        diagnostico_defeito_reclamacao: form.target.diagnostico_defeito_reclamacao.value,
        solucao: form.target.solucao.value,
    }
    fetch('https://pi2sem-sistemaos.onrender.com/ordensdeservico', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(novaOrdem)
    }).then(resposta => {
        if (resposta.status != 201) {
            alert('Erro ao cadastrar')
            return
        }
        alert('Cadastrado com sucesso!')
        form.target.reset()
        atualizarOrdens()
    })
}

function deletarOrdem(id) {
    if (confirm("Tem certeza que deseja excluir essa ordem de serviço?")) {
        fetch(`https://pi2sem-sistemaos.onrender.com/ordensdeservico/${id}`, { method: 'DELETE' })
            .then(resposta => {
                if (resposta.status != 200) {
                    alert("Erro ao excluir")
                    return
                }
                atualizarOrdens()
                alert('Ordem de serviço excluída com sucesso!')
            })
    } else {
        alert("Exclusão cancelada!")
    }
}

atualizarOrdens()
