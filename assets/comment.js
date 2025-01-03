function getRecipeId() {
  let recipePath = window.location.pathname.substring(0, window.location.pathname.length - 1);
  return recipeId = recipePath.substring(recipePath.lastIndexOf('/') + 1);
};

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "{{ .Site.Params.Backend_url }}/comments/" + getRecipeId(), true);
xmlHttp.onload = (e) => {
  if (xmlHttp.readyState === 4) {
    if (xmlHttp.status === 200) {
      document.getElementById('commentsNumber').innerHTML = JSON.parse(xmlHttp.responseText);
      document.getElementById('comments-div').style.visibility='visible';
    } else {
      console.error(xmlHttp.statusText);
    }
  }
};
xmlHttp.send(null);

function putComment() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "{{ .Site.Params.Backend_url }}/comment/" + getRecipeId() + "/" + document.getElementById('username').value, true);
  xmlHttp.onload = (e) => {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status == 200) {
        document.getElementById("comment-form").reset();
      } else {
        console.log(xmlHttp.statusText);
      }
    }
  }
  xmlHttp.send(document.getElementById('commentText').value);
}
function getComments() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "{{ .Site.Params.Backend_url }}/comment/" + getRecipeId(), true);
  xmlHttp.onload = (e) => {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {
        let commentsArray = JSON.parse(xmlHttp.responseText);
        let container = document.getElementById("commentsContainer");
        container.innerHTML = ""
        for (comment in commentsArray) {
          let current = commentsArray[comment];
          container.insertAdjacentHTML("beforeend", "<div class='single-comment'><strong>" + current.userName + "</strong> (" + new Date(current.localDateTime).toLocaleString() + ")<br>" + current.commentText + "</div>");
        }
      }
    }
  }
  xmlHttp.send(null);
}
