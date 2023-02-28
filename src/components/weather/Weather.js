import React,{useEffect, useState} from 'react'

export default function Weather() {
    const [searchValue,setSearchValue]=useState("bareilly");
    const [data,setData]=useState({});
    const searchWeather=async ()=>{
    try {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&unit=metric&appid=cfd6b095278008569b3398a4939e34d7`
        let res=await fetch(url);
        let ans= await res.json();
        const {temp,pressure,humidity}=ans.main;
        const{main:weathermood}=ans.weather[0];
        const {name}=ans;
        const {country,sunset}=ans.sys;
        const {speed}=ans.wind;

        const weatherinfo={
            temp,
            pressure,
            humidity,
            weathermood,
            name,
            country,
            sunset,
            speed,
            
        };
        setData(weatherinfo);

        
    } catch (error) {
        console.log(error);
        
    }
    }
    
    useEffect(()=>{
        searchWeather();

    }, []);
  return (
    <>
    <div className="bg-gray-800 w-screen h-screen flex flex-col items-center center">
      <div>
        <div className="">
            <input type="text" placeholder='search..' className='p-2 mt-36  shadow-md' value={searchValue} onChange={(e)=>{
               setSearchValue( e.target.value);

            }}></input>
            <button className='bg-blue-500 p-2 mt-36  shadow-md hover:cursor-pointer' onClick={searchWeather}>Search <i class="fa-solid fa-magnifying-glass"></i></button>
            
           
            

        </div>
        <div className='mt-10 bg-gray-200'>
            <div className="bg-white h-30 w-96 p-10">
            <i class="fa-sharp fa-solid fa-sun fa-4x center"></i><h1>Weather</h1>
            
                </div>
                <div className='bg-black flex-row'>
                    <span className='text-white text-7xl'>{data.temp} </span>
                    <span  className='text-white text-lg'>{data.weathermood} </span>
                  
                    <span  className='text-white text-lg'>{data.name} </span>
                    <span className='bg-slate-800 text-white'>
                        {new Date().toLocaleString()}

                    </span>

                </div>
            
            </div>
            <div className='flex bg-white space-x-10'>
            <div>
                <p>{data.sunset}</p>
                <p>Sunset</p>
            </div>
            <div>
                <p>{data.humidity}</p>
                <p>Humidity</p>
            </div>
            <div>
                <p>{data.pressure}</p>
                <p>pressure</p>
            </div>
            <div>
                <p>{data.speed}</p>
                <p>wind</p>
            </div>
            </div>
      </div>

    </div>
    </>
  )
}
