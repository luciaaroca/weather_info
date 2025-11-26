import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Oval } from 'react-loader-spinner';
import axios from 'axios'
import WeatherCard from "./WeatherCard/WeatherCard";
import './WeatherList.css'
const WeatherList = () => {

    //ESTADOS
    const [value, setValue] = useState("Oviedo"); //Almacena el texto que escribe el usuario en el INPUT-> Oviedo por defecto
    const [posts, setPosts] = useState([]); //DATOS de la API (pronósticos)
    const [city, setCity]=useState("");//CIUDAD que devuelve la API (nombre oficial)
    const [loading, setLoading] = useState(false); //LOADING de la API (por defecto false)
    const [error, setError] = useState(""); //mensaje de ERROR
    
    //API KEY 
    const API_KEY = import.meta.env.VITE_SOME_KEY

    //UseEffect:un hook que sirve para ejecutar código “secundario” o “efectos"----------

    //useEffect -> geolocalización----------------

      useEffect(()=>{
        const fetchWeatherByCoords = async (lat, lon) => {//se le pasan las variables latitud y longitud (para saber la localización del usuario)
          setLoading(true); //activa el loader mientras llega la API.
          try{
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
            const json = res.data;

            setPosts(res.data.list); //guarda la lista de pronósticos en posts(DATOS API)(list-> se llama asi en la API)
            setCity(res.data.city.name); //guarda el nombre de la ciudad que devuelve la API (city.name)
          }catch(e){
             setPosts([]) // No pintes nada 
          }finally {
             setLoading(false);//desactivar loader
          }
      }
        //Comprobar si el navegador permite geolocalización
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);//le pasamos a la función-> latutud, longitud del navigator geolocation
          },
          () => setValue("Oviedo") // fallback si no permite geolocalización
        );
        }
        }, []
      )//----------------------------------


      //useEffect original--> LLama a la api con el valor del texto INPUT (ciudad que se ha escrito)---------
      useEffect(() => {
        async function fetchData() {
          try{
            setLoading(true);//loading mientras llamada a la API
            setError("");//limpiar errores anteriores
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${API_KEY}&units=metric&lang=es`);
            const json = res.data;
            
            setPosts(res.data.list);//guarda en nuestro array post los datos de pronóstico
            setCity(res.data.city.name); // guarda/actualiza el nombre original de la CIUDAD API
          }catch(e){
            setPosts([]) // No pinta nada 
            setError("No se encontró la ciudad"); 
          }finally {
            setTimeout(() => {//efecto retraso de 1 seg en el loading
            setLoading(false);
            }, 1000);
            }
        }
        fetchData();//ejecutar función fetchData
      }, [value]); // [value]-> solo ejecutar el efecto cuando value cambie
    

    //Maneja el FORMULARIO -> handleSubmit
    //e.target-> formulario (elemento que disparó el evento)
    //e.target.city (referencia al input del formulario name="city")
    //e.target.city.value -> contenido escrito por el usuario
    const handleSubmit = async e => {
        e.preventDefault();//previene recarga pag
        console.log(e.target.city.value)//ver si estamos obteniendo el valor correcto
        setValue(e.target.city.value) // Modificando el estado de Value
      };

    //Itera sobre el array posts (que contiene los pronósticos de la API).
    //Para cada post, renderiza un componente WeatherCard pasándole los datos
    const renderWeatherCards = () => 
       posts.map(post =>
       <WeatherCard
       data ={post}
       key={uuidv4()}
      />
      )

    //RETURN -> lo que renderizaremos en la pantalla
    //onSubmit={handleSubmit} -> cuando el usuario envía el formulario completo
    return <section className='card'>
          <h1>Find your city</h1>
          <form onSubmit={handleSubmit} className='form'>
            <input name="city" placeholder="Buscar ciudad..."/>
            <button>Buscar</button>
          </form>
          <h4> {loading ? `Buscando...` : `Clima en ${city}`}</h4> {/*Si esta loading(buscando...) sino clima ciudad */}
          {error && <p className="error">{error}</p>}
          <section>
              {loading ? ( 
                <div className="oval-container">
                  <Oval height={80} width={80} color="#1f0865ff" visible={true} />
                </div>
              ) : (
                <ul className='cards'>{renderWeatherCards()}</ul>
              )}
            </section>
          
          </section>
};

export default WeatherList;
