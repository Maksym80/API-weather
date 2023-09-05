// https://api.openweathermap.org/data/2.5/weather?lat=47.9221233876735&lon=24.327071749525047&lang=ua&appid=0d54f8ab31e6d0acefacd3530529d7a6

const apiKey = "0d54f8ab31e6d0acefacd3530529d7a6";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=47.9221233876735&lon=24.327071749525047&lang=ua&appid=${apiKey}`;
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&lang=ua&appid=${apiKey}`);
  if (response.status === 404) {
    errorText.style.display = "block";
    weather.style.display = "none";
  }
  const data = await response.json();
  console.log(data, "data");

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  document.querySelector(".description").innerHTML =
    data.weather[0].description;

  weather.style.display = "block";
  errorText.style.display = "none";

  if (data.weather[0].main == "Clear") {
    weatherIcon.className = "fa-solid fa-sun";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.className = "fa-solid fa-cloud-rain";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.className = "fa-solid fa-cloud-mist";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.className = "fa-solid fa-cloud-drizzle";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});
