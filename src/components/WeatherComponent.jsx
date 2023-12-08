import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CategoryScale, Chart } from "chart.js";

// Register the CategoryScale
Chart.register(CategoryScale);

const WeatherComponent = () => {
  const showToast = (message) =>
    toast.error(`${message}`, {
      position: "top-right",
      autoClose: 3500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({
    updateTime: "10:38",
    placeholderValue: "Search for a city",
    city: "City, Country",
    temp: "--°C",
    feelsLike: "--°C",
    windSpeed: "wind speed: -- m/s",
    windDirection: "direction: --",
    pressure: "--",
    humidity: "--%",
    weatherDescription: "description",
    sunrise: "--",
    sunset: "--",
  });
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleFetchWeather();
    }
  };

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };
  const generateWeatherUrl = (cityName, endpoint) => {
    const key = "e31236ca2959caf5178b8298a93073e8";
    const lang = "en";
    const units = "metric";
    const baseUrl = "https://api.openweathermap.org/data/2.5";

    return `${baseUrl}/${endpoint}?q=${cityName}&appid=${key}&lang=${lang}&units=${units}`;
  };
  const fetchData = async (url) => {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      return [data, null];
    } catch (err) {
      return [null, err];
    }
  };

  const handleFetchWeather = async () => {
    if (cityName.trim() === "") {
      showToast("Invalid input. Enter a city name.");
      return;
    }
    const nowcastUrl = generateWeatherUrl(cityName, "weather");
    const forecastUrl = generateWeatherUrl(cityName, "forecast");

    const [nowcastData, nowcastErr] = await fetchData(nowcastUrl);
    const [forecastData, forecastErr] = await fetchData(forecastUrl);
    if (nowcastData[1] || forecastData[1]) {
      console.error("Error fetching data: ", nowcastErr, forecastErr);
      showToast("Error fetching data. ");
    } else {
      showWeather(nowcastData, forecastData);
    }

    setCityName("");
  };

  function showWeather(currentWeatherData, forecastData) {
    console.log("Forecast Data:", forecastData);
    console.log("Current Weather:", currentWeatherData);
    if (currentWeatherData.cod === "404") {
      showToast("City not found. ");
      return;
    }
    // Display current weather data
    if (currentWeatherData && currentWeatherData.sys) {
      setWeatherData({
        updateTime: getCurrentTime(),
        placeholderValue: `${currentWeatherData.name}, ${currentWeatherData.sys.country}`,
        city: `${currentWeatherData.name}, ${currentWeatherData.sys.country}`,
        temp: `${currentWeatherData.main.temp}°C`,
        feelsLike: `${currentWeatherData.main.feels_like}°C`,
        windSpeed: `Wind speed: ${currentWeatherData.wind.speed} m/s`,
        windDirection: `Direction: ${currentWeatherData.wind.deg}°`,
        weatherDescription: currentWeatherData.weather[0].description,
        humidity: `${currentWeatherData.main.humidity}%`,
        pressure: `${currentWeatherData.main.pressure} hPa`,
        sunrise: formatTimeFromTimestamp(currentWeatherData.sys.sunrise),
        sunset: formatTimeFromTimestamp(currentWeatherData.sys.sunset),
      });
    }
  }
  function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  function formatTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  return (
    <section id="weather-area">
      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex w-full justify-center p-7">
        {" "}
        <form className="mx-auto w-full lg:mx-0 lg:w-2/3">
          <label
            htmlFor="search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              id="cityName"
              value={cityName}
              onKeyDown={handleEnterKeyPress}
              onChange={handleCityNameChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              placeholder={weatherData.placeholderValue}
            />
            <button
              type="button"
              id="btnFetch"
              onClick={handleFetchWeather}
              className="absolute bottom-2.5 end-2.5 rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Search
            </button>
            {/* <small className="absolute mt-1 w-full text-right text-xs font-bold text-red-600">
              City not found
            </small> */}
          </div>
        </form>
      </div>
    </section>
  );
};
export default WeatherComponent;
