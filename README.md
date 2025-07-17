# ⭐ Image Metadata AI Viewer

A lightweight web-based tool to extract and visualize image metadata, including GPS coordinates and simulated AI-generated descriptions. Built using vanilla JavaScript, EXIF.js, and Leaflet.js, this project allows users to upload images and explore embedded metadata in a user-friendly interface.

---

## Features

- Drag-and-drop or browse image upload
- Instant image preview
- EXIF metadata extraction (camera info, date, GPS, etc.)
- Interactive map view for GPS-tagged images (via Leaflet.js)
- Simulated AI-based image description (filename-based logic)
- Refresh button to restart the session

---

## 📌 Notes

> This tool is entirely frontend-based.  
> The AI description feature is simulated using basic filename matching.  
> GPS data must be embedded in the image for map functionality to work.

---

## File Structure

- `index.html` – Main UI and layout  
- `main.js` – Handles image upload, EXIF parsing, and AI simulation  
- `map.js` – Initializes and updates the map view using Leaflet  
- `style/styles.css` – Custom styling for layout and responsiveness

---

## Tech Stack

- **JavaScript** (Vanilla)  
- **EXIF.js** – For reading image metadata  
- **Leaflet.js** – For rendering GPS coordinates on a map  
- **HTML/CSS** – For structure and styling

---

## Credits

Developed by **Arun K Biju**  
Full Stack Developer | MERN Stack Enthusiast

---

## License & Usage Notice

This repository is not open-source.

You are not permitted to copy, download, fork, or reuse any part of the code, design, or assets from this project without explicit written consent from the author.

All rights reserved © 2025 Arun K Biju.
