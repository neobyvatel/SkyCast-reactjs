import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleFetchWeather = () => {
    if (cityName.trim() === "") {
      showToast("Invalid empty input. ");
      return;
    }

    const key = "e31236ca2959caf5178b8298a93073e8";
    const lang = "en";
    const units = "metric";

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&lang=${lang}&units=${units}`;

    fetch(currentWeatherUrl)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((currentWeatherData) => {
        showWeather(currentWeatherData);
      })
      .catch((error) => {
        console.log(error);
        showToast("City not found. Try again.");
      });

    setCityName("");
  };

  function showWeather(currentWeatherData) {
    console.log("Current Weather:", currentWeatherData);

    // Display current weather data
    setWeatherData({
      updateTime: getCurrentTime(),
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
    <section id="weather-area" className="p-7">
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
      <div className="mb-5">
        <h1 className=" text-3xl font-bold dark:text-white">
          Search weather by city
        </h1>
        <p className="text-lg font-semibold dark:text-white">
          Enter a city name to see the current weather
        </p>
      </div>

      <form className="mx-auto flex w-full flex-col gap-5 font-semibold lg:mx-0 lg:w-1/2 lg:flex-row">
        <input
          type="text"
          placeholder="Enter city name"
          id="cityName"
          value={cityName}
          onKeyDown={handleEnterKeyPress}
          onChange={handleCityNameChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
        />
        <button
          type="button"
          id="btnFetch"
          onClick={handleFetchWeather}
          className="block w-full rounded-lg bg-[#591D87] p-2 px-4 text-sm font-semibold text-gray-200 transition-all hover:bg-[#461669] dark:bg-[#D0BCFF] dark:text-black dark:hover:bg-[#B899FF]"
        >
          Get Weather
        </button>
      </form>

      <div className="mt-5 flex flex-col flex-wrap gap-5 text-white  md:flex-row [&>*]:rounded-lg [&>*]:p-7 [&>*]:font-bold [&>*]:shadow-lg [&>*]:transition-all">
        <div className="flex-1 bg-fuchsia-800 hover:bg-fuchsia-900 dark:bg-amber-700 dark:hover:bg-amber-800">
          <p id="updateTime" className="text-sm">
            Update time: {weatherData.updateTime}
          </p>
          <h1 id="city" className="text-3xl">
            {weatherData.city}
          </h1>
          <h1 id="temp" className="text-6xl">
            {weatherData.temp}
          </h1>
          <p className="text-2xl">
            feels like <span id="feelsLike">{weatherData.feelsLike}</span>
          </p>
        </div>
        <div className="flex-1 bg-purple-800 hover:bg-purple-900 dark:bg-violet-700 dark:hover:bg-violet-800">
          <h1 id="windSpeed" className="text-4xl">
            {weatherData.windSpeed}
          </h1>
          <p id="windDirection" className="text-xl">
            {weatherData.windDirection}
          </p>
          <p className="text-3xl">
            pressure: <span id="pressure">{weatherData.pressure}</span>
          </p>
          <p className="text-3xl">
            humidity: <span id="humidity">{weatherData.humidity}</span>%
          </p>
        </div>
        <div className="w-full bg-rose-800 hover:bg-rose-900 dark:bg-fuchsia-700 dark:hover:bg-fuchsia-800">
          <p id="weatherDescription" className="text-4xl">
            {weatherData.weatherDescription}
          </p>
          <p className="text-2xl">
            sunrise <span id="sunrise">{weatherData.sunrise}</span>
          </p>
          <p className="text-2xl">
            sunset: <span id="sunset">{weatherData.sunset}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeatherComponent;
