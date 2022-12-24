var map = L.map('map').setView([45.5152, -122.6784], 10);
var myPos = [];
var targetCount = 0;
var myIcon = L.icon({
  iconUrl: 'imgs/arms-up.png',
  iconSize: [50, 50],
  iconAnchor: [25, 35],
})

var trashIcon = L.icon({
  iconUrl: 'imgs/trash-icon.png',
  iconSize: [50, 50],
  iconAnchor: [25, 35],
})

window.onload = () => {
  getAllCoords();
}

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getAllCoords(e){
  try{
    const res = await fetch('/get');
    const json = await res.json();
    console.log(json);
    json.forEach((target) => {
        L.marker(target.coords, {icon: trashIcon}).addTo(map);
    })
  } catch(err){
      console.log({error: err});
  }
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

map.addEventListener("click", (e) => {
  $('#portfolioModal1').modal('show');
  console.log("modal closed");
  // L.marker(e.latlng, {icon: trashIcon}).addTo(map);
  // console.log(e.latlng);
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(e.latlng)
  // }
  // fetch('/post', options);
});