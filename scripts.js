
const body = document.getElementById('body');

const inputForm = document.getElementById('input')

const loc = document.getElementById('location');
const address = document.getElementById('address');
const timeZone = document.getElementById('timezone');
const lisp = document.getElementById('isp');

const submitButton = document.getElementById('btin');


submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  
  const post = inputForm.value;
  submitFormData(post);
})

function makeRequest(data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', `http://ip-api.com/json/${data}?fields=61439`);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 201 || request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(JSON.parse(request.responseText));
        }
      }
    };
    request.send();
  });
}

async function submitFormData(post) {
  try{
    const requestPromise = makeRequest(post);
    const response = await requestPromise;
    address.textContent = response.query;
    timeZone.textContent = response.timezone;
    lisp.textContent = response.isp;
    loc.textContent = response.regionName + ', ' + response.city + ', ' + response.countryCode;
    mymap.setView([response.lat, response.lon], 13);
    L.marker([response.lat, response.lon]).addTo(mymap);
    
  }

  catch (errorResponse) { 

    alert('query failed: ' + response.message)
  }
}


//leafjs
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZGVsYXRiYWJhIiwiYSI6ImNrZWs5YWoxejEyZ3cycW5waWMwc2VkcHkifQ.hDx7OrGBMvKyLlHxGIF7eQ'
  }).addTo(mymap);
 // var marker = L.marker([51.5, -0.09]).addTo(mymap);
  