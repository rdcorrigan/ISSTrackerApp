const div = document.getElementById('data');
const update = document.getElementById('update');

fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => { 
        const coordinates = document.createElement('p');
        let lat = JSON.stringify(data['iss_position']['latitude']);
        let long = JSON.stringify(data['iss_position']['longitude']);
        lat = lat.substring(1, lat.length-1);
        long = long.substring(1, long.length-1);
        coordinates.textContent = `Latitude: ${lat},
        Longitude: ${long}`;
        
        const getLocation = (latitude, longitude) => {
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
              .then(response => response.json())
              .then(data => {
                const region = document.createElement('div');
                if (data.countryName.length > 0) {
                    region.textContent = `The ISS is currently above: ${data.countryName}`;
                } else {
                    region.textContent = `The ISS is currently above: the ${data.localityInfo.informative[0].name} (the ${data.localityInfo.informative[0].description})`;
                }
                div.appendChild(region).appendChild(coordinates);
              })
              .catch(error => {
                console.log(`Error fetching location data: ${error}`);
              });
        }
        getLocation(lat, long); 
    })
    .catch(error => console.error(error));

update.addEventListener('click', window.location.reload.bind(window.location));