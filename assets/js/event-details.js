// Event Details Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initEventDetailsPage();
});

let currentEvent = null;

function initEventDetailsPage() {
    // Get event ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    if (!eventId) {
        showError();
        return;
    }
    
    // Load event details
    loadEventDetails(eventId);
    
    // Initialize event listeners
    initEventListeners();
}

async function loadEventDetails(eventId) {
    try {
        showLoading();
        
        const response = await fetch(`../api/get_event_details.php?id=${eventId}`);
        const data = await response.json();
        
        if (data.success && data.event) {
            currentEvent = data.event;
            displayEventDetails(data.event);
            hideLoading();
        } else {
            showError();
        }
    } catch (error) {
        console.error('Error loading event details:', error);
        showError();
    }
}

function displayEventDetails(event) {
    // Update page title
    document.title = `${event.title} - SportZone`;
    
    // Event image
    const eventImage = document.getElementById('event-image');
    eventImage.src = event.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    eventImage.alt = event.title;
    
    // Event badges
    document.getElementById('event-type').textContent = event.type;
    document.getElementById('event-price').textContent = event.price == 0 ? 'Free' : `$${event.price}`;
    
    // Event header
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-description').textContent = event.description;
    
    // Event meta information
    const eventDate = new Date(event.date);
    document.getElementById('event-date').textContent = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('event-time').textContent = formatTime(event.time);
    document.getElementById('event-location').textContent = event.location;
    document.getElementById('event-organizer').textContent = event.organizer;
    
    // Participants information
    const currentParticipants = parseInt(event.currentParticipants);
    const maxParticipants = parseInt(event.maxParticipants);
    const spotsLeft = maxParticipants - currentParticipants;
    
    document.getElementById('current-participants').textContent = currentParticipants;
    document.getElementById('max-participants').textContent = maxParticipants;
    document.getElementById('spots-left').textContent = spotsLeft;
    
    // Progress bar
    const progressPercentage = (currentParticipants / maxParticipants) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
    
    // Availability status
    const statusElement = document.getElementById('availability-status');
    if (spotsLeft === 0) {
        statusElement.textContent = 'Event Full';
        statusElement.className = 'availability-status full';
    } else if (spotsLeft <= maxParticipants * 0.2) {
        statusElement.textContent = `Only ${spotsLeft} spots remaining - Filling fast!`;
        statusElement.className = 'availability-status filling';
    } else {
        statusElement.textContent = `${spotsLeft} spots available`;
        statusElement.className = 'availability-status available';
    }
    
    // Requirements list
    const requirementsList = document.getElementById('requirements-list');
    requirementsList.innerHTML = '';
    if (event.requirements && event.requirements.length > 0) {
        event.requirements.forEach(requirement => {
            const li = document.createElement('li');
            li.textContent = requirement;
            requirementsList.appendChild(li);
        });
    } else {
        requirementsList.innerHTML = '<li>No specific requirements</li>';
    }
    
    // Prizes list
    const prizesList = document.getElementById('prizes-list');
    prizesList.innerHTML = '';
    if (event.prizes && event.prizes.length > 0) {
        event.prizes.forEach(prize => {
            const li = document.createElement('li');
            li.textContent = prize;
            prizesList.appendChild(li);
        });
    } else {
        prizesList.innerHTML = '<li>Participation certificate</li>';
    }
    
    // Additional information
    document.getElementById('full-description').textContent = event.description;
    document.getElementById('event-sport').textContent = event.sport.charAt(0).toUpperCase() + event.sport.slice(1);
    document.getElementById('event-type-detail').textContent = event.type.charAt(0).toUpperCase() + event.type.slice(1);
    document.getElementById('event-fee').textContent = event.price == 0 ? 'Free' : `$${event.price}`;
    document.getElementById('event-status').textContent = event.status || 'Upcoming';
    
    // Register button removed - no registration functionality needed
}

function initEventListeners() {
    // Share button
    document.getElementById('share-btn').addEventListener('click', function() {
        if (currentEvent) {
            shareEvent(currentEvent);
        }
    });
    
    // Calendar button
    document.getElementById('calendar-btn').addEventListener('click', function() {
        if (currentEvent) {
            addToCalendar(currentEvent);
        }
    });
}



function shareEvent(event) {
    const shareData = {
        title: event.title,
        text: `Join me at ${event.title} on ${new Date(event.date).toLocaleDateString()}!`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Event link copied to clipboard!');
        });
    }
}

function addToCalendar(event) {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hours
    
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(calendarUrl, '_blank');
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes} ${ampm}`;
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('error').style.display = 'none';
    document.getElementById('event-content').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('event-content').style.display = 'block';
}

function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'flex';
    document.getElementById('event-content').style.display = 'none';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

console.log('Event details page loaded successfully');
