const apiKey = "7199c3baa317d12d4401e3989860d041";
const city = "Chennai";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {

    // Temperature
    document.getElementById("temp").innerText =
      data.main.temp;

    // Humidity
    document.getElementById("humidity").innerText =
      data.main.humidity + " %";

    // Rainfall (may not exist always)
    if (data.rain && data.rain["1h"]) {
      document.getElementById("rain").innerText =
        data.rain["1h"] + " mm";
    } else {
      document.getElementById("rain").innerText =
        "No rain";
    }

    // Current weather condition
    document.getElementById("condition").innerText =
      data.weather[0].main;

  })
  .catch(error => {
    console.log("Error fetching weather data:", error);
  });
/* ================= HOURLY FORECAST (TODAY ONLY) ================= */
function getHourlyForecast() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const result = document.getElementById("hourlyResult");
  result.innerText = "Loading...";

  const today = new Date().toISOString().split("T")[0];

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      let output = "Today's Hourly Forecast\n\n";
      let found = false;

      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.startsWith(today)) {
          output +=
            data.list[i].dt_txt.split(" ")[1] +
            "\nTemperature: " + data.list[i].main.temp + " °C" +
            "\nWeather: " + data.list[i].weather[0].main +
            "\n\n";
          found = true;
        }
      }

      if (!found) {
        output = "No hourly data available for today";
      }

      result.innerText = output;
    })
    .catch(() => {
      result.innerText = "City not found";
    });
}

/* ================= DAY’S FORECAST (NEXT 5 DAYS) ================= */
function getDailyForecast() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const result = document.getElementById("dailyResult");
  result.innerText = "Loading...";

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      let output = "5 Days Forecast\n\n";

      for (let i = 0; i < data.list.length; i += 8) {
        output +=
          data.list[i].dt_txt.split(" ")[0] +
          "\nTemperature: " + data.list[i].main.temp + " °C" +
          "\nWeather: " + data.list[i].weather[0].main +
          "\n\n";
      }

      result.innerText = output;
    })
    .catch(() => {
      result.innerText = "City not found";
    });
}
