$(document).ready(function () {

  // Make internal anchor links smooth scroll to location
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  // Masthead 'what's this about?' button scroll to about section
  $('.flex-item.button').click(function () {
    $('html,body').animate({
      scrollTop: $('[name=about').offset().top
    }, 1000);
    return false;
  });

  // Open/close menu
  $('.menu-button, .site-overlay').click(function () {
    $('body').toggleClass('menu-open');
  });

  // show back to top button after scrolling 600px on desktops
  var scrolled = false;
  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      if (scrolled === false) {
        $('.back-to-top').addClass('show');
      }
      scrolled = true;
    } else {
      if (scrolled === true) {
        $('.back-to-top').removeClass('show');
      }
      scrolled = false;
    }
  });

});

var map;

function initMap() {
  var grifMap = new google.maps.StyledMapType([{
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#e9e9e9'
    }, {
      'lightness': 17
    }]
  }, {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#f5f5f5'
    }, {
      'lightness': 20
    }]
  }, {
    'featureType': 'road.highway',
    'elementType': 'geometry.fill',
    'stylers': [{
      'color': '#ffffff'
    }, {
      'lightness': 17
    }]
  }, {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [{
      'color': '#ffffff'
    }, {
      'lightness': 29
    }, {
      'weight': 0.2
    }]
  }, {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#ffffff'
    }, {
      'lightness': 18
    }]
  }, {
    'featureType': 'road.local',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#ffffff'
    }, {
      'lightness': 16
    }]
  }, {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#f5f5f5'
    }, {
      'lightness': 21
    }]
  }, {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#dedede'
    }, {
      'lightness': 21
    }]
  }, {
    'elementType': 'labels.text.stroke',
    'stylers': [{
      'visibility': 'on'
    }, {
      'color': '#ffffff'
    }, {
      'lightness': 16
    }]
  }, {
    'elementType': 'labels.text.fill',
    'stylers': [{
      'saturation': 36
    }, {
      'color': '#333333'
    }, {
      'lightness': 40
    }]
  }, {
    'elementType': 'labels.icon',
    'stylers': [{
      'visibility': 'off'
    }]
  }, {
    'featureType': 'transit',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#f2f2f2'
    }, {
      'lightness': 19
    }]
  }, {
    'featureType': 'administrative',
    'elementType': 'geometry.fill',
    'stylers': [{
      'color': '#fefefe'
    }, {
      'lightness': 20
    }]
  }, {
    'featureType': 'administrative',
    'elementType': 'geometry.stroke',
    'stylers': [{
      'color': '#fefefe'
    }, {
      'lightness': 17
    }, {
      'weight': 1.2
    }]
  }, {
    'featureType': 'poi.school',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#C02424'
    }]
  }], {
    name: 'Griffith Map'
  });

  if ($('#map-canvas').length) {
    var location = new google.maps.LatLng(-27.5538582, 153.0546691);
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      scrollwheel: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'grifMap']
      }
    });

    var marker = new google.maps.Marker({
      position: location,
      title: 'Red Zone'
    });

    map.mapTypes.set('grifMap', grifMap);
    map.setMapTypeId('grifMap');
    marker.setMap(map);
  }
}
