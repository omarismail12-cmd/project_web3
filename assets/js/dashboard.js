let sports = [];
let recentBookings = [];

function populateStats() {
    fetch('http://localhost/project_web3/api/get_stats.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Stats Error:', data.error);
                // Set default values when access denied
                document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = '0';
                document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = '0';
                document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = '$0.00';
                document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = '0';
                return;
            }
            document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = data.totalBookings || '0';
            document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = data.activeCourts || '0';
            document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = `$${data.revenue || '0.00'}`;
            document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = data.members || '0';
        })
        .catch(error => console.error('Fetch error:', error));
}

function populateSportsGrid() {
    fetch('http://localhost/project_web3/api/get_sports.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Sports Error:', data.error);
                const sportsGrid = document.getElementById('sportsGrid');
                sportsGrid.innerHTML = '<p>Unable to load sports. Please log in as facility owner.</p>';
                return;
            }
            if (Array.isArray(data)) {
                sports = data;
                const sportsGrid = document.getElementById('sportsGrid');
                sportsGrid.innerHTML = sports.map(createSportCard).join('');
            } else {
                console.error('Sports data is not an array:', data);
                const sportsGrid = document.getElementById('sportsGrid');
                sportsGrid.innerHTML = '<p>No sports data available.</p>';
            }
        })
        .catch(error => console.error('Error fetching sports:', error));
}

function populateBookingsList() {
    fetch('http://localhost/project_web3/api/get_recent_booking.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Bookings Error:', data.error);
                const bookingsList = document.getElementById('bookingsList');
                bookingsList.innerHTML = '<p>Unable to load bookings. Please log in as facility owner.</p>';
                return;
            }
            if (Array.isArray(data)) {
                recentBookings = data;
                const bookingsList = document.getElementById('bookingsList');
                if (recentBookings.length === 0) {
                    bookingsList.innerHTML = '<p>No recent bookings found.</p>';
                } else {
                    bookingsList.innerHTML = recentBookings.map(createBookingItem).join('');
                }
            } else {
                console.error('Bookings data is not an array:', data);
                const bookingsList = document.getElementById('bookingsList');
                bookingsList.innerHTML = '<p>No bookings data available.</p>';
            }
        })
        .catch(error => console.error('Error fetching bookings:', error));
}

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

function bookSport(sportId) {
    const sport = sports.find(s => s.id === sportId);
    if (sport) {
        alert(`Booking ${sport.name}! Redirecting to booking form...`);
        // window.location.href = `booking.html?sport=${sport.id}`; // optional redirect
    }
}

function handleSearch() {
    alert('Search functionality would be implemented here');
}

function handleNewBooking() {
    alert('New booking form would open here');
}

function initDashboard() {
    populateSportsGrid();
    populateBookingsList();
    populateStats(); // ✅ Make sure it's called

    const searchBtn = document.querySelector('.btn-outline');
    const newBookingBtn = document.querySelector('.btn-primary');

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', handleNewBooking);
    }

    const actionButtons = document.querySelectorAll('.action-btn');
    const actions = ['Schedule Booking', 'View Facilities', 'Manage Profile'];
    
    actionButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            alert(`${actions[index]} clicked! This would navigate to the respective page.`);
        });
    });

    const viewAllBtn = document.querySelector('.card-content .btn-outline');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            alert('View All Bookings clicked! This would show the complete bookings list.');
        });
    }
}

document.addEventListener('DOMContentLoaded', initDashboard);

// Animation
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

// Facility Management JS
function fetchOwnedFacilities() {
    fetch('http://localhost/project_web3/api/getFacilities.php')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById('facilityDropdown');
            if (!dropdown) return;
            dropdown.innerHTML = '<option value="">Select Facility</option>';
            if (data && Array.isArray(data)) {
                data.forEach(facility => {
                    dropdown.innerHTML += `<option value="${facility.id}">${facility.name}</option>`;
                });
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchOwnedFacilities();

    // Add Facility
    const addForm = document.getElementById('addFacilityForm');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = document.getElementById('addFacilityMsg');
            msg.textContent = 'Adding...';
            const formData = new FormData(addForm);
            fetch('http://localhost/project_web3/add_facility.php', {
                method: 'POST',
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                msg.textContent = data.message;
                if (data.success) {
                    addForm.reset();
                    fetchOwnedFacilities();
                }
            })
            .catch(() => { msg.textContent = 'Error adding facility.'; });
        });
    }

    // Delete Facility
    const deleteForm = document.getElementById('deleteFacilityForm');
    if (deleteForm) {
        deleteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = document.getElementById('deleteFacilityMsg');
            msg.textContent = 'Deleting...';
            const formData = new FormData(deleteForm);
            fetch('http://localhost/project_web3/delete_facility.php', {
                method: 'POST',
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                msg.textContent = data.message;
                if (data.success) {
                    fetchOwnedFacilities();
                }
            })
            .catch(() => { msg.textContent = 'Error deleting facility.'; });
        });
    }
});
