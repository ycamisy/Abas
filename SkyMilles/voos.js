const voos = [];

// Formatar valor como moeda
document.getElementById('valor').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    e.target.value = 'R$ ' + value;
});

// Validar datas
document.getElementById('chegada').addEventListener('change', function () {
    const saida = new Date(document.getElementById('saida').value);
    const chegada = new Date(this.value);

    if (chegada <= saida) {
        showMessage('A data/hora de chegada deve ser posterior à saída!', 'error');
        this.value = '';
    }
});

// Validar origem e destino
document.getElementById('destino').addEventListener('change', function () {
    const origem = document.getElementById('origem').value;
    if (origem && origem === this.value) {
        showMessage('Origem e destino não podem ser iguais!', 'error');
        this.value = '';
    }
});

// Submeter formulário
document.getElementById('flightForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const voo = {
        id: Date.now(),
        origem: document.getElementById('origem').value,
        destino: document.getElementById('destino').value,
        codigo: document.getElementById('codigo').value,
        saida: document.getElementById('saida').value,
        chegada: document.getElementById('chegada').value,
        frequencia: document.getElementById('frequencia').value,
        companhia: document.getElementById('companhia').value,
        assentos: document.getElementById('assentos').value,
        status: document.getElementById('status').value,
        modelo: document.getElementById('modelo').value,
        valor: document.getElementById('valor').value
    };

    voos.push(voo);
    console.log('Voo cadastrado:', voo);
    console.log('Total de voos:', voos.length);

    showMessage('Voo cadastrado com sucesso!', 'success');

    setTimeout(() => {
        this.reset();
    }, 1500);
});

function showMessage(text, type) {
    const existing = document.querySelector('.message');
    if (existing) existing.remove();

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);

    setTimeout(() => message.remove(), 3000);
}

function cancelar() {
    if (confirm('Deseja realmente cancelar? Todos os dados serão perdidos.')) {
        document.getElementById('flightForm').reset();
        showMessage('Formulário cancelado', 'error');
    }
}

function voltar() {
    window.history.back();
}