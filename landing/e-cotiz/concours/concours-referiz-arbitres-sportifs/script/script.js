let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");
let btn2 = document.getElementById("myBtn2");

let span = document.getElementsByClassName("close")[0];

let body = document.body;


btn.onclick = function() {
  modal.style.display = "block";
  body.style.position = "fixed";
}
btn2.onclick = function() {
  modal.style.display = "block";
  body.style.position = "fixed";
}

span.onclick = function() {
  modal.style.display = "none";
  body.style.position = "static";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    body.style.position = "static";
  }
}
