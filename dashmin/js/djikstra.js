let letters = [];
for (let i = 65; i <= 68; i++) {
  for (let j = 65; j <= 90; j++) {
    for (let k = 65; k <= 90; k++) {
      for (let l = 65; l <= 90; l++) {
        letters.push(
          String.fromCharCode(i) +
            String.fromCharCode(j) +
            String.fromCharCode(k) +
            String.fromCharCode(l)
        );
      }
    }
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, []);
  }

  addEdge(node1, node2, weight) {
    this.nodes.get(node1).push({ node: node2, weight });
    this.nodes.get(node2).push({ node: node1, weight });
  }

  dijkstra(startNode, endNode) {
    let distances = new Map();
    let previous = new Map();
    let unvisited = new Set();

    for (let [node] of this.nodes) {
      distances.set(node, Infinity);
      previous.set(node, null);
      unvisited.add(node);
    }

    distances.set(startNode, 0);

    while (unvisited.size > 0) {
      let currentNode = null;
      let currentDistance = Infinity;

      for (let [node, distance] of distances) {
        if (unvisited.has(node) && distance < currentDistance) {
          currentNode = node;
          currentDistance = distance;
        }
      }

      unvisited.delete(currentNode);

      for (let neighbor of this.nodes.get(currentNode)) {
        let distance = distances.get(currentNode) + neighbor.weight;

        if (distance < distances.get(neighbor.node)) {
          distances.set(neighbor.node, distance);
          previous.set(neighbor.node, currentNode);
        }
      }
    }

    let path = [];
    let current = endNode;

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current);
    }

    return path;
  }
}
// var graph = new Graph();
var map = new google.maps.Map(document.getElementById("map"), {
  zoom: 14,
  center: {
    lat: 13.33075,
    lng: 123.724856,
  },
});



  // Create a new Places service
  var service = new google.maps.places.PlacesService(map);

  // Search for fire stations near the map's center
  var request = {
    location: {
      lat: 13.33075,
      lng: 123.724856,
    },
    radius: "5000",
    type: ["fire_station"],
  };

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // The first result is the nearest fire station
      //nearestFireStation = results;

      for (var nearestFireStation of results) {

      // console.log(nearestFireStation)

        // new google.maps.Marker({
        //   position: {
        //     lat: nearestFireStation.geometry.location.lat(),
        //     lng: nearestFireStation.geometry.location.lng(),
        //   },
        //   map: map,
        //   title: nearestFireStation.name,
        // });
      getShortestPath(request.location, {
        lat: nearestFireStation.geometry.location.lat(),
        lng: nearestFireStation.geometry.location.lng(),
      });
        
        

      }
    }
  });



var directionsService = new google.maps.DirectionsService();
function getShortestPath(origin_point,destination_point){
  console.log(origin_point);
  console.log(destination_point)
  

  var request = {
    origin: origin_point,
    destination: destination_point,
    travelMode: "DRIVING",
    provideRouteAlternatives: true,
  };

  

  directionsService.route(request).then((ret) => executes(ret));

}



function executes(response) {
  var array_points = [];
  var route_ret;
  var graph = new Graph();
  var letter_index = 0;
  var single_color = "#e38f05";
  //.var response_poly = response.routes[0].legs[0].steps[0].encoded_lat_lngs;
  for (routes of response.routes) {
    for (legs of routes.legs) {
      for (steps of legs.steps) {
        var letter_one = letters[letter_index++];
        var letter_two = letters[letter_index++];

        array_points.push([
          {
            node_name: letter_one,
            lat: steps.start_point.lat(),
            lng: steps.start_point.lng(),
            distance: steps.distance.value,
            lat_lng: steps.encoded_lat_lngs,
          },
        ]);
        array_points.push([
          {
            node_name: letter_two,
            lat: steps.end_point.lat(),
            lng: steps.end_point.lng(),
            distance: steps.distance.value,
            lat_lng: steps.encoded_lat_lngs,
          },
        ]);
        
      }
    }
  }

  console.log(response);
  //console.log(array_points)

  for (var out_index = 0; out_index < array_points.length; out_index++) {
    for (
      var inner_index = out_index + 1;
      inner_index < array_points.length;
      inner_index++
    ) {
      if (
        array_points[out_index][0].lat == array_points[inner_index][0].lat &&
        array_points[out_index][0].lng == array_points[inner_index][0].lng
      ) {
        array_points[inner_index][0].node_name =
          array_points[out_index][0].node_name;
      }
    }
  }
  // console.log(array_points)
  let removed_duplicate_points = array_points.filter(
    (point, index) =>
      array_points.map((e) => e[0].node_name).indexOf(point[0].node_name) ===
      index
  );
  // console.log(removed_duplicate_points);

  removed_duplicate_points.forEach((item) => {
    console.log(item[0].node_name, item[0].lat, item[0].lng);
    new google.maps.Marker({
      position: {
        lat: item[0].lat,
        lng: item[0].lng,
      },
      map: map,
      label: item[0].node_name,
    });
  });

  var new_points_array = [];
  for (var arr_index = 0; arr_index < array_points.length; arr_index++) {
    var temp_array = [];
    temp_array.push(array_points[arr_index]);
    arr_index++;
    temp_array.push(array_points[arr_index]);
    new_points_array.push(temp_array);

  }

  new_points_array.forEach((npa_item) => {
    graph.addNode(npa_item[0][0].node_name);
    graph.addNode(npa_item[1][0].node_name);
    var path = google.maps.geometry.encoding.decodePath(npa_item[0][0].lat_lng);
    // console.log(path);
    var polyline = new google.maps.Polyline({
      path: path,
      strokeColor: "#800020",
      strokeOpacity: 0.8,
      strokeWeight: 8,
      fillColor: "#800020",
      fillOpacity: 0.35,
      map: map,
    });
    polyline.setMap(map);
  });
  new_points_array.forEach((npa_item) => {
    graph.addEdge(
      npa_item[0][0].node_name,
      npa_item[1][0].node_name,
      npa_item[0][0].distance
    );
  });
  //var shortest = graph.dijkstra("AAAA", "AAAH");

  // console.log(shortest);
  // for (var slen = 0; slen < shortest.length - 1; slen++) {
  //   // console.log(shortest[slen]);
  //   // console.log(shortest[slen + 1]);
  //   // console.log("\n");
  //   var temp1 = shortest[slen];
  //   var temp2 = shortest[slen + 1];
  //   new_points_array.forEach((npa_item) => {
  //     console.log(npa_item[0][0].node_name);
  //     console.log(npa_item[1][0].node_name);
  //     console.log("\n");
  //     if (
  //       npa_item[0][0].node_name == temp1 &&
  //       npa_item[1][0].node_name == temp2
  //     ) {
  //       var path = google.maps.geometry.encoding.decodePath(
  //         npa_item[0][0].lat_lng
  //       );
  //       // console.log(path);
  //       var polyline = new google.maps.Polyline({
  //         path: path,
  //         strokeColor: "#0000FF",
  //         strokeOpacity: 0.8,
  //         strokeWeight: 8,
  //         fillColor: "#0000FF",
  //         fillOpacity: 0.35,
  //         map: map,
  //       });
  //       polyline.setMap(map);
  //     }
      
  //   });
  // }
}

//executes(route_ret)
