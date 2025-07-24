// Booking Form Page JavaScript
let selectedFacility = null;
let facilitiesData = [];

// Initialize the booking form page
document.addEventListener('DOMContentLoaded', function() {
    // Inline auth check
    const authMessage = document.getElementById('auth-message');
    const bookingForm = document.getElementById('booking-form');
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        if (authMessage) authMessage.style.display = '';
        if (bookingForm) bookingForm.style.display = 'none';
        return;
    } else {
        if (authMessage) authMessage.style.display = 'none';
        if (bookingForm) bookingForm.style.display = '';
    }
    initBookingFormPage();
});

async function initBookingFormPage() {
    try {
        // Get facility ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const facilityId = urlParams.get('facility');
        
        if (!facilityId) {
            // Redirect back to booking page if no facility ID
            window.location.href = 'booking.html';
            return;
        }

        // Fetch facilities data
        await fetchFacilities();
        
        // Find the selected facility
        selectedFacility = facilitiesData.find(f => f.id == facilityId);
        
        if (!selectedFacility) {
            // Redirect back if facility not found
            window.location.href = 'booking.html';
            return;
        }

        // Populate facility information
        populateFacilityInfo();
        
        // Initialize form
        initBookingForm();
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-date').min = today;
        
    } catch (error) {
        console.error('Error initializing booking form:', error);
        showToast('Error loading facility information', 'error');
    }
}

async function fetchFacilities() {
    try {
        const response = await fetch('http://localhost/project_web3/api/getFacilities.php');
        if (!response.ok) {
            throw new Error('Failed to fetch facilities');
        }
        facilitiesData = await response.json();
    } catch (error) {
        console.error('Error fetching facilities:', error);
        throw error;
    }
}

function populateFacilityInfo() {
    if (!selectedFacility) return;

    // Default placeholder image
    const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNTBIMTc1VjEwMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPGV0ZXh0IHg9IjIwMCIgeT0iMTgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    
    // Handle image path
    let imagePath = defaultImage;
    if (selectedFacility.image && 
        selectedFacility.image !== 'undefined' && 
        selectedFacility.image !== 'null' && 
        selectedFacility.image.trim() !== '') {
        imagePath = `http://localhost/project_web3/images/${selectedFacility.image}`;
    }

    // Update page elements
    document.getElementById('facility-title').textContent = `Book ${selectedFacility.name}`;
    document.getElementById('facility-description').textContent = `Complete your booking for ${selectedFacility.name}`;
    document.getElementById('facility-image').src = imagePath;
    document.getElementById('facility-image').onerror = function() {
        this.src = defaultImage;
        this.onerror = null;
    };
    document.getElementById('facility-name').textContent = selectedFacility.name;
    document.getElementById('facility-sport').textContent = selectedFacility.sport[0].toUpperCase() + selectedFacility.sport.slice(1);
    document.getElementById('facility-capacity').textContent = `Up to ${selectedFacility.capacity} players`;
    document.getElementById('facility-availability').textContent = selectedFacility.availability;
    document.getElementById('facility-price').textContent = `$${selectedFacility.price}/hour`;

    // Update summary
    document.getElementById('summary-facility').textContent = selectedFacility.name;
    updateBookingSummary();
}

function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    // Add event listeners
    form.addEventListener('submit', handleBookingSubmission);
    
    // Add change listeners for summary updates
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', updateBookingSummary);
    });

    // Date change listener for time slots
    document.getElementById('booking-date').addEventListener('change', generateTimeSlots);
}

function generateTimeSlots() {
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('start-time');
    
    if (!dateInput.value) {
        timeSelect.innerHTML = '<option value="">Select date first</option>';
        return;
    }

    // Generate time slots from 8 AM to 10 PM
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
        const time24 = `${hour.toString().padStart(2, '0')}:00`;
        let time12 = hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
        if (hour === 12) time12 = '12:00 PM';
        
        slots.push({
            value: time24,
            label: time12
        });
    }

    timeSelect.innerHTML = '<option value="">Select time</option>' + 
        slots.map(slot => `<option value="${slot.value}">${slot.label}</option>`).join('');
}

function updateBookingSummary() {
    if (!selectedFacility) return;

    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('start-time').value;
    const duration = parseInt(document.getElementById('duration').value) || 1;
    const players = parseInt(document.getElementById('players').value) || 1;

    // Update summary fields
    document.getElementById('summary-facility').textContent = selectedFacility.name;
    document.getElementById('summary-players').textContent = players;
    document.getElementById('summary-duration').textContent = `${duration} hour${duration > 1 ? 's' : ''}`;

    // Update date and time
    if (date && time) {
        const dateObj = new Date(date);
        const timeStr = new Date(`2000-01-01T${time}`).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
        document.getElementById('summary-datetime').textContent = 
            `${dateObj.toLocaleDateString()} at ${timeStr}`;
    } else {
        document.getElementById('summary-datetime').textContent = 'Not selected';
    }

    // Calculate pricing
    const basePrice = selectedFacility.price * duration;
    const totalPrice = basePrice;

    document.getElementById('summary-base-price').textContent = `$${basePrice}`;
    document.getElementById('summary-total').textContent = `$${totalPrice}`;
}

async function handleBookingSubmission(e) {
    e.preventDefault();
    
    if (!selectedFacility) {
        showToast('Facility information not available', 'error');
        return;
    }

    // Get form data
    const formData = {
        facility_id: selectedFacility.id,
        user_id: document.getElementById('user-id').value,
        booking_date: document.getElementById('booking-date').value,
        start_time: document.getElementById('start-time').value,
        duration: parseInt(document.getElementById('duration').value),
        players: parseInt(document.getElementById('players').value),
        contact_name: document.getElementById('contact-name').value,
        contact_phone: document.getElementById('contact-phone').value,
        contact_email: document.getElementById('contact-email').value,
        special_requests: document.getElementById('special-requests').value
    };

    // Validation: players <= 26
    if (formData.players > 26) {
        showToast('Number of players cannot exceed 26.', 'error');
        return;
    }
    // Validation: date not in the past
    const today = new Date();
    const bookingDate = new Date(formData.booking_date);
    today.setHours(0,0,0,0);
    bookingDate.setHours(0,0,0,0);
    if (bookingDate < today) {
        showToast('Booking date cannot be in the past.', 'error');
        return;
    }

    // Validate required fields
    if (!formData.booking_date || !formData.start_time || !formData.contact_name || 
        !formData.contact_phone || !formData.contact_email) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    // Show loading on button
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        const response = await fetch('http://localhost/project_web3/api/submit_booking.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        });

        const responseText = await response.text();
        let result;
        
        try {
            result = JSON.parse(responseText);
        } catch (err) {
            console.error('Raw response:', responseText);
            showToast('Server error: invalid response. Check PHP errors.', 'error');
            return;
        }

        if (result.status === 'success') {
            showToast('Booking confirmed successfully!', 'success');
            // Redirect to booking confirmation or back to facilities
            setTimeout(() => {
                window.location.href = 'booking.html?success=1';
            }, 2000);
        } else {
            showToast(result.message || 'Booking failed. Please try again.', 'error');
        }

    } catch (error) {
        console.error('Booking submission error:', error);
        showToast('Error submitting booking. Please try again.', 'error');
    } finally {
        // Reset button
        const submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// END handleBookingSubmission

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 5000);
}

// Ensure the file ends with a newline and all functions are closed properly.