var map = L.map('map', {
  center: [48.2, 16.3], // EDIT latitude, longitude to re-center map
  zoom: 4,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
  scrollWheelZoom: true
});

/* Control panel to display map layers */
var controlLayers = L.control.layers( null, null, {
  position: "topright",
  collapsed: false
}).addTo(map);

L.Control.geocoder().addTo(map);

var maskIcon = L.icon({
    iconUrl: '/img/stopmask2.png',
    iconSize:     [20, 20], // size of the icon
});

// display Carto basemap tiles with light features and labels
var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://terminkalender.top">terminkalender.top</a>, Enter protest <a href="https://demo.terminkalender.top/add/en">here</a>.'
}).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
controlLayers.addBaseLayer(light, 'Simple Map');

/* Stamen colored terrain basemap tiles with labels */
var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://terminkalender.top">terminkalender.top</a>, Enter protest <a href="https://demo.terminkalender.top/add/en">here</a>.'
}); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
controlLayers.addBaseLayer(terrain, 'Extended Map');

// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/
geocoder = new L.Control.Geocoder.Nominatim();

// Read markers data from data.csv
$.get('/assets/data/demotermine_geo.csv', function(csvString) {

  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, {header: true, dynamicTyping: true, skipEmptyLines: true}).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i]
    var description = ""

    if (row.livestream) {
      var description = "City: " + row.stadt + "<br/>Date: " + row.datum + "<br/>Time: " + row.uhrzeit + "<br/>Location: " + row.treffpunkt + "<br/>Campaign: " + row.protestform + "<br/><a href='" + row.livestream + "'>Broadcast</>"
    } else {
      var description = "City: " + row.stadt + "<br/>Date: " + row.datum + "<br/>Time: " + row.uhrzeit + "<br/>Location: " + row.treffpunkt + "<br/>Campaign: " + row.protestform
    }
    
    if (row['latitude'] != "") {
      var marker = L.marker([row['latitude'], row['longitude']], {icon: maskIcon}, {
        opacity: 1
      }).bindPopup(description)
      marker.addTo(map)
    } else {
      console.log("Keine Koordinaten verfügbar");
      console.log(row);
    }
  }

})
