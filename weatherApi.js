const coordinates = { lat: "39.7392", lon: "-104.9902" }; // 39.7392, -104.9902
const city = 'Denver,CO';
const openWeathermapKey = '45ee404dc6afbbb35490a04f255214f7';
const openWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&APPID=${openWeathermapKey}&units=imperial`;

const createEndpoint = (lat, lon) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&APPID=${openWeathermapKey}&units=imperial`;

const styles = {
  alignItems: 'center',
  backgroundColor: 'white',
  display: 'flex',
  border: '1px solid orange',
  flexDirection: 'column',
  height: '350px',
  gap: '1rem',
  justifyContent: 'center',
  width: '250px',
};

const header = {
  color: 'magenta',
}

const button = {
  width: '100%'
}

// ____________START COMPONENT ________________________
const WeatherTile = () => {
  const [weatherData, setWeatherData] = React.useState(undefined);
  const [latitude, setLatitude] = React.useState("39.7392");
  const [longitude, setLongitude] = React.useState("-104.9902");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(undefined);
  
  const fetchData = React.useCallback(() => 
  fetch(createEndpoint(latitude, longitude))
    .then((response) => response.json())
    .then((weather) => {
      setWeatherData(weather);
      setLoading(false);
      if (!!weather.cod && !!weather.message) {
        setError(true);
      } else error && setError(undefined)
      console.log("FETCHED WEATHER DATA: ", weather)
    }).catch(error => {
    setError(true);
    console.error('Error fetching weather data: ', error)
    setLoading(false)
  }), [latitude, longitude]);
  
  React.useEffect(()=> {
    fetchData();
  }, [])
  console.log('weatherData: ', weatherData)
  
  const handleUpdateLatitude = React.useCallback((e)=> {
    setLatitude(e.currentTarget.value);
  }, [])
    const handleUpdateLongitude = React.useCallback((e)=> {
    setLongitude(e.currentTarget.value);
  }, [])
  
  return (
    <div className='tile' style={styles}>
      <h1 style={header}>Current weather:</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error loading weather</h2>
      ) : (
      <>
        <h2>{weatherData?.current ? weatherData.current.temp : "??"} °F</h2>
        <input name='latitude' onChange={handleUpdateLatitude} value={latitude}/>
        <input name='longitude' onChange={handleUpdateLongitude} value={longitude}/>
        <button onClick={fetchData}>Search</button>
      </>)}
    </div>
  );
};
// ____________END COMPONENT ________________________

ReactDOM.render(<WeatherTile/>, document.querySelector('#root'));