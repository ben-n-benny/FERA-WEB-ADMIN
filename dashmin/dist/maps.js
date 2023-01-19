"use strict";
exports.__esModule = true;
var map;
var service;
var infowindow;
function initMap() {
    var elbi = new google.maps.LatLng(14.174462639108246, 121.2324922744313);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: elbi,
        zoom: 15
    });
    var request = {
        query: "Batong Malake Fire Station",
        fields: ["name", "geometry"]
    };
    var request2 = {
        query: "Bureau Of Fire Protection, Los Baños Fire Station",
        fields: ["name", "geometry"]
    };
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
    service.findPlaceFromQuery(request2, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}
function createMarker(place) {
    if (!place.geometry || !place.geometry.location)
        return;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}
window.initMap = initMap;
