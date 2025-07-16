const modeToggle = document.getElementById("mode-toggle");
const body = document.body;
const apikey = "e38063deb4ca724172799e2e95d91bcf";
const cityInput = document.getElementById("city-input");
const weatherBtn = document.getElementById("weather-btn");

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  if (body.classList.contains("dark-mode")) {
    modeToggle.textContent = "Light Mode ☀️";
  } else {
    modeToggle.textContent = "Dark Mode 🌙";
  }
});

weatherBtn.onclick = async () => {
  const city = cityInput.value.trim().toLowerCase();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    document.getElementById("weather-result").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <h2>Temperature: ${data.main.temp}°C</h2>
      <h2>Weather: ${data.weather[0].description}</h2>
      <h2>Humidity: ${data.main.humidity}%</h2>
      <h2>Wind Speed: ${data.wind.speed} m/s</h2>
    `;
  } catch (error) {
    alert(error.message);
  }
};
