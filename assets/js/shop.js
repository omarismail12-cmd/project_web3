// shop.js - dynamically loads shop products from the backend

document.addEventListener('DOMContentLoaded', () => {
    loadShopProducts();
});

function loadShopProducts() {
    fetch('../api/get_shop_items.php')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            renderProducts([]);
        });
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    const count = document.getElementById('products-count');
    if (!Array.isArray(products) || products.length === 0) {
        grid.innerHTML = '<div class="empty-products"><div class="empty-icon">🛒</div><h3>No products found</h3></div>';
        count.textContent = '0 products';
        return;
    }
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image_url || '../assets/img/placeholder.png'}" class="product-image" alt="${product.name}">
                <span class="product-sport-badge">${product.sport}</span>
            </div>
            <div class="product-content">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">${product.price} EGP</div>
                <button class="add-to-cart-btn"><span class="cart-icon">🛒</span>Add to Cart</button>
            </div>
        </div>
    `).join('');
    count.textContent = `${products.length} product${products.length > 1 ? 's' : ''}`;
}
