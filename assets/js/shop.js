// shop.js - dynamically loads shop products from the backend

document.addEventListener('DOMContentLoaded', () => {
    loadShopProducts();
});

// ------------------ UI FILTER DATA ------------------
const sports = [
    { id: 'all', name: 'All Sports', icon: '🏆' },
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' },
    { id: 'swimming', name: 'Swimming', icon: '🏊' }
];

// Static shop data
const staticProducts = [
    // Football Products
    {
        id: 1,
        name: "Professional Football",
        price: 29.99,
        sport: "football",
        image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        description: "Official size FIFA approved football"
    },
    {
        id: 2,
        name: "Football Cleats",
        price: 89.99,
        sport: "football",
        image_url: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop",
        description: "Professional grade football boots"
    },
    {
        id: 3,
        name: "Goal Keeper Gloves",
        price: 34.99,
        sport: "football",
        image_url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
        description: "Premium grip goalkeeper gloves"
    },
    // Basketball Products
    {
        id: 4,
        name: "Basketball",
        price: 24.99,
        sport: "basketball",
        image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
        description: "Official NBA size basketball"
    },
    {
        id: 5,
        name: "Basketball Shoes",
        price: 129.99,
        sport: "basketball",
        image_url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
        description: "High-performance basketball sneakers"
    },
    {
        id: 6,
        name: "Basketball Hoop",
        price: 199.99,
        sport: "basketball",
        image_url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=400&fit=crop",
        description: "Adjustable height basketball hoop"
    },
    // Tennis Products
    {
        id: 7,
        name: "Tennis Racket",
        price: 79.99,
        sport: "tennis",
        image_url: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop",
        description: "Professional tennis racket"
    },
    {
        id: 8,
        name: "Tennis Balls",
        price: 12.99,
        sport: "tennis",
        image_url: "https://images.unsplash.com/photo-1544717684-7ba06d40b7a3?w=400&h=400&fit=crop",
        description: "Pack of 3 professional tennis balls"
    },
    {
        id: 9,
        name: "Tennis Shoes",
        price: 94.99,
        sport: "tennis",
        image_url: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
        description: "Court-specific tennis shoes"
    },
    // Swimming Products
    {
        id: 10,
        name: "Swimming Goggles",
        price: 19.99,
        sport: "swimming",
        image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        description: "Anti-fog swimming goggles"
    },
    {
        id: 11,
        name: "Swim Cap",
        price: 8.99,
        sport: "swimming",
        image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        description: "Silicone swimming cap"
    },
    {
        id: 12,
        name: "Kickboard",
        price: 15.99,
        sport: "swimming",
        image_url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop",
        description: "Training kickboard for swimming"
    }
];

// ------------------ FILTERING LOGIC ------------------
function applyFilters() {
    const selectedSport = (document.querySelector('input[name="sport-filter"]:checked') || {}).value || 'all';
    const query = (document.getElementById('product-search')?.value || '').trim().toLowerCase();

    let filtered = [...staticProducts];
    if (selectedSport !== 'all') {
        filtered = filtered.filter(p => p.sport === selectedSport);
    }
    if (query) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }
    renderProducts(filtered);
}

function renderSportFilters() {
    const container = document.getElementById('sport-filter');
    if (!container) return;
    container.innerHTML = sports.map(s => `
        <input type="radio" id="sport-${s.id}" name="sport-filter" value="${s.id}" class="sport-radio" ${s.id==='all'?'checked':''} hidden>
        <label for="sport-${s.id}" class="sport-card">
            <span class="sport-icon">${s.icon}</span>
            <span class="sport-name">${s.name}</span>
        </label>
    `).join('');
}

// ------------------ Cart management
let cart = [];

function loadShopProducts() {
    // Render filter cards
    renderSportFilters();
    // Restore selected filter from storage
    const savedSport = localStorage.getItem('selectedSport') || 'all';
    const savedSearch = localStorage.getItem('searchQuery') || '';
    document.querySelector(`input[name="sport-filter"][value="${savedSport}"]`).checked = true;
    const searchInput = document.getElementById('product-search');
    if (searchInput) searchInput.value = savedSearch;

    loadCartFromStorage();
    applyFilters();
    updateCartBadge();
    initEventListeners();
}

function loadCartFromStorage() {
    const cartData = localStorage.getItem('cart');
    cart = cartData ? JSON.parse(cartData) : [];
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
            badge.classList.add('pop');
            setTimeout(()=>badge.classList.remove('pop'),300);
        } else {
            badge.style.display = 'none';
        }
    }
}

function addToCart(productId) {
    const product = staticProducts.find(p => p.id == productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            ...product, 
            quantity: 1,
            image: product.image_url // Ensure image field exists for cart
        });
    }
    
    saveCartToStorage();
    updateCartBadge();
    showToast(`${product.name} has been added to your cart!`);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

function initEventListeners() {
    // Add event listener for add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-btn')) {
            const button = e.target.closest('.add-to-cart-btn');
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.productId;
            if (productId) {
                addToCart(parseInt(productId));
            }
        }
        // Cart button click
        if (e.target.closest('.cart-btn')) {
            goToCart();
        }
    });

    // Sport filter change
    document.getElementById('sport-filter').addEventListener('change', function(e) {
        if (e.target.name === 'sport-filter') {
            localStorage.setItem('selectedSport', e.target.value);
            applyFilters();
        }
    });

    // Search input
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            localStorage.setItem('searchQuery', searchInput.value.trim());
            applyFilters();
        }, 250));
    }
}

// Debounce helper
function debounce(fn, delay = 200) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), delay);
    }
}

function goToCart() {
    // Navigate to cart page or show cart modal
    window.location.href = 'cart.html';
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    const count = document.getElementById('products-count');
    if (!grid || !count) return;

    if (!Array.isArray(products) || products.length === 0) {
        grid.innerHTML = '<div class="empty-products"><div class="empty-icon">🛒</div><h3>No products found</h3></div>';
        count.textContent = '0 products';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
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
