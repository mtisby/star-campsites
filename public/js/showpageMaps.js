let campground = campgroundSend
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2ZWxvcGVybXQiLCJhIjoiY2t1eDV2cGFyNnBvYzJ2bzM4N2xueG5ubSJ9.ykxzSpxL2KyqN-Ryvz-pmw';

var map = new mapboxgl.Map({
  container: 'mapsLarge',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: campground.geometry.coordinates, 
    zoom: 10 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)