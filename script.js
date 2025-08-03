const inputCity = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const spinner = document.getElementById("spinner");
const searchIcon = document.getElementById("searchIcon");
const errorMessage = document.getElementById("errorMessage");
const weatherDisplay = document.getElementById("weatherDisplay");

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 5000);
};

const showLoading = (isLoading) => {
    if (isLoading) {
        spinner.style.display = "block";
        searchIcon.style.display = "none";
        searchBtn.disabled = true;
    } else {
        spinner.style.display = "none";
        searchIcon.style.display = "block";
        searchBtn.disabled = false;
    }
};

const generateAISuggestions = (data) => {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weather = data.weather[0].main.toLowerCase();
    const description = data.weather[0].description;
    
    let clothing, activity, tip;
    
    // Clothing suggestions
    if (temp < 0) {
        clothing = "Heavy winter coat, thermal layers, gloves, and warm boots. Stay bundled up!";
    } else if (temp < 10) {
        clothing = "Warm jacket, long pants, and closed shoes. Layer up for comfort.";
    } else if (temp < 20) {
        clothing = "Light jacket or sweater, jeans, and comfortable shoes.";
    } else if (temp < 30) {
        clothing = "T-shirt, light pants or shorts, and breathable shoes.";
    } else {
        clothing = "Light, breathable clothing, shorts, and sandals. Stay cool!";
    }
    
    // Activity suggestions
    if (weather.includes('rain') || weather.includes('storm')) {
        activity = "Perfect for indoor activities like reading, cooking, or watching movies.";
    } else if (weather.includes('snow')) {
        activity = "Great for winter sports, building snowmen, or cozy indoor activities.";
    } else if (temp > 25 && weather.includes('clear')) {
        activity = "Ideal for swimming, beach activities, or outdoor sports.";
    } else if (temp > 15 && temp < 25) {
        activity = "Perfect for hiking, cycling, or outdoor picnics.";
    } else if (temp < 5) {
        activity = "Best to stay indoors or enjoy brief outdoor walks with warm clothing.";
    } else {
        activity = "Good for moderate outdoor activities like walking or light exercise.";
    }
    
    // Tips based on conditions
    if (humidity > 80) {
        tip = "High humidity detected. Stay hydrated and seek air-conditioned spaces.";
    } else if (humidity < 30) {
        tip = "Low humidity. Use moisturizer and drink plenty of water.";
    } else if (windSpeed > 10) {
        tip = "Windy conditions. Secure loose items and be cautious outdoors.";
    } else if (weather.includes('clear') && temp > 25) {
        tip = "Sunny and warm! Don't forget sunscreen and sunglasses.";
    } else if (weather.includes('cloud')) {
        tip = "Cloudy weather. Great for outdoor activities without harsh sun.";
    } else {
        tip = "Pleasant weather conditions. Enjoy your day!";
    }
    
    return { clothing, activity, tip };
};

const updateWeatherDisplay = (data) => {
    const { name, main, wind, weather } = data;
    
    document.getElementById("city").textContent = name;
    document.getElementById("temperature").textContent = `${Math.round(main.temp)}`;
    document.getElementById("weatherDesc").textContent = weather[0].description;
    document.getElementById("feelsLike").textContent = `${Math.round(main.feels_like)}°`;
    document.getElementById("humidity").textContent = `${main.humidity}%`;
    document.getElementById("windSpeed").textContent = `${wind.speed} m/s`;
    document.getElementById("pressure").textContent = `${main.pressure} hPa`;
    
    // Generate and display AI suggestions
    const suggestions = generateAISuggestions(data);
    document.getElementById("clothingSuggestion").textContent = suggestions.clothing;
    document.getElementById("activitySuggestion").textContent = suggestions.activity;
    document.getElementById("tipSuggestion").textContent = suggestions.tip;
    
    weatherDisplay.classList.add("show");
};

const weatherDetails = async () => {
    const city = inputCity.value.trim();
    
    if (!city) {
        showError("Please enter a city name");
        inputCity.focus();
        return;
    }
    
    if (city.length < 2) {
        showError("City name must be at least 2 characters");
        return;
    }
    
    showLoading(true);
    errorMessage.style.display = "none";
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=03325d37b1b225838e4efbfa9129a11c&units=metric`
        );
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling.");
            } else if (response.status === 401) {
                throw new Error("API key error. Please try again later.");
            } else {
                throw new Error("Unable to fetch weather data. Please try again.");
            }
        }
        
        const data = await response.json();
        updateWeatherDisplay(data);
        
    } catch (error) {
        if (error.name === "TypeError") {
            showError("Network error. Please check your internet connection.");
        } else {
            showError(error.message);
        }
        weatherDisplay.classList.remove("show");
    } finally {
        showLoading(false);
    }
};

searchBtn.addEventListener("click", weatherDetails);

inputCity.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !searchBtn.disabled) {
        weatherDetails();
    }
});

inputCity.addEventListener("input", () => {
    errorMessage.style.display = "none";
});