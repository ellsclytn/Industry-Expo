$(document).ready(function() {

  // Masthead "what's this about?" button
  $('.flex-item.button').click(function() {
    // TODO: Scroll to section

    return false;
  });

});

var map;
function initMap() {
  if ($('#map-canvas').length) {
    var location = new google.maps.LatLng(-27.5538582,153.0546691);
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    });

    var marker = new google.maps.Marker({
      position: location,
      title: 'Red Zone'
    });

    marker.setMap(map);
  }
}
