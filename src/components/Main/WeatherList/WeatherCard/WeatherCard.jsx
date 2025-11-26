import React from "react";
import './WeatherCard.css'

const WeatherCard = ({data}) => {

  // Extraer la información correcta de la API-------
  const date = new Date(data.dt_txt);
    const formattedHour = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
    });

    const formattedDate = date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
    });
  const temp = data.main.temp;             
  const weather = data.weather[0].main; 
  const img = data.weather[0].icon
  //----------------------------------------------------
  
  return <section className="weather-card">
      <p><b>Hour:</b> {formattedHour}</p>
      <p><b>Date:</b> {formattedDate}</p>
      <p><b>Temperature:</b> {temp}ºC</p>
      <p><b>Weather:</b> {weather}</p>
      <img src={`https://openweathermap.org/img/wn/${img}@2x.png`}></img>
    </section>
};

export default WeatherCard;
