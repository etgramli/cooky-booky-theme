function getNumberOfComments() {
    var xmlHttp = new XMLHttpRequest();
    var recipePath = window.location.pathname;
    recipePath = recipePath.substring(0, recipePath.length - 1);
    var recipeIdStart = recipePath.lastIndexOf('/');
    var recipeId = recipePath.substring(recipeIdStart + 1);
    xmlHttp.open("GET", "http://localhost:8080/comments/" + recipeId, false); // false for synchronous request
    xmlHttp.send();
    document.getElementById('commentsNumber').innerHTML = JSON.parse(xmlHttp.responseText);
  }
  function putComment() {
    var xmlHttp = new XMLHttpRequest();
    var recipePath = window.location.pathname;
    recipePath = recipePath.substring(0, recipePath.length - 1);
    var recipeIdStart = recipePath.lastIndexOf('/');
    let recipeId = recipePath.substring(recipeIdStart + 1);
    xmlHttp.open("POST", "http://localhost:8080/comment/" + recipeId + "/" + document.getElementById('username').value, false);
    xmlHttp.send(document.getElementById('commentText').value);
    document.getElementById("comment-form").reset();
  }
  function getComments() {
    var xmlHttp = new XMLHttpRequest();
    var recipePath = window.location.pathname;
    recipePath = recipePath.substring(0, recipePath.length - 1);
    var recipeIdStart = recipePath.lastIndexOf('/');
    var recipeId = recipePath.substring(recipeIdStart + 1);
    xmlHttp.open("GET", "http://localhost:8080/comment/" + recipeId, false); // false for synchronous request
    xmlHttp.send();
    let commentsArray = JSON.parse(xmlHttp.responseText);
    let container = document.getElementById("commentsContainer");
    container.innerHTML = ""
    for (comment in commentsArray) {
      let current = commentsArray[comment];
      container.insertAdjacentHTML("beforeend", "<strong>" + current.userName + "</strong> (" + new Date(current.localDateTime).toLocaleString() + ")<br>" + current.commentText + "<br>");
    }
  }
