// Récupérer les éléments du DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const searchResults = document.getElementById('searchResults');

// Données d'exemple pour les destinations
const destinations = [
  { name: 'Paris', description: 'La ville de l\'amour et de la lumière' },
  { name: 'Tokyo', description: 'Une métropole moderne et traditionnelle' },
  { name: 'New York', description: 'La ville qui ne dort jamais' },
  { name: 'Barcelona', description: 'Architecture unique et plages magnifiques' },
  { name: 'Dubai', description: 'Luxe et modernité au cœur du désert' },
  { name: 'Rome', description: 'L\'histoire ancienne à chaque coin de rue' },
  { name: 'London', description: 'Tradition et modernité réunies' },
  { name: 'Amsterdam', description: 'Les canaux et les vélos' }
];

// Fonction de recherche
function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === '') {
    alert('Veuillez entrer un terme de recherche');
    return;
  }

  // Filtrer les destinations
  const results = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm) ||
    destination.description.toLowerCase().includes(searchTerm)
  );

  // Afficher les résultats
  displayResults(results, searchTerm);
}

// Fonction pour afficher les résultats
function displayResults(results, searchTerm) {
  searchResults.classList.add('active');

  if (results.length === 0) {
    searchResults.innerHTML = `
      <h2>Résultats de recherche pour "${searchTerm}"</h2>
      <p>Aucune destination trouvée. Essayez un autre terme.</p>
    `;
  } else {
    let html = `<h2>Résultats de recherche pour "${searchTerm}" (${results.length} trouvé(s))</h2>`;
    
    results.forEach(destination => {
      html += `
        <div style="margin-bottom: 15px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4db8a8; border-radius: 4px;">
          <h3 style="color: #1a3a3a; margin-bottom: 5px;">${destination.name}</h3>
          <p style="color: #666;">${destination.description}</p>
        </div>
      `;
    });

    searchResults.innerHTML = html;
  }

  // Scroll vers les résultats
  searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Fonction de réinitialisation
function resetSearch() {
  searchInput.value = '';
  searchResults.classList.remove('active');
  searchResults.innerHTML = '';
  searchInput.focus();
}

// Événements
searchBtn.addEventListener('click', performSearch);
resetBtn.addEventListener('click', resetSearch);

// Recherche au clavier (Entrée)
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
