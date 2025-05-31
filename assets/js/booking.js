// Booking page functionality
document.addEventListener('DOMContentLoaded', function() {
    initBookingPage();
    initFilters();
    initBookingModal();
    initDatePicker();
    initMobileMenu();
});

const facilitiesData = [
    {
        id: 1,
        name: "Main Football Stadium",
        sport: "football",
        description: "Professional-grade football stadium with natural grass field and seating for 500 spectators.",
        features: ["Natural grass field", "Floodlights", "Changing rooms", "Spectator seating"],
        price: 150,
        image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 22,
        availability: "6 AM - 11 PM"
    },
    {
        id: 2,
        name: "Training Football Field",
        sport: "football", 
        description: "Smaller training field perfect for practice sessions and youth games.",
        features: ["Artificial turf", "Goal posts", "Changing rooms", "Equipment storage"],
        price: 80,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 16,
        availability: "24/7"
    },
    {
        id: 3,
        name: "Indoor Basketball Court A",
        sport: "basketball",
        description: "Professional indoor basketball court with wooden flooring and adjustable hoops.",
        features: ["Professional flooring", "Adjustable hoops", "Scoreboard", "Air conditioning"],
        price: 100,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 10,
        availability: "24/7"
    },
    {
        id: 4,
        name: "Outdoor Basketball Court",
        sport: "basketball",
        description: "Outdoor basketball court with streetball atmosphere and city views.",
        features: ["Outdoor court", "Street lighting", "Multiple hoops", "Bench seating"],
        price: 60,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 10,
        availability: "6 AM - 10 PM"
    },
    {
        id: 5,
        name: "Tennis Court A",
        sport: "tennis",
        description: "Professional clay tennis court with high-quality surface and lighting.",
        features: ["Clay surface", "Professional nets", "Court lighting", "Equipment rental"],
        price: 75,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "6 AM - 10 PM"
    },
    {
        id: 6,
        name: "Tennis Court B", 
        sport: "tennis",
        description: "Hard court tennis facility with modern amenities and viewing area.",
        features: ["Hard surface", "Viewing area", "Equipment storage", "Water fountain"],
        price: 70,
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "6 AM - 10 PM"
    },
    {
        id: 7,
        name: "Olympic Swimming Pool",
        sport: "swimming",
        description: "Olympic-size swimming pool with heated water and professional timing systems.",
        features: ["Olympic size", "Heated water", "Timing systems", "Lifeguard service"],
        price: 50,
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 50,
        availability: "6 AM - 10 PM"
    },
    {
        id: 8,
        name: "Training Pool",
        sport: "swimming",
        description: "Smaller heated pool perfect for training and swimming lessons.",
        features: ["25m length", "Heated water", "Lane dividers", "Shallow end"],
        price: 30,
        image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 20,
        availability: "7 AM - 9 PM"
    },
    {
        id: 9,
        name: "Indoor Volleyball Court",
        sport: "volleyball",
        description: "Professional indoor volleyball court with spring-loaded flooring.",
        features: ["Spring flooring", "Professional nets", "Scoreboard", "Seating area"],
        price: 80,
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 12,
        availability: "8 AM - 10 PM"
    },
    {
        id: 10,
        name: "Beach Volleyball Court",
        sport: "volleyball",
        description: "Outdoor beach volleyball court with real sand and ocean breeze simulation.",
        features: ["Real sand", "Beach nets", "Outdoor lighting", "Shower facilities"],
        price: 65,
        image: "https://images.unsplash.com/photo-1594736797933-d0701ba0d2de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 8,
        availability: "8 AM - 8 PM"
    },
    {
        id: 11,
        name: "Badminton Court 1",
        sport: "badminton",
        description: "Indoor badminton court with proper ventilation and high-quality flooring.",
        features: ["Indoor court", "Proper ventilation", "Quality flooring", "Equipment available"],
        price: 60,
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "7 AM - 11 PM"
    },
    {
        id: 12,
        name: "Badminton Court 2",
        sport: "badminton", 
        description: "Second indoor badminton court with the same high standards and amenities.",
        features: ["Indoor court", "Air conditioning", "Equipment rental", "Score display"],
        price: 60,
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 4,
        availability: "7 AM - 11 PM"
    }
];

let selectedSport = 'all';
let filteredFacilities = [...facilitiesData];
let selectedFacility = null;

function initBookingPage() {
    renderSportCards();
    renderFacilities();
    updateFacilitiesCount();
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
            <p>${sport.count} facilities available</p>
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
            // Reset all filters
            if (priceRange) priceRange.value = 200;
            if (priceValue) priceValue.textContent = '200';
            checkboxes.forEach(cb => cb.checked = true);
            selectedSport = 'all';
            applyFilters();
            renderSportCards();
        });
    }
}

function applyFilters() {
    const maxPrice = parseInt(document.getElementById('price-range').value);
    const showMorning = document.getElementById('morning').checked;
    const showAfternoon = document.getElementById('afternoon').checked;
    const showEvening = document.getElementById('evening').checked;

    filteredFacilities = facilitiesData.filter(facility => {
        // Sport filter
        const sportMatch = selectedSport === 'all' || facility.sport === selectedSport;
        
        // Price filter
        const priceMatch = facility.price <= maxPrice;
        
        // Availability filter (simplified - just check if any time period is selected)
        const timeMatch = showMorning || showAfternoon || showEvening;
        
        return sportMatch && priceMatch && timeMatch;
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

    container.innerHTML = filteredFacilities.map(facility => `
        <div class="facility-card" onclick="openBookingModal(${facility.id})">
            <div class="facility-image">
                <img src="${facility.image}" alt="${facility.name}">
                <div class="facility-sport">${facility.sport.charAt(0).toUpperCase() + facility.sport.slice(1)}</div>
            </div>
            <div class="facility-content">
                <h3 class="facility-title">${facility.name}</h3>
                <p class="facility-description">${facility.description}</p>
                
                <div class="facility-features">
                    ${facility.features.map(feature => `
                        <span class="feature-tag">${feature}</span>
                    `).join('')}
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
                        <span class="price">$${facility.price}</span>
                        <span class="price-unit">/hour</span>
                    </div>
                    <button class="btn btn-primary btn-small">
                        <i class="fas fa-calendar-plus"></i>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateFacilitiesCount() {
    const countElement = document.getElementById('facilities-count');
    if (countElement) {
        countElement.textContent = filteredFacilities.length;
    }
}

function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeBookingModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeBookingModal();
    });

    // Form submission
    const form = document.getElementById('booking-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSubmission();
    });

    // Update summary when form changes
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
    
    // Reset form
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
        
        // Generate time slots from 6 AM to 10 PM
        for (let hour = 6; hour <= 22; hour++) {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            const displayTime = hour > 12 ? `${hour - 12}:00 PM` : (hour === 12 ? '12:00 PM' : `${hour}:00 AM`);
            
            // If it's today, only show future times
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
    
    // Update summary elements
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
        document.getElementById('summary-base-price').textContent = `$${basePrice}`;
        document.getElementById('summary-total').textContent = `$${basePrice}`;
    } else {
        document.getElementById('summary-duration').textContent = 'Not selected';
        document.getElementById('summary-base-price').textContent = '$0';
        document.getElementById('summary-total').textContent = '$0';
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

    // Save booking to localStorage
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
    // Set minimum date to today
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