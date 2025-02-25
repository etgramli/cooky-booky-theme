function getRecipeId() {
  const recipePath = window.location.pathname.substring(0, window.location.pathname.length - 1);
  return recipeId = recipePath.substring(recipePath.lastIndexOf('/') + 1);
};

function queryNumberOfComments() {
  const commentnummberrequest = new XMLHttpRequest();
  commentnummberrequest.open("GET", "{{ .Site.Params.Backend_url }}/comments/" + getRecipeId(), true);
  commentnummberrequest.onload = (e) => {
    if (commentnummberrequest.readyState === 4) {
      if (commentnummberrequest.status === 200) {
        const numOfComments = JSON.parse(commentnummberrequest.responseText);
        document.getElementById('commentsNumber').innerHTML = numOfComments;
        if (numOfComments > 0) {
          document.getElementById('comments-head').style.removeProperty('display');
          getComments();
        }
        document.getElementById('comments-form').style.removeProperty('display');
      } else {
        console.error(commentnummberrequest.statusText);
      }
    }
  };
  commentnummberrequest.send(null);
};

function queryNumberOfRatings() {
  const ratingRequest = new XMLHttpRequest();
  ratingRequest.open("GET", "{{ .Site.Params.Backend_url }}/ratings/" + getRecipeId(), true);
  ratingRequest.onload = (e) => {
    if (ratingRequest.readyState === 4) {
      if (ratingRequest.status === 200) {
        const rating = parseInt(JSON.parse(ratingRequest.responseText));
        document.getElementById('number-of-ratings').innerHTML = rating;
        const starContainer = document.getElementById('rating-star-container');
        const averageRatingRequest = new XMLHttpRequest();
        averageRatingRequest.open("GET", "{{ .Site.Params.Backend_url }}/rating/" + getRecipeId(), true);
        averageRatingRequest.onload = (e) => {
          if (averageRatingRequest.readyState === 4) {
            if (averageRatingRequest.status === 200) {
              const averageRating = parseInt(JSON.parse(averageRatingRequest.responseText));
              const children = starContainer.children;
              for (let i = 0; i < children.length && i < averageRating; ++i) {
                const classes = children[i].classList;
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

function registerStarContainer() {
  document.getElementById('rating-star-container').addEventListener('click', (e) => {
    const rating = parseInt(e.target.id.substring(e.target.id.length - 1));
    if (Number.isInteger(rating)) {
      const postRatingRequest = new XMLHttpRequest();
      postRatingRequest.open("POST", "{{ .Site.Params.Backend_url }}/rating/" + getRecipeId() + "/" + rating, true);
      postRatingRequest.onload = (e) => {console.log("Rating sent: " + rating);}
      postRatingRequest.send();
      setTimeout(queryNumberOfRatings, 125);
    }
  });
};

function putComment() {
  const username = document.getElementById('username').value;
  if (!username) {
    document.getElementById("popup-empty-name").classList.toggle("show");
    window.setTimeout(() => {document.getElementById("popup-empty-name").classList.toggle("show");}, 5000);
    return;
  }
  const commenttext = document.getElementById('commentText').value;
  if (!commenttext) {
    document.getElementById("popup-empty-text").classList.toggle("show");
    window.setTimeout(() => {document.getElementById("popup-empty-text").classList.toggle("show");}, 5000);
    return;
  }
  const postRatingRequest = new XMLHttpRequest();
  postRatingRequest.open("POST", "{{ .Site.Params.Backend_url }}/comment/" + getRecipeId() + "/" + username, true);
  postRatingRequest.onload = (e) => {
    if (postRatingRequest.readyState === 4) {
      if (postRatingRequest.status == 200) {
        document.getElementById("comment-form").reset();
        queryNumberOfComments();
      } else if (postRatingRequest.status == 400) {
        document.getElementById("popup-invalid-char").classList.toggle("show");
        window.setTimeout(() => {document.getElementById("popup-invalid-char").classList.toggle("show");}, 5000);
      } else if (postRatingRequest.status == 403) {
        document.getElementById("popup-already-commented").classList.toggle("show");
        window.setTimeout(() => {document.getElementById("popup-already-commented").classList.toggle("show");}, 5000);
      } else {
        console.log(postRatingRequest.statusText);
      }
    }
  }
  postRatingRequest.send(commenttext);
};
function getComments() {
  const getCommentsRequest = new XMLHttpRequest();
  getCommentsRequest.open("GET", "{{ .Site.Params.Backend_url }}/comment/" + getRecipeId(), true);
  getCommentsRequest.onload = (e) => {
    if (getCommentsRequest.readyState === 4) {
      if (getCommentsRequest.status === 200) {
        const commentsArray = JSON.parse(getCommentsRequest.responseText);
        const container = document.getElementById("commentsContainer");
        container.innerHTML = ""
        for (comment in commentsArray) {
          const current = commentsArray[comment];
          container.insertAdjacentHTML("beforeend", "<div class='single-comment'><strong>" + current.userName + "</strong> (" + new Date(current.localDateTime).toLocaleString(undefined, {hour: "numeric", minute: "numeric", year: "numeric",month: "long", day: "numeric"}) + ")<br>" + current.commentText + "</div>");
        }
      }
    }
  }
  getCommentsRequest.send(null);
};

function getCommentsMain(references, titles) {
  const getCommentsRequest = new XMLHttpRequest();
  getCommentsRequest.open("GET", "{{ .Site.Params.Backend_url }}/comments/last", true);
  getCommentsRequest.onload = (e) => {
    if (getCommentsRequest.readyState === 4) {
      if (getCommentsRequest.status === 200) {
        const commentsArray = JSON.parse(getCommentsRequest.responseText);
        const container = document.getElementById("commentsContainer");
        container.innerHTML = ""
        for (comment in commentsArray) {
          const current = commentsArray[comment];
          console.log("/recipe/" + current.recipeId + "/");
          const idx = references.indexOf("/recipe/" + current.recipeId + "/");
          console.log(idx);
          container.insertAdjacentHTML("beforeend", "<div class='single-comment'><strong><a href=\"/recipe/" + current.recipeId + "/\">" + titles[idx] + "</a></strong><br><strong>" + current.userName + "</strong> (" + new Date(current.localDateTime).toLocaleString(undefined, {hour: "numeric", minute: "numeric", year: "numeric",month: "long", day: "numeric"}) + ")<br>" + current.commentText + "</div>");
        }
        if (commentsArray.length > 0) {
          document.getElementById('comments-div').style.removeProperty('display');
        }
      }
    }
  }
  getCommentsRequest.send(null);
};

// Init recipe site
if (document.getElementById("comment-form")) {
  registerStarContainer();
  queryNumberOfComments();
  queryNumberOfRatings();
}

// Init Main site
if (document.getElementById('welcome')) {
  getCommentsMain(references, titles);
}
