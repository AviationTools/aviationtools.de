// like button
var likebtn = document.getElementById("likebutton");

likebtn.addEventListener('click', function () {
    var s = document.getElementById("snackbar");
    let output = document.getElementById("likes");
    var plus = new XMLHttpRequest();
    plus.open("GET", "assets/likes/likes.php", true);
    plus.onreadystatechange = function () {
        if (plus.readyState != 4) return;
        var temp = JSON.parse(plus.responseText);

        if (temp.found == false) {
            output.innerHTML = temp.number;
            s.innerHTML = "Thank You!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);
        } else {
            s.innerHTML = "Ony one Like!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);

        }
    };

    plus.send();
});

// like counter
getlikes();

function getlikes() {
    let output = document.getElementById("likes");
    var likes = new XMLHttpRequest();

    likes.open("GET", "assets/likes/getlikes.php", true);
    likes.onreadystatechange = function () {
        if (likes.readyState != 4) return;
        //console.log(JSON.parse(likes.responseText));
        output.innerHTML = JSON.parse(likes.responseText);
        output.style.display = "block";

    };

    likes.send();
}
