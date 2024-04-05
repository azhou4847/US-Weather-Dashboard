import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import DetailView from './routes/DetailView';
import Dashboard from './component/Dashboard';

function App() {
/*
  const [forecastList, setForecastList] = useState([]);
  const [locationWeather, setlocationWeather] = useState("Washington,DC");
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
    const response = await fetch(API_BASE_URL+"/forecast/daily?city="+locationWeather+"&units=I&key="+ACCESS_KEY);
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
  const handleLocationInput = (e) => setlocationWeather(e.target.value);
  const searchDateLocation = () => {
    if (locationWeather.length > 0) {
      let results = forecastList.filter((e) => { return e.datetime == date; });
      setForecastList(results);  
    }
    else { alert("Cannot search for date without a location");}
   }

   const location = useLocation();
   console.log(location);
   useEffect(() => {
     console.log(location);
   }, [location]);*/

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index={true} path="/" element={<Dashboard/>}/> 
            <Route index={false} path="/:date/:location" element={<DetailView/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
