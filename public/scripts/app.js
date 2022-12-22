var map = L.map('map').setView([45.5152, -122.6784], 13);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getAllCoords(e){
  console.log('Button pushed!')
}

if ('gelocation' in navigator) {
  console.log('geolocation is availabe');
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    L.setView(position.coords);
  });
} else {
  console.log('geolocation not available');
}