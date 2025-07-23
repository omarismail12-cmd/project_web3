// Events page functionality
document.addEventListener('DOMContentLoaded', function() {
    initEventsPage();
    initFilters();
    initEventModal();
    initMobileMenu();
});

let eventsData = [];
let filteredEvents = [];
let displayedEvents = [];
let selectedSport = 'all';
let eventsPerPage = 6;
let currentPage = 1;


function initEventsPage() {
    fetchEventsFromServer().then(() => {
        renderSportIcons();
        applyFilters();
        loadMoreEvents();
        updateEventsCount();
    });
}
async function fetchEventsFromServer() {
    try {
        const response = await fetch('http://localhost/project_web3/api/get_events.php');
        const data = await response.json();
console.log("Fetched events:", data);

        eventsData = data.map(event => ({
            ...event,
            price: parseFloat(event.price),
            currentParticipants: parseInt(event.currentParticipants),
            maxParticipants: parseInt(event.maxParticipants),
            requirements: Array.isArray(event.requirements) ? event.requirements : [],
            prizes: Array.isArray(event.prizes) ? event.prizes : []
        }));
        filteredEvents = [...eventsData];
    } catch (error) {
        console.error("Failed to load events:", error);
    }
}


function renderSportIcons() {
    const container = document.getElementById('sport-icons');
    if (!container) return;

    const sports = [
        { id: 'all', name: 'All Sports', icon: 'fas fa-trophy' },
        { id: 'football', name: 'Football', icon: 'fas fa-futbol' },
        { id: 'basketball', name: 'Basketball', icon: 'fas fa-basketball-ball' },
        { id: 'tennis', name: 'Tennis', icon: 'fas fa-table-tennis' },
        { id: 'swimming', name: 'Swimming', icon: 'fas fa-swimming-pool' },
        { id: 'volleyball', name: 'Volleyball', icon: 'fas fa-volleyball-ball' },
        { id: 'badminton', name: 'Badminton', icon: 'fas fa-shuttlecock' }
    ];

    container.innerHTML = sports.map(sport => `
        <div class="sport-icon ${sport.id === selectedSport ? 'active' : ''}" 
             data-sport="${sport.id}" 
             onclick="selectSport('${sport.id}')">
            <i class="${sport.icon}"></i>
            <span>${sport.name}</span>
        </div>
    `).join('');
}

function selectSport(sport) {
    selectedSport = sport;
    document.querySelectorAll('.sport-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    document.querySelector(`[data-sport="${sport}"]`).classList.add('active');
    
    currentPage = 1;
    displayedEvents = [];
    applyFilters();
    loadMoreEvents();
}

function initFilters() {
    const eventTypeFilter = document.getElementById('event-type-filter');
    const startDateFilter = document.getElementById('start-date');
    const endDateFilter = document.getElementById('end-date');
    const freeEventsFilter = document.getElementById('free-events');
    const paidEventsFilter = document.getElementById('paid-events');
    const sortSelect = document.getElementById('sort-events');
    const clearFilters = document.getElementById('clear-filters');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (startDateFilter) startDateFilter.min = today;
    if (endDateFilter) endDateFilter.min = today;

    [eventTypeFilter, startDateFilter, endDateFilter, freeEventsFilter, paidEventsFilter, sortSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', function() {
                currentPage = 1;
                displayedEvents = [];
                applyFilters();
                loadMoreEvents();
            });
        }
    });

    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            if (eventTypeFilter) eventTypeFilter.value = '';
            if (startDateFilter) startDateFilter.value = '';
            if (endDateFilter) endDateFilter.value = '';
            if (freeEventsFilter) freeEventsFilter.checked = true;
            if (paidEventsFilter) paidEventsFilter.checked = true;
            if (sortSelect) sortSelect.value = 'date';
            
            selectedSport = 'all';
            currentPage = 1;
            displayedEvents = [];
            renderSportIcons();
            applyFilters();
            loadMoreEvents();
        });
    }
}

function applyFilters() {
    const eventType = document.getElementById('event-type-filter')?.value || '';
    const startDate = document.getElementById('start-date')?.value || '';
    const endDate = document.getElementById('end-date')?.value || '';
    const showFree = document.getElementById('free-events')?.checked ?? true;
    const showPaid = document.getElementById('paid-events')?.checked ?? true;
    const sortBy = document.getElementById('sort-events')?.value || 'date';

    filteredEvents = eventsData.filter(event => {
        // Sport filter
        const sportMatch = selectedSport === 'all' || event.sport === selectedSport;
        
        // Event type filter
        const typeMatch = !eventType || event.type === eventType;
        
        // Date filters
        const eventDate = new Date(event.date);
        const startMatch = !startDate || eventDate >= new Date(startDate);
        const endMatch = !endDate || eventDate <= new Date(endDate);
        
        // Price filters
        const priceMatch = (showFree && event.price === 0) || (showPaid && event.price > 0);
        
        return sportMatch && typeMatch && startMatch && endMatch && priceMatch;
    });

    // Sort events
    filteredEvents.sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(a.date) - new Date(b.date);
            case 'name':
                return a.title.localeCompare(b.title);
            case 'sport':
                return a.sport.localeCompare(b.sport);
            case 'price':
                return a.price - b.price;
            default:
                return 0;
        }
    });

    updateEventsCount();
}

function loadMoreEvents() {
    const container = document.getElementById('events-container');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (!container) return;

    const start = (currentPage - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const newEvents = filteredEvents.slice(start, end);

    if (currentPage === 1) {
        container.innerHTML = '';
        displayedEvents = [];
    }

    displayedEvents.push(...newEvents);

    const newEventsHTML = newEvents.map(event => createEventCard(event)).join('');
    container.innerHTML += newEventsHTML;

    // Hide load more button if all events are displayed
    if (loadMoreBtn) {
        loadMoreBtn.style.display = displayedEvents.length >= filteredEvents.length ? 'none' : 'block';
    }

    currentPage++;
}

function createEventCard(event) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = formatTime(event.time);
    const spotsLeft = event.maxParticipants - event.currentParticipants;
    
    let statusClass = 'available';
    let statusText = `${spotsLeft} spots left`;
    
    if (spotsLeft === 0) {
        statusClass = 'full';
        statusText = 'Full';
    } else if (spotsLeft <= event.maxParticipants * 0.2) {
        statusClass = 'filling';
        statusText = `Only ${spotsLeft} left`;
    }

    return `
        <div class="event-card" onclick="openEventModal(${event.id})">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                <div class="event-badge">${event.type}</div>
                <div class="event-price">${event.price === 0 ? 'Free' : '$' + event.price}</div>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description.substring(0, 100)}...</p>
                
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${formattedDate} at ${formattedTime}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-users"></i>
                        <span>${event.currentParticipants}/${event.maxParticipants} participants</span>
                    </div>
                </div>
                
                <div class="event-footer">
                    <div class="event-status ${statusClass}">${statusText}</div>
                    <button class="btn btn-primary btn-small">
                        <i class="fas fa-info-circle"></i>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes} ${ampm}`;
}

function updateEventsCount() {
    const countElement = document.getElementById('events-count');
    if (countElement) {
        countElement.textContent = filteredEvents.length;
    }
}

function initEventModal() {
    const modal = document.getElementById('event-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeEventModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeEventModal();
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreEvents);
    }
}

function openEventModal(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('event-modal-title');
    const eventDetails = document.getElementById('event-details');
    
    modalTitle.textContent = event.title;
    
    const eventDate = new Date(event.date);
    const endDate = new Date(event.endDate);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedEndDate = endDate.toLocaleDateString();
    const formattedTime = formatTime(event.time);
    const spotsLeft = event.maxParticipants - event.currentParticipants;

    eventDetails.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem; color: #1f2937;">Event Details</h3>
            <p style="color: #6b7280; line-height: 1.6;">${event.description}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
                <h4 style="margin-bottom: 0.5rem; color: #1f2937;">Date & Time</h4>
                <p style="color: #6b7280;"><i class="fas fa-calendar" style="color: #10b981; margin-right: 0.5rem;"></i>${formattedDate} at ${formattedTime}</p>
                ${event.date !== event.endDate ? `<p style="color: #6b7280;"><i class="fas fa-calendar-check" style="color: #10b981; margin-right: 0.5rem;"></i>Ends: ${formattedEndDate}</p>` : ''}
            </div>
            <div>
                <h4 style="margin-bottom: 0.5rem; color: #1f2937;">Location</h4>
                <p style="color: #6b7280;"><i class="fas fa-map-marker-alt" style="color: #10b981; margin-right: 0.5rem;"></i>${event.location}</p>
            </div>
            <div>
                <h4 style="margin-bottom: 0.5rem; color: #1f2937;">Participants</h4>
                <p style="color: #6b7280;"><i class="fas fa-users" style="color: #10b981; margin-right: 0.5rem;"></i>${event.currentParticipants}/${event.maxParticipants} registered</p>
                <p style="color: #6b7280; font-size: 0.9rem;">${spotsLeft} spots remaining</p>
            </div>
            <div>
                <h4 style="margin-bottom: 0.5rem; color: #1f2937;">Price</h4>
                <p style="color: #6b7280;"><i class="fas fa-dollar-sign" style="color: #10b981; margin-right: 0.5rem;"></i>${event.price === 0 ? 'Free' : '$' + event.price}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem; color: #1f2937;">Organizer</h4>
            <p style="color: #6b7280;">${event.organizer}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem; color: #1f2937;">Requirements</h4>
            <ul style="color: #6b7280; padding-left: 1rem;">
                ${event.requirements.map(req => `<li style="margin-bottom: 0.25rem;">${req}</li>`).join('')}
            </ul>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 0.5rem; color: #1f2937;">Prizes & Benefits</h4>
            <ul style="color: #6b7280; padding-left: 1rem;">
                ${event.prizes.map(prize => `<li style="margin-bottom: 0.25rem;">${prize}</li>`).join('')}
            </ul>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center;">
            ${spotsLeft > 0 ? 
                `<button class="btn btn-primary" onclick="registerForEvent(${event.id})">
                    <i class="fas fa-user-plus"></i>
                    Register Now
                </button>` :
                `<button class="btn btn-outline" disabled>
                    <i class="fas fa-users"></i>
                    Event Full
                </button>`
            }
            <button class="btn btn-outline" onclick="shareEvent(${event.id})">
                <i class="fas fa-share"></i>
                Share
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    const modal = document.getElementById('event-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function registerForEvent(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    // Save registration to localStorage
    const registrations = JSON.parse(localStorage.getItem('sportzone_event_registrations') || '[]');
    const registrationId = 'ER' + Date.now();
    
    registrations.push({
        id: registrationId,
        eventId: eventId,
        eventTitle: event.title,
        date: event.date,
        price: event.price,
        status: 'confirmed',
        registeredAt: new Date().toISOString()
    });

    localStorage.setItem('sportzone_event_registrations', JSON.stringify(registrations));

    // Update current participants
    event.currentParticipants++;

    alert(`Registration successful! Your registration ID is: ${registrationId}`);
    closeEventModal();
    
    // Refresh the events display
    currentPage = 1;
    displayedEvents = [];
    loadMoreEvents();
}

function shareEvent(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    if (navigator.share) {
        navigator.share({
            title: event.title,
            text: event.description,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href + '#event-' + eventId;
        navigator.clipboard.writeText(url).then(() => {
            alert('Event link copied to clipboard!');
        });
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

console.log('Events page loaded successfully');
