// like button
const snackbarElement = document.getElementById("snackbar");
const likeOutputElement = document.getElementById("likes");
const likeButtonElement = document.getElementById("likebutton");

function showSnackbar(message, duration) {
    snackbarElement.innerText = message;

    snackbarElement.classList.add("show");
    setTimeout(function () {
        snackbarElement.classList.remove("show");
    }, duration);
}

likeButtonElement.addEventListener('click', async function () {
    try {
        const likeResponse = await fetch("/api/likes/", {
            "method": "POST"
        });
        const likeResponseJson = await likeResponse.json();

        if (likeResponse.ok) {
            likeOutputElement.innerText = likeResponseJson.likes;

            showSnackbar("Thank You!", 3000);
        } else {
            showSnackbar("You can only like once!", 3000);
        }
    }
    catch (e) {
        console.error("an error occured while fetching likes", e);
    }
});

async function updateLikes() {
    try {
        const likeResponse = await fetch("/api/likes/");
        const likeResponseJson = await likeResponse.json();

        likeOutputElement.innerText = likeResponseJson.likes;
        likeOutputElement.style.display = "block";
    }
    catch (e) {
        console.error("an error occured while fetching likes", e);
    }
}

updateLikes();
