// export const fetchLocationId = async (city) => {
//     const response = await fetch(
//       `https://www.metaweather.com/api/location/search/?query=${city}`,
//     );
//     const locations = await response.json();
//     return locations[0].woeid;
//   };
  
  export const fetchWeather = async(city) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=399581bf72364f5183c52238241503&q=${city}&aqi=yes`,
    );
    const { current } = await response.json();

    const condition = current.condition.text
    const temperature = current.temp_c

    return [condition, temperature]
  };