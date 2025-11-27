// ==================== DADOS DOS HOTÉIS ====================
const hoteis = [
    {
        nome: "Grand Paris Palace",
        localizacao: "Paris, França",
        estrelas: 5,
        preco: 890,
        imagem: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500",
        comodidades: ["Wi-Fi", "Piscina", "Spa", "Restaurante"],
        destaque: "Luxo"
    },
    {
        nome: "Roma Heritage Hotel",
        localizacao: "Roma, Itália",
        estrelas: 4,
        preco: 650,
        imagem: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=500",
        comodidades: ["Wi-Fi", "Bar", "Academia", "Café da Manhã"],
        destaque: null
    },
    {
        nome: "Tokyo Bay Resort",
        localizacao: "Tóquio, Japão",
        estrelas: 5,
        preco: 1120,
        imagem: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500",
        comodidades: ["Wi-Fi", "Piscina", "Vista Mar", "Spa"],
        destaque: "Mais Popular"
    },
    {
        nome: "Dubai Luxury Suites",
        localizacao: "Dubai, EAU",
        estrelas: 5,
        preco: 1450,
        imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
        comodidades: ["Wi-Fi", "Piscina", "Spa", "Butler Service"],
        destaque: "Premium"
    },
    {
        nome: "London City Hotel",
        localizacao: "Londres, Inglaterra",
        estrelas: 4,
        preco: 780,
        imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
        comodidades: ["Wi-Fi", "Bar", "Academia", "Estacionamento"],
        destaque: null
    },
    {
        nome: "Barcelona Beach Resort",
        localizacao: "Barcelona, Espanha",
        estrelas: 4,
        preco: 590,
        imagem: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500",
        comodidades: ["Wi-Fi", "Praia Privativa", "Piscina", "Restaurante"],
        destaque: "Melhor Custo"
    }
];

// Renderizar hotéis
function renderizarHoteis(listaHoteis = hoteis) {
    const grid = document.getElementById('hoteis-grid');
    grid.innerHTML = '';

    listaHoteis.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';
        
        card.innerHTML = `
            <div style="position: relative;">
                <img class="hotel-image" src="${hotel.imagem}" alt="${hotel.nome}">
                ${hotel.destaque ? `<div class="hotel-badge">${hotel.destaque}</div>` : ''}
            </div>
            <div class="hotel-info">
                <div class="hotel-header">
                    <div>
                        <div class="hotel-nome">${hotel.nome}</div>
                        <div class="hotel-estrelas">${'★'.repeat(hotel.estrelas)}</div>
                    </div>
                </div>
                <div class="hotel-localizacao">
                    📍 ${hotel.localizacao}
                </div>
                <div class="hotel-comodidades">
                    ${hotel.comodidades.map(c => `<span class="comodidade-tag">${c}</span>`).join('')}
                </div>
                <div class="hotel-footer">
                    <div class="hotel-preco">
                        <span class="preco-label">A partir de</span>
                        <span class="preco-valor">R$ ${hotel.preco}</span>
                        <span class="preco-noite">/noite</span>
                    </div>
                    <button class="btn-reservar" onclick="reservarHotel('${hotel.nome}')">Reservar</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Buscar hotéis
function buscarHoteis() {
    const destino = document.getElementById('destino').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    
    if (!destino) {
        alert('Por favor, informe um destino!');
        return;
    }
    
    if (!checkin || !checkout) {
        alert('Por favor, selecione as datas de check-in e check-out!');
        return;
    }
    
    alert(`Buscando hotéis em ${destino}...\nCheck-in: ${checkin}\nCheck-out: ${checkout}`);
    renderizarHoteis();
}

// Filtrar por categoria
function filtrarCategoria(categoria) {
    alert(`Mostrando hotéis da categoria: ${categoria}`);
    renderizarHoteis();
}

// Reservar hotel
function reservarHotel(nomeHotel) {
    alert(`Iniciando reserva para: ${nomeHotel}\n\nVocê será redirecionado para a página de pagamento.`);
}

// Definir data mínima como hoje
const hoje = new Date().toISOString().split('T')[0];
document.getElementById('checkin').min = hoje;
document.getElementById('checkout').min = hoje;

// Atualizar data mínima do checkout quando checkin mudar
document.getElementById('checkin').addEventListener('change', function() {
    document.getElementById('checkout').min = this.value;
});

// Renderizar hotéis ao carregar a página
renderizarHoteis();

// ==================== ELEMENTOS DOM ====================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const backArrow = document.getElementById("back-arrow");
const perfilImg = document.getElementById("perfil-img");
const dropdownMenu = document.getElementById("dropdown-menu");
const mobilePerfilImg = document.getElementById("mobile-perfil-img");
const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
const searchIcon = document.getElementById("searchIcon");
const searchInputContainer = document.getElementById("searchInputContainer");
const searchInput = document.getElementById("search-input");

let searchActive = false;

// ==================== MENU MOBILE ====================
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
});

overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
});

backArrow.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
});

const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
mobileMenuItems.forEach(item => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    });
});

// ==================== DROPDOWN PERFIL ====================
if (perfilImg) {
    perfilImg.addEventListener("click", e => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("active");
    });
}

if (mobilePerfilImg) {
    mobilePerfilImg.addEventListener("click", e => {
        e.stopPropagation();
        mobileDropdownMenu.classList.toggle("active");
    });
}

document.addEventListener("click", e => {
    if (dropdownMenu && !dropdownMenu.contains(e.target) && e.target !== perfilImg) {
        dropdownMenu.classList.remove("active");
    }
    if (mobileDropdownMenu && !mobileDropdownMenu.contains(e.target) && e.target !== mobilePerfilImg) {
        mobileDropdownMenu.classList.remove("active");
    }
});

if (dropdownMenu) dropdownMenu.addEventListener("click", e => e.stopPropagation());
if (mobileDropdownMenu) mobileDropdownMenu.addEventListener("click", e => e.stopPropagation());

// ==================== BARRA DE PESQUISA - Apenas abrir/fechar ====================
searchIcon.addEventListener("click", e => {
    e.stopPropagation();
    searchActive = !searchActive;

    if (searchActive) {
        searchInputContainer.classList.add("active");
        searchIcon.classList.add("active");
        setTimeout(() => searchInput.focus(), 400);
    } else {
        searchInputContainer.classList.remove("active");
        searchIcon.classList.remove("active");
        searchInput.value = "";
    }
});

// Fechar pesquisa ao clicar fora
document.addEventListener("click", e => {
    if (searchActive && 
        !searchInputContainer.contains(e.target) && 
        e.target !== searchIcon) {
        if (searchInput.value.trim() === "") {
            searchActive = false;
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
        }
    }
});

searchInput.addEventListener("click", e => e.stopPropagation());

// ==================== RESPONSIVIDADE ====================
window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// ==================== ANIMAÇÕES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);