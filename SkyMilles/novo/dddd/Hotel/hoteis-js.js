// Copiar funções base de passagens.js (menu mobile, perfil, search)
// Aqui incluímos apenas as funções específicas de hotéis

// ==================== ELEMENTOS DOM ====================
const hospedesInput = document.getElementById('hospedesInput');
const guestsPanel = document.getElementById('guestsPanel');
const counterButtons = document.querySelectorAll('.counter-btn');
const filtroButtons = document.querySelectorAll('.filtro-btn');
const hotelCards = document.querySelectorAll('.hotel-card');
const btnFavoritos = document.querySelectorAll('.btn-favorito');
const btnSearch = document.getElementById('btnSearch');
const btnNewsletter = document.querySelector('.btn-newsletter');

let hospedes = {
    adultos: 2,
    criancas: 0,
    quartos: 1
};

// ==================== HÓSPEDES E QUARTOS ====================
function initHospedes() {
    if (hospedesInput) {
        hospedesInput.addEventListener('click', (e) => {
            e.stopPropagation();
            guestsPanel.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (guestsPanel && 
            !guestsPanel.contains(e.target) && 
            e.target !== hospedesInput) {
            guestsPanel.classList.remove('active');
        }
    });

    counterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const type = button.dataset.type;
            
            if (action === 'increase') {
                hospedes[type]++;
            } else if (action === 'decrease' && hospedes[type] > 0) {
                if (type === 'adultos' && hospedes[type] === 1) return;
                if (type === 'quartos' && hospedes[type] === 1) return;
                hospedes[type]--;
            }
            
            atualizarHospedes();
        });
    });
    
    atualizarHospedes();
}

function atualizarHospedes() {
    const adultos = hospedes.adultos;
    const criancas = hospedes.criancas;
    const quartos = hospedes.quartos;
    
    document.getElementById('adultosValue').textContent = adultos;
    document.getElementById('criancasValue').textContent = criancas;
    document.getElementById('quartosValue').textContent = quartos;
    
    let texto = `${adultos} Adulto${adultos > 1 ? 's' : ''}`;
    if (criancas > 0) texto += `, ${criancas} Criança${criancas > 1 ? 's' : ''}`;
    texto += `, ${quartos} Quarto${quartos > 1 ? 's' : ''}`;
    
    hospedesInput.value = texto;
}

// ==================== FILTROS ==================== 
function initFiltros() {
    filtroButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filtro = button.dataset.filtro;
            
            filtroButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            filtrarHoteis(filtro);
        });
    });
}

function filtrarHoteis(filtro) {
    hotelCards.forEach(card => {
        const categorias = card.dataset.categoria || '';
        
        if (filtro === 'todos') {
            card.style.display = 'flex';
        } else if (categorias.includes(filtro)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    
    setTimeout(() => {
        const hoteisSection = document.querySelector('.hoteis-section');
        if (hoteisSection) {
            hoteisSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// ==================== FAVORITOS ====================
function initFavoritos() {
    btnFavoritos.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            
            const hotel = btn.closest('.hotel-card').dataset.nome;
            if (btn.classList.contains('active')) {
                mostrarMensagem(`${hotel} adicionado aos favoritos ❤️`);
            } else {
                mostrarMensagem(`${hotel} removido dos favoritos`);
            }
        });
    });
}

// ==================== BUSCA DE HOTÉIS ====================
function initBusca() {
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            buscarHoteis();
        });
    }
    
    const hoje = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) checkInInput.min = hoje;
    if (checkOutInput) checkOutInput.min = hoje;
}

function buscarHoteis() {
    const destino = document.getElementById('destino').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    if (!destino || !checkIn || !checkOut) {
        mostrarMensagem('Por favor, preencha todos os campos');
        return;
    }
    
    const dataIn = new Date(checkIn);
    const dataOut = new Date(checkOut);
    
    if (dataOut <= dataIn) {
        mostrarMensagem('A data de check-out deve ser posterior ao check-in');
        return;
    }
    
    const noites = Math.ceil((dataOut - dataIn) / (1000 * 60 * 60 * 24));
    
    mostrarMensagem(`Buscando hotéis em ${destino}...`);
    
    setTimeout(() => {
        mostrarMensagem(`Encontramos 87 hotéis para ${noites} noite${noites > 1 ? 's' : ''}!`);
    }, 2000);
}

// ==================== PESQUISA ====================
function initSearchSystem() {
    const searchIcon = document.getElementById('searchIcon');
    const searchInputContainer = document.getElementById('searchInputContainer');
    const searchInput = document.getElementById('search-input');
    
    if (!searchIcon || !searchInputContainer || !searchInput) return;
    
    let searchActive = false;

    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchActive = !searchActive;

        if (searchActive) {
            searchInputContainer.classList.add('active');
            searchIcon.classList.add('active');
            setTimeout(() => searchInput.focus(), 400);
        } else {
            searchInputContainer.classList.remove('active');
            searchIcon.classList.remove('active');
            searchInput.value = '';
            limparPesquisa();
        }
    });

    searchInput.addEventListener('input', (e) => {
        pesquisarHoteis(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchActive = false;
            searchInputContainer.classList.remove('active');
            searchIcon.classList.remove('active');
            searchInput.value = '';
            limparPesquisa();
            searchInput.blur();
        }
    });
}

function pesquisarHoteis(termo) {
    const termoBusca = termo.toLowerCase().trim();
    
    if (termoBusca === '') {
        limparPesquisa();
        return;
    }
    
    let encontrados = 0;
    
    hotelCards.forEach(card => {
        const nome = card.dataset.nome?.toLowerCase() || '';
        const texto = card.textContent.toLowerCase();
        
        if (nome.includes(termoBusca) || texto.includes(termoBusca)) {
            card.style.border = '3px solid #f8c537';
            card.style.boxShadow = '0 0 20px rgba(248, 197, 55, 0.6)';
            card.style.display = 'flex';
            encontrados++;
        } else {
            card.style.border = 'none';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    if (encontrados > 0) {
        mostrarMensagem(`${encontrados} hotel(is) encontrado(s)`);
    } else {
        mostrarMensagem(`Nenhum hotel encontrado para "${termo}"`);
    }
}

function limparPesquisa() {
    hotelCards.forEach(card => {
        card.style.border = 'none';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        card.style.display = 'flex';
    });
}

// ==================== NEWSLETTER ====================
function initNewsletter() {
    if (btnNewsletter) {
        btnNewsletter.addEventListener('click', () => {
            const email = document.getElementById('newsletterEmail').value.trim();
            
            if (!email) {
                mostrarMensagem('Por favor, insira seu e-mail');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarMensagem('Por favor, insira um e-mail válido');
                return;
            }
            
            mostrarMensagem('Inscrição realizada com sucesso! 🎉');
            document.getElementById('newsletterEmail').value = '';
        });
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== UTILIDADES ====================
function mostrarMensagem(texto) {
    const mensagemExistente = document.querySelector('.mensagem-pesquisa');
    if (mensagemExistente) mensagemExistente.remove();
    
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-pesquisa';
    mensagem.style.cssText = `
        position: fixed; top: 120px; right: 20px; z-index: 9999;
        background: rgba(0, 0, 0, 0.9); color: white; padding: 15px 25px;
        border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.style.opacity = '0';
        mensagem.style.transition = 'opacity 0.3s';
        setTimeout(() => mensagem.remove(), 300);
    }, 3000);
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initHospedes();
    initFiltros();
    initFavoritos();
    initBusca();
    initSearchSystem();
    initNewsletter();
});