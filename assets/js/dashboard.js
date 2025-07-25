// Dashboard JavaScript for StadiumBook
class Dashboard {
    constructor() {
        this.facilities = [];
        this.bookings = [];
        this.stats = {};
        this.currentFacilityToDelete = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadDashboardData();
    }

    bindEvents() {
        // Add facility form toggle
        document.getElementById('toggleAddForm')?.addEventListener('click', () => {
            this.toggleAddForm();
        });

        // Cancel add form
        document.getElementById('cancelAdd')?.addEventListener('click', () => {
            this.hideAddForm();
        });

        // Facility form submission
        document.getElementById('facilityForm')?.addEventListener('submit', (e) => {
            this.handleAddFacility(e);
        });

        // Refresh facilities
        document.getElementById('refreshFacilities')?.addEventListener('click', () => {
            this.loadFacilities();
        });

        // Booking filter
        document.getElementById('bookingFilter')?.addEventListener('change', (e) => {
            this.filterBookings(e.target.value);
        });

        // Modal events
        document.getElementById('closeDeleteModal')?.addEventListener('click', () => {
            this.hideDeleteModal();
        });

        document.getElementById('cancelDelete')?.addEventListener('click', () => {
            this.hideDeleteModal();
        });

        document.getElementById('confirmDelete')?.addEventListener('click', () => {
            this.confirmDeleteFacility();
        });

        // Close modal when clicking outside
        document.getElementById('deleteModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'deleteModal') {
                this.hideDeleteModal();
            }
        });
    }

    async loadDashboardData() {
        this.showLoading();
        try {
            await Promise.all([
                this.loadStats(),
                this.loadFacilities(),
                this.loadBookings()
            ]);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            this.hideLoading();
        }
    }

    async loadStats() {
        try {
            const response = await fetch('../api/dashboard_stats.php');
            const data = await response.json();
            
            if (data.success) {
                this.stats = data.data;
                this.updateStatsDisplay();
            } else {
                console.error('Error loading stats:', data.message);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }

    async loadFacilities() {
        try {
            const response = await fetch('../api/dashboard_facilities.php');
            const data = await response.json();
            
            if (data.success) {
                this.facilities = data.data;
                this.displayFacilities();
            } else {
                console.error('Error loading facilities:', data.message);
            }
        } catch (error) {
            console.error('Error fetching facilities:', error);
        }
    }

    async loadBookings() {
        try {
            const response = await fetch('../api/dashboard_bookings.php');
            const data = await response.json();
            
            if (data.success) {
                this.bookings = data.data;
                this.displayBookings();
            } else {
                console.error('Error loading bookings:', data.message);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }

    updateStatsDisplay() {
        document.getElementById('totalProfit').textContent = `$${this.stats.totalProfit || 0}`;
        document.getElementById('totalBookings').textContent = this.stats.totalBookings || 0;
        document.getElementById('totalFacilities').textContent = this.stats.totalFacilities || 0;
        document.getElementById('availableFacilities').textContent = this.stats.availableFacilities || 0;
    }

    displayFacilities() {
        const grid = document.getElementById('facilitiesGrid');
        if (!grid) return;

        if (this.facilities.length === 0) {
            grid.innerHTML = '<p class="no-data">No facilities found. Add your first facility!</p>';
            return;
        }

        grid.innerHTML = this.facilities.map(facility => this.createFacilityCard(facility)).join('');
    }

    createFacilityCard(facility) {
        const statusClass = facility.availability === '1' ? 'available' : 'unavailable';
        const statusText = facility.availability === '1' ? 'Available' : 'Unavailable';
        
        return `
            <div class="facility-card fade-in">
                <div class="facility-header">
                    <div class="facility-info">
                        <h3>${facility.name}</h3>
                        <span class="facility-sport">${facility.sport}</span>
                    </div>
                    <div class="facility-actions">
                        <button class="btn btn-small btn-danger" onclick="dashboard.showDeleteModal(${facility.id}, '${facility.name}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="facility-details">
                    <p>${facility.description || 'No description available'}</p>
                    <div class="facility-meta">
                        <span><i class="fas fa-users"></i> Capacity: ${facility.capacity}</span>
                        <span class="facility-price">$${facility.price}/hour</span>
                    </div>
                    <div class="facility-status">
                        <span class="facility-status ${statusClass}">${statusText}</span>
                    </div>
                    ${facility.features ? `<p><i class="fas fa-star"></i> ${facility.features}</p>` : ''}
                </div>
            </div>
        `;
    }

    displayBookings() {
        const tbody = document.getElementById('bookingsTableBody');
        if (!tbody) return;

        if (this.bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">No bookings found.</td></tr>';
            return;
        }

        tbody.innerHTML = this.bookings.map(booking => this.createBookingRow(booking)).join('');
    }

    createBookingRow(booking) {
        const statusClass = {
            'confirmed': 'status-confirmed',
            'cancelled': 'status-cancelled'
        }[booking.status] || 'status-confirmed';

        const revenue = booking.status === 'confirmed' ? (parseFloat(booking.price) * parseFloat(booking.duration)) : 0;

        return `
            <tr>
                <td>${booking.facility_name}</td>
                <td>${new Date(booking.booking_date).toLocaleDateString()}</td>
                <td>${booking.start_time}</td>
                <td>${booking.duration}h</td>
                <td>${booking.players}</td>
                <td><span class="booking-status ${statusClass}">${booking.status}</span></td>
                <td>$${revenue.toFixed(2)}</td>
            </tr>
        `;
    }

    filterBookings(status) {
        let filteredBookings = this.bookings;
        
        if (status !== 'all') {
            filteredBookings = this.bookings.filter(booking => booking.status === status);
        }

        const tbody = document.getElementById('bookingsTableBody');
        if (!tbody) return;

        if (filteredBookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">No bookings found for this filter.</td></tr>';
            return;
        }

        tbody.innerHTML = filteredBookings.map(booking => this.createBookingRow(booking)).join('');
    }

    toggleAddForm() {
        const form = document.getElementById('addFacilityForm');
        const button = document.getElementById('toggleAddForm');
        
        if (form.style.display === 'none' || !form.style.display) {
            form.style.display = 'block';
            form.classList.add('slide-in');
            button.innerHTML = '<i class="fas fa-minus"></i> Cancel';
        } else {
            this.hideAddForm();
        }
    }

    hideAddForm() {
        const form = document.getElementById('addFacilityForm');
        const button = document.getElementById('toggleAddForm');
        
        form.style.display = 'none';
        button.innerHTML = '<i class="fas fa-plus"></i> Add Facility';
        
        // Reset form
        document.getElementById('facilityForm').reset();
    }

    async handleAddFacility(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('../api/add_facility.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.showNotification('Facility added successfully!', 'success');
                this.hideAddForm();
                await this.loadDashboardData();
            } else {
                this.showNotification(data.message || 'Error adding facility', 'error');
            }
        } catch (error) {
            console.error('Error adding facility:', error);
            this.showNotification('Error adding facility', 'error');
        }
    }

    showDeleteModal(facilityId, facilityName) {
        this.currentFacilityToDelete = facilityId;
        document.getElementById('facilityToDelete').textContent = facilityName;
        document.getElementById('deleteModal').style.display = 'block';
    }

    hideDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        this.currentFacilityToDelete = null;
    }

    async confirmDeleteFacility() {
        if (!this.currentFacilityToDelete) return;

        try {
            const formData = new FormData();
            formData.append('facility_id', this.currentFacilityToDelete);
            
            const response = await fetch('../api/delete_facility.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.showNotification('Facility deleted successfully!', 'success');
                this.hideDeleteModal();
                await this.loadDashboardData();
            } else {
                this.showNotification(data.message || 'Error deleting facility', 'error');
            }
        } catch (error) {
            console.error('Error deleting facility:', error);
            this.showNotification('Error deleting facility', 'error');
        }
    }

    editFacility(facilityId) {
        // For now, just show an alert. In a full implementation, this would open an edit modal
        alert(`Edit facility ${facilityId} - This would open an edit form`);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'block';
    }

    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new Dashboard();
});

// Add notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 10000;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #4CAF50;
}

.notification-error {
    border-left: 4px solid #f44336;
}

.notification-info {
    border-left: 4px solid #2196F3;
}

.notification i {
    font-size: 1.2rem;
}

.notification-success i {
    color: #4CAF50;
}

.notification-error i {
    color: #f44336;
}

.notification-info i {
    color: #2196F3;
}

.no-data {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 2rem;
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
