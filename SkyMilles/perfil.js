// Avatares disponíveis
const avatares = [
    { id: 'avatar1.jpg', url: 'https://i.postimg.cc/qMvvdyYp/download-3.jpg' },
    { id: 'avatar2.jpg', url: 'https://i.postimg.cc/gk22P85P/doninha.jpg' },
    { id: 'avatar3.jpg', url: 'https://i.postimg.cc/Qxddr1P8/download-4.jpg' },
    { id: 'avatar4.jpg', url: 'https://i.postimg.cc/DyG80f2p/95d2087a51e8477cff8d9aac8a1687ac.jpg' },
    { id: 'avatar5.jpg', url: 'https://i.postimg.cc/kXSBGMnS/09fae38fce5289fec7b95973e168b74e.jpg' },
    { id: 'avatar6.jpg', url: 'https://i.postimg.cc/T3XhD8wq/130bcb30c2ece47f478f17fc599e079f.jpg' },
    { id: 'avatar7.jpg', url: 'https://i.postimg.cc/PrDPJfty/c3119445123adbaabddd9e917d671962.jpg' },
    { id: 'avatar8.jpg', url: 'https://i.postimg.cc/y8zWZqdy/135745bda10f46307e35af3b61ffa7c0.jpg' },
    { id: 'avatar9.jpg', url: 'https://i.postimg.cc/Vkc5Cy6R/2f581e343e0b3052fcf53ac5bd43cce2.jpg' },
    { id: 'avatar10.jpg', url: 'https://i.postimg.cc/CL8z5MFN/299ba43cd3e2f2781dfccaf5d43e7680.jpg' },
    { id: 'avatar11.jpg', url: 'https://i.postimg.cc/ncmCrVHd/694063de7108d916ba95b74d5cb3636a.jpg' },
    { id: 'avatar12.jpg', url: 'https://i.postimg.cc/15FfXR9r/357141eb2db8e3dbe1dcafb37df5767d.jpg' },
    { id: 'avatar13.jpg', url: 'https://i.postimg.cc/gj8NkwNL/6339b727f95a8d5728e87b3a53d88568.jpg' },
    { id: 'avatar14.jpg', url: 'https://i.postimg.cc/mZHdSqRp/b040e76ad3b62145df9c938f4c96e5b8.jpg' },
    { id: 'avatar15.jpg', url: 'https://i.postimg.cc/RVtNhCMQ/300b74730de24b8b1d99a8b29faa85d6.jpg' },
    { id: 'avatar16.jpg', url: 'https://i.postimg.cc/xjzsP7Ys/sako.jpg' }
];

let selectedAvatarUrl = null;

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Página de perfil carregada');
    
    // Verificar se usuário está logado
    if (!isUserLoggedIn()) {
        showNotification('Você precisa fazer login!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    // Carregar dados do usuário
    loadUserData();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Carregar avatares
    carregarAvatares();
    
    // Esconder loading
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 500);
});

// ==========================================
// CARREGAR DADOS DO USUÁRIO
// ==========================================
function loadUserData() {
    const user = getLoggedUser();
    
    if (!user) {
        console.error('❌ Usuário não encontrado');
        return;
    }
    
    console.log('📥 Carregando dados do usuário:', user);
    
    // Atualizar sidebar
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileAvatar').src = user.photo || avatares[0].url;
    
    // Preencher formulário de dados pessoais
    document.getElementById('nomeCompleto').value = user.name || '';
    document.getElementById('nomeUsuario').value = user.username || '';
    document.getElementById('email').value = user.email || '';
    
    // Buscar dados completos do servidor
    fetchUserDataFromServer(user.id);
}

async function fetchUserDataFromServer(userId) {
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'get_user_data',
                user_id: userId
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Dados do servidor:', result.data);
            fillFormData(result.data);
        }
    } catch (error) {
        console.error('❌ Erro ao buscar dados:', error);
    }
}

function fillFormData(data) {
    // Dados pessoais
    if (data.cpf) document.getElementById('cpfRg').value = data.cpf;
    if (data.data_nasc) document.getElementById('dataNasc').value = data.data_nasc;
    if (data.sexo) document.getElementById('sexo').value = data.sexo;
    
    // Endereço (parsear se estiver no formato completo)
    if (data.endereco) {
        parseEndereco(data.endereco);
    }
}

function parseEndereco(enderecoCompleto) {
    // Tentar extrair partes do endereço
    // Formato esperado: "Rua X, 123 - Bairro, Cidade/UF"
    const parts = enderecoCompleto.split(',');
    
    if (parts.length >= 3) {
        const rua = parts[0].trim();
        const numero = parts[1].trim().split('-')[0].trim();
        const resto = parts[2].trim();
        
        document.getElementById('endereco').value = rua;
        document.getElementById('numero').value = numero;
        
        // Tentar extrair cidade e estado
        const cidadeEstado = resto.split('/');
        if (cidadeEstado.length === 2) {
            document.getElementById('cidade').value = cidadeEstado[0].trim();
            document.getElementById('estado').value = cidadeEstado[1].trim();
        }
    }
}

// ==========================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ==========================================
function showSection(sectionName) {
    console.log('📄 Mostrando seção:', sectionName);
    
    // Esconder todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    document.getElementById(`section-${sectionName}`).classList.add('active');
    
    // Marcar botão como ativo
    event.target.classList.add('active');
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Formulário de dados pessoais
    document.getElementById('formDadosPessoais').addEventListener('submit', handleSaveDadosPessoais);
    
    // Formulário de endereço
    document.getElementById('formEndereco').addEventListener('submit', handleSaveEndereco);
    
    // Formulário de senha
    document.getElementById('formSenha').addEventListener('submit', handleChangeSenha);
    
    // CEP
    document.getElementById('cep').addEventListener('blur', buscarCEP);
}

// ==========================================
// SALVAR DADOS PESSOAIS
// ==========================================
async function handleSaveDadosPessoais(e) {
    e.preventDefault();
    
    const user = getLoggedUser();
    const data = {
        action: 'update_dados_pessoais',
        user_id: user.id,
        nomeCompleto: document.getElementById('nomeCompleto').value,
        nomeUsuario: document.getElementById('nomeUsuario').value,
        email: document.getElementById('email').value,
        cpfRg: document.getElementById('cpfRg').value,
        dataNasc: document.getElementById('dataNasc').value,
        sexo: document.getElementById('sexo').value
    };
    
    console.log('💾 Salvando dados pessoais:', data);
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Dados salvos com sucesso!', 'success');
            
            // Atualizar localStorage
            user.name = data.nomeCompleto;
            user.email = data.email;
            user.username = data.nomeUsuario;
            setLoggedUser(user);
            
            // Atualizar sidebar
            document.getElementById('profileName').textContent = user.name;
            document.getElementById('profileEmail').textContent = user.email;
            
            // Atualizar UI global
            updateProfileUI();
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao salvar:', error);
        showNotification('Erro ao salvar dados', 'error');
    }
}

// ==========================================
// SALVAR ENDEREÇO
// ==========================================
async function handleSaveEndereco(e) {
    e.preventDefault();
    
    const user = getLoggedUser();
    const enderecoCompleto = montarEnderecoCompleto();
    
    const data = {
        action: 'update_endereco',
        user_id: user.id,
        endereco: enderecoCompleto
    };
    
    console.log('💾 Salvando endereço:', data);
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Endereço salvo com sucesso!', 'success');
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao salvar:', error);
        showNotification('Erro ao salvar endereço', 'error');
    }
}

function montarEnderecoCompleto() {
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    
    return `${endereco}, ${numero}${complemento ? ' - ' + complemento : ''} - ${bairro}, ${cidade}/${estado}`;
}

// ==========================================
// ALTERAR SENHA
// ==========================================
async function handleChangeSenha(e) {
    e.preventDefault();
    
    const senhaAtual = document.getElementById('senhaAtual').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmaNovaSenha = document.getElementById('confirmaNovaSenha').value;
    
    if (novaSenha !== confirmaNovaSenha) {
        showNotification('❌ As senhas não coincidem!', 'error');
        return;
    }
    
    if (novaSenha.length < 6) {
        showNotification('❌ A senha deve ter no mínimo 6 caracteres!', 'error');
        return;
    }
    
    const user = getLoggedUser();
    
    const data = {
        action: 'change_password',
        user_id: user.id,
        senhaAtual: senhaAtual,
        novaSenha: novaSenha
    };
    
    console.log('🔐 Alterando senha...');
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Senha alterada com sucesso!', 'success');
            document.getElementById('formSenha').reset();
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao alterar senha:', error);
        showNotification('Erro ao alterar senha', 'error');
    }
}

// ==========================================
// BUSCAR CEP
// ==========================================
async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length !== 8) return;
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
            document.getElementById('endereco').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
            showNotification('✅ CEP encontrado!', 'success');
        } else {
            showNotification('❌ CEP não encontrado', 'error');
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }
}

// ==========================================
// MODAL DE AVATAR
// ==========================================
function carregarAvatares() {
    const grid = document.getElementById('avatarGrid');
    grid.innerHTML = '';
    
    avatares.forEach((avatar, index) => {
        const div = document.createElement('div');
        div.className = 'avatar-option';
        
        const img = document.createElement('img');
        img.src = avatar.url;
        img.alt = `Avatar ${index + 1}`;
        
        div.appendChild(img);
        div.onclick = () => selecionarAvatar(avatar.url, div);
        
        grid.appendChild(div);
    });
}

function openAvatarModal() {
    document.getElementById('avatarModal').classList.add('active');
}

function closeAvatarModal() {
    document.getElementById('avatarModal').classList.remove('active');
}

function selecionarAvatar(url, element) {
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedAvatarUrl = url;
}

async function saveAvatar() {
    if (!selectedAvatarUrl) {
        showNotification('❌ Selecione um avatar!', 'error');
        return;
    }
    
    const user = getLoggedUser();
    
    const data = {
        action: 'update_avatar',
        user_id: user.id,
        avatar_url: selectedAvatarUrl
    };
    
    console.log('📸 Salvando avatar:', data);
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Avatar atualizado!', 'success');
            
            // Atualizar localStorage
            user.photo = selectedAvatarUrl;
            setLoggedUser(user);
            
            // Atualizar imagens
            document.getElementById('profileAvatar').src = selectedAvatarUrl;
            
            // Atualizar UI global
            updateProfileUI();
            
            closeAvatarModal();
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao salvar avatar:', error);
        showNotification('Erro ao salvar avatar', 'error');
    }
}

// ==========================================
// EXCLUIR CONTA
// ==========================================
function deleteAccount() {
    const confirmacao = confirm('⚠️ ATENÇÃO!\n\nVocê tem certeza que deseja excluir sua conta?\n\nEsta ação é PERMANENTE e não pode ser desfeita!\n\nTodos os seus dados serão apagados.');
    
    if (!confirmacao) return;
    
    const confirmacao2 = confirm('Esta é sua última chance!\n\nDeseja realmente continuar?');
    
    if (!confirmacao2) return;
    
    // TODO: Implementar exclusão de conta
    showNotification('🚧 Funcionalidade em desenvolvimento', 'info');
}

// Fechar modal ao clicar fora
document.getElementById('avatarModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeAvatarModal();
    }
});

console.log('✅ perfil.js carregado');