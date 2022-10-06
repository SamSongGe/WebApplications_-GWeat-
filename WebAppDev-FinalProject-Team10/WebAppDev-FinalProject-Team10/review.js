let review_history_json = JSON.parse(window.localStorage.getItem("review_history"));

window.onload = function() {
    localStorage.setItem('resturant', JSON.stringify(name));

    storedNames = JSON.parse(localStorage.getItem("resturant"));
    console.log(storedNames.length);

    if (review_history_json == null) {
        review_history_json = review_history_json_init;
    }
}

function search_on_map() {
    restaurant_name = document.getElementById('search_text').value;
    window.location.href = 'Map.html?res_name=' + restaurant_name;
    document.getElementById('search_box').value = restaurant_name;
}

function update_review_list() {
    resturant_name = document.getElementById('rest_name').value;
    customer_name = document.getElementById('cust_name').value;
    review = document.getElementById('comment').value;

    var x = document.getElementsByTagName('input');
    for (i = 0; i < x.length; i++) {
        if (x[i].type = "radio") {
            if (x[i].checked) {
                score = x[i].value;
            }
        }
    }

    var date = new Date().toISOString().slice(0, 10)

    let json_to_store = {
        "restaurant_name": resturant_name,
        "user": customer_name,
        "review": review,
        "star": score,
        "time": date
    }

    review_history_json.unshift(json_to_store);
    window.localStorage.setItem("review_history", JSON.stringify(review_history_json));
    window.location.href = "home.html";
}

function post_review() {
    if (review_history_json == null) {
        review_history_json = review_history_json_init;
    }
    for (var i = 0; i < review_history_json.length; i++) {
        document.write('<div class="row align-items-start" id="post">');

        document.write('<div class="row">');
        document.write('<div class="col" id="rest_title">');
        document.write(review_history_json[i].restaurant_name);
        document.write('</div>');
        document.write('</div>');

        document.write('<div class="row">');
        document.write('<div class="col align-self-start">');
        document.write('<img src="pic/profile_pic.png">' + review_history_json[i].user);
        document.write('</div>');
        document.write('<div class="col-auto" id="star_rating">');
        var s_star = 0
        while (s_star < review_history_json[i].star) {
            document.write('<span class="fa fa-star checked"></span>');
            s_star++;
        }
        var e_star = 5 - s_star
        while (0 < e_star) {
            document.write('<span class="fa fa-star"></span>');
            e_star--;
        }
        document.write('</div>');
        document.write('</div>');

        document.write('<div class="row">');
        document.write('<div class="col">');
        document.write('<p>');
        document.write('<br>' + review_history_json[i].review);
        document.write('</p>');
        document.write('</div>');
        document.write('</div>');

        document.write('<div class="row">');
        document.write('<div class="col">');
        document.write('</div>');
        document.write('<div class="col-auto">');
        document.write(review_history_json[i].time);
        document.write('</div>');
        document.write('</div>');

        document.write('</div>');
    }
}