import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [weather, setWeather] = useState({})
  const [icon, setIcon] = useState()
  const [initialTemp, setInitialTemp] = useState()
  const [finalTemp, setFinalTemp] = useState()
  const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function success(pos) {
  const crd = pos.coords;
  const api_key = '2731dce29d2f742b54c946ab7b398a9d'
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${api_key}`)
  .then(res => { 
    setWeather(res.data)
    setInitialTemp(res.data.main.temp.toFixed(2))
    setFinalTemp((res.data.main.temp - 273.15).toFixed(2))
    setIcon(`http://openweathermap.org/img/w/${res.data.weather?.[0].icon}.png`)
  })

}
console.log(weather)

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const calculateTemp  = () => {
  let state = count + 1
  if (state >=3){
    state = 0
  }
  setCount(state)
  let Temp = 0
  if (state == 0){
    Temp = initialTemp - 273.15
  } else if (state == 1){
    Temp = (((initialTemp - 273.15) * 9/5) + 32)
  }else{
    Temp = initialTemp*1
  }
  setFinalTemp(Temp.toFixed(2))
}
useEffect(() =>{ 
  actualiceTemp();
},[])

const actualiceTemp = () => {
  navigator.geolocation.getCurrentPosition(success, error, options);
}

  
  return (
    <div className="App">
      <div className="card">
        <h1>Wheather App</h1>
        <div className="content">
          <div className="logo">
              <img src={icon} alt="" />
          </div>
          <div className="data">
            {/* <h3>Scattered Clounds</h3> */}
            <h3 className="city" >{weather.name}</h3>
            <div className="registers">
              <ul>
                <li>
                 <i className="fa-solid fa-wind"></i>{'    '}Wind Speed {weather.wind?.speed} m/s
                </li>
                <li>
                 <i className="fa-solid fa-cloud"></i>{'    '}Clouds {weather.clouds?.all}%
                </li>
                <li>
                 <i className="fa-solid fa-temperature-half"></i>{'    '}Pressure {weather.main?.pressure} mb
                </li>
              </ul>
            </div>
            <div className="temp">
                Temp {finalTemp} {count == 0 ? '°C': count == 1 ? '°F': '°K'}
            </div>
            <div className="button">
              <button onClick={calculateTemp}>Change °C / °F / °K</button>
              {/* <button onClick={actualiceTemp}>Temperature</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
