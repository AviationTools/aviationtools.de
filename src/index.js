//Snackbar
const snackbarElement = document.getElementById("snackbar");

function showSnackbar(message, duration) {
    snackbarElement.innerText = message;

    snackbarElement.classList.add("show");
    setTimeout(function () {
        snackbarElement.classList.remove("show");
    }, duration);
}
