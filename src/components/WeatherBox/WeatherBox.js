import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = props => {

  const [data, setData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);


  const handleCityChange = useCallback (cityName => {
    //console.log('City name:', cityName);
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e5b9c72d12d093ec4cef017909b4ebbf&units=metric`)
      .then(res => {
        if(res.status === 200) {
          res.json()
            .then( data => { 
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };
              //console.log('Weather data: ', weatherData);
              setData(weatherData);
              //console.log('data: ', data);
              setPending(false);
            })
          } else {
            //alert('ERROR!')
            setError(true);
          }
      });
  }, []);


  return (
    <section>
      <PickCity action={handleCityChange}/>
      { (data && !pending && !error) && <WeatherSummary data={data} /> }
      { (pending && !error) && <Loader /> }
      { error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;