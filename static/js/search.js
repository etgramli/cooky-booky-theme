var fuse;
var list = document.getElementById('searchResults');
var first = list.firstChild;
var last = list.lastChild;
var maininput = document.getElementById('searchInput');
var resultsAvailable = false;
fetchJSONFile('/index.json', function(data){
    var options = {
      shouldSort: true,
      location: 0,
      distance: 100,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: ['title', 'permalink']
    };
    fuse = new Fuse(data, options); // build the index from the json file
  });
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 40) {  // DOWN (40) arrow
    if (resultsAvailable) {
      console.log("down");
      event.preventDefault();
      if ( document.activeElement == maininput) { first.focus(); } // if the currently focused element is the main input --> focus the first <li>
      else if ( document.activeElement == last ) { last.focus(); } // if we're at the bottom, stay there
      else { document.activeElement.parentElement.nextSibling.firstElementChild.focus(); } // otherwise select the next search result
    }
  }
  if (event.keyCode == 38) {  // UP (38) arrow
    if (resultsAvailable) {
      event.preventDefault();
      if ( document.activeElement == maininput) { maininput.focus(); } // If we're in the input box, do nothing
      else if ( document.activeElement == first) { maininput.focus(); } // If we're at the first item, go to input box
      else { document.activeElement.parentElement.previousSibling.firstElementChild.focus(); } // Otherwise, select the search result above the current active one
    }
  }
});

document.getElementById("searchInput").onkeyup = function(e) { 
  executeSearch(this.value);
}

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}

function executeSearch(term) {
  let results = fuse.search(term); // the actual query being run using fuse.js
  let searchitems = ''; // our results bucket

  if (results.length === 0) {
    resultsAvailable = false;
    searchitems = '';
  } else {
    for (let item in results.slice(0,5)) { // First 5 results
      searchitems = searchitems + '<li class ="list-group-item"><a href="' + results[item].item.permalink + '" tabindex="0">' + '<span class="title">' + results[item].item.title + '</span><br /></a></li>';
    }
    resultsAvailable = true;
  }

  document.getElementById("searchResults").innerHTML = searchitems;
  if (results.length > 0) {
    first = list.firstChild.firstElementChild; // first result container — for checking keyboard up/down
    last = list.lastChild.firstElementChild; // last result container — for checking keyboard up/down
  }
}
