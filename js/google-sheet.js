// Variable to hold request
var request;
var gmarkers = [];

function Pushbullet () {
   PushBullet.APIKey = "o.HvSM73Nce2NTazVaVFVTMHcakiBDnZQ1";
   var all = PushBullet.devices();
   var device = all.devices[0].iden
  var task = document.getElementById("Research Task");
    
  var theMessage = PushBullet.push("note", null, null, {title: "New Research Task", body: task.value});

  
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var marker = null;
  for (i = 0; i < gmarkers.length; i++) {
    gmarkers[i].setMap(null);
  }
  var location = document.getElementById("location");
  var thePosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  location.value = position.coords.latitude + "," + position.coords.longitude;


  marker = new google.maps.Marker({
    position: thePosition,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: 'Your location',
    icon: 'icons/darkgreen_MarkerA.png'
  });
  map.setCenter(thePosition);
  map.setZoom(17);
  gmarkers.push(marker);

  google.maps.event.addListener(marker, 'dragend', function(evt) {
    location.value = evt.latLng.lat().toFixed(5) + "," + evt.latLng.lng().toFixed(5);
  });

  google.maps.event.addListener(marker, 'dragstart', function(evt) {
    location.value = 'Currently dragging marker';
  });

}

$(".hideshow").on("click", function() {

  $(".TaskSubmitter").stop(true, true).slideToggle().toggleClass('opened');

  var isVisible = $('.TaskSubmitter').is(".opened");

  if (isVisible === true) {
    getLocation()
  } else {

  }
})

// Bind to the submit event of our form
$("#foo").submit(function(event) {

  // Abort any pending request
  if (request) {
    request.abort();
  }
  // setup some local variables
  var $form = $(this);

  // Let's select and cache all the fields
  var $inputs = $form.find("Research Task, location");


  // Serialize the data in the form
  var serializedData = $form.serialize();


  // Let's disable the inputs for the duration of the Ajax request.
  // Note: we disable elements AFTER the form data has been serialized.
  // Disabled form elements will not be serialized.
  $inputs.prop("disabled", true);

  // Fire off the request to /form.php
  request = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbww5kraaGA3JNaMvl0TqWUiJRm4NcquT_E_Sy8zifxjbMTXjkPq/exec",
    type: "post",
    data: serializedData
  });

  // Callback handler that will be called on success
  request.done(function(response, textStatus, jqXHR) {
    // Log a message to the console
    //     alert("Research Task Posted");
    $.notify("Research Task Submitted for Approval", {
      position: "right middle",
      style: "bootstrap",
      className: 'success',
    });
    
    Pushbullet();


  });

  // Callback handler that will be called on failure
  request.fail(function(jqXHR, textStatus, errorThrown) {
    // Log the error to the console
    console.error(
      "The following error occurred: " +
      textStatus, errorThrown
    );
  });

  // Callback handler that will be called regardless
  // if the request failed or succeeded
  request.always(function() {
    // Reenable the inputs
    $inputs.prop("disabled", false);
  });

  // Prevent default posting of form
  event.preventDefault();
});