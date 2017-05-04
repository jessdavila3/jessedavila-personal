/**
 * Created by jessedavila on 10/27/16.
 */


var myMarker = new google.maps.Marker({
    position: new google.maps.LatLng(29.426791,-98.489602),
    draggable: true
});
var mapOptions = {
    zoom: 12,
    scrollwheel: false
};
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
map.setCenter(myMarker.position);
myMarker.setMap(map);

function refreshMap() {
    $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
        APPID: "c458a07f7c5e54192932e48071aecbd2",
        units: "imperial",
        lat: myMarker.getPosition().lat(),
        lon: myMarker.getPosition().lng()
    }).always(function(data) {
    }).fail(function (error) {
        console.log(error);
    }).done(function (data) {
        fillData(data);
        console.log(data);
    });
}
refreshMap();

function fillData(data) {
    $("#cityName").html(data.city.name);
    $(".col-sm-4").each(function(index) {
        $(this).html(
            "<span class='temps'>" + data.list[index].temp.max.toFixed(0) + "&#176;/" + data.list[index].temp.min.toFixed(0) + "&#176" + "</span><br>"
            + "<img src=http://openweathermap.org/img/w/"+data.list[index].weather[0].icon+".png><br>"
            + "<strong>Clouds:</strong> " + data.list[index].weather[0].description + "<br>"
            + "<strong>Humidity:</strong> " + data.list[index].humidity + "<br>"
            + "<strong>Wind:</strong> " + data.list[index].speed + "<br>"
            + "<strong>Pressure:</strong> " + data.list[index].pressure
        );
    });
}

google.maps.event.addListener(myMarker, 'dragend', function() {
    map.setCenter(myMarker.position);
    refreshMap();
});

$(".col-sm-4").click(function() {
    window.open("https://youtu.be/7QLSRMoKKS0");
});

function showPosition(position) {
    var currentPosition = new google.maps.Marker({
        position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
    });
    refreshMap();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log('it worked');
    } else {
        console.log('nope');
    }
}

$("#findMe").click(function() {
    getLocation();
});