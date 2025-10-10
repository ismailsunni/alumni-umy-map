# UMY Alumni Map

An interactive web application displaying University Muhammadiyah Yogyakarta alumni locations on a map.

## Features

- **Interactive Map**: View alumni locations with clustering support
- **Search & Filter**: Find alumni by name, company, or position
- **Alumni Profiles**: Detailed information in modal dialogs
- **Responsive Design**: Works on mobile and desktop devices
- **Real-time Statistics**: Track total and filtered alumni counts

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (no build system required)
- **Mapping**: Leaflet.js with MarkerCluster plugin
- **Data**: GeoJSON format for alumni location data
- **Hosting**: Static site compatible (GitHub Pages ready)

## Getting Started

### Prerequisites

- A modern web browser
- No installation or build process required

### Running Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd alumni-map-perplexity
   ```

2. Open `index.html` in your web browser:
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Or simply open index.html directly in your browser
   open index.html
   ```

3. The application will load and display the alumni map

## Project Structure

```
├── index.html              # Main HTML structure
├── app.js                 # Application logic (~1074 lines)
├── style.css              # Styling and responsive design
├── Koordinat_Alumni_Lengkap_Redacted.geojson  # Alumni data
├── CLAUDE.md              # Development guidelines
└── README.md              # This file
```

## Data Structure

Alumni data is stored in GeoJSON format with the following properties:
- Personal information (name, graduation year, entry year)
- Professional details (company, position)
- Geographic coordinates for map placement
- Data quality tracking (coordinate source)

## Development

This is a static frontend-only application with no build system. Simply edit the files and refresh the browser to see changes.

### Key Components

- **Map Integration**: Leaflet.js handles the interactive mapping
- **State Management**: Local JavaScript state with no external frameworks  
- **UI Components**: Custom modal dialogs and responsive sidebar
- **Data Loading**: Async GeoJSON loading with error handling

## Contributing

1. Fork the repository
2. Make your changes
3. Test in multiple browsers
4. Submit a pull request

## License

[Add license information here]

## Contact

[Add contact information here]