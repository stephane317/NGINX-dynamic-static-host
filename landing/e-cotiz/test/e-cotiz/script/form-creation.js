//FORM CREATION
let searchParams = new URLSearchParams(window.location.search)
searchParams.has('mail')

let mail = searchParams.get('mail')
let mailField = document.querySelector('#mail')
mailField.value = mail

console.log(mailField.value);