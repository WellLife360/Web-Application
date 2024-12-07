class AppletGallery {
    
    constructor(dataUrl, map) {
        this.dataUrl = dataUrl;
        this.appletgallery = [];
        this.map = map; // Reference to the map instance
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderAppletGallery(this.appletgallery); 
        this.addMarkersToMap(this.appletgallery); // Add markers to the map
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.appletgallery = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderAppletGallery(appletgallery) {
        const appletgalleryCont = document.getElementById('appletgalleryCont');
        appletgalleryCont.innerHTML = `<div style="display: flex; flex-wrap: wrap; justify-content: center;">` + appletgallery.map(applet => 
            `<div class="card" style="width: 20rem; border: 2px solid #000000; border-radius: 5px; margin: 10px;"> 
                <img src="${applet.Image}" class="card-img-top image" alt="${applet.Applet_No}" style="border-top-left-radius: 5px; border-top-right-radius: 5px; height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${applet.Applet_No}</h5>
                    <p class="card-text">${applet.Description}</p>
                </div>
            </div>`
        ).join('');
    }

    bindSearchEvent() {
        const appletSearchBar = document.getElementById('appletSearchBar'); 

        appletSearchBar.addEventListener('input', () => {
            this.filterApplet(appletSearchBar.value);
        });
    }

    filterApplet(query) {
        const filteredapplet = this.appletgallery.filter(applet => {
            return applet.Applet_No.toLowerCase().includes(query.toLowerCase());
        });

        this.renderAppletGallery(filteredapplet);
        this.addMarkersToMap(filteredapplet); // Update markers to match filtered results
    }

    addMarkersToMap(appletgallery) {
        this.map.clearMarkers(); // Clear existing markers
        appletgallery.forEach(applet => {
            if (applet.latitude && applet.longitude) {
                const message = `${applet.Applet_No}: ${applet.Description}`;
                this.map.addMarker(applet.latitude, applet.longitude, message);
            }
        });
    }
}

class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.markers = [];
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        
        // When the mouse hovers over the marker, show the popup
        marker.on('mouseover', () => {
            marker.bindPopup(message).openPopup();
        });

        // When the mouse moves out, close the popup
        marker.on('mouseout', () => {
            marker.closePopup();
        });

        this.markers.push(marker);
    }

    clearMarkers() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
    }
}

// Initialize the map
const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);

// Initialize the gallery and link it with the map
const appletgallery = new AppletGallery('RecreationActivities.json', myMap);
