import dotenv from 'dotenv';
dotenv.config();
import https from "https";

// TODO: Style the page
// TODO: Link up both client and server by finishing build through vid about it

var apiKey = process.env.weatherKey;

const getWeather = (req, res) => {

  let zipCode = req.body.zip
  let countryCode = req.body.country

  let url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`

  https.get(url, (response) => {
    console.log(response.statusCode);
    if(response.statusCode !== 200) {
      res.send({
        error: {
          err: `${response.statusMessage}.`
        },
      });
      return
    }
    // Using the response extract the 'data' and place it into a variable data in callback function
    // This response is different from the express app res since its from the https module that logs the response from the api call
    response.on('data', function(data){
      // turing that data into a json to better use/read it
      const locationData = JSON.parse(data);
      // console.log(locationData);
      let lat = locationData.lat;
      let lon = locationData.lon;
      let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

      https.get(url2, (response)=>{
        response.on('data', (data)=>{
          let weatherData = JSON.parse(data);
          // console.log(weatherData);
          const icon = weatherData.weather[0].icon;
          const weatherJson = {
            weatherRes: {
              temp: weatherData.main.temp,
              tempFeels: weatherData.main.feels_like,
              weatherType: weatherData.weather[0].description,
              imageUrl: `http://openweathermap.org/img/wn/${icon}@2x.png`,
              }
            }
          // Sending a response back after post request is sent with zip and country
          res.send(weatherJson)
        })
      })
    });
  });
};

// if multiple functions for all our routes implementation code we can export like: {getWeather, getAnotherThing}
// module.exports = {getWeather};
export default getWeather;
