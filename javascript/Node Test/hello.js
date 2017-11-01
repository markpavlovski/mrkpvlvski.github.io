console.log("Hello, World!");

var latlong = '47.6279538,-122.3228368'

const request = require('request')
     ,url = 'https://maps.googleapis.com/maps/api/elevation/json?locations='+ latlong + '&key=AIzaSyDwmZ1I14N-upzFgZeRcbxi9BBE5A72Ax0'

request(url, (error, response, body)=> {
  if (!error && response.statusCode === 200) {
    const fbResponse = JSON.parse(body)
    console.log("The elevation at " + latlong +" is " + fbResponse.results[0].elevation + " meters.")
  } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode)
  }
})