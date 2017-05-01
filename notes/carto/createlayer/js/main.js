// Leaflet map setup
var map = L.map('map', {
  center: [41.133004, -77.593477],
  zoom: 7
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var cartoUserName = 'jefffrankl';

var myLayer;

var infowindowTemplate ='<div class="cartodb-popup v2"> \
  <div class="infowindow-custom"> \
    <a href="#close" class="cartodb-popup-close-button close">x</a> \
    <div class="cartodb-popup-content-wrapper"> \
      <div class="cartodb-popup-content"> \
        <h2>PA-{{content.data.district_number}}</h2> \
        <p>This district is located in Pennsylvania. It\'s definitely a congressional district.</p> \
      </div> \
    </div> \
  </div> \
  <div class="cartodb-popup-tip-container"></div> \
</div>';

var districts = cartodb.createLayer(map, {
  user_name: cartoUserName,
  type: 'cartodb',
  interactivity: true,
  sublayers: [
    {
      sql: "SELECT the_geom, district_number, the_geom_webmercator FROM pacd_2011",
      cartocss: '#pacd_2011 { line-width: 1; line-color: #0B645E; polygon-fill: #fff; polygon-opacity: 0; line-opacity: 1;}',
      interactivity: ['district_number'], // Define properties you want to be available on interaction
   }
  ]
}).addTo(map)
  .on('done', function(layer) {
    // Set interactivity
    layer.setInteraction(true);
    cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['district_number'], {
      infowindowTemplate: infowindowTemplate,
      templateType: 'mustache'
    })
    // Set up map interaction event
    layer.on('featureClick',function(e, latlng, pos, data) {
      console.log(data);
    });
    // Add button click events, demo setCartoCSS and setSQL
    $('#style1').click(function() {
      layer.getSubLayer(0).setCartoCSS('#pacd_2011 { line-width: 5; line-color: #000; }');
    });
    $('#style2').click(function() {
      layer.getSubLayer(0).setCartoCSS('#pacd_2011 { line-width: 1; line-color: #0B645E; }');
    });
    $('#sql1').click(function() {
      layer.getSubLayer(0).setSQL('SELECT the_geom, district_number, the_geom_webmercator FROM pacd_2011');
    });
    $('#sql2').click(function() {
      layer.getSubLayer(0).setSQL('SELECT the_geom, district_number, the_geom_webmercator FROM pacd_2011 WHERE district_number = 5');
    });
  }).on('error', function() {
    console.log("some error occurred");
});


