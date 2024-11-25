export const API_KEY = "5e0f28dce9f4e1a507d57931adc258b9";
export const WeatherAPI = async (city_name) => {
  const API_KEY = "5e0f28dce9f4e1a507d57931adc258b9";
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_KEY}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

// lat=${lat}&lon=${lon}&
