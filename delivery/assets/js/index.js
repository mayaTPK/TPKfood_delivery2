
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropd_menu')

toggleBtn.onclick = function (){
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'

}

// POPOUT GET STARTED PAGE 
function openPopout() {
    document.getElementById("popout-container").style.display = "flex";
}

function closePopout() {
    document.getElementById("popout-container").style.display = "none";
}


// LEAFLET HOME MAP SHOWING USER LOCATION 
// Initialize the map
var map = L.map('map').setView([0, 0], 10); // Set an initial zoom level, for example, 10

// Add an OSM tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker for the user's position
function onLocationFound(e) {
    // Clear existing markers and circles
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            layer.remove();
        }
    });

    // Add a marker for the user's position
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here").openPopup();
}

map.on('locationfound', onLocationFound);

// Request the user's location
map.locate({setView: true, maxZoom: 16});

// Handle location errors
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);
