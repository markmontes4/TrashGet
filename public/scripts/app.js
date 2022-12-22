var map = L.map('map').setView([45.5152, -122.6784], 10);
var myPos = [];
var myIcon = L.icon({
  iconUrl: 'imgs/arms-up.png',
  iconSize: [50, 50],
  iconAnchor: [25, 35],
})

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getAllCoords(e){
  const data = {myPos, myIcon}
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  console.log('Button pushed!');
  console.log(options);
  const res = await fetch('/post', options);
  const json = await res.json();
  console.log(json);
}

if ('geolocation' in navigator) {
  console.log('geolocation is availabe');
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position.coords);
    myPos = [position.coords.latitude, position.coords.longitude]
    map.setView(myPos, 15);
    L.marker(myPos, {icon: myIcon}).addTo(map);
  });
} else {
  console.log('geolocation not available');
}