document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const discountedTotalPriceElement = document.getElementById('discounted-total-price');
    const applyDiscountButton = document.getElementById('apply-discount');
    const discountCodeInput = document.getElementById('discount-code');

    const validDiscountCodes = {
        'DISCOUNT10': 0.10,
        'DISCOUNT20': 0.20
    };

    function updateCart(discount = 0) {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - RM${item.price} x ${item.quantity}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);
        const discountedTotal = total * (1 - discount);
        discountedTotalPriceElement.textContent = discountedTotal.toFixed(2);
    }

    applyDiscountButton.addEventListener('click', () => {
        const discountCode = discountCodeInput.value.trim();
        const discount = validDiscountCodes[discountCode] || 0;
        updateCart(discount);
    });

    updateCart();
});
