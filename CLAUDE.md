# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static frontend-only web application** that displays University Muhammadiyah Yogyakarta alumni locations on an interactive map. The application is built using vanilla HTML, CSS, and JavaScript with no build system or dependencies beyond CDN-loaded libraries.

## Architecture

**Single-Page Application Structure:**
- `index.html` - Main HTML structure with semantic markup, accessibility features, and responsive design
- `app.js` - Complete JavaScript application logic (~1074 lines)
- `style.css` - Comprehensive CSS styling with custom design system and responsive layout

**Key Technical Components:**
- **Map Integration**: Leaflet.js for interactive mapping with clustering support
- **Data Structure**: GeoJSON-based alumni data embedded directly in JavaScript
- **UI Features**: Search/filtering, modal dialogs, responsive sidebar, and accessibility support
- **State Management**: Local JavaScript state management with no external frameworks

## Development Approach

**No Build System**: This is a static site that runs directly in the browser. Simply open `index.html` in a browser to run the application.

**External Dependencies** (loaded via CDN):
- Leaflet 1.9.4 for mapping functionality
- Leaflet MarkerCluster 1.5.3 for marker clustering

## Key Features

**Core Functionality:**
- Interactive map displaying alumni locations with clustering
- Real-time search and filtering by name, company, or position
- Alumni profile modal with detailed information  
- Responsive design for mobile and desktop
- Statistics tracking (total/visible alumni counts)

**Data Model**: Each alumni record contains:
- Personal info (name, graduation year, entry year)
- Professional info (company, position)
- Contact info (phone, address - redacted for privacy)
- Geographic coordinates for map placement
- Coordinate source information for data quality tracking

## File Modifications

When editing this codebase:
- **app.js**: Contains all application logic, state management, and event handlers with async data loading
- **style.css**: Uses CSS custom properties (variables) for consistent theming
- **index.html**: Semantic HTML structure with accessibility attributes
- **Koordinat_Alumni_Lengkap_Redacted.geojson**: External GeoJSON file containing all alumni location data

## Data Loading

The application loads alumni data from an external GeoJSON file (`Koordinat_Alumni_Lengkap_Redacted.geojson`) using the Fetch API. This ensures:
- **GitHub Pages Compatibility**: Static file serving works correctly
- **Data Separation**: Alumni data is maintained separately from application logic
- **Error Handling**: Graceful fallback if data fails to load
- **Performance**: Async loading with loading indicators

To update alumni data, modify the GeoJSON file directly. The application will automatically load the updated data on page refresh.