const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurant_name = urlParams.get('res_name');

console.log(restaurant_name);
// Refernce snytax
function initMap() {
    const GW = { lat: 38.89989401781681, lng: -77.04856164910015 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: GW,
    });
    const marker = new google.maps.Marker({
        position: GW,
        map: map,
    });
}

window.onload = function() {
    if (restaurant_name == null) {
        r_name = " ";
    } else {
        r_name = restaurant_name;
    }
    document.getElementById("search_box").src = "Search/search.html?res_name=" + r_name;
    console.log(document.getElementById("search_box").value)
    
}