// ============ FETCH DATA FROM JSON ============
let travelData = {};

// Fetch the JSON data when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchTravelData();
});

async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        travelData = await response.json();
        console.log('Travel Data Loaded:', travelData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// ============ PAGE NAVIGATION ============
function goHome() {
    showPage('home');
    clearResults();
}

function goAbout() {
    showPage('about');
}

function goContact() {
    showPage('contact');
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Hide search container on non-home pages
    const searchContainer = document.getElementById('searchContainer');
    if (pageId === 'home') {
        searchContainer.style.display = 'flex';
    } else {
        searchContainer.style.display = 'none';
    }
}

// ============ SEARCH FUNCTIONALITY ============
function searchRecommendations() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!searchInput) {
        alert('Please enter a destination or keyword');
        return;
    }

    const results = [];

    // Search in beaches
    if (searchInput.includes('beach')) {
        results.push(...travelData.beaches);
    }

    // Search in temples
    if (searchInput.includes('temple')) {
        results.push(...travelData.temples);
    }

    // Search in countries and cities
    travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchInput)) {
            results.push(...country.cities);
        }
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchInput)) {
                results.push(city);
            }
        });
    });

    // Display results
    displayResults(results, searchInput);
}

// ============ DISPLAY RESULTS ============
function displayResults(results, keyword) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <h2>No results found for "${keyword}"</h2>
                <p>Try searching for: beach, temple, or a country name</p>
            </div>
        `;
        return;
    }

    results.forEach(result => {
        const card = createResultCard(result);
        resultsContainer.appendChild(card);
    });

    // Scroll to results
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
}

// ============ CREATE RESULT CARD ============
function createResultCard(result) {
    const card = document.createElement('div');
    card.className = 'result-card';

    // Get timezone for countries (optional feature)
    let timeInfo = '';
    if (result.name && result.name.includes('Japan')) {
        timeInfo = getTimeInTimezone('Asia/Tokyo');
    } else if (result.name && result.name.includes('Brazil')) {
        timeInfo = getTimeInTimezone('America/Sao_Paulo');
    } else if (result.name && result.name.includes('Australia')) {
        timeInfo = getTimeInTimezone('Australia/Sydney');
    }

    card.innerHTML = `
        <img src="${result.imageUrl}" alt="${result.name}" onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(result.name)}'">
        <div class="result-card-content">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
            ${timeInfo ? `<div class="time-info">${timeInfo}</div>` : ''}
        </div>
    `;

    return card;
}

// ============ GET TIME IN TIMEZONE (OPTIONAL) ============
function getTimeInTimezone(timezone) {
    const options = {
        timeZone: timezone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    return `⏰ Current time: ${time}`;
}

// ============ CLEAR RESULTS ============
function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
}

// ============ FORM SUBMISSION ============
function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Log form data (in real app, send to server)
    console.log('Form Submitted:', { name, email, message });

    // Show success message
    alert(`Thank you, ${name}! We received your message and will get back to you soon.`);

    // Reset form
    document.getElementById('contactForm').reset();
}

// ============ ALLOW ENTER KEY FOR SEARCH ============
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchRecommendations();
            }
        });
    }
});
