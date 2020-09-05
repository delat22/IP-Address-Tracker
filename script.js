


//DOM ELEMENTS
const inputIp = document.getElementById('input');
const submitButton = document.getElementById('btin');

const ipAddress = document.getElementById('address');
const location = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');


//Adding Event Listener
submitButton.addEventListener('click', ($event) => {
    $event.preventDefault();

    const post = inputIp.value;

    submitFormData(post);

    /*
    request.open('GET', 'http://ip-api.com/json/'+ inputIp.value +'?fields=9002');
    request.send();
    */
});


// An example script for redirecting users from USA to https://google.com/
// and users from Canada to https://google.ca/

// ip-api endpoint URL
// we need only the countryCode, but you can request more fields
// see http://ip-api.com/docs/api:json for documentation
/** 
function makeRequest(data){
   var endpoint = `http://ip-api.com/json/${data}`;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if(response.status !== 'success') {
        console.log('query failed: ' + response.message);
        return
      }
          // Redirect
        
      ipAddress.textContent= response.query,
          location.textContent =  response.regionName + response.countryCode + response.zip,
        timezone.textContent =  response.timezone,
          isp.textContent =  response.isp
    }
  };
  xhr.open('GET', endpoint, true);
  xhr.send();

}

*/
//Fetch API

function makeRequest(data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', `http://ip-api.com/json/${data}`);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 201) {
            resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        }
      };
      request.send();
    });
  }


  //Receive API response

  async function submitFormData(post) {
      try{
        const requestPromise = makeRequest(post);
        const response = await requestPromise;
        ipAddress.textContent = response.query;
        location.textContent =  response.regionName + response.countryCode + response.zip;
        timezone.textContent =  response.timezone;
        isp.textContent =  response.isp;
      }

      catch (errorResponse) { 

        alert('query failed: ' + response.message);
      }
  }
