
// Booking page functionality
let facilitiesData = [];
let selectedSport = 'all';
let filteredFacilities = [];
let selectedFacility = null;

document.addEventListener('DOMContentLoaded', async function () {
    await fetchFacilitiesFromServer();
    initBookingPage();
    initFilters();
    initBookingModal();
    initDatePicker();
    initMobileMenu();
});

async function fetchFacilitiesFromServer() {
    try {
        const res = await fetch('../../backend/getFacilities.php');
        const data = await res.json();

        if (Array.isArray(data)) {
            facilitiesData = data.map(f => ({
                ...f,
                features: f.features.split(',') // Convert "feature1,feature2" into array
            }));
            filteredFacilities = [...facilitiesData];
        } else {
            console.error('Invalid facilities data:', data);
            facilitiesData = [];
            filteredFacilities = [];
        }
    } catch (err) {
        console.error('Error fetching facilities:', err);
        facilitiesData = [];
        filteredFacilities = [];
    }
}

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
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBookingModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeBookingModal();
    });

    // Form submission
    const form = document.getElementById('booking-form');
    if (form) {
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
        facilityId: selectedFacility.id,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('start-time').value,
        duration: parseInt(document.getElementById('duration').value),
        players: parseInt(document.getElementById('players').value)
    };

    fetch('../../backend/submitBooking.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert(`Booking confirmed! ID: ${data.bookingId}`);
            closeBookingModal();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        alert("Error processing booking.");
        console.error(error);
    });
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