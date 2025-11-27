
# EJERCICIO: WEATHER APP  ☀️☁️🌧️

Este proyecto es un ejercicio práctico para trabajar useEffect, asincronía, formularios controlados y consumo de APIs en React. El objetivo es construir una pequeña aplicación que muestre el pronóstico extendido del tiempo usando la API 5 Day / 3 Hour Forecast de OpenWeather.


## 🛠 Tecnologías utilizadas

- **React**: Biblioteca principal de UI.
- **React Hooks**: `useState` `useEffect` 
- **JSX**: Para construir la estructura de los componentes.
- **Props**: Para pasar datos.
- **UUID**: Paquete npm para generar claves únicas para cada tarea.
- **CSS**: Estilos personalizados para Card, botones y formulario.
- **Netlify**: Despliegue de la aplicación.


## 🚀 Funcionalidades

### 1. **WeatherList**
- Recorre una lista de días del pronóstico extendido.
- Muestra para cada día un conjunto de tarjetas con la información meteorológica.
- Utiliza keys generadas con **UUID**.

### 2. **WeatherCard**
- Muestra el clima por franjas de 3 horas.
- Incluye:
  - 🕒 Horario  
  - 📆 Fecha 
  - 🌡️ Temperatura  
  - 🌤️ Estado del tiempo (clear, clouds, rain, etc.)  
  - 🖼️ **(EXTRA)** Imagen ilustrativa del clima  

### 3. **Buscador de ciudades**
- Formulario con input de texto + botón.
- Permite consultar el clima para cualquier ciudad.
- Actualiza el pronóstico al enviar la búsqueda.

---

## 🌤️ API utilizada

**OpenWeather – 5 Day / 3 Hour Forecast**

Devuelve datos meteorológicos en intervalos de 3 horas durante 5 días.


## 🔧 Instalación y ejecución

```bash
npm install
npm run dev
````



## Despliegue en Netlify
https://grand-bienenstitch-9cfb7a.netlify.app/

## DRepositorio de Git Hub
https://github.com/luciaaroca/weather_info.git

