var map = L.map('map').setView([45.5152, -122.6784], 10);
var myPos = [];
var markers = {};
var targetCount = 0;
var myPos = [];
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
        var modalNum = targetCount;
        marker = L.marker(target.coords, {icon: trashIcon, title: target.title}).addTo(map);
        modal = document.createElement('div');
          modal.innerHTML = 
            '<div class="portfolio-modal modal fade" id="portfolioModal' + targetCount + '" tabindex="-1" aria-labelledby="portfolioModal' + targetCount + '" aria-hidden="true"> ' +
            '<div class="modal-dialog modal-xl"> ' +
                '<div class="modal-content"> ' +
                    '<div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div> ' +
                    '<div class="modal-body text-center pb-5"> ' +
                        '<div class="container"> ' +
                            '<div class="row justify-content-center"> ' +
                                '<div class="col-lg-8"> ' +
                                    '<!-- Portfolio Modal - Title--> ' +
                                    '<h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">' + target.title + '</h2> ' +
                                    '<!-- Icon Divider--> ' +
                                    '<div class="divider-custom"> ' +
                                        '<div class="divider-custom-line"></div> ' +
                                        '<div class="divider-custom-icon"><i class="fas fa-star"></i></div> ' +
                                        '<div class="divider-custom-line"></div> ' +
                                    '</div> ' +
                                    '<!-- Portfolio Modal - Image--> ' +
                                    '<img class="img-fluid rounded mb-5" src="' + target.img + '"alt="..." /> ' +
                                    '<!-- Portfolio Modal - Text--> ' +
                                    '<p class="mb-4">' + target.description + '</p> ' +
                                    '<button class="btn btn-primary" data-bs-dismiss="modal"> ' +
                                        '<i class="fas fa-xmark fa-fw"></i> '+
                                        'Close Window ' +
                                    '</button> ' +
                                '</div> ' +
                            '</div> ' +
                        '</div> ' +
                    '</div> ' +
                '</div> ' +
            '</div> ' +
        '</div>';
        // console.log(html);
        document.body.append(modal);
        marker.addEventListener("click", (e) => {
          console.log(modalNum)
          const currModal = "#portfolioModal" + modalNum;
          $(currModal).modal('show');
        });
       
        
        targetCount = targetCount + 1;
        markers[target.title] = marker
    })
  } catch(err){
      console.log({error: err});
  }
}

function setPosition() {
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position.coords.latitude + ", " + position.coords.longitude);
    myPos = [position.coords.latitude, position.coords.longitude]
    map.setView(myPos, 15);
    L.marker(myPos, {icon: myIcon}).addTo(map);
  });
}


map.addEventListener("click", (e) => {
  // $('#portfolioModal1').modal('show');
  console.log(targetCount);
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

function testButton(){
  $('#submitModal').modal('show');
  console.log(markers);
}

function submitEntry(data) {
  setPosition();
  console.log("Submitted! ");
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)
  }
  fetch('/post', options);
  location.reload();
}

const submitForm = document.getElementById('submitForm')
submitForm.addEventListener('submit', event =>{
  event.preventDefault();
  var img64 = null;
  const formData = new FormData(submitForm);
  const data = Object.fromEntries(formData);
  console.log(formData.get('file'));

  var reader = new FileReader();
  reader.addEventListener("load", async () => {
    var jsondata = {
      title: data.title,
      description: data.description,
      img: reader.result,
      coords: myPos
    }
    console.log(jsondata);
    submitEntry(jsondata);
  });
  reader.readAsDataURL(formData.get('file'));
  // submitEntry(data);
});

if ('geolocation' in navigator) {
  console.log('geolocation is availabe');
  setPosition();
} else {
  alert('geolocation not available');
}