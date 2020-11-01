//Update User Profile

var s = document.getElementById("snackbar");

var userUpdate = document.getElementById("submitProfile");
userUpdate.addEventListener("click", function () {

    let email = document.getElementById("tempEmail").value;
    document.getElementById("tempEmail").value = "";

    let user = document.getElementById("user").value;
    document.getElementById("user").value = "";

    let description = document.getElementById("description").value;
    document.getElementById("description").value = "";

    let airplane = document.getElementById("airplane").value;
    document.getElementById("airplane").value = "";

    let homebase = document.getElementById("homebase").value;
    document.getElementById("homebase").value = "";

    let id = document.getElementById("id").value;
    document.getElementById("id").value = "";

    console.log(description.length);


    if (email == "" || user == "" || description == "" || airplane == "" || homebase == "" || id == "") {

        alert("All Fields must be Filled Out");

    } else {

        if (description.length >= 220) {
            s.innerHTML = "Description too long (max 220 characters)!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);
        } else {
            var update = new XMLHttpRequest();

            update.open("GET", "https://atccom.de/assets/php/userUpdate.php/?email=" + email + "&userName=" + user + "&Description=" + description + "&airplane=" + airplane + "&homebase=" + homebase + "&VaIvId=" + id, true);
            update.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            update.onreadystatechange = function () {

                if (update.readyState != 4 || update.status != 200)
                    s.innerHTML = "Secsessfully updated!";
                s.className = "show";
                setTimeout(function () {
                    s.className = s.className.replace("show", "");
                    window.location.reload();
                }, 3000);


                return;

            };

            update.send();
        }
    }

});

newestUserA();

//Update Newest Users
function newestUserA() {
    var outputAdmin = document.querySelector("#outputAdmin");
    var newUser = new XMLHttpRequest();
    newUser.open("GET", "https://atccom.de/assets/php/newestUser.php/", true);
    newUser.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    newUser.onreadystatechange = function () {

        if (newUser.readyState != 4 || newUser.status != 200) {
            var array = JSON.parse(newUser.responseText);


            for (line of array) {
                var divAdmin = document.createElement("div");
                divAdmin.innerHTML += line.username + " =>  " + line.email;
                outputAdmin.appendChild(divAdmin);

            }
            return;
        }


    }

    newUser.send();

};
newestUserU();

//Update Newest Users
function newestUserU() {
    var outputUser = document.querySelector("#outputUser");
    var newUser = new XMLHttpRequest();
    newUser.open("GET", "https://atccom.de/assets/php/newestUser.php/", true);
    newUser.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    newUser.onreadystatechange = function () {

        if (newUser.readyState != 4 || newUser.status != 200) {
            var array = JSON.parse(newUser.responseText);


            for (line of array) {
                var divUser = document.createElement("div");
                divUser.innerHTML += line.username;
                outputUser.appendChild(divUser);

            }
            return;
        }


    }

    newUser.send();

};


//Promotion("0"=Normal User||"1"=Moderator||"2"=Admin)
var promotebtn = document.getElementById("promote");

promotebtn.addEventListener("click", function () {
    let email = document.getElementById("useremail").value;
    document.getElementById("useremail").value = "";

//runways/?icao=" + icao, true);

    if (email == "") {
        s.innerHTML = "No username enterd!";
        s.className = "show";
        setTimeout(function () {
            s.className = s.className.replace("show", "");
        }, 3000);
    } else {
        var promote = new XMLHttpRequest();

        promote.open("GET", "https://atccom.de/assets/php/promote.php/?email=" + email, true);
        promote.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        promote.onreadystatechange = function () {

            if (promote.readyState != 4 || promote.status != 200)
                s.innerHTML = "Secsessfully Promoted!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);

            return;


        };
        promote.send();
    }
});

//Demotion("0"=Normal User||"1"=Moderator||"2"=Admin)
var demotebtn = document.getElementById("demote");

demotebtn.addEventListener("click", function () {
    let email = document.getElementById("useremail").value;
    document.getElementById("useremail").value = "";

//runways/?icao=" + icao, true);
    if (email == "") {
        s.innerHTML = "No username enterd!";
        s.className = "show";
        setTimeout(function () {
            s.className = s.className.replace("show", "");
        }, 3000);
    } else {
        var demote = new XMLHttpRequest();

        demote.open("GET", "https://atccom.de/assets/php/demote.php/?email=" + email, true);
        demote.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        demote.onreadystatechange = function () {

            if (demote.readyState != 4 || demote.status != 200)
                s.innerHTML = "Secsessfully Demoted!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);

            return;


        };

        demote.send();
    }
});

//Delete User(Ony Moderators and Admin!)
var deletebtn = document.getElementById("deleteUser");
deletebtn.addEventListener("click", function () {
    let email = document.getElementById("useremail").value;
    document.getElementById("useremail").value = "";

    if (email == "") {
        s.innerHTML = "No username enterd!";
        s.className = "show";
        setTimeout(function () {
            s.className = s.className.replace("show", "");
        }, 3000);
    } else {
        var deleteuser = new XMLHttpRequest();

        deleteuser.open("GET", "https://atccom.de/assets/php/deleteuser.php/?email=" + email, true);
        deleteuser.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        deleteuser.onreadystatechange = function () {

            if (deleteuser.readyState != 4 || deleteuser.status != 200)
                s.innerHTML = "Secsessfully User Deleted!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);

            return;


        };

        deleteuser.send();
    }
});

//SignUp a User as a Beta Tester
var betatester = document.getElementById("betatester");
betatester.addEventListener("click", function () {
    let email = document.getElementById("useremail").value;
    document.getElementById("useremail").value = "";

    if (email == "") {
        s.innerHTML = "No username enterd!";
        s.className = "show";
        setTimeout(function () {
            s.className = s.className.replace("show", "");
        }, 3000);
    } else {
        var beta = new XMLHttpRequest();

        beta.open("GET", "https://atccom.de/assets/php/betatester.php/?email=" + email, true);
        beta.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        beta.onreadystatechange = function () {

            if (beta.readyState != 4 || beta.status != 200)
                s.innerHTML = "Secsessfully Promoted to Beta Tester!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);

            return;


        };

        beta.send();
    }
});


var adminPosts = document.getElementById("inputbtn");
adminPosts.addEventListener("click", function () {
    let input = document.getElementById("adminPost").value;
    document.getElementById("adminPost").value = "";

    var date = new Date();
    var formatedDate = "Posted: " + date.toUTCString();
    console.log(formatedDate);

    if (input == "" || input.length >= 160) {
        s.innerHTML = "No new Post enterd!";
        s.className = "show";
        setTimeout(function () {
            s.className = s.className.replace("show", "");
        }, 3000);
    } else {
        var posts = new XMLHttpRequest();

        posts.open("GET", "https://atccom.de/assets/php/adminPost.php/?input=" + input + "&date=" + formatedDate, true);
        posts.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        posts.onreadystatechange = function () {

            if (posts.readyState != 4 || posts.status != 200)
                s.innerHTML = "Secsessfully Posted!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);

            return;


        };

        posts.send();
    }
});

