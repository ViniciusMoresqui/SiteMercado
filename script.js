if (window.location.pathname.includes('produtos.html')) {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('produtos');
            data.forEach(produto => {
                const div = document.createElement('div');
                div.classList.add('produto');
                div.innerHTML = `
                    <img src="${produto.image}" alt="${produto.title}">
                    <h3>${produto.title}</h3>
                    <p>R$ ${produto.price.toFixed(2)}</p>
                    <button onclick="adicionarCarrinho(${produto.id}, '${produto.title}', ${produto.price}, '${produto.image}')">Adicionar ao Carrinho</button>
                `;
                container.appendChild(div);
            });
        });
}


function adicionarCarrinho(id, nome, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ id, nome, preco, imagem });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
}

if (window.location.pathname.includes('carrinho.html')) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const container = document.getElementById('carrinho');
    const totalDiv = document.getElementById('total');

    let total = 0;

    if (carrinho.length === 0) {
        container.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            const div = document.createElement('div');
            div.classList.add('item-carrinho');
            div.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco.toFixed(2)}</p>
                <button onclick="removerItem(${index})">Remover</button>
            `;
            container.appendChild(div);
        });

        totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    }
}


function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.reload();
}


function finalizarCompra() {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinho');
    window.location.href = 'produtos.html';
}
