//VERTICAL SCROLLING

document.getElementById('container').addEventListener('mousewheel', function(e) {
    this.scrollTop += e.deltaY;
});

//SIDE NAV HOME

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//SLIDESHOW

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" badge-selected", "");
  }
  x[slideIndex-1].style.display = "block";
}

//SELECT CAISSE

function openCaisse(select) {
    let caisse = select.options[select.selectedIndex].value;
    window.open(caisse, 'newwindow')
}

//HIDE SUB-SEARCH

function openSubName(button) {
  let subName = document.querySelector(".search-bar-name")
  let subAdress = document.querySelector(".search-bar-adress")
  let subTheme = document.querySelector(".search-bar-theme")
  subName.style.display = "block"
  subAdress.style.display = "none"
  subTheme.style.display = "none"
}

function openSubAdress(button) {
  let subName = document.querySelector(".search-bar-name")
  let subAdress = document.querySelector(".search-bar-adress")
  let subTheme = document.querySelector(".search-bar-theme")
  subName.style.display = "none"
  subAdress.style.display = "block"
  subTheme.style.display = "none"
}

function openSubTheme(button) {
  let subName = document.querySelector(".search-bar-name")
  let subAdress = document.querySelector(".search-bar-adress")
  let subTheme = document.querySelector(".search-bar-theme")
  subName.style.display = "none"
  subAdress.style.display = "none"
  subTheme.style.display = "block"
}

//HIDE SUB-FORM (CONTACT)
function openSubForm(button) {
  let subForm = document.querySelector(".form-contact")
  subForm.style.display = "flex"
}
