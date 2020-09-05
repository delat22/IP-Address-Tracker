


//DOM ELEMENTS
const inputValue = document.getElementById('input');
const submitButton = document.getElementById('btin');

const ipAddress = document.getElementById('address');
const location = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');


submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  const inputText = inputValue.Value;
  
  var result = fetch(`https://geo.ipify.org/api/v1?apiKey=at_DuE1mQRJGaRuY1kbYgW6ggKTBGMDw&ipAddress=${inputText}`);
  
  result.then(response => {
      return response.json();
  }).then(data => {
      var ipAddressRes = `${data.ip}`;
      var locationRes = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
      var timeZoneRes = `UTC ${data.location.timezone}`;
      var ispRes = `${data.isp}`;
      //var latitudeRes = `${data.location.lat}`;
      //var longitudeRes = `${data.location.lng}`;
      ipAddress.innerHTML = ipAddressRes;
      location.textContent = locationRes;
      timezone.innerHTML = timeZoneRes;
      isp.innerHTML = ispRes;
     // myMap.panTo(new L.LatLng(latitudeRes, longitudeRes));
      //L.marker([latitudeRes, longitudeRes], {icon: mapMarker}).addTo(myMap);
  });
});

/*
{
  "status": "success",
  "country": "Nigeria",
  "countryCode": "NG",
  "region": "LA",
  "regionName": "Lagos",
  "city": "Ikoyi",
  "zip": "",
  "lat": 6.44368,
  "lon": 3.42653,
  "timezone": "Africa/Lagos",
  "isp": "MTN NIGERIA Communication limited",
  "org": "Staticnatfor Gprswimaxcorporate",
  "as": "AS29465 MTN NIGERIA Communication limited",
  "query": "197.210.227.103"
}
*/