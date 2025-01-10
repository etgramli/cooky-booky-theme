let mybutton = document.getElementById("toTopButton");
window.onscroll = function() {toggleToTopButton()};
function toggleToTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function scrollToTop() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // other browsers
}
