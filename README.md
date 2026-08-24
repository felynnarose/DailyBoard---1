# DailyBoard

A simple personal dashboard made with **HTML, CSS, and JavaScript**.

DailyBoard is designed to keep everyday tasks, notes, weather information, and daily quotes in one simple interface.

## Features

### 🌤️ Weather
- Search for weather by city
- Displays the current temperature
- Displays the current weather condition
- Automatically loads Bandung weather when the page starts
- Uses the OpenWeatherMap API

### 💭 Daily Quote
- Displays a random quote when the page loads
- Click the quote to generate another random quote
- Displays the quote's author

### ✅ Task Manager
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Edit tasks by double-clicking
- Search for tasks
- Filter tasks by:
  - Semua
  - Selesai
  - Belum Selesai
- Drag and drop tasks to change their order
- Saves tasks using `localStorage`

### 📝 Notes
- Create personal notes
- Edit notes by double-clicking
- Delete notes
- Saves notes using `localStorage`
- Displays the creation date of each note

### 🌙 Theme
- Light mode with a soft violet color palette
- Dark mode
- Saves the selected theme using `localStorage`
- Theme can be switched using the button in the header

### 📱 Responsive Design
- Two-column layout on larger screens
- Single-column layout on smaller screens
- Responsive note cards
- Designed for desktop, tablet, and mobile screens

## Technologies

- HTML
- CSS
- JavaScript
- DOM Manipulation
- `localStorage`
- OpenWeatherMap API
- DummyJSON Quotes API

## Project Structure

```text
DailyBoard/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── moon.png
    ├── daylight.png
    ├── plus.png
    └── pluswhite.png
