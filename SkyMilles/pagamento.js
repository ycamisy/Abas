// ==========================================
// CONFIGURAÇÃO DOS PLANOS
// ==========================================
const planos = {
    basico: {
        nome: 'Plano Básico',
        badge: 'PLANO BÁSICO',
        preco: 199.99,
        cor: '#3498db',
        beneficios: [
            '✓ 1 bagagem',
            '✓ Check-in online',
            '✓ 25% de desconto em voos internacionais'
        ]
    },
    plus: {
        nome: 'Plano Plus',
        badge: 'PLANO PLUS',
        preco: 389.99,
        cor: '#28b463',
        beneficios: [
            '✓ 2 bagagens',
            '✓ Milhas acumulativas',
            '✓ Embarque prioritário',
            '✓ Suporte prioritário'
        ]
    },
    premium: {
        nome: 'Plano Premium',
        badge: 'PLANO PREMIUM',
        preco: 749.99,
        cor: '#8e44ad',
        beneficios: [
            '✓ 2 bagagens + taxa extra isentada',
            '✓ Milhas acumulativas + extras',
            '✓ Lounge VIP',
            '✓ Suporte 24 horas'
        ]
    }
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Página de pagamento carregada');
    
    // Carregar plano selecionado
    loadSelectedPlan();
    
    // Configurar tabs de pagamento
    setupPaymentTabs();
    
    // Configurar máscaras
    setupMasks();
    
    // Configurar formulário
    setupForm();
    
    // Esconder loading
    document.getElementById('loading').classList.remove('active');
});

// ==========================================
// CARREGAR PLANO SELECIONADO
// ==========================================
function loadSelectedPlan() {
    // Pegar plano da URL ou localStorage
    const urlParams = new URLSearchParams(window.location.search);
    let planoSelecionado = urlParams.get('plano') || localStorage.getItem('planoSelecionado') || 'basico';
    
    console.log('📦 Plano selecionado:', planoSelecionado);
    
    const plano = planos[planoSelecionado];
    
    if (!plano) {
        console.error('❌ Plano não encontrado');
        return;
    }
    
    // Atualizar UI
    document.getElementById('planBadge').textContent = plano.badge;
    document.getElementById('planBadge').style.background = plano.cor;
    document.getElementById('planBadge').style.color = 'white';
    document.getElementById('planName').textContent = plano.nome;
    document.getElementById('planPrice').textContent = `R$ ${plano.preco.toFixed(2).replace('.', ',')}`;
    
    // Atualizar benefícios
    const beneficiosList = document.querySelector('.benefits-list ul');
    beneficiosList.innerHTML = '';
    plano.beneficios.forEach(beneficio => {
        const li = document.createElement('li');
        li.textContent = beneficio;
        beneficiosList.appendChild(li);
    });
    
    // Atualizar preços
    const precoFormatado = `R$ ${plano.preco.toFixed(2).replace('.', ',')}`;
    document.getElementById('subtotal').textContent = precoFormatado;
    document.getElementById('total').textContent = precoFormatado;
    document.getElementById('boletoValue').textContent = precoFormatado;
    
    // Salvar no localStorage
    localStorage.setItem('planoSelecionado', planoSelecionado);
    localStorage.setItem('planoPreco', plano.preco);
}

// ==========================================
// TABS DE PAGAMENTO
// ==========================================
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.payment-tab');
    const contents = document.querySelectorAll('.payment-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            
            // Remover active de todos
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Adicionar active ao selecionado
            this.classList.add('active');
            
            if (method === 'credit') {
                document.getElementById('formCartao').classList.add('active');
            } else if (method === 'pix') {
                document.getElementById('formPix').classList.add('active');
            } else if (method === 'boleto') {
                document.getElementById('formBoleto').classList.add('active');
            }
        });
    });
}

// ==========================================
// MÁSCARAS DE INPUT
// ==========================================
function setupMasks() {
    // Máscara de cartão
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Máscara de validade
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Máscara de CPF
    const cardCpf = document.getElementById('cardCpf');
    if (cardCpf) {
        cardCpf.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }
    
    // Máscara de CVV
    const cardCvv = document.getElementById('cardCvv');
    if (cardCvv) {
        cardCvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// ==========================================
// CONFIGURAR FORMULÁRIO
// ==========================================
function setupForm() {
    const form = document.getElementById('formCartao');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            processPayment('credit');
        });
    }
}

// ==========================================
// PROCESSAR PAGAMENTO
// ==========================================
function processPayment(method) {
    console.log('💳 Processando pagamento:', method);
    
    // Mostrar loading
    document.getElementById('loading').classList.add('active');
    
    // Simular processamento
    setTimeout(() => {
        document.getElementById('loading').classList.remove('active');
        showSuccessModal();
        
        // Salvar no localStorage que o plano foi assinado
        const planoSelecionado = localStorage.getItem('planoSelecionado');
        localStorage.setItem('planoAtivo', planoSelecionado);
        localStorage.setItem('dataAssinatura', new Date().toISOString());
    }, 2000);
}

// ==========================================
// COPIAR CÓDIGO PIX
// ==========================================
function copyPixCode() {
    const pixCode = document.getElementById('pixCode');
    pixCode.select();
    document.execCommand('copy');
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copiado!';
    btn.style.background = '#4caf50';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#4d9fb8';
    }, 2000);
}

// ==========================================
// CONFIRMAR PAGAMENTO PIX
// ==========================================
function confirmPayment(method) {
    console.log('✓ Confirmando pagamento:', method);
    
    document.getElementById('loading').classList.add('active');
    
    setTimeout(() => {
        document.getElementById('loading').classList.remove('active');
        showSuccessModal();
        
        const planoSelecionado = localStorage.getItem('planoSelecionado');
        localStorage.setItem('planoAtivo', planoSelecionado);
        localStorage.setItem('dataAssinatura', new Date().toISOString());
    }, 1500);
}

// ==========================================
// GERAR BOLETO
// ==========================================
function generateBoleto() {
    console.log('📄 Gerando boleto...');
    
    document.getElementById('loading').classList.add('active');
    
    setTimeout(() => {
        document.getElementById('loading').classList.remove('active');
        
        // Simular download de boleto
        alert('📄 Boleto gerado com sucesso!\n\nO boleto foi enviado para seu e-mail e está disponível para download.');
        
        // Em produção, aqui seria o download real
        // window.open('boleto.pdf', '_blank');
    }, 2000);
}

// ==========================================
// MODAL DE SUCESSO
// ==========================================
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Confete (opcional)
    console.log('🎉 Pagamento realizado com sucesso!');
}

console.log('✅ pagamento.js carregado');