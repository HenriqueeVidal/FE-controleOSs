function atualizarOrcamentos() {
    const ul = document.getElementById('listaOrcamentos');
    ul.innerHTML = ''

    fetch('https://pi2sem-sistemaos.onrender.com/orcamentos')
        .then(resposta => resposta.json())
        .then(orcamentos => {
            orcamentos.forEach(orcamento => {
                const li = document.createElement('li');
                li.innerText = `ID: ${orcamento.id} | Ordem de Serviço ID: ${orcamento.ordem_servico_id} | Valor das Peças: ${orcamento.valor_pecas} | Valor da Mão de Obra: ${orcamento.valor_mao_de_obra} | Status: ${orcamento.status}`;

                // Botão Excluir
                const btnDelete = document.createElement('button');
                btnDelete.innerText = 'Excluir orçamento';
                btnDelete.addEventListener('click', () => deletarOrcamento(orcamento.id));
                li.appendChild(btnDelete);

                ul.appendChild(li);
            });
        });
}

const formCadastroOrcamento = document.getElementById('CadastroOrcamentos');
formCadastroOrcamento.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarOrcamento(event);
});

function cadastrarOrcamento(form) {
    const orcamentoNovo = {
        ordem_servico_id: form.target.ordem_servico_id.value,
        valor_pecas: form.target.valor_pecas.value,
        valor_mao_de_obra: form.target.valor_mao_de_obra.value,
        status: form.target.status.value,
    };

    fetch('https://pi2sem-sistemaos.onrender.com/orcamentos', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(orcamentoNovo)
    })
    .then(resposta => {
        if (resposta.status !== 201) {
            alert('Erro ao cadastrar o orçamento');
            return;
        }
        alert('Orçamento cadastrado com sucesso!');
        form.target.reset();
        atualizarOrcamentos();
    });
}

function deletarOrcamento(id) {
    if (confirm('Tem certeza que deseja excluir esse orçamento da base de dados?')) {
        fetch(`https://pi2sem-sistemaos.onrender.com/orcamentos/${id}`, { method: 'DELETE' })
        .then(resposta => {
            if (resposta.status !== 200) {
                alert('Erro ao excluir o orçamento');
                return;
            }
            atualizarOrcamentos();
            alert('Orçamento excluído com sucesso!');
        });
    } else {
        alert('Exclusão cancelada!');
    }
}

atualizarOrcamentos();
