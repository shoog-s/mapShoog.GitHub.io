  // the global variabls
  var map;
  var markers = [];
  var placeMarkers = [];
 var largeInfoWindow;
var bounds;

//Googlemap automatic init function (the core of the app)
  function initMap() {
      //costum style the map
      var styles = [{
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [{
                  "weight": "2.00"
              }]
          },
          {
              "featureType": "all",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "color": "#9c9c9c"
              }]
          },
          {
              "featureType": "all",
              "elementType": "labels.text",
              "stylers": [{
                  "visibility": "on"
              }]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "#ff0000"
              }]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "color": "#ff0000"
              }]
          },
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#523737"
              }]
          },
          {
              "featureType": "administrative.neighborhood",
              "elementType": "labels",
              "stylers": [{
                  "hue": "#ff0000"
              }]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "all",
              "stylers": [{
                  "hue": "#00ff9f"
              }]
          },
          {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry",
              "stylers": [{
                  "hue": "#00ffa9"
              }]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "#829a9b"
              }]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "#a3bda8"
              }]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [{
                  "visibility": "off"
              }]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [{
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "#eeeeee"
              }]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#7b7b7b"
              }]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [{
                  "color": "#ffffff"
              }]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [{
                  "visibility": "simplified"
              }]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [{
                  "visibility": "off"
              }]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [{
                  "visibility": "off"
              }]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [{
                      "color": "#46bcec"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "#7fbbc9"
              }]
          },
          {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [{
                  "color": "#070707"
              }]
          },
          {
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [{
                  "color": "#ffffff"
              }]
          }
      ];
      
//the map start location region Riyadh city center 
      map = new google.maps.Map(document.getElementById('map'), {
          center: {
              lat: 24.714062,
              lng:  46.683972 
          },
          zoom:12,
          styles: styles,
          mapTypeControl: false
      });
      
//array of locations 
      var locations = [{
              title: 'Alwan cafe',
              location: {
                  lat: 24.827424,
                  lng: 46.794471
              }
          },
          {
              title: 'kosebasi Resturant',
              location: {
                  lat: 24.781107,
                  lng: 46.697179
              }
          },
          {
              title: 'Anatolia Resturent',
              location: {
                  lat: 24.695218,
                  lng: 46.682871
              }
          },
          {
              title: 'Alnafora Seafood Resturent',
              location: {
                  lat: 24.652586,
                  lng: 46.716341
              }
          },
          {
              title: 'Lusin Resturent',
              location: {
                  lat: 24.697987,
                  lng: 46.683491
              }
          }
      ];
 //infow window of the location appear when click on the spacific location      
 largeInfoWindow = new google.maps.InfoWindow();

 bounds = new google.maps.LatLngBounds();

      //places /8888888888888888888888888888888
      //autocomplete use to search with in time entry box
      var timeAutocomplete = new google.maps.places.Autocomplete(document.getElementById('search-within-time-text'));

      //autocomplete use to geocoder entry box
      var zoomAutocomplete = new google.maps.places.Autocomplete(document.getElementById('zoom-to-area-text'));

      //bias the boundries within the map for the zoom to area text 
      zoomAutocomplete.bindTo('bounds', map);

      //create a searchbox in order to excute a places search /888888888888888888888888
      var searchBox = new google.maps.places.SearchBox(document.getElementById('places-search'));
      //bias the searchbox to within the bounds of map 
      searchBox.setBounds(map.getBounds());

      

      //           var bounds = new google.maps.LatLngBounds();

      //style markers a bit. this will be our listing marker icon.
      var defultIcon = makeMarkerIcon('0091ff');

      //create a highlighted location marker color for when the user mouses over the marker.
      var highlightedIcon = makeMarkerIcon('FFFF24');

      //loop to show marker
      //the following group uses the location aaray to create an array of markers on initialize.
      for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;

          var marker = new google.maps.Marker({
              position: position,
              //               map:map,
              title: title,
              icon: defultIcon,
              animation: google.maps.Animation.Drop,
              id: i
          });
      }
      //push the marker to our array 
      markers.push(marker);
      //           bounds.extend(marker.position);
      //create an on cklick event to open 
      marker.addListener('click', function() {
          populateInfoWindow.open(this, largeInfoWindow);
      });

      //tow event listener one for mouse over one for change back and fourth
      marker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
          this.setIcon(defultIcon);
      });

      //listener for event user select user select 
      searchBox.addListener('places-changed', function() {
          searchBoxPlaces(this);
      });
      //wen press on go 
      document.getElementById('go-places').addListener('click', textSearchPlaces);

      function populateInfoWindow(marker,infoWindow) {
          if (infoWindow.marker != marker) {
              infoWindow.marker = marker;
              infoWindow.setContent('<div>' + marker.title + '</div>');
              infoWindow.open(map, marker);
              infoWindow.addListener('closeclick', function() {
                  infoWindow.setMarker(null);
              });
              var streetViewService = new google.maps.StreetViewService();
              var radius = 50;

              //the state is ok cmpute the position 
              function getStreetView(data, status) {
                  if (status == google.maps.streetViewStatus.OK) {
                      var nearStreetViewLocation = data.location.latLng;
                      var heading = google.maps.geometry.spherical.computeHeading(
                          nearStreetViewLocation, marker.position);
                      infoWindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                      var panoramaOptions = {
                          position: nearStreetViewLocation,
                          pov: {
                              heading: heading,
                              pitch: 30
                          }
                      };
                      var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

                  } else {
                      infoWindow.setContent('<div>' + marker.title + '</div><div> No Street View Found</div>');
                  }

              }
              //use street view service to get the closest street view image 50 metes of the marker position 
              streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
              //open the infowindow on the correct marker 
              infoWindow.open(map, marker);
          }
      }

      //only one spot 
      //       var tribeca = {lat: 40.719526, lng:-74.0089934};
      //       //marker
      //       var marker = new google.maps.Marker({
      //           position : tribeca,
      //           map:map,
      //           title:'first marker!'});
      //       
      //       //popup info window
      //       var infoWindow = new google.maps.InfoWindow({
      //           content: 'Do you ever feel like an infowindo,flatoing through the wind,'+'ready to start again' });
      //       
      //       //open marker fun
      //       marker.addListener('click',function(){
      //           infoWindow.open(map,marker);
      //       });             


      //buttons
      document.getElementById('show-listing').addEventListener('click', showListing);
      document.getElementById('hide-listing').addEventListener('click', hideListing);



  }

  //this function will loop through the markers array and display them all
  function showListing() {
      var bounds = new google.maps.LatLngBounds();
      //extend the boundries of the map for each marker and display the marker 
      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
  }

  //this function will loop through the listing and hide them all.
  function hideMarkers(markers) {
      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
      }
  }

  //this takes color and then marker icon of that color. icon 21px wide by 34 high 
  function makeMarkerIcon(markerColor) {
      var markerImage = new google.maps.MarkerImage(
          'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', //mite be wronge 
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21, 34));
      return markerImage;
  }

  function searchBoxPlaces(searchBox) {
      hideMarkers(placeMarkers);
      var places = searchBox.getPlaces();
      //for each place, get the icon ,name and location 
      createMarkersForPlaces(places);
      if (places.length == 0) {
          window.alert('we did not find any places matching that search!');
      }
  }

  function textSearchPlaces() {
      var bounds = map.getBounds();
      hideMarkers(placeMarkers);
      var placesService = new google.maps.places.PlacesService(map);
      placesService.textSearch({
          query: document.getElementById('places-search').value,
          bounds: bounds
      }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
              createMarkersForPlaces(results);
          }
      });
  }

  function createMarkersForPlaces(places) {
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var icon = {
              url: marker.svg,
              size: new google.maps.Size(35, 35),
              origion: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(15, 34),
              scaledSize: new google.maps.Size(25, 25),
          };
          //create marker for each place 
          var marker = new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              id: place.id
          });
          placeMarkers.push(marker);
          if (place.geometry.viewport) {
              //only geocode have view port 
              bounds.union(place.geometry.viewport);
          } else {
              bounds.extend(place.geometry.location);
          }
      }
      map.fitBounds(bounds);
  }