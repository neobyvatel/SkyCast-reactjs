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
      showToast("Invalid empty input. ");
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
      <div className="mb-5 p-7 ">
        <h1 className=" text-3xl font-bold dark:text-white">
          Search weather by city
        </h1>
        <p className="text-lg font-semibold dark:text-white">
          Enter a city name to see the current weather
        </p>
        <form className="mx-auto mt-3 flex w-full flex-col gap-3 font-semibold lg:mx-0 lg:w-1/2 lg:flex-row">
          {/* <input className="block w-full rounded-2xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500" /> */}
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              type="text"
              placeholder=""
              id="cityName"
              value={cityName}
              onKeyDown={handleEnterKeyPress}
              onChange={handleCityNameChange}
              className="text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px]   border bg-transparent  px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 dark:text-white"
            />
            <label className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-500 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-purple-500 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
              Search...
            </label>
          </div>
          <button
            type="button"
            id="btnFetch"
            onClick={handleFetchWeather}
            className="block w-full rounded-lg  bg-[#591D87] p-2 px-4 text-sm font-semibold text-gray-200 transition-all  hover:bg-[#461669] dark:bg-[#D0BCFF] dark:text-black dark:hover:bg-[#B899FF]"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-5 flex flex-col flex-wrap gap-5 p-4 text-white md:flex-row [&>*]:rounded-2xl [&>*]:border [&>*]:border-gray-200 [&>*]:bg-neutral-100/30  [&>*]:p-7 [&>*]:font-bold [&>*]:shadow-lg [&>*]:backdrop-blur-lg [&>*]:backdrop-filter [&>*]:transition-all">
        <div className="flex-1  ">
          <p id="updateTime" className="text-sm">
            Update time: {weatherData.updateTime}
          </p>
          <h1 id="city" className="text-3xl">
            {weatherData.city}
          </h1>
          <h1 id="temp" className="text-6xl">
            {weatherData.temp}
          </h1>
          <p className="text-2xl ">
            feels like <span id="feelsLike">{weatherData.feelsLike}</span>
          </p>
        </div>
        <div className="flex-1 ">
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
        <div className="w-full">
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
