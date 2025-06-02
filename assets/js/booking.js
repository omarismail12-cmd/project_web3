
// Booking page functionality
document.addEventListener('DOMContentLoaded', function() {
    initBookingPage();
    initFilters();
    initBookingModal();
    initDatePicker();
    initMobileMenu();
    initProToggle();
});

const facilitiesData = [
    {
        id: 1,
        name: "Olympic Stadium Madrid",
        sport: "football",
        country: "Spain",
        city: "Madrid",
        description: "World-class Olympic stadium with natural grass field and seating for 80,000 spectators.",
        features: ["Natural grass field", "Floodlights", "VIP boxes", "Olympic facilities"],
        price: 250,
        image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 22,
        availability: "6 AM - 11 PM",
        rating: 4.9
    },
    {
        id: 2,
        name: "Wembley Training Center",
        sport: "football", 
        country: "England",
        city: "London",
        description: "Professional training facility with artificial turf and modern amenities.",
        features: ["Artificial turf", "Goal posts", "Changing rooms", "Equipment storage"],
        price: 180,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 16,
        availability: "24/7",
        rating: 4.7
    },
    {
        id: 3,
        name: "Madison Square Garden Court",
        sport: "basketball",
        country: "USA",
        city: "New York",
        description: "Iconic basketball court with professional wooden flooring and world-class facilities.",
        features: ["Professional flooring", "LED scoreboard", "VIP seating", "Air conditioning"],
        price: 300,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 10,
        availability: "24/7",
        rating: 5.0
    },
    {
        id: 4,
        name: "Venice Beach Court",
        sport: "basketball",
        country: "USA",
        city: "Los Angeles",
        description: "Famous outdoor basketball court with ocean views and streetball atmosphere.",
        features: ["Outdoor court", "Ocean view", "Multiple hoops", "Beach access"],
        price: 120,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 10,
        availability: "6 AM - 10 PM",
        rating: 4.5
    },
    {
        id: 5,
        name: "Wimbledon Centre Court",
        sport: "tennis",
        country: "England",
        city: "London",
        description: "World-famous grass tennis court with retractable roof and royal box.",
        features: ["Grass surface", "Retractable roof", "Royal box", "Championship history"],
        price: 400,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "6 AM - 10 PM",
        rating: 5.0
    },
    {
        id: 6,
        name: "Roland Garros Court", 
        sport: "tennis",
        country: "France",
        city: "Paris",
        description: "Famous clay tennis court from the French Open with professional amenities.",
        features: ["Clay surface", "Stadium seating", "Professional nets", "Historic venue"],
        price: 350,
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "6 AM - 10 PM",
        rating: 4.8
    },
    {
        id: 7,
        name: "Tokyo Aquatic Centre",
        sport: "swimming",
        country: "Japan",
        city: "Tokyo",
        description: "Olympic swimming facility with heated pools and cutting-edge timing systems.",
        features: ["Olympic pools", "Heated water", "Electronic timing", "Diving platforms"],
        price: 200,
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 50,
        availability: "6 AM - 10 PM",
        rating: 4.9
    },
    {
        id: 8,
        name: "Sydney Olympic Pool",
        sport: "swimming",
        country: "Australia",
        city: "Sydney",
        description: "World-class aquatic center with multiple pools and spectacular harbor views.",
        features: ["Multiple pools", "Harbor views", "Lane dividers", "Spectator seating"],
        price: 150,
        image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 20,
        availability: "7 AM - 9 PM",
        rating: 4.6
    },
    {
        id: 9,
        name: "Rio Olympic Volleyball Arena",
        sport: "volleyball",
        country: "Brazil",
        city: "Rio de Janeiro",
        description: "Professional indoor volleyball arena with spring-loaded flooring and Olympic heritage.",
        features: ["Spring flooring", "Olympic nets", "Digital scoreboard", "VIP seating"],
        price: 220,
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 12,
        availability: "8 AM - 10 PM",
        rating: 4.7
    },
    {
        id: 10,
        name: "Copacabana Beach Volleyball",
        sport: "volleyball",
        country: "Brazil",
        city: "Rio de Janeiro",
        description: "Iconic beach volleyball courts on world-famous Copacabana beach.",
        features: ["Real beach sand", "Ocean view", "Beach nets", "Tropical atmosphere"],
        price: 180,
        image: "https://images.unsplash.com/photo-1594736797933-d0701ba0d2de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 8,
        availability: "8 AM - 8 PM",
        rating: 4.8
    },
    {
        id: 11,
        name: "All England Badminton Club",
        sport: "badminton",
        country: "England",
        city: "Birmingham",
        description: "Historic badminton venue with traditional wooden flooring and championship courts.",
        features: ["Wooden flooring", "Championship nets", "Traditional venue", "Equipment included"],
        price: 160,
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "7 AM - 11 PM",
        rating: 4.5
    },
    {
        id: 12,
        name: "Asian Games Badminton Hall",
        sport: "badminton", 
        country: "China",
        city: "Beijing",
        description: "Modern badminton facility with air conditioning and professional-grade courts.",
        features: ["Climate control", "Professional courts", "Equipment rental", "Spectator area"],
        price: 140,
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "7 AM - 11 PM",
        rating: 4.4
    }
];

let selectedSport = 'all';
let filteredFacilities = [...facilitiesData];
let selectedFacility = null;
let favorites = new Set();
let isPro = false;

function initBookingPage() {
    renderSportCards();
    renderFacilities();
    updateFacilitiesCount();
    initSearch();
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }
}

function renderSportCards() {
    const container = document.getElementById('sport-cards');
    if (!container) return;

    const sports = [
        { id: 'all', name: 'All Sports', icon: 'fas fa-trophy', count: facilitiesData.length },
        { id: 'football', name: 'Football', icon: 'fas fa-futbol', count: facilitiesData.filter(f => f.sport === 'football').length },
        { id: 'basketball', name: 'Basketball', icon: 'fas fa-basketball-ball', count: facilitiesData.filter(f => f.sport === 'basketball').length },
        { id: 'tennis', name: 'Tennis', icon: 'fas fa-table-tennis', count: facilitiesData.filter(f => f.sport === 'tennis').length },
        { id: 'swimming', name: 'Swimming', icon: 'fas fa-swimming-pool', count: facilitiesData.filter(f => f.sport === 'swimming').length },
        { id: 'volleyball', name: 'Volleyball', icon: 'fas fa-volleyball-ball', count: facilitiesData.filter(f => f.sport === 'volleyball').length },
        { id: 'badminton', name: 'Badminton', icon: 'fas fa-shuttlecock', count: facilitiesData.filter(f => f.sport === 'badminton').length }
    ];

    container.innerHTML = sports.map(sport => `
        <div class="sport-card ${sport.id === selectedSport ? 'active' : ''}" 
             data-sport="${sport.id}" 
             onclick="selectSport('${sport.id}')">
            <div class="sport-icon">
                <i class="${sport.icon}"></i>
            </div>
            <h3>${sport.name}</h3>
            <p>${sport.count} facilities</p>
        </div>
    `).join('');
}

function selectSport(sport) {
    selectedSport = sport;
    document.querySelectorAll('.sport-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-sport="${sport}"]`).classList.add('active');
    
    applyFilters();
    renderSportCards();
}

function initFilters() {
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
            applyFilters();
        });
    }

    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    const clearFilters = document.getElementById('clear-filters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            if (priceRange) priceRange.value = 300;
            if (priceValue) priceValue.textContent = '300';
            checkboxes.forEach(cb => cb.checked = true);
            selectedSport = 'all';
            document.getElementById('search-input').value = '';
            applyFilters();
            renderSportCards();
        });
    }
}

function applyFilters() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const maxPrice = parseInt(document.getElementById('price-range').value);
    const showMorning = document.getElementById('morning').checked;
    const showAfternoon = document.getElementById('afternoon').checked;
    const showEvening = document.getElementById('evening').checked;

    filteredFacilities = facilitiesData.filter(facility => {
        const sportMatch = selectedSport === 'all' || facility.sport === selectedSport;
        const searchMatch = facility.name.toLowerCase().includes(searchQuery) ||
                           facility.country.toLowerCase().includes(searchQuery) ||
                           facility.city.toLowerCase().includes(searchQuery);
        const priceMatch = facility.price <= maxPrice;
        const timeMatch = showMorning || showAfternoon || showEvening;
        
        return sportMatch && searchMatch && priceMatch && timeMatch;
    });

    renderFacilities();
    updateFacilitiesCount();
}

function renderFacilities() {
    const container = document.getElementById('facilities-container');
    if (!container) return;

    if (filteredFacilities.length === 0) {
        container.innerHTML = `
            <div class="no-facilities" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #6b7280;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No facilities found</h3>
                <p>Try adjusting your filters to see more options.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredFacilities.map(facility => {
        const discountedPrice = isPro ? Math.round(facility.price * 0.8) : facility.price;
        const hasDiscount = isPro && discountedPrice < facility.price;
        
        return `
            <div class="facility-card" onclick="openBookingModal(${facility.id})">
                <div class="facility-image">
                    <img src="${facility.image}" alt="${facility.name}">
                    <div class="facility-sport">${facility.sport.charAt(0).toUpperCase() + facility.sport.slice(1)}</div>
                    <div class="facility-country">
                        <i class="fas fa-map-marker-alt"></i>
                        ${facility.country}
                    </div>
                    <button class="favorite-btn ${favorites.has(facility.id) ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleFavorite(${facility.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="facility-rating">
                        <i class="fas fa-star" style="color: #f59e0b;"></i>
                        ${facility.rating}
                    </div>
                </div>
                <div class="facility-content">
                    <h3 class="facility-title">${facility.name}</h3>
                    <p class="facility-description">${facility.description}</p>
                    
                    <div class="facility-features">
                        ${facility.features.slice(0, 3).map(feature => `
                            <span class="feature-tag">${feature}</span>
                        `).join('')}
                        ${facility.features.length > 3 ? `<span class="feature-tag">+${facility.features.length - 3} more</span>` : ''}
                    </div>
                    
                    <div class="facility-details">
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>Up to ${facility.capacity} people</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${facility.availability}</span>
                        </div>
                    </div>
                    
                    <div class="facility-footer">
                        <div class="facility-price">
                            <div class="price-main">
                                ${hasDiscount ? `<span class="price-original">$${facility.price}</span>` : ''}
                                <span class="price">$${discountedPrice}</span>
                                <span class="price-unit">/hour</span>
                            </div>
                            ${hasDiscount ? '<div class="pro-discount">Pro 20% OFF</div>' : ''}
                        </div>
                        <button class="btn btn-primary btn-small">
                            <i class="fas fa-calendar-plus"></i>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleFavorite(facilityId) {
    if (favorites.has(facilityId)) {
        favorites.delete(facilityId);
    } else {
        favorites.add(facilityId);
    }
    renderFacilities();
}

function updateFacilitiesCount() {
    const countElement = document.getElementById('facilities-count');
    if (countElement) {
        countElement.textContent = filteredFacilities.length;
    }
}

function initProToggle() {
    const proToggle = document.getElementById('pro-toggle');
    if (proToggle) {
        proToggle.addEventListener('click', function() {
            isPro = !isPro;
            if (isPro) {
                this.innerHTML = '<i class="fas fa-star"></i><span>Pro User</span>';
                this.classList.add('active');
            } else {
                this.innerHTML = '<i class="fas fa-star"></i><span>Upgrade to Pro</span>';
                this.classList.remove('active');
            }
            renderFacilities();
        });
    }
}

function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeBookingModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeBookingModal();
    });

    const form = document.getElementById('booking-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSubmission();
    });

    const formInputs = form.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('change', updateBookingSummary);
    });
}

function openBookingModal(facilityId) {
    selectedFacility = facilitiesData.find(f => f.id === facilityId);
    if (!selectedFacility) return;

    const modal = document.getElementById('booking-modal');
    const modalTitle = document.getElementById('modal-title');
    
    modalTitle.textContent = `Book ${selectedFacility.name}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    updateBookingSummary();
    generateTimeSlots();
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    document.getElementById('booking-form').reset();
    selectedFacility = null;
}

function generateTimeSlots() {
    const timeSelect = document.getElementById('start-time');
    const dateInput = document.getElementById('booking-date');
    
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        
        timeSelect.innerHTML = '<option value="">Select time</option>';
        
        for (let hour = 6; hour <= 22; hour++) {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            const displayTime = hour > 12 ? `${hour - 12}:00 PM` : (hour === 12 ? '12:00 PM' : `${hour}:00 AM`);
            
            const isToday = selectedDate.toDateString() === today.toDateString();
            const currentHour = today.getHours();
            
            if (!isToday || hour > currentHour) {
                timeSelect.innerHTML += `<option value="${timeString}">${displayTime}</option>`;
            }
        }
    });
}

function updateBookingSummary() {
    if (!selectedFacility) return;

    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('start-time').value;
    const duration = document.getElementById('duration').value;
    
    document.getElementById('summary-facility').textContent = selectedFacility.name;
    
    if (date && time) {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString();
        const formattedTime = formatTime(time);
        document.getElementById('summary-datetime').textContent = `${formattedDate} at ${formattedTime}`;
    } else {
        document.getElementById('summary-datetime').textContent = 'Not selected';
    }
    
    if (duration) {
        document.getElementById('summary-duration').textContent = `${duration} hour${duration > 1 ? 's' : ''}`;
        
        const basePrice = selectedFacility.price * parseInt(duration);
        const discountedPrice = isPro ? Math.round(basePrice * 0.8) : basePrice;
        const discount = basePrice - discountedPrice;
        
        document.getElementById('summary-base-price').textContent = `$${basePrice}`;
        
        if (isPro && discount > 0) {
            document.getElementById('discount-item').style.display = 'flex';
            document.getElementById('summary-discount').textContent = `-$${discount}`;
        } else {
            document.getElementById('discount-item').style.display = 'none';
        }
        
        document.getElementById('summary-total').textContent = `$${discountedPrice}`;
    } else {
        document.getElementById('summary-duration').textContent = 'Not selected';
        document.getElementById('summary-base-price').textContent = '$0';
        document.getElementById('summary-total').textContent = '$0';
        document.getElementById('discount-item').style.display = 'none';
    }
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes} ${ampm}`;
}

function handleBookingSubmission() {
    const formData = {
        facility: selectedFacility.name,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('start-time').value,
        duration: document.getElementById('duration').value,
        players: document.getElementById('players').value
    };

    const bookings = JSON.parse(localStorage.getItem('sportzone_bookings') || '[]');
    const bookingId = 'BK' + Date.now();
    
    bookings.push({
        id: bookingId,
        ...formData,
        facilityId: selectedFacility.id,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    });

    localStorage.setItem('sportzone_bookings', JSON.stringify(bookings));

    alert(`Booking confirmed! Your booking ID is: ${bookingId}`);
    closeBookingModal();
}

function initDatePicker() {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

console.log('Booking page loaded successfully');
