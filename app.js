const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "32b29ca42e5ffc23f236f98d8101172c";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = ` http://openweathermap.org/img/wn/${icon}@2x.png`;

      const countryCode = weatherData.sys.country;
      const visibility = weatherData.visibility;
      const sunrise = weatherData.sys.sunrise;
      const sunset = weatherData.sys.sunset;
      const humidity = weatherData.main.humidity;

      // console.log(response);
      // console.log(weatherData);
      res.write(
        `<style>
        #mainHead{
          
          text-align: center;
         margin-top:10%; 
        }
        </style>
        <h1 id='mainHead'>The Temperature In ${query} Is ${temp} Degress Celcius</h1>`
      );
      res.write(` <style>
      #wlogo{
        margin:3% 0 3% 50%;
      }
      </style>
      <img id="wlogo" src= ${imageUrl} >`);

      res.write(`  <div>
      <!-- City name -->  <!-- country code  --> <!-- visibility -->
       <!-- sunrise --> <!-- sunset -->  <!-- humidity -->

       <style>
       .elementContainer{
        display: flex;
          height: 35px;
          color: white;
          background-color: black;
       }
       .elementText{
        padding-left: 15%; padding-top: 1%
       }
       .apiData{

        display: flex;
        padding-left: 30%;
        padding-top: 1%;
        text-align: center;
       }
       </style>



      <div class='elementContainer'>
        <div class='elementText'>City Name:</div>
        <div class="apiData">
          ${query}
        </div>
      </div>
      <br>


      <!-- country code  -->

      <div class='elementContainer'>
      <div class='elementText'>Country Code :</div>
      <div class="apiData">
        ${countryCode}
      </div>
    </div>
    <br>


      <!-- Weather description-->
       <div class='elementContainer'>
        <div class='elementText'>Weather Description:</div>
        <div class="apiData" style="padding-right=50px;">
          ${weatherDescription}
        </div>
      </div>
      <br>

      <!-- visibility -->
      
      <div class='elementContainer'>
      <div class='elementText'>Visibility:</div>
      <div class="apiData">
        ${visibility}
      </div>
    </div>
    <br>

    <!-- humidity -->

    <div class='elementContainer'>
      <div class='elementText'>Humidity:</div>
      <div class="apiData">
      ${humidity}
      </div>
    </div>
    <br>

      <!-- sunrise-->
      <div class='elementContainer'>
      <div class='elementText'>Sunrise:</div>
      <div class="apiData">
        ${sunrise}
      </div>
    </div>
    <br>

      <!-- sunset-->
    
      <div class='elementContainer'>
      <div class='elementText'>Sunset:</div>
      <div class="apiData">
        ${sunset}
      </div>
    </div>
    <br>

    </div>`);

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
