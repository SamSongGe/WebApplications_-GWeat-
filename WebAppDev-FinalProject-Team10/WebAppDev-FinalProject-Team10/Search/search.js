const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurant_name = urlParams.get('res_name');

function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.89989401781681, lng: -77.04856164910015 },
        zoom: 15,
        mapTypeId: "roadmap",
    });

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    if (restaurant_name != null) {
        document.getElementById("pac-input").value = restaurant_name;
        document.getElementById("pac-input").focus();
        var e = jQuery.Event("keypress");
        e.which = 13; 
        e.keyCode = 13;
        $("#pac-input").trigger(e);
    }
}