# WeatherWise - Smart Weather Assistant

A modern, AI-powered weather application that provides real-time weather data and intelligent recommendations for daily activities.

## Features

### 🌤️ Real-Time Weather Data
- Current temperature and weather conditions
- Humidity, wind speed, and atmospheric pressure
- "Feels like" temperature
- Detailed weather descriptions

### 🤖 AI-Powered Recommendations
- **Smart Clothing Suggestions**: Get personalized outfit recommendations based on temperature and weather conditions
- **Activity Recommendations**: Discover ideal indoor/outdoor activities for current weather
- **Weather Tips**: Receive intelligent advice for health, safety, and comfort

### 🎨 Modern UI/UX
- Clean, card-based design with glassmorphism effects
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive search with real-time feedback

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript (ES6+)**: Async/await API calls and DOM manipulation
- **OpenWeatherMap API**: Real-time weather data
- **Font Awesome**: Icons and visual elements

## Getting Started

### Prerequisites
- Modern web browser
- Internet connection
- OpenWeatherMap API key (included)

### Installation

1. Clone or download the repository
2. Navigate to the `weatherFetching` folder
3. Open `index.html` in your web browser

### Usage

1. Enter a city name in the search box
2. Click the search button or press Enter
3. View current weather conditions
4. Read AI-generated recommendations for clothing, activities, and tips

## File Structure

```
weather-fetch/
└── weatherFetching/
    ├── index.html      # Main HTML structure
    ├── styl.css        # Styling and animations
    ├── script.js       # JavaScript functionality
    └── README.md       # Project documentation
```

## API Integration

The app uses the OpenWeatherMap API to fetch real-time weather data:
- Base URL: `https://api.openweathermap.org/data/2.5/weather`
- Units: Metric (Celsius)
- Includes: Temperature, humidity, wind speed, pressure, weather description

## AI Logic

The AI assistant analyzes weather conditions to provide:
- Temperature-based clothing recommendations
- Weather-appropriate activity suggestions
- Health and safety tips based on humidity, wind, and conditions

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Contact

For questions or suggestions, please open an issue in the repository.