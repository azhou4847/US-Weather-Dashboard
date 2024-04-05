/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { AreaChart,XAxis,YAxis,Area,Tooltip,Label } from 'recharts';
import '../App.css'

import Card from "./Card";
import WeatherRecord from "./WeatherRecord";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_BASE_URL = `http://api.weatherbit.io/v2.0`;

const Dashboard = () => {

    const [forecastList, setForecastList] = useState([]);
    const [location, setLocation] = useState("Washington,DC");
    const [date, setDate] = useState("");
    const [maxWeeklyTemp, setMaxWeeklyTemp] = useState(0);
    const [minWeeklyTemp, setMinWeeklyTemp] = useState(1000);
    const [avgWeeklyTemp, setAvgWeeklyTemp] = useState();
    const [graphData,setGraphData] = useState([]);

    async function fetchAllWeatherData() {
        //Reset the Summary Statistics
        setMaxWeeklyTemp(0);
        setMinWeeklyTemp(1000);
    
        //Get JSON
        const response = await fetch(API_BASE_URL+"/forecast/daily?city="+location+"&units=I&key="+ACCESS_KEY);
        const json = await response.json();
    
        console.log("Data Recieved From API Call:");
        console.log(json);
    
        //Calculate Weather Average
        let forecast = (json.data).splice(7,7); //why does this work? splice() isn't supposed to do this
        console.log(forecast.length);
        let result = forecast.reduceRight((a,e) => 
            a + ((e.max_temp + e.min_temp) / 2),0);
        result = result/7;
        //console.log("Average Temperature: ");
        //console.log(result);
        setAvgWeeklyTemp(Math.trunc(result));
      
        //Set Dashboard
        setForecastList(forecast)
        
        setGraphData([
          {"day": forecast[0].datetime,
          "avgTemp": (forecast[0].max_temp + forecast[0].min_temp) / 2},
    
          {"day": forecast[1].datetime,
          "avgTemp": (forecast[1].max_temp + forecast[1].min_temp) / 2}, 
        
          {"day": forecast[2].datetime,
          "avgTemp": (forecast[2].max_temp + forecast[2].min_temp) / 2},
        
          {"day": forecast[3].datetime,
          "avgTemp": (forecast[3].max_temp + forecast[3].min_temp) / 2},
        
          {"day": forecast[4].datetime,
          "avgTemp": (forecast[4].max_temp + forecast[4].min_temp) / 2},
        
          {"day": forecast[5].datetime,
          "avgTemp": (forecast[5].max_temp + forecast[5].min_temp) / 2},
        
          {"day": forecast[6].datetime,
          "avgTemp": (forecast[6].max_temp + forecast[6].min_temp) / 2}
          ]);
      }
    
      useEffect(() => {
        fetchAllWeatherData().catch(() => {
          //alert("Something went wrong with the search");
          console.error;
        });    
      },[])

    const handleDateInput = (e) => setDate(e.target.value);
    const handleLocationInput = (e) => setLocation(e.target.value);
    const searchDateLocation = () => {
        if (location.length > 0) {
        let results = forecastList.filter((e) => { return e.datetime == date; });
        setForecastList(results);  
        }
        else { alert("Cannot search for date without a location");}
    }

    return (
    <>
      <h1>⛅ Weekly US Weather Forecast</h1>
      <body>
        <div>
          <div id="summaryCards">
            <Card txt="Average Temp (F):" data={avgWeeklyTemp}/>
            <Card txt="Min Temp (F):" data={minWeeklyTemp}/>
            <Card txt="Max Temp (F):" data={maxWeeklyTemp}/>
          </div>
          <br/>
          <div id="weeklyWeatherAreaGraph">
            Average Temperature by Day
            <AreaChart width={1000} height={250} data={graphData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                </defs>
               
                <XAxis dataKey="day" height={60} sclaeToFit="true">
                  <Label value="Day of the week" offset={15} position="insideBottom" />  
                </XAxis> 
                <YAxis dataKey="avgTemp" sclaeToFit="true" label={{ value: 'Avg Temp (F)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Area type="monotone" dataKey="avgTemp" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </div>
          <br/>
          
          <div id='dashboard'>
            <b>📍Current Location: {location}</b> 
            <br/><br/>
            <div id="search">
              <input type="text" placeholder="Enter City,State" onChange={handleLocationInput}/> <button onClick={fetchAllWeatherData}>Search</button> 
              <input type="text" placeholder="Enter Date (YYYY-DD-MM)" onChange={handleDateInput}/> <button onClick={searchDateLocation}>Search</button> 
            </div>             

            <br/>
              { forecastList.length > 0 ? (
                  forecastList.map(
                    (e) => {
                      if (e.max_temp > maxWeeklyTemp) {setMaxWeeklyTemp(e.max_temp)}
                      if (e.min_temp < minWeeklyTemp) {setMinWeeklyTemp(e.min_temp)}
                      return <WeatherRecord location={location} date={e.datetime} maxTemp={e.max_temp} minTemp={e.min_temp} description={e.weather.description}/>;
                    })
              )
              : null }   
          </div>
        </div>
      </body>
    </>
  )
}
export default Dashboard;
