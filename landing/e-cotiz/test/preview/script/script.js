let passwordElt = document.querySelector('#password')
let btnElt = document.querySelector('#btnCheck')
let alertElt = document.querySelector('#alert')

btnElt.onclick = function validatePassword() {
    if (passwordElt.value == 'E-Cotiz2019') {
        window.document.location.href='current-wip.html'
        return false;
    } else {
        alertElt.style.display = "block"
        return false;
    }
}