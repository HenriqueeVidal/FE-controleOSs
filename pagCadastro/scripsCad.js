function atualizarContatos() {

    const ul = document.getElementById('listaClientes')
    ul.innerHTML = ''

    const clientes = fetch('https://pi2sem-sistemaos.onrender.com/clientes')
        .then(resposta => resposta.json())
        .then(clientes => {

            clientes.forEach(cliente => {
                const li = document.createElement('li')
                li.innerText = `${cliente.nome} | ${cliente.cpf_cnpj} |  ${cliente.email} | ${cliente.celular} | ${cliente.endereco}, ${cliente.numero} | ${cliente.bairro} | ${cliente.cidade} | ${cliente.uf}   |   `

                //btn excluir
                const btnDelete = document.createElement('button')
                btnDelete.innerText = "Excluir cliente"
                btnDelete.addEventListener('click', ()=>
                    deletarCliente(cliente.id))
                    li.appendChild(btnDelete)
                
                const ul = document.getElementById('listaClientes')
                ul.appendChild(li)
            });
        })
}

const formCadastro = document.getElementById('CadastroClientes')
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarCliente(event)
})

function cadastrarCliente(form) {
    const clienteNovo = {
        cpf_cnpj: form.target.cpf_cnpj.value,
        nome: form.target.nome.value,
        telefone: form.target.telefone.value,
        celular: form.target.celular.value,
        email: form.target.email.value,
        cep: form.target.cep.value,
        endereco: form.target.endereco.value,
        numero: form.target.numero.value,
        complemento: form.target.complemento.value,
        bairro: form.target.bairro.value,
        cidade: form.target.cidade.value,
        uf: form.target.uf.value,
    }
    fetch('https://pi2sem-sistemaos.onrender.com/clientes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(clienteNovo)
    }).then(resposta => {
        if (resposta.status != 201) {
            alert('Erro ao cadastrar')
            return
        } alert('Cadastrado com sucesso!')
        form.target.reset()
        atualizarContatos()
    })
}

function deletarCliente(id) {
    if (confirm("Tem certeza que deseja excluir esse cliente da base de dados?")) {
        fetch(`https://pi2sem-sistemaos.onrender.com/clientes/${id}`, { method: 'DELETE' 
    }).then(resposta => {
        if(resposta.status != 200){
            alert("Erro ao excluir")
            return
        }
        atualizarContatos()
        alert('Contato excluído com sucesso!')
    })
    }else{
        alert("Exclusão cancelada!")
    }
}


















atualizarContatos()
