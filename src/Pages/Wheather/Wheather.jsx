import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { API_KEY, WeatherAPI } from "./WeatherAPI";
import "./Wheather.css";
import humidity from "../../assets/Images/humidity.png";
import wind from "../../assets/Images/wind.png";

const digitsMap = {
  0: "٠",
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
};

const daysOfWeek = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

function englishToArabicNumbers(englishNumber) {
  // Convert each digit of the input number
  return englishNumber.replace(/[0-9]/g, (digit) => digitsMap[digit]);
}

const defaultCity = "cairo";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [fiveDays, setFiveDays] = useState([]);
  const [daysState, setDaysState] = useState(true);
  const [city, setCity] = useState(defaultCity);

  // Function to get weather data based on user's geolocation
  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

        try {
          const response = await fetch(REVERSE_GEOCODING_URL);
          if (!response.ok) {
            throw new Error("Weather data not available");
          }
          const data = await response.json();
          setWeatherData(data);
          setFiveDays(data.list.filter((val, ind) => ind % 8 === 0));
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Geolocation request denied");
        }
      }
    );
  };

  // Fetch weather data for the default or selected city on component mount or city change
  useEffect(() => {
    const getData = async () => {
      const data = await WeatherAPI(city);
      if (data) {
        setFiveDays(data.list.filter((val, ind) => ind % 8 === 0));
        setWeatherData(data);
      }
    };
    getData();
  }, [city]);

  // Handle city search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    const cityName = e.target.elements.city.value.trim();
    if (cityName) {
      setCity(cityName);
      localStorage.setItem("weatherCity", cityName);
    }
  };

  // Toggle between main day and five days view
  const handleClick = () => {
    setDaysState(!daysState);
  };

  return (
    <>
      {" "}
      <div className="weather">
        {daysState ? (
          <MainDay
            weatherData={weatherData}
            handleClick={handleClick}
            handleSearch={handleSearch}
            getUserCoordinates={getUserCoordinates}
          />
        ) : (
          <div className="box">
            <FiveDays
              handleClick={handleClick}
              fiveDays={fiveDays}
              weatherData={weatherData}
            />
          </div>
        )}
      </div>
    </>
  );
}

// Component for displaying weather data for the main day view
function MainDay({
  weatherData,
  handleClick,
  handleSearch,
  getUserCoordinates,
}) {
  return (
    <>
      <div className="box">
        <div className="main-weather">
          <div className="weather-information">
            <div className="d-flex flex-column gap-3 justify-content-around image-weather">
              {weatherData.list ? (
                <>
                  <div className="d-flex align-items-center">
                    <img
                      width={150}
                      src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
                      alt=""
                    />
                  </div>
                </>
              ) : null}
              <Button onClick={handleClick} variant="success">
                عرض المزيد
              </Button>
            </div>
            <article>
              {/* Date */}
              {weatherData.list ? (
                <p dir="rtl" className="date" style={{ fontSize: "24px" }}>
                  {englishToArabicNumbers(
                    weatherData.list[0].dt_txt.substr(8, 2)
                  )}{" "}
                  {
                    months[
                      Number(
                        weatherData.list[0].dt_txt.split(" ")[0].split("-")[1]
                      ) - 1
                    ]
                  }{" "}
                  {englishToArabicNumbers(
                    `${new Date(
                      weatherData.list[0].dt_txt.split(" ")[0]
                    ).getFullYear()}`
                  )}{" "}
                  <bdi>{weatherData?.city?.name} مدينة</bdi>
                </p>
              ) : null}
              {/* Temperature */}
              <h3
                className="my-0"
                style={{ fontSize: "75px", fontWeight: "500" }}
              >
                {weatherData.list
                  ? `${englishToArabicNumbers(
                      (weatherData.list[0].main.temp - 273).toFixed(0)
                    )}°C`
                  : null}
              </h3>
              {/* Hour */}
              <p className="hour text-end" style={{ fontSize: "24px" }}>
                <bdi className="me-2">
                  {englishToArabicNumbers(
                    `${Math.abs(new Date().getHours() - 12)}`
                  )}
                  :{englishToArabicNumbers(`${new Date().getMinutes()}`)}
                  {new Date().getHours() <= 24 ? "م" : "ص"}
                </bdi>
                غروب الشمس
              </p>
            </article>
          </div>
          <hr />
          <p className="weather-tips">
            الطقس غائم اليوم، ومشمس في بعض الفترات <br />
            اليوم هو يوم سئ لاستخدام المبيدات الحشرية
          </p>
        </div>
        <form onSubmit={handleSearch} className="d-flex mt-3 column-gap-3">
          <input
            type="text"
            id="city"
            name="city"
            autoComplete="off"
            className="w-100"
            style={{
              border: "none",
              outline: "none",
              padding: "6px 12px",
              borderRadius: "0.375rem",
            }}
          />
          <Button type="submit" variant="success">
            بحث
          </Button>
        </form>
        <div className="or my-3">
          <hr />
          <p>OR</p>
        </div>
        <Button
          variant="success"
          onClick={getUserCoordinates}
          className="d-block mx-auto mb-3"
        >
          Use Current Location
        </Button>
      </div>
      <h3 dir="rtl" className="text-center mb-0">
        قم بمعرفة هل اليوم مناسب{" "}
        <span className="d-block">لاستخدام المبيدات الحشرية</span> ام لا
      </h3>
    </>
  );
}

// Component for displaying weather data for the five days view
function FiveDays({ handleClick, fiveDays, weatherData }) {
  return (
    <>
      <div className="daysCards">
        {
          <div className="p-3 card">
            {
              <>
                <div className="content-of-main-weather d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex align-items-center head">
                    <img
                      src={`https://openweathermap.org/img/wn/${fiveDays[0].weather[0].icon}.png`}
                      alt=""
                      width={150}
                    />
                    <h4 className="mb-0" style={{ fontSize: "48px" }}>
                      {fiveDays[0]
                        ? `${englishToArabicNumbers(
                            (fiveDays[0].main.temp - 273).toFixed(0)
                          )}°C`
                        : null}
                    </h4>
                  </div>
                  <div className="text">
                    <article>
                      {/* Date */}
                      {fiveDays[0] ? (
                        <p
                          dir="rtl"
                          className="date"
                          style={{ fontSize: "24px" }}
                        >
                          {englishToArabicNumbers(
                            fiveDays[0].dt_txt.substr(8, 2)
                          )}{" "}
                          {
                            months[
                              Number(
                                fiveDays[0].dt_txt.split(" ")[0].split("-")[1]
                              ) - 1
                            ]
                          }{" "}
                          {englishToArabicNumbers(
                            `${new Date(
                              fiveDays[0].dt_txt.split(" ")[0]
                            ).getFullYear()}`
                          )}{" "}
                          <bdi>{weatherData[0]?.city?.name} مدينة</bdi>
                        </p>
                      ) : null}
                      {/* Hour */}
                      <p className="hour text-end" style={{ fontSize: "24px" }}>
                        <bdi className="me-2">
                          {englishToArabicNumbers(
                            `${Math.abs(new Date().getHours() - 12)}`
                          )}
                          :
                          {englishToArabicNumbers(`${new Date().getMinutes()}`)}{" "}
                          {new Date().getHours() <= 24 ? "م" : "ص"}
                        </bdi>
                        غروب الشمس
                      </p>
                      <p>اليوم هو يوم سئ لاستخدام المبيدات الحشرية</p>
                    </article>
                  </div>
                </div>
              </>
            }
          </div>
        }
        {fiveDays.slice(1, 5).map((value, index) => (
          <div key={index} className="card p-3">
            <h4>{daysOfWeek[new Date(value.dt_txt).getDay()]}</h4>
            <img
              width={150}
              src={`https://openweathermap.org/img/wn/${value.weather[0].icon}.png`}
              alt=""
            />
            <h4>{(value.main.temp - 273).toFixed(0)}°C</h4>
          </div>
        ))}
      </div>
      <Button
        variant="success"
        onClick={handleClick}
        className="mt-3 mx-auto d-block"
      >
        عرض أقل
      </Button>
    </>
  );
}

/*
{{weatherData.list ? (
          <h3 className="m-0">
            Wind: {weatherData.list[0].wind.speed}
            {"km/s "}
            <img width={48} src={wind} alt="" />
          </h3>
        ) : null}
        {weatherData.list ? (
          <h3>
            Humidity: {weatherData.list[0].main.humidity}
            {"% "}
            <img width={48} src={humidity} alt="" />
          </h3>
        ) : null}
        <span>
          {weatherData.list
            ? `Full Date: ${weatherData.list[0].dt_txt.split(" ")[0]}`
            : null}
        </span>
        <br />
        <span>
          {weatherData.list
            ? `Time: ${weatherData.list[0].dt_txt.split(" ")[1]}`
            : null}
        </span>
*/
