function initMap(){
  // Initialize the map
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 37.7749, lng: -122.4194 },
  });

  // Add the two markers to the map
  var marker1 = new google.maps.Marker({
    position: { lat: 37.7749, lng: -122.4194 },
    map: map,
    title: "Marker 1",
  });

  var marker2 = new google.maps.Marker({
    position: { lat: 37.788022, lng: -122.399797 },
    map: map,
    title: "Marker 2",
  });

  // Create a new instance of the DirectionsService
  var directionsService = new google.maps.DirectionsService();

  // Create a new instance of the DirectionsRenderer
  var directionsRenderer = new google.maps.DirectionsRenderer();

  // Set the map and display the route
  directionsRenderer.setMap(map);

  // Set the origin and destination for the route
  var request = {
    origin: marker1.getPosition(),
    destination: marker2.getPosition(),
    travelMode: "DRIVING",
  };

  // Get the route and display it on the map
  directionsService.route(request, function (response, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(response);
    }
  });
}
