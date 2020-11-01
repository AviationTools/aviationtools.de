// like button
const snackbarElement = document.getElementById("snackbar");
const likeOutputElement = document.getElementById("likes");

const likeButtonElement = document.getElementById("likebutton");
likeButtonElement.addEventListener('click', async function () {

    try {
        const likeResponse = await fetch("assets/likes/likes.php");
        const likeResponseJson = await likeResponse.json();

        if (likeResponseJson.found) {
            snackbarElement.innerText = "You can only like once!";

            snackbar.classList.add("show");
            setTimeout(function () {
                snackbar.classList.remove("show");
            }, 3000);
        } else {
            likeOutputElement.innerText = likeResponseJson.number;
            snackbarElement.innerText = "Thank You!";

            snackbar.classList.add("show");
            setTimeout(function () {
                snackbar.classList.remove("remove");
            }, 3000);
        }
    }
    catch (e) {
        console.error("an error occured while fetching likes", e);
    }
});

async function updateLikes() {
    try {
        const likeResponse = await fetch("assets/likes/getlikes.php");
        const likeResponseCount = await likeResponse.text();

        likeOutputElement.innerText = JSON.parse(likeResponseCount);
        likeOutputElement.style.display = "block";
    }
    catch (e) {
        console.error("an error occured while fetching likes", e);
    }
}

updateLikes();
