let cartItems = [];
let cartTotal = 0;

function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Limpa a lista de carrinho
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }

    // Adiciona itens ao carrinho
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
    });

    // Calcula o total do carrinho
    cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
    cartTotalElement.textContent = `R$ ${cartTotal.toFixed(2)}`;
}
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
} 
function addToCart(productName, price) {
    // Adicionando o item ao carrinho
    const cartItemsModal = document.getElementById('cart-items-modal');
    const cartTotalModal = document.getElementById('cart-total-modal');
    
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `${productName} - R$ ${price.toFixed(2)}`;
    cartItemsModal.appendChild(cartItem);

    // Atualizando o valor total
    const currentTotal = parseFloat(cartTotalModal.innerText.replace('R$ ', ''));
    const newTotal = currentTotal + price;
    cartTotalModal.innerText = `R$ ${newTotal.toFixed(2)}`;

    // Atualizando o contador no ícone do carrinho
    updateCartCounter();
}
function removeCartItem(index) {
    const cartItemsModal = document.getElementById('cart-items-modal');
    const cartTotalModal = document.getElementById('cart-total-modal');

    const removedItem = cartItemsModal.children[index];
    const removedPrice = parseFloat(removedItem.dataset.price);

    // Removendo o item da lista
    removedItem.remove();

    // Atualizando o valor total
    const currentTotal = parseFloat(cartTotalModal.innerText.replace('R$ ', ''));
    const newTotal = currentTotal - removedPrice;
    cartTotalModal.innerText = `R$ ${newTotal.toFixed(2)}`;

    // Atualizando o contador no ícone do carrinho
    updateCartCounter();
}

function applyCoupon() {
    const couponInput = document.getElementById('coupon');
    const couponValue = couponInput.value;

    // Verificar se o cupom é válido e aplicar o desconto
    if (couponValue === 'DESCONTO10') { // Exemplo de cupom
        const cartTotalModal = document.getElementById('cart-total-modal');
        const currentTotal = parseFloat(cartTotalModal.innerText.replace('R$ ', ''));

        // Aplicar desconto de 10%
        const discount = currentTotal * 0.1;
        const newTotal = currentTotal - discount;

        // Atualizar o valor total com desconto
        cartTotalModal.innerText = `R$ ${newTotal.toFixed(2)}`;

        // Limpar o campo do cupom
        couponInput.value = '';

        // Outras ações conforme necessário
    } else {
        // Cupom inválido, exiba uma mensagem ou aja conforme a necessidade
        alert('Cupom inválido. Tente novamente.');
    }
}
function addToCart(productName, price) {
    // Adicionando o item ao carrinho
    const cartItemsModal = document.getElementById('cart-items-modal');
    const cartTotalModal = document.getElementById('cart-total-modal');

    const cartItem = document.createElement('li');
    cartItem.className = 'cart-item';
    cartItem.dataset.price = price; // Armazenando o preço como um atributo de dados
    cartItem.innerHTML = `
        <span>${productName} - R$ ${price.toFixed(2)}</span>
        <span class="cart-item-remove" onclick="removeCartItem(${cartItemsModal.children.length})">X</span>
    `;

    cartItemsModal.appendChild(cartItem);

    // Atualizando o valor total
    const currentTotal = parseFloat(cartTotalModal.innerText.replace('R$ ', ''));
    const newTotal = currentTotal + price;
    cartTotalModal.innerText = `R$ ${newTotal.toFixed(2)}`;

    // Atualizando o contador no ícone do carrinho
    updateCartCounter();
}
