const submit =document.getElementById("submit");
const cityname =document.querySelector(".location");
let day =document.querySelector(".day");

const temp = document.querySelector(".temperature");
const forecast =document.querySelector(".forecast");
let temp_status =document.querySelector(".temp_status");
const humidity =document.querySelector(".humidity");

const city_search =document.querySelector("search-form")

const getDateTime=(dt)=>{
    const curDate = new Date(dt*1000);
    // console.log(curDate);

    const options ={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options).format(curDate);
    return formatter;
}

let city ="delhi";

const displayWeatherData = (data)=>{
    const {main, name, weather, sys, dt}=data;

    cityname.innerHTML = `${name}, ${sys.country}`
    day.innerHTML= getDateTime(dt);
    temp.innerHTML = `${main.temp}&#176`

    forecast.innerHTML =weather[0].main
    temp_status.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;

    humidity.innerHTML = `${main.humidity}%`
}

const fetchDelhiWeather =async(city)=>{
    const api= ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02b180c93e128797673ed56726b1c279 `


    try{
    const response =await fetch(api);
    const data = await response.json();
    
    // set the localStorage here 
    localStorage.setItem("weatherData",JSON.stringify(data));
    displayWeatherData(data);
    }catch{
        console.log("error");
    }

}

const getSearch =(event)=>{
    event.preventDefault();

    let cityName =document.getElementById("cityName_input");
    city =cityName.value;
    cityName.value="";

        fetchDelhiWeather(city);

    }

    const loadWeatherData =()=>{
         const weatherData = localStorage.getItem("weatherData");
         if(weatherData){
            const jData =JSON.parse(weatherData);
            displayWeatherData(jData);
         }
         else{
            fetchDelhiWeather("delhi");
         }
    }



submit.addEventListener("click", getSearch);
document.addEventListener("DOMContentLoaded",loadWeatherData);
