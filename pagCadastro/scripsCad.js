function atualizarClientes() {

    const ul = document.getElementById('listaClientes')
    ul.innerHTML = ''

    const clientes = fetch('https://pi2sem-sistemaos.onrender.com/clientes')
        .then(resposta => resposta.json())
        .then(clientes => {

            clientes.forEach(clientes => {
                const li = document.createElement('li')
                li.innerText = `${clientes.nome} | ${clientes.cpf_cnpj} |  ${clientes.email} | ${clientes.celular} | ${clientes.endereco}, ${clientes.numero} | ${clientes.bairro} | ${clientes.cidade} | ${clientes.uf}   |   `

                //btn excluir
                const btnDelete = document.createElement('button')
                btnDelete.innerText = "Excluir clientes"
                btnDelete.addEventListener('click', () =>
                    deletarCliente(clientes.id))
                li.appendChild(btnDelete)

                ul.appendChild(li)
            });
        })
}

const formCadastroClientes = document.getElementById('CadastroClientes')
formCadastroClientes.addEventListener('submit', (event) => {
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
        atualizarClientes()
    })
}

function deletarCliente(id) {
    if (confirm("Tem certeza que deseja excluir esse cliente da base de dados?")) {
        fetch(`https://pi2sem-sistemaos.onrender.com/clientes/${id}`, {
            method: 'DELETE'
        }).then(resposta => {
            if (resposta.status != 200) {
                alert("Erro ao excluir")
                return
            }
            atualizarClientes()
            alert('Contato excluído com sucesso!')
        })
    } else {
        alert("Exclusão cancelada!")
    }
}

//-----------------------------------------------------------
//SCRIPTS DE PRODUTO \/\/\/\/

function atualizarProdutos() {

    const ul = document.getElementById('listaProdutos')
    ul.innerHTML = ''

    const produtos = fetch('https://pi2sem-sistemaos.onrender.com/produtos')
        .then(resposta => resposta.json())
        .then(produtos => {

            produtos.forEach(produto => {
                const li = document.createElement('li')
                li.innerText = `${produto.aparelho} | ${produto.descricao} |  ${produto.versao} | ${produto.acessorios} | ${produto.marca}, ${produto.modelo} | ${produto.numeroDeSerie}  |   `

                //btn excluir
                const btnDelete = document.createElement('button')
                btnDelete.innerText = "Excluir produto"
                btnDelete.addEventListener('click', () =>
                    deletarProduto(produto.id))
                li.appendChild(btnDelete)

                const ul = document.getElementById('listaProdutos')
                ul.appendChild(li)
            });
        })
}

const formCadastroProdutos = document.getElementById('CadastroProdutos')
formCadastroProdutos.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarProduto(event)
})

function cadastrarProduto(form) {
    const produtoNovo = {
        aparelho: form.target.aparelho.value,
        descricao: form.target.descricao.value,
        versao: form.target.versao.value,
        acessorios: form.target.acessorios.value,
        marca: form.target.marca.value,
        modelo: form.target.modelo.value,
        numeroDeSerie: form.target.numeroDeSerie.value,
    }
    fetch('https://pi2sem-sistemaos.onrender.com/produtos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(produtoNovo)
    }).then(resposta => {
        if (resposta.status != 201) {
            alert('Erro ao cadastrar')
            return
        } alert('Cadastrado com sucesso!')
        form.target.reset()
        atualizarProdutos()
    })
}

function deletarProduto(id) {
    if (confirm("Tem certeza que deseja excluir esse produto da base de dados?")) {
        fetch(`https://pi2sem-sistemaos.onrender.com/produtos/${id}`, {
            method: 'DELETE'
        }).then(resposta => {
            if (resposta.status != 200) {
                alert("Erro ao excluir")
                return
            }
            atualizarProdutos()
            alert('Produto excluído com sucesso!')
        })
    } else {
        alert("Exclusão cancelada!")
    }
}

atualizarClientes()
atualizarProdutos()
