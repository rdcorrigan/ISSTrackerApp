const div = document.getElementById('data');
const update = document.getElementById('update');

// fetches current coordinates of ISS
fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => { 
        const coordinates = document.createElement('p');
        coordinates.classList.add('coordinates');
        let lat = data['iss_position']['latitude'];
        let long = data['iss_position']['longitude'];
        coordinates.textContent = `Latitude: ${lat}
        Longitude: ${long}`;
        
        // reverse geocode for region
        const getRegion = (latitude, longitude) => {
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
              .then(response => response.json())
              .then(data => {
                const region = document.createElement('div');
                const appendP = document.createElement('p');
                const appendP2 = document.createElement('p');
                region.innerText = 'The ISS is currently above';
                appendP.classList.add('location');

                if (data.countryName.length) {
                    appendP.innerText = data.countryName;
                    region.append(appendP);

                } else {
                    appendP.innerText = `The ${data.localityInfo.informative[0].name}`;
                    appendP2.innerText = `The ${data.localityInfo.informative[0].description}`;
                    region.append(appendP);
                    region.append(appendP2);
                } 
                div.appendChild(region).appendChild(coordinates);
              })
              .catch(error => {
                console.log(`Error fetching location data: ${error}`);
              });
        }
        getRegion(lat, long); 
    })
    .catch(error => console.error(error));

update.addEventListener('click', window.location.reload.bind(window.location));








             