document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');
    const produtosList = document.getElementById('produtosList');
    const wishlistItems = document.getElementById('wishlistItems');
    const logoutButton = document.getElementById('logoutButton');
    const checkoutSection = document.getElementById('checkoutSection');
    const totalCarrinho = document.getElementById('totalCarrinho');
    const freteForm = document.getElementById('freteForm');
    const freteResult = document.getElementById('freteResult');
    const valorFrete = document.getElementById('valorFrete');
    const newsletterForm = document.getElementById('newsletterForm');
    const paymentSection = document.getElementById('paymentSection');
    const paymentForm = document.getElementById('paymentForm');

    const produtos = [
        { 
            id: 1, 
            nome: 'Whey Protein', 
            preco: 120.00, 
            imagem: 'Img/whey integralmed.webp', 
            width: 170, // Largura personalizada
            height: 170 // Altura personalizada
        },
        { 
            id: 2, 
            nome: 'Creatina', 
            preco: 80.00, 
            imagem: 'Img/creatina-integralmed.png' ,
            width: 175, // Largura personalizada
            height: 175 // Altura personalizada
        },
        { 
            id: 3, 
            nome: 'BCAA', 
            preco: 60.00, 
            imagem: 'img/bcaa-max.jpg' ,
            width: 170, // Largura personalizada
            height: 170 // Altura personalizada
        },
        { 
            id: 4, 
            nome: 'Pré-Treino',
            preco: 99.00, 
            imagem: 'img/pretreino-haze.jpg' ,
            width: 170, // Largura personalizada
            height: 170 // Altura personalizada
        },
        { 
            id: 5, 
            nome: 'Cafeína', 
            preco: 80.00, 
            imagem: 'img/Cafeina-nutrex.jpg' ,
            width: 170, // Largura personalizada
            height: 170 // Altura personalizada
        },
        { 
            id: 6, 
            nome: 'Glutamina', 
            preco: 85.00, 
            imagem: 'img/snakedragon-glutamina.jpg' ,
            width: 170, // Largura personalizada
            height: 170 // Altura personalizada 
        }
    ];

    // Função para abrir o modal de login
    window.abrirLoginModal = function() {
        new bootstrap.Modal(document.getElementById('loginModal')).show();
    };

    // Função de login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.username === username && u.password === password);

        // Verifica se já existe um usuário logado
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuarioLogado) {
            alert('Você já está logado. Por favor, deslogue antes de fazer login com outra conta.');
            return; // Impede o login
        }

        if (usuario) {
            alert('Login realizado com sucesso!');
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            window.location.reload();
        } else {
            alert('Usuário ou senha incorretos!');
        }
    });

    // Função de cadastro
    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (usuarios.find(u => u.username === username)) {
            alert('Usuário já cadastrado!');
            return;
        }

        usuarios.push({ username, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Cadastro realizado com sucesso!');
        mostrarLogin();
    });

    // Função para mostrar a seção de cadastro
    window.mostrarCadastro = function() {
        loginForm.style.display = 'none';
        cadastroForm.style.display = 'block';
    };

    // Função para mostrar a seção de login
    window.mostrarLogin = function() {
        cadastroForm.style.display = 'none';
        loginForm.style.display = 'block';
    };

    // Função para carregar produtos
    function carregarProdutos() {
        produtosList.innerHTML = '';
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4  data-aos="fade-up"';
            card.innerHTML = `
                <div class="card">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" 
                         style="width: ${produto.width || 200}px; height: ${produto.height || 200}px;">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="adicionarCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `;
            produtosList.appendChild(card);
        });
    }

    // Função para adicionar ao carrinho
    window.adicionarCarrinho = function(id) {
        const produto = produtos.find(p => p.id === id);
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        if (!carrinho.find(item => item.id === id)) {
            carrinho.push(produto);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert(`${produto.nome} adicionado ao carrinho!`);
            carregarCarrinho();
        } else {
            alert(`${produto.nome} já está no carrinho!`);
        }
    };

    // Função para carregar o carrinho
    function carregarCarrinho() {
        wishlistItems.innerHTML = '';
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        let total = 0;
        carrinho.forEach(produto => {
            const item = document.createElement('li');
            item.className = 'list-group-item';
            item.innerHTML = `
                ${produto.nome} - R$ ${produto.preco.toFixed(2)}
                <button onclick="removerDoCarrinho(${produto.id})">Remover</button>
            `;
            wishlistItems.appendChild(item);
            total += produto.preco;
        });
        totalCarrinho.textContent = total.toFixed(2);
        checkoutSection.style.display = carrinho.length > 0 ? 'block' : 'none';
    }

    // Função para remover do carrinho
    window.removerDoCarrinho = function(id) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho = carrinho.filter(item => item.id !== id);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
        alert('Item removido do carrinho!');
    };

    // Função para finalizar a compra
    window.finalizarCompra = function() {
        if (!localStorage.getItem('usuarioLogado')) {
            alert('Faça login para finalizar a compra!');
            abrirLoginModal(); // Abre o modal de login
            return;
        }
        paymentSection.style.display = 'block';
        checkoutSection.style.display = 'none';
    };

    // Função de pagamento
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        if (cardNumber && cardName && expiryDate && cvv) {
            alert('Pagamento realizado com sucesso! Obrigado pela compra.');
            localStorage.removeItem('carrinho');
            window.location.reload();
        } else {
            alert('Preencha todos os campos do pagamento.');
        }
    });

    // Função para o boletim informativo
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        alert(`Obrigado por se inscrever, ${email}! Você receberá nossas atualizações.`);
        newsletterForm.reset();
    });

    // Função de logout
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('carrinho');
        alert('Logout realizado com sucesso!');
        window.location.reload();
    });

    // Verifica se o usuário está logado
    if (localStorage.getItem('usuarioLogado')) {
        logoutButton.style.display = 'block';
    }

    // Carregar produtos e carrinho ao iniciar
    carregarProdutos();
    carregarCarrinho();
});