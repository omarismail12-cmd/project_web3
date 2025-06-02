// Facilities data
const facilitiesData = [
    {
        id: 't1',
        name: 'Tennis Court A',
        type: 'Tennis',
        icon: '🎾',
        price: 25,
        status: 'available',
        features: ['Professional Surface', 'Night Lighting', 'Equipment Rental'],
        capacity: '2-4 players'
    },
    {
        id: 't2',
        name: 'Tennis Court B',
        type: 'Tennis',
        icon: '🎾',
        price: 25,
        status: 'busy',
        features: ['Professional Surface', 'Night Lighting'],
        capacity: '2-4 players'
    },
    {
        id: 't3',
        name: 'Tennis Court C',
        type: 'Tennis',
        icon: '🎾',
        price: 30,
        status: 'available',
        features: ['Premium Surface', 'Night Lighting', 'Equipment Rental', 'Covered Court'],
        capacity: '2-4 players'
    },
    {
        id: 't4',
        name: 'Tennis Court D',
        type: 'Tennis',
        icon: '🎾',
        price: 30,
        status: 'available',
        features: ['Premium Surface', 'Night Lighting', 'Covered Court'],
        capacity: '2-4 players'
    },
    {
        id: 'b1',
        name: 'Basketball Court 1',
        type: 'Basketball',
        icon: '🏀',
        price: 30,
        status: 'available',
        features: ['Professional Hoops', 'Indoor Court', 'Scoreboard'],
        capacity: '6-10 players'
    },
    {
        id: 'b2',
        name: 'Basketball Court 2',
        type: 'Basketball',
        icon: '🏀',
        price: 30,
        status: 'busy',
        features: ['Professional Hoops', 'Indoor Court', 'Scoreboard', 'Air Conditioning'],
        capacity: '6-10 players'
    },
    {
        id: 'f1',
        name: 'Football Field 1',
        type: 'Football',
        icon: '⚽',
        price: 50,
        status: 'available',
        features: ['Full Size Pitch', 'Natural Grass', 'Goal Posts', 'Floodlights'],
        capacity: '22 players'
    },
    {
        id: 'f2',
        name: 'Football Field 2',
        type: 'Football',
        icon: '⚽',
        price: 50,
        status: 'available',
        features: ['Full Size Pitch', 'Artificial Turf', 'Goal Posts', 'Floodlights'],
        capacity: '22 players'
    },
    {
        id: 'f3',
        name: 'Football Field 3',
        type: 'Football',
        icon: '⚽',
        price: 55,
        status: 'available',
        features: ['Premium Pitch', 'Natural Grass', 'Goal Posts', 'Floodlights', 'Changing Rooms'],
        capacity: '22 players'
    },
    {
        id: 's1',
        name: 'Swimming Pool A',
        type: 'Swimming',
        icon: '🏊',
        price: 20,
        status: 'available',
        features: ['Olympic Size', 'Heated Water', 'Lane Dividers', 'Lifeguard'],
        capacity: '20 swimmers'
    },
    {
        id: 's2',
        name: 'Swimming Pool B',
        type: 'Swimming',
        icon: '🏊',
        price: 20,
        status: 'busy',
        features: ['25m Pool', 'Heated Water', 'Lane Dividers'],
        capacity: '15 swimmers'
    },
    {
        id: 'v1',
        name: 'Volleyball Court 1',
        type: 'Volleyball',
        icon: '🏐',
        price: 35,
        status: 'available',
        features: ['Professional Net', 'Sand Court', 'Outdoor'],
        capacity: '12 players'
    },
    {
        id: 'v2',
        name: 'Volleyball Court 2',
        type: 'Volleyball',
        icon: '🏐',
        price: 35,
        status: 'available',
        features: ['Professional Net', 'Indoor Court', 'Wooden Floor'],
        capacity: '12 players'
    },
    {
        id: 'bd1',
        name: 'Badminton Court 1',
        type: 'Badminton',
        icon: '🏸',
        price: 15,
        status: 'available',
        features: ['Professional Net', 'Indoor Court', 'Wooden Floor'],
        capacity: '2-4 players'
    },
    {
        id: 'bd2',
        name: 'Badminton Court 2',
        type: 'Badminton',
        icon: '🏸',
        price: 15,
        status: 'busy',
        features: ['Professional Net', 'Indoor Court', 'Wooden Floor'],
        capacity: '2-4 players'
    },
    {
        id: 'bd3',
        name: 'Badminton Court 3',
        type: 'Badminton',
        icon: '🏸',
        price: 15,
        status: 'available',
        features: ['Professional Net', 'Indoor Court', 'Air Conditioning'],
        capacity: '2-4 players'
    },
    {
        id: 'bd4',
        name: 'Badminton Court 4',
        type: 'Badminton',
        icon: '🏸',
        price: 15,
        status: 'available',
        features: ['Professional Net', 'Indoor Court', 'Air Conditioning'],
        capacity: '2-4 players'
    },
    {
        id: 'bd5',
        name: 'Badminton Court 5',
        type: 'Badminton',
        icon: '🏸',
        price: 18,
        status: 'available',
        features: ['Premium Court', 'Indoor', 'Air Conditioning', 'Equipment Rental'],
        capacity: '2-4 players'
    },
    {
        id: 'bd6',
        name: 'Badminton Court 6',
        type: 'Badminton',
        icon: '🏸',
        price: 18,
        status: 'busy',
        features: ['Premium Court', 'Indoor', 'Air Conditioning', 'Equipment Rental'],
        capacity: '2-4 players'
    }
];

let filteredFacilities = [...facilitiesData];

// Initialize facilities page
function initFacilities() {
    populateFacilitiesGrid();
    setupFilters();
}

// Create facility card HTML
function createFacilityCard(facility) {
    const statusClass = facility.status === 'available' ? 'status-available' : 'status-busy';
    const statusText = facility.status === 'available' ? 'Available' : 'Busy';
    
    return `
        <div class="facility-card" onclick="viewFacilityDetails('${facility.id}')">
            <div class="facility-image">
                <span>${facility.icon}</span>
                <div class="facility-status ${statusClass}">${statusText}</div>
            </div>
            <div class="facility-content">
                <div class="facility-header">
                    <div class="facility-info">
                        <h3>${facility.name}</h3>
                        <p class="facility-type">${facility.type}</p>
                    </div>
                    <div class="facility-price">$${facility.price}/hr</div>
                </div>
                
                <div class="facility-features">
                    <h4>Features</h4>
                    <div class="features-list">
                        ${facility.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
                
                <div class="facility-actions">
                    <button class="btn btn-outline btn-small" onclick="event.stopPropagation(); viewSchedule('${facility.id}')">
                        View Schedule
                    </button>
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); bookFacility('${facility.id}')" 
                            ${facility.status === 'busy' ? 'disabled' : ''}>
                        ${facility.status === 'available' ? 'Book Now' : 'Not Available'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Populate facilities grid
function populateFacilitiesGrid() {
    const facilitiesGrid = document.getElementById('facilitiesGrid');
    if (filteredFacilities.length === 0) {
        facilitiesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="color: #16a34a; font-size: 1.125rem;">No facilities match your current filters.</p>
            </div>
        `;
        return;
    }
    
    facilitiesGrid.innerHTML = filteredFacilities.map(createFacilityCard).join('');
}

// Setup filter functionality
function setupFilters() {
    const sportFilter = document.getElementById('sportFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    
    sportFilter.addEventListener('change', applyFilters);
    availabilityFilter.addEventListener('change', applyFilters);
}

// Apply filters
function applyFilters() {
    const sportFilter = document.getElementById('sportFilter').value;
    const availabilityFilter = document.getElementById('availabilityFilter').value;
    
    filteredFacilities = facilitiesData.filter(facility => {
        const sportMatch = sportFilter === 'all' || facility.type.toLowerCase() === sportFilter;
        const availabilityMatch = availabilityFilter === 'all' || facility.status === availabilityFilter;
        
        return sportMatch && availabilityMatch;
    });
    
    populateFacilitiesGrid();
}

// View facility details
function viewFacilityDetails(facilityId) {
    const facility = facilitiesData.find(f => f.id === facilityId);
    if (facility) {
        alert(`Facility Details:\n\n${facility.name}\nType: ${facility.type}\nPrice: $${facility.price}/hour\nCapacity: ${facility.capacity}\nStatus: ${facility.status}\n\nFeatures:\n${facility.features.join('\n')}`);
    }
}

// View facility schedule
function viewSchedule(facilityId) {
    const facility = facilitiesData.find(f => f.id === facilityId);
    if (facility) {
        alert(`Schedule for ${facility.name}:\n\nToday's availability:\n08:00 - 10:00: Available\n10:00 - 12:00: Booked\n12:00 - 14:00: Available\n14:00 - 16:00: Available\n16:00 - 18:00: Booked\n18:00 - 20:00: Available\n\nClick "Book Now" to reserve a time slot.`);
    }
}

// Book facility
function bookFacility(facilityId) {
    const facility = facilitiesData.find(f => f.id === facilityId);
    if (facility && facility.status === 'available') {
        // Redirect to booking page with pre-selected sport
        const sportType = facility.type.toLowerCase();
        window.location.href = `booking.html?sport=${sportType}&facility=${facilityId}`;
    }
}

// Handle search
function handleSearch() {
    const searchTerm = prompt('Enter search term (facility name, sport type, or feature):');
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredFacilities = facilitiesData.filter(facility => 
            facility.name.toLowerCase().includes(term) ||
            facility.type.toLowerCase().includes(term) ||
            facility.features.some(feature => feature.toLowerCase().includes(term))
        );
        populateFacilitiesGrid();
        
        // Reset filters
        document.getElementById('sportFilter').value = 'all';
        document.getElementById('availabilityFilter').value = 'all';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFacilities);
