// Cart functionality
class Cart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.loadCartFromStorage();
        this.renderCart();
        this.updateCartTitle();
    }

    loadCartFromStorage() {
        const cartData = localStorage.getItem('cart');
        this.items = cartData ? JSON.parse(cartData) : [];
    }

    saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartTitle() {
        const totalItems = this.getTotalItems();
        const titleElement = document.querySelector('.cart-title');
        if (titleElement) {
            titleElement.textContent = `Shopping Cart (${totalItems} items)`;
        }
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCartToStorage();
        this.renderCart();
        this.updateCartTitle();
        this.showToast('Item removed from cart', 'success');
    }

    updateQuantity(id, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(id);
            return;
        }

        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
            this.saveCartToStorage();
            this.renderCart();
            this.updateCartTitle();
        }
    }

    getSportColor(sport) {
        const colors = {
            'football': 'color: #059669; background: #ecfdf5;',
            'basketball': 'color: #ea580c; background: #fff7ed;',
            'tennis': 'color: #6b7280; background: #f9fafb;',
            'swimming': 'color: #0284c7; background: #eff6ff;'
        };
        return colors[sport] || 'color: #64748b; background: #f8fafc;';
    }

    renderCart() {
        const emptyCart = document.getElementById('empty-cart');
        const cartContent = document.getElementById('cart-content');
        const cartItemsList = document.getElementById('cart-items-list');

        if (this.items.length === 0) {
            emptyCart.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartContent.style.display = 'block';

        // Render cart items
        cartItemsList.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="item-content">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <div class="item-header">
                            <h3 class="item-name">${item.name}</h3>
                            <button class="remove-btn" onclick="cart.removeItem(${item.id})">
                                🗑️
                            </button>
                        </div>
                        <p class="item-description">${item.description}</p>
                        <div class="item-footer">
                            <span class="item-price">$${item.price.toFixed(2)}</span>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                                    −
                                </button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.renderOrderSummary();
    }

    renderOrderSummary() {
        const summaryItems = document.getElementById('summary-items');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');

        // Render summary items
        summaryItems.innerHTML = this.items.map(item => `
            <div class="summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        // Calculate totals
        const subtotal = this.getTotalPrice();
        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        // Update summary values
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Navigation functions
function goBackToShop() {
    window.location.href = 'index.html';
}

function handleCheckout() {
    cart.showToast('Checkout initiated! Redirecting to payment...', 'success');
    // Here you would typically redirect to a payment processor
    setTimeout(() => {
        alert('This would redirect to a payment processor in a real application');
    }, 1000);
}

// Initialize cart when page loads
let cart;
document.addEventListener('DOMContentLoaded', function() {
    cart = new Cart();
});















// Sports data
const sports = [
    {
        id: 'all',
        name: 'All Sports',
        icon: '🏆',
        description: 'View all equipment'
    },
    {
        id: 'football',
        name: 'Football',
        icon: '⚽',
        description: 'Field & equipment'
    },
    {
        id: 'basketball',
        name: 'Basketball',
        icon: '🏀',
        description: 'Court essentials'
    },
    {
        id: 'tennis',
        name: 'Tennis',
        icon: '🎾',
        description: 'Rackets & gear'
    },
    {
        id: 'swimming',
        name: 'Swimming',
        icon: '🏊',
        description: 'Pool equipment'
    }
];

// Products data
const products = [
    // Football Products
    {
        id: 1,
        name: "Professional Football",
        price: 29.99,
        sport: "football",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        description: "Official size FIFA approved football"
    },
    {
        id: 2,
        name: "Football Cleats",
        price: 89.99,
        sport: "football",
        image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop",
        description: "Professional grade football boots"
    },
    {
        id: 3,
        name: "Goal Keeper Gloves",
        price: 34.99,
        sport: "football",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
        description: "Premium grip goalkeeper gloves"
    },
    
    // Basketball Products
    {
        id: 4,
        name: "Basketball",
        price: 24.99,
        sport: "basketball",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
        description: "Official NBA size basketball"
    },
    {
        id: 5,
        name: "Basketball Shoes",
        price: 129.99,
        sport: "basketball",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
        description: "High-performance basketball sneakers"
    },
    {
        id: 6,
        name: "Basketball Hoop",
        price: 199.99,
        sport: "basketball",
        image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=400&fit=crop",
        description: "Adjustable height basketball hoop"
    },
    
    // Tennis Products
    {
        id: 7,
        name: "Tennis Racket",
        price: 79.99,
        sport: "tennis",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop",
        description: "Professional tennis racket"
    },
    {
        id: 8,
        name: "Tennis Balls",
        price: 12.99,
        sport: "tennis",
        image: "https://images.unsplash.com/photo-1544717684-7ba06d40b7a3?w=400&h=400&fit=crop",
        description: "Pack of 3 professional tennis balls"
    },
    {
        id: 9,
        name: "Tennis Shoes",
        price: 94.99,
        sport: "tennis",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
        description: "Court-specific tennis shoes"
    },
    
    // Swimming Products
    {
        id: 10,
        name: "Swimming Goggles",
        price: 19.99,
        sport: "swimming",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        description: "Anti-fog swimming goggles"
    },
    {
        id: 11,
        name: "Swim Cap",
        price: 8.99,
        sport: "swimming",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        description: "Silicone swimming cap"
    },
    {
        id: 12,
        name: "Kickboard",
        price: 15.99,
        sport: "swimming",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop",
        description: "Training kickboard for swimming"
    }
];

// Shop functionality
class Shop {
    constructor() {
        this.selectedSport = 'all';
        this.cart = [];
        this.init();
    }

    init() {
        this.loadCartFromStorage();
        this.renderSportFilter();
        this.renderProducts();
        this.updateCartBadge();
    }

    loadCartFromStorage() {
        const cartData = localStorage.getItem('cart');
        this.cart = cartData ? JSON.parse(cartData) : [];
    }

    saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        if(!badge) return; // element not present on this page
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    renderSportFilter() {
        const filterContainer = document.getElementById('sport-filter');
        filterContainer.innerHTML = sports.map(sport => `
            <div class="sport-card ${sport.id} ${this.selectedSport === sport.id ? 'selected' : ''}" 
                 onclick="shop.selectSport('${sport.id}')">
                <div class="sport-icon">${sport.icon}</div>
                <h3 class="sport-name">${sport.name}</h3>
                <p class="sport-description">${sport.description}</p>
                ${this.selectedSport === sport.id ? '<div class="sport-check"></div>' : ''}
            </div>
        `).join('');
    }

    selectSport(sportId) {
        this.selectedSport = sportId;
        this.renderSportFilter();
        this.renderProducts();
    }

    getFilteredProducts() {
        return this.selectedSport === 'all' 
            ? products 
            : products.filter(product => product.sport === this.selectedSport);
    }

    getSportBadgeStyle(sport) {
        const styles = {
            'football': 'color: #059669; background: #ecfdf5;',
            'basketball': 'color: #ea580c; background: #fff7ed;',
            'tennis': 'color: #6b7280; background: #f9fafb;',
            'swimming': 'color: #0284c7; background: #eff6ff;'
        };
        return styles[sport] || 'color: #64748b; background: #f8fafc;';
    }

    renderProducts() {
        const filteredProducts = this.getFilteredProducts();
        const productsGrid = document.getElementById('products-grid');
        const productsTitle = document.getElementById('products-title');
        const productsCount = document.getElementById('products-count');

        // Update header
        productsTitle.textContent = this.selectedSport === 'all' 
            ? 'All Products' 
            : `${this.selectedSport.charAt(0).toUpperCase() + this.selectedSport.slice(1)} Equipment`;
        
        productsCount.textContent = `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`;

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-products">
                    <div class="empty-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try selecting a different sport category</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-sport-badge" style="${this.getSportBadgeStyle(product.sport)}">
                        ${product.sport.charAt(0).toUpperCase() + product.sport.slice(1)}
                    </div>
                    <div class="product-rating">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                    </div>
                </div>
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="shop.addToCart(${product.id})">
                        <span class="cart-icon">🛒</span>
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCartToStorage();
        this.updateCartBadge();
        this.showToast(`${product.name} has been added to your cart!`);
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Navigation functions
function goToCart() {
    window.location.href = 'cart.html';
}

// Initialize shop when page loads
let shop;
document.addEventListener('DOMContentLoaded', function() {
    shop = new Shop();
});