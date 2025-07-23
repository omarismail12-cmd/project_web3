    // // Sports data
    // const sports = [
    //     { id: 1, name: 'Tennis', icon: '🎾', courts: 4, available: 2, price: '$25/hour' },
    //     { id: 2, name: 'Basketball', icon: '🏀', courts: 2, available: 1, price: '$30/hour' },
    //     { id: 3, name: 'Football', icon: '⚽', courts: 3, available: 3, price: '$50/hour' },
    //     { id: 4, name: 'Swimming', icon: '🏊', courts: 2, available: 1, price: '$20/hour' },
    //     { id: 5, name: 'Volleyball', icon: '🏐', courts: 2, available: 2, price: '$35/hour' },
    //     { id: 6, name: 'Badminton', icon: '🏸', courts: 6, available: 4, price: '$15/hour' },
    // ];

    // // Recent bookings data
    // const recentBookings = [
    //     { id: 1, sport: 'Tennis', court: 'Court A', date: '2025-06-02', time: '14:00', status: 'Confirmed' },
    //     { id: 2, sport: 'Basketball', court: 'Court 1', date: '2025-06-03', time: '16:00', status: 'Pending' },
    //     { id: 3, sport: 'Football', court: 'Field 2', date: '2025-06-05', time: '18:00', status: 'Confirmed' },
    // ];


    function populateStats() {
    fetch('api/get_stats.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = data.totalBookings;
            document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = data.activeCourts;
            document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = `$${data.revenue}`;
            document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = data.members;
        })
        .catch(error => console.error('Fetch error:', error));
}
    
function populateSportsGrid() {
    fetch('api/get_sports.php')
        .then(response => response.json())
        .then(data => {
            sports = data;
            const sportsGrid = document.getElementById('sportsGrid');
            sportsGrid.innerHTML = sports.map(createSportCard).join('');
        })
        .catch(error => console.error('Error fetching sports:', error));
}

let sports = [];
let recentBookings = [];

function populateBookingsList() {
    fetch('api/get_recent_bookings.php')
        .then(response => response.json())
        .then(data => {
            recentBookings = data;
            const bookingsList = document.getElementById('bookingsList');
            bookingsList.innerHTML = recentBookings.map(createBookingItem).join('');
        })
        .catch(error => console.error('Error fetching bookings:', error));
}



// Function to create sport card HTML
function createSportCard(sport) {
    return `
        <div class="sport-card" onclick="bookSport(${sport.id})">
            <div class="sport-header">
                <div class="sport-info">
                    <span class="sport-icon">${sport.icon}</span>
                    <h3 class="sport-name">${sport.name}</h3>
                </div>
                <span class="sport-price">${sport.price}</span>
            </div>
            <div class="sport-stats">
                <span>Total: ${sport.courts} courts</span>
                <span class="available">Available: ${sport.available}</span>
            </div>
            <button class="btn btn-primary full-width">Book Now</button>
        </div>
    `;
}

// Function to create booking item HTML
function createBookingItem(booking) {
    const statusClass = booking.status === 'Confirmed' ? 'status-confirmed' : 'status-pending';
    
    return `
        <div class="booking-item">
            <div class="booking-header">
                <h4 class="booking-sport">${booking.sport}</h4>
                <span class="status ${statusClass}">${booking.status}</span>
            </div>
            <p class="booking-court">${booking.court}</p>
            <div class="booking-datetime">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${booking.date}
                <span class="time">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    ${booking.time}
                </span>
            </div>
        </div>
    `;
}

// Function to handle sport booking
function bookSport(sportId) {
    const sport = sports.find(s => s.id === sportId);
    if (sport) {
        alert(`Booking ${sport.name}! Redirecting to booking form...`);
        // Here you would typically redirect to a booking form or open a modal
    }
}

// Function to handle search
function handleSearch() {
    alert('Search functionality would be implemented here');
}

// Function to handle new booking
function handleNewBooking() {
    alert('New booking form would open here');
}

// Initialize the dashboard
function initDashboard() {
    populateSportsGrid();
    populateBookingsList();
    
    // Add event listeners
    const searchBtn = document.querySelector('.btn-outline');
    const newBookingBtn = document.querySelector('.btn-primary');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', handleNewBooking);
    }
    
    // Add click handlers for quick actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const actions = ['Schedule Booking', 'View Facilities', 'Manage Profile'];
            alert(`${actions[index]} clicked! This would navigate to the respective page.`);
        });
    });
    
    // Add click handler for "View All Bookings"
    const viewAllBtn = document.querySelector('.card-content .btn-outline');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            alert('View All Bookings clicked! This would show the complete bookings list.');
        });
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

// Animation functions for enhanced UX
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

// Call animation after page load
window.addEventListener('load', () => {
    setTimeout(animateStats, 500);
});
function initDashboard() {
    populateSportsGrid();
    populateBookingsList();
    populateStats();
    // ... other existing code
}
// Call animation after page load
window.addEventListener('load', () => {
    setTimeout(animateStats, 500);
});
