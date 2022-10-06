var vote_history_json = JSON.parse(window.localStorage.getItem("vote_history"));

window.onload = function() {
	if(vote_history_json == null){
		vote_history_json = vote_history_json_init;
	}
	
	window.localStorage.setItem("vote_history", JSON.stringify(vote_history_json));	
}

function add_rank() {
	new_restaurant_name = document.getElementById('rest_name').value;
	in_list = false;
	for (var i=0; i < vote_history_json.length; i++) {
		if (vote_history_json[i].restaurant_name == new_restaurant_name) {
			in_list = true;
			vote_history_json[i].vote = parseInt(vote_history_json[i].vote) + 1;
			window.localStorage.setItem("vote_history", JSON.stringify(vote_history_json));	
			window.location.href = "GWorld_Restaurant.html";
			break;
		}
	}
	if (in_list == false) {
		let json_to_store = {
			"restaurant_name":new_restaurant_name,
			"vote": "1"
		}
		vote_history_json.push(json_to_store);
		window.localStorage.setItem("vote_history", JSON.stringify(vote_history_json));	
		window.location.href = "GWorld_Restaurant.html";
	}
}

function vote() {
	for (var i=0; i < vote_history_json.length; i++) {
		if (vote_history_json[i].restaurant_name == event.srcElement.id) {
			in_list = true;
			vote_history_json[i].vote = parseInt(vote_history_json[i].vote) + 1;
			window.localStorage.setItem("vote_history", JSON.stringify(vote_history_json));	
			window.location.href = "GWorld_Restaurant.html";
			break;
		}
	}
}


function print_rank_list() {	
	sorted();
	console.log(vote_history_json);
	for (var i=0; i < vote_history_json.length; i++) {
		document.write('<li>');
		document.write(vote_history_json[i].restaurant_name);
		document.write('</li>');
	}
}

function print_progress_list() {
	sorted();
	total = 0;
	for (var i=0; i < vote_history_json.length; i++) {
		total = total + parseInt(vote_history_json[i].vote);
	}
	for (var j=0; j < vote_history_json.length; j++) {
		document.write('<li><progress value="' + vote_history_json[j].vote + '" max="' + total + '"></progress></li>');
	}
}

function print_progress_list_count() {
	sorted();
	total = 0;
	for (var i=0; i < vote_history_json.length; i++) {
		total = total + parseInt(vote_history_json[i].vote);
	}
	for (var j=0; j < vote_history_json.length; j++) {
		document.write('<li><span>' + vote_history_json[j].vote + '/' + total + '</span></li>');
	}
}

function print_vote_list() {
	sorted();
	for (var i=0; i < vote_history_json.length; i++) {
		document.write('<li><button onclick="vote();" id="' + vote_history_json[i].restaurant_name + '">Vote</button></li>');
	}
}








function sorted() {
	vote_history_json = vote_history_json.sort(GetSortOrder("vote"));
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return -1;    
        } else if (a[prop] < b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
}





