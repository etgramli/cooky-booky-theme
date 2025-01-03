function getRecipeId() {
  let recipePath = window.location.pathname.substring(0, window.location.pathname.length - 1);
  return recipeId = recipePath.substring(recipePath.lastIndexOf('/') + 1);
};

function queryNumberOfComments() {
  var commentnummberrequest = new XMLHttpRequest();
  commentnummberrequest.open("GET", "{{ .Site.Params.Backend_url }}/comments/" + getRecipeId(), true);
  commentnummberrequest.onload = (e) => {
    if (commentnummberrequest.readyState === 4) {
      if (commentnummberrequest.status === 200) {
        document.getElementById('commentsNumber').innerHTML = JSON.parse(commentnummberrequest.responseText);
        document.getElementById('comments-div').style.removeProperty('display');
      } else {
        console.error(commentnummberrequest.statusText);
      }
    }
  };
  commentnummberrequest.send(null);
};

function queryNumberOfRatings() {
  let ratingRequest = new XMLHttpRequest();
  ratingRequest.open("GET", "{{ .Site.Params.Backend_url }}/ratings/" + getRecipeId(), true);
  ratingRequest.onload = (e) => {
    if (ratingRequest.readyState === 4) {
      if (ratingRequest.status === 200) {
        let rating = parseInt(JSON.parse(ratingRequest.responseText));
        document.getElementById('number-of-ratings').innerHTML = rating;
        let starContainer = document.getElementById('rating-star-container');
        let averageRatingRequest = new XMLHttpRequest();
        averageRatingRequest.open("GET", "{{ .Site.Params.Backend_url }}/rating/" + getRecipeId(), true);
        averageRatingRequest.onload = (e) => {
          if (averageRatingRequest.readyState === 4) {
            if (averageRatingRequest.status === 200) {
              let averageRating = parseInt(JSON.parse(averageRatingRequest.responseText));
              let children = starContainer.children;
              for (var i = 0; i < children.length && i < averageRating; ++i) {
                var classes = children[i].classList;
                if (i < averageRating) {
                  classes.add('bi-star-fill');
                  classes.remove('bi-star');
                } else {
                  classes.add('bi-star');
                  classes.remove('bi-star-fill');
                }
              }
              starContainer.style.removeProperty('display');
            } else {
              console.log(averageRatingRequest.statusText);
            }
          }
        };
        averageRatingRequest.send(null);
        starContainer.style.visibility='visible';
      } else {
        console.error(ratingRequest.statusText);
      }
    }
  };
  ratingRequest.send(null);
};

document.getElementById('rating-star-container').addEventListener('click', (e) => {
  let rating = parseInt(e.target.id.substring(e.target.id.length - 1));
  if (Number.isInteger(rating)) {
    let postRatingRequest = new XMLHttpRequest();
    postRatingRequest.open("POST", "{{ .Site.Params.Backend_url }}/rating/" + getRecipeId() + "/" + rating, true);
    postRatingRequest.onload = (e) => {console.log("Rating sent: " + rating);}
    postRatingRequest.send();
    setTimeout(queryNumberOfRatings, 125);
  }
});

function putComment() {
  var postRatingRequest = new XMLHttpRequest();
  postRatingRequest.open("POST", "{{ .Site.Params.Backend_url }}/comment/" + getRecipeId() + "/" + document.getElementById('username').value, true);
  postRatingRequest.onload = (e) => {
    if (postRatingRequest.readyState === 4) {
      if (postRatingRequest.status == 200) {
        document.getElementById("comment-form").reset();
        queryNumberOfComments();
      } else {
        console.log(postRatingRequest.statusText);
      }
    }
  }
  postRatingRequest.send(document.getElementById('commentText').value);
};
function getComments() {
  var getCommentsRequest = new XMLHttpRequest();
  getCommentsRequest.open("GET", "{{ .Site.Params.Backend_url }}/comment/" + getRecipeId(), true);
  getCommentsRequest.onload = (e) => {
    if (getCommentsRequest.readyState === 4) {
      if (getCommentsRequest.status === 200) {
        let commentsArray = JSON.parse(getCommentsRequest.responseText);
        let container = document.getElementById("commentsContainer");
        container.innerHTML = ""
        for (comment in commentsArray) {
          let current = commentsArray[comment];
          container.insertAdjacentHTML("beforeend", "<div class='single-comment'><strong>" + current.userName + "</strong> (" + new Date(current.localDateTime).toLocaleString() + ")<br>" + current.commentText + "</div>");
        }
      }
    }
  }
  getCommentsRequest.send(null);
};

queryNumberOfComments();
queryNumberOfRatings();
