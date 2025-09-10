// Alumni data - will be loaded from external GeoJSON file
let alumniData = null;

// Application state
let map;
let markerClusterGroup;
let alumniMarkers = new Map();
let selectedAlumniId = null;
let allAlumni = [];
let filteredAlumni = [];
let searchQuery = '';

// DOM elements
const elements = {
  searchInput: document.getElementById('searchInput'),
  clearSearch: document.getElementById('clearSearch'),
  toggleSidebar: document.getElementById('toggleSidebar'),
  closeSidebar: document.getElementById('closeSidebar'),
  sidebar: document.getElementById('sidebar'),
  alumniList: document.getElementById('alumniList'),
  totalAlumni: document.getElementById('totalAlumni'),
  visibleAlumni: document.getElementById('visibleAlumni'),
  profileModal: document.getElementById('profileModal'),
  profileContent: document.getElementById('profileContent'),
  closeModal: document.getElementById('closeModal'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  resetView: document.getElementById('resetView'),
  loadingOverlay: document.getElementById('loadingOverlay')
};

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
  initializeMap();
  setupEventListeners();
  
  try {
    await loadAlumniData();
    processAlumniData();
  } catch (error) {
    console.error('Failed to load alumni data:', error);
    showErrorMessage('Failed to load alumni data. Please check your internet connection and try again.');
  } finally {
    setTimeout(() => {
      elements.loadingOverlay.classList.add('hidden');
    }, 1000);
  }
});

// Load alumni data from external GeoJSON file
async function loadAlumniData() {
  try {
    const response = await fetch('Koordinat_Alumni_Lengkap_Redacted.geojson');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alumniData = await response.json();
  } catch (error) {
    console.error('Error loading alumni data:', error);
    throw error;
  }
}

// Show error message to user
function showErrorMessage(message) {
  elements.alumniList.innerHTML = `
    <div class="error-message">
      <p style="color: var(--color-red-500); padding: 1rem; text-align: center;">
        ${message}
      </p>
    </div>
  `;
}

// Initialize Leaflet map
function initializeMap() {
  map = L.map('map').setView([-2.5, 118], 5); // Centered on Indonesia

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // Initialize marker cluster group
  markerClusterGroup = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
      const count = cluster.getChildCount();
      let size = 'small';
      if (count > 10) size = 'large';
      else if (count > 5) size = 'medium';
      
      return L.divIcon({
        html: `<div><span>${count}</span></div>`,
        className: `marker-cluster marker-cluster-${size}`,
        iconSize: L.point(40, 40)
      });
    }
  });

  map.addLayer(markerClusterGroup);

  // Map event listeners
  map.on('moveend', updateVisibleAlumni);
  map.on('zoomend', updateVisibleAlumni);
}

// Setup all event listeners
function setupEventListeners() {
  // Search functionality
  elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
  elements.clearSearch.addEventListener('click', clearSearch);

  // Sidebar toggle for mobile
  elements.toggleSidebar.addEventListener('click', toggleSidebar);
  elements.closeSidebar.addEventListener('click', closeSidebar);

  // Modal controls
  elements.closeModal.addEventListener('click', closeProfileModal);
  elements.modalBackdrop.addEventListener('click', closeProfileModal);

  // Reset map view
  elements.resetView.addEventListener('click', resetMapView);

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProfileModal();
      closeSidebar();
    }
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        elements.sidebar.classList.contains('open') &&
        !elements.sidebar.contains(e.target) &&
        !elements.toggleSidebar.contains(e.target)) {
      closeSidebar();
    }
  });
}

// Process alumni data and create markers
function processAlumniData() {
  if (!alumniData || !alumniData.features) {
    console.error('Alumni data not loaded or invalid');
    showErrorMessage('Alumni data is not available.');
    return;
  }

  allAlumni = alumniData.features.map((feature, index) => ({
    id: index,
    name: feature.properties.nama,
    company: feature.properties.instansi,
    position: feature.properties.posisi,
    startYear: feature.properties.tahun_masuk_umy,
    graduationYear: feature.properties.tahun_lulus_umy,
    phone: feature.properties.no_wa,
    address: feature.properties.alamat,
    coordinates: feature.geometry.coordinates,
    coordinateSource: feature.properties.sumber_koordinat
  }));

  // Set filtered alumni to all alumni initially
  filteredAlumni = [...allAlumni];

  createMarkers();
  renderAlumniList();
  updateStats();
}

// Create map markers for alumni
function createMarkers() {
  markerClusterGroup.clearLayers();
  alumniMarkers.clear();

  filteredAlumni.forEach(alumni => {
    const [lng, lat] = alumni.coordinates;
    
    const marker = L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: '#218B8D',
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
      className: 'custom-marker'
    });

    // Create popup content with proper event handling
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = `
      <div class="popup-name">${alumni.name}</div>
      <div class="popup-company">${alumni.company}</div>
      <div class="popup-position">${alumni.position}</div>
    `;
    
    const viewProfileBtn = document.createElement('button');
    viewProfileBtn.className = 'popup-view-profile';
    viewProfileBtn.textContent = 'View Profile';
    viewProfileBtn.onclick = (e) => {
      e.stopPropagation();
      showAlumniProfile(alumni.id);
    };
    
    popupContent.appendChild(viewProfileBtn);
    marker.bindPopup(popupContent);
    marker.on('click', () => selectAlumni(alumni.id));
    
    alumniMarkers.set(alumni.id, marker);
    markerClusterGroup.addLayer(marker);
  });
}

// Handle search functionality
function handleSearch(e) {
  searchQuery = e.target.value.toLowerCase().trim();
  
  if (searchQuery) {
    elements.clearSearch.classList.remove('hidden');
    filteredAlumni = allAlumni.filter(alumni => 
      alumni.name.toLowerCase().includes(searchQuery) ||
      alumni.company.toLowerCase().includes(searchQuery) ||
      alumni.position.toLowerCase().includes(searchQuery)
    );
  } else {
    elements.clearSearch.classList.add('hidden');
    filteredAlumni = [...allAlumni];
  }

  createMarkers();
  renderAlumniList();
  updateStats();
  clearSelection();
}

// Clear search
function clearSearch() {
  elements.searchInput.value = '';
  searchQuery = '';
  elements.clearSearch.classList.add('hidden');
  filteredAlumni = [...allAlumni];
  createMarkers();
  renderAlumniList();
  updateStats();
  clearSelection();
}

// Clear current selection
function clearSelection() {
  if (selectedAlumniId !== null) {
    const prevCard = document.querySelector(`[data-id="${selectedAlumniId}"]`);
    if (prevCard) prevCard.classList.remove('selected');
    
    const prevMarker = alumniMarkers.get(selectedAlumniId);
    if (prevMarker) {
      prevMarker.setStyle({ fillColor: '#218B8D', radius: 8 });
    }
    selectedAlumniId = null;
  }
}

// Render alumni list in sidebar
function renderAlumniList() {
  if (filteredAlumni.length === 0) {
    elements.alumniList.innerHTML = `
      <div class="no-results">
        <p>No alumni found${searchQuery ? ` for "${searchQuery}"` : ''}.</p>
      </div>
    `;
    return;
  }

  const listHTML = filteredAlumni.map(alumni => `
    <div class="alumni-card" data-id="${alumni.id}" tabindex="0" role="button">
      <div class="alumni-name">${alumni.name}</div>
      <div class="alumni-company">${alumni.company}</div>
      <div class="alumni-position">${alumni.position}</div>
      <div class="alumni-year">Class of ${alumni.graduationYear}</div>
    </div>
  `).join('');

  elements.alumniList.innerHTML = listHTML;

  // Add event listeners to alumni cards
  elements.alumniList.querySelectorAll('.alumni-card').forEach(card => {
    const alumniId = parseInt(card.dataset.id);
    
    card.addEventListener('click', () => selectAlumni(alumniId));
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectAlumni(alumniId);
      }
    });
  });
}

// Select alumni and highlight on map
function selectAlumni(id) {
  // Clear previous selection
  clearSelection();

  selectedAlumniId = id;
  
  // Highlight selected alumni
  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) card.classList.add('selected');
  
  const marker = alumniMarkers.get(id);
  if (marker) {
    marker.setStyle({ fillColor: '#E68161', radius: 12 });
    const alumni = filteredAlumni.find(a => a.id === id);
    if (alumni) {
      const [lng, lat] = alumni.coordinates;
      map.setView([lat, lng], Math.max(map.getZoom(), 10));
      marker.openPopup();
    }
  }
}

// Show alumni profile modal
function showAlumniProfile(id) {
  const alumni = allAlumni.find(a => a.id === id) || filteredAlumni.find(a => a.id === id);
  if (!alumni) return;

  const initials = alumni.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  const profileHTML = `
    <div class="profile-header">
      <div class="profile-avatar">${initials}</div>
      <div class="profile-name">${alumni.name}</div>
      <div class="profile-company">${alumni.company}</div>
      <div class="profile-position">${alumni.position}</div>
    </div>
    
    <div class="profile-details">
      <div class="detail-group">
        <div class="detail-label">Education</div>
        <div class="detail-value">
          University Muhammadiyah Yogyakarta<br>
          ${alumni.startYear} - ${alumni.graduationYear}
        </div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Current Position</div>
        <div class="detail-value">${alumni.position}</div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Company</div>
        <div class="detail-value">${alumni.company}</div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Location</div>
        <div class="detail-value">${alumni.address}</div>
      </div>
      
      <div class="detail-group">
        <div class="detail-label">Contact</div>
        <div class="detail-value">
          Phone: ${alumni.phone}<br>
          <small style="color: var(--color-text-secondary);">
            * Contact information is redacted for privacy
          </small>
        </div>
      </div>
    </div>
  `;

  elements.profileContent.innerHTML = profileHTML;
  elements.profileModal.classList.remove('hidden');
  elements.profileModal.setAttribute('aria-hidden', 'false');
  
  // Focus management for accessibility
  elements.closeModal.focus();
}

// Close profile modal
function closeProfileModal() {
  elements.profileModal.classList.add('hidden');
  elements.profileModal.setAttribute('aria-hidden', 'true');
}

// Toggle sidebar for mobile
function toggleSidebar() {
  elements.sidebar.classList.toggle('open');
}

// Close sidebar
function closeSidebar() {
  elements.sidebar.classList.remove('open');
}

// Reset map to initial view and clear search
function resetMapView() {
  // Reset map view
  map.setView([-2.5, 118], 5);
  
  // Clear search
  elements.searchInput.value = '';
  searchQuery = '';
  elements.clearSearch.classList.add('hidden');
  
  // Reset to all alumni
  filteredAlumni = [...allAlumni];
  createMarkers();
  renderAlumniList();
  updateStats();
  
  // Clear selection
  clearSelection();
}

// Update visible alumni count based on map bounds
function updateVisibleAlumni() {
  const bounds = map.getBounds();
  let visibleCount = 0;
  
  filteredAlumni.forEach(alumni => {
    const [lng, lat] = alumni.coordinates;
    if (bounds.contains([lat, lng])) {
      visibleCount++;
    }
  });
  
  elements.visibleAlumni.textContent = visibleCount;
}

// Update statistics
function updateStats() {
  elements.totalAlumni.textContent = filteredAlumni.length;
  updateVisibleAlumni();
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Make functions available globally for onclick handlers (for popup buttons)
window.selectAlumni = selectAlumni;
window.showAlumniProfile = showAlumniProfile;