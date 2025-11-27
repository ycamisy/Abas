// Dados dos voos
const voos = [
    {
        id: 1,
        origem: 'São Paulo',
        destino: 'Paris',
        preco: 'R$ 3.499',
        data: '15 Dez - 22 Dez',
        companhia: 'LATAM',
        vendas: 156,
        economia: '30%',
        imagem: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop'
    },
    {
        id: 2,
        origem: 'Rio de Janeiro',
        destino: 'Nova York',
        preco: 'R$ 2.899',
        data: '10 Jan - 20 Jan',
        companhia: 'Gol',
        vendas: 142,
        economia: '25%',
        imagem: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop'
    },
    {
        id: 3,
        origem: 'Brasília',
        destino: 'Lisboa',
        preco: 'R$ 3.199',
        data: '05 Fev - 15 Fev',
        companhia: 'TAP',
        vendas: 128,
        economia: '20%',
        imagem: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=400&fit=crop'
    },
    {
        id: 4,
        origem: 'Belo Horizonte',
        destino: 'Cancún',
        preco: 'R$ 2.599',
        data: '20 Dez - 28 Dez',
        companhia: 'Azul',
        vendas: 115,
        economia: '35%',
        imagem: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&h=400&fit=crop'
    }
];

// Dados dos pacotes
const pacotes = [
    {
        id: 1,
        destino: 'Maldivas',
        duracao: '7 dias / 6 noites',
        preco: 'R$ 8.999',
        inclui: 'Voo + Hotel 5★ + Café da manhã',
        imagem: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=300&fit=crop',
        vendas: 89,
        avaliacao: 4.9
    },
    {
        id: 2,
        destino: 'Dubai',
        duracao: '5 dias / 4 noites',
        preco: 'R$ 6.499',
        inclui: 'Voo + Hotel 4★ + City Tour',
        imagem: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=300&fit=crop',
        vendas: 76,
        avaliacao: 4.8
    },
    {
        id: 3,
        destino: 'Fernando de Noronha',
        duracao: '4 dias / 3 noites',
        preco: 'R$ 4.299',
        inclui: 'Voo + Pousada + Mergulho',
        imagem: 'https://images.unsplash.com/photo-1581791534314-e3f26d2c74b4?w=800&h=300&fit=crop',
        vendas: 94,
        avaliacao: 4.9
    },
    {
        id: 4,
        destino: 'Buenos Aires',
        duracao: '6 dias / 5 noites',
        preco: 'R$ 3.799',
        inclui: 'Voo + Hotel 4★ + Passeios',
        imagem: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=300&fit=crop',
        vendas: 67,
        avaliacao: 4.7
    }
];

// Função para renderizar voos
function renderVoos() {
    const container = document.getElementById('voos-content');
    container.innerHTML = voos.map(voo => `
        <div class="card" onclick="reservarVoo(${voo.id})">
            <div class="card-image">
                <img src="${voo.imagem}" alt="${voo.destino}">
                <div class="badge">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                    </svg>
                    <span>${voo.vendas} vendas</span>
                </div>
                <div class="discount-badge">-${voo.economia}</div>
            </div>
            <div class="card-content">
                <div class="flight-route">
                    <div class="location">
                        <p class="location-label">Origem</p>
                        <p class="location-name">${voo.origem}</p>
                    </div>
                    <svg class="plane-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                    </svg>
                    <div class="location right">
                        <p class="location-label">Destino</p>
                        <p class="location-name">${voo.destino}</p>
                    </div>
                </div>
                <div class="card-details">
                    <div class="detail-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${voo.data}
                    </div>
                    <div>• ${voo.companhia}</div>
                </div>
                <div class="card-footer">
                    <div class="price-section">
                        <p>A partir de</p>
                        <div class="price">${voo.preco}</div>
                    </div>
                    <button class="btn-reserve">Reservar</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para renderizar pacotes
function renderPacotes() {
    const container = document.getElementById('pacotes-content');
    container.innerHTML = pacotes.map(pacote => `
        <div class="card" onclick="verPacote(${pacote.id})">
            <div class="card-image">
                <img src="${pacote.imagem}" alt="${pacote.destino}">
                <div class="rating-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>${pacote.avaliacao}</span>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${pacote.destino}</h3>
                <div class="card-details">
                    <div class="detail-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${pacote.duracao}
                    </div>
                </div>
                <div class="purchases-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                    </svg>
                    <span>${pacote.vendas} pessoas compraram</span>
                </div>
                <p class="card-description">${pacote.inclui}</p>
                <div class="card-footer">
                    <div class="price-section">
                        <p>Pacote completo</p>
                        <div class="price">${pacote.preco}</div>
                    </div>
                    <button class="btn-reserve">Ver Pacote</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para alternar abas
function showTab(tab) {
    const voosContent = document.getElementById('voos-content');
    const pacotesContent = document.getElementById('pacotes-content');
    const tabVoos = document.getElementById('tab-voos');
    const tabPacotes = document.getElementById('tab-pacotes');

    if (tab === 'voos') {
        voosContent.classList.remove('hidden');
        pacotesContent.classList.add('hidden');
        tabVoos.classList.add('active');
        tabPacotes.classList.remove('active');
    } else {
        voosContent.classList.add('hidden');
        pacotesContent.classList.remove('hidden');
        tabVoos.classList.remove('active');
        tabPacotes.classList.add('active');
    }
}

// Função para reservar voo
function reservarVoo(id) {
    const voo = voos.find(v => v.id === id);
    abrirModal('voo', voo);
}

// Função para ver pacote
function verPacote(id) {
    const pacote = pacotes.find(p => p.id === id);
    abrirModal('pacote', pacote);
}

// Variável global para armazenar a reserva atual
let reservaAtual = null;

// Função para abrir o modal
function abrirModal(tipo, item) {
    reservaAtual = { tipo, item };
    const modal = document.getElementById('reservaModal');
    const summary = document.getElementById('bookingSummary');
    
    if (tipo === 'voo') {
        summary.innerHTML = `
            <h4>Detalhes do Voo</h4>
            <p><strong>Origem:</strong> ${item.origem}</p>
            <p><strong>Destino:</strong> ${item.destino}</p>
            <p><strong>Data:</strong> ${item.data}</p>
            <p><strong>Companhia:</strong> ${item.companhia}</p>
            <p><strong>Valor:</strong> <span style="color: #2685A8; font-weight: bold;">${item.preco}</span></p>
        `;
    } else {
        summary.innerHTML = `
            <h4>Detalhes do Pacote</h4>
            <p><strong>Destino:</strong> ${item.destino}</p>
            <p><strong>Duração:</strong> ${item.duracao}</p>
            <p><strong>Inclui:</strong> ${item.inclui}</p>
            <p><strong>Avaliação:</strong> ${item.avaliacao} ⭐</p>
            <p><strong>Valor:</strong> <span style="color: #2685A8; font-weight: bold;">${item.preco}</span></p>
        `;
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('reservaModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.getElementById('reservaForm').reset();
    document.getElementById('successMessage').classList.remove('show');
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('reservaModal');
    if (event.target == modal) {
        fecharModal();
    }
}

// Função para enviar a reserva
async function enviarReserva(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Adicionar dados da reserva
    formData.append('tipo', reservaAtual.tipo);
    formData.append('item_id', reservaAtual.item.id);
    
    if (reservaAtual.tipo === 'voo') {
        formData.append('origem', reservaAtual.item.origem);
        formData.append('destino', reservaAtual.item.destino);
        formData.append('data', reservaAtual.item.data);
        formData.append('companhia', reservaAtual.item.companhia);
    } else {
        formData.append('destino', reservaAtual.item.destino);
        formData.append('duracao', reservaAtual.item.duracao);
    }
    
    formData.append('preco', reservaAtual.item.preco);
    
    try {
        const response = await fetch('./processar_reserva.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('successMessage').classList.add('show');
            document.getElementById('reservaForm').reset();
            
            setTimeout(() => {
                fecharModal();
            }, 2000);
        } else {
            alert('Erro ao processar reserva: ' + result.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar reserva. Por favor, tente novamente.');
    }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderVoos();
    renderPacotes();
});