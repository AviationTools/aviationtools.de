var s = document.getElementById("snackbar");
var subButton = document.getElementById("submit");

subButton.addEventListener("click", function () {
    let password = document.getElementById("pass").value;
    document.getElementById("pass").value = "";
    let email = document.getElementById("email").value;
    document.getElementById("email").value = "";

    var login = new XMLHttpRequest();
    login.open("POST", "/assets/php/login.php", true);
    login.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    login.onreadystatechange = function () {
        if (login.readyState != 4 || login.status != 200) {
            if (login.status == 201) {                                                                                           //%0A
                window.location.href = "http://atccom.de/profile";
                /*s.innerHTML = "Successfully logged in!";
                s.className = "show";
                setTimeout(function(){ s.className = s.className.replace("show", ""); }, 12000);*/
            }
        }
        if (login.status == 400) {
            s.innerHTML = "Wrong email or password!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);
        }
    };

    login.send("email=" + email + "&pass=" + password);
});

var logOutbtn = document.getElementById("logout");
if (logOutbtn != null) {
    logOutbtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("logginOut");
        var logout = new XMLHttpRequest();
        logout.open("GET", "/assets/php/login.php?logout=true", true);   //http://atccom.de/assets/login/login.php?logout=true
        logout.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        logout.onreadystatechange = function () {
            if (logout.readyState != 4 || logout.status != 200) {
                window.location.href = "https://atccom.de";
            }
            /*s.innerHTML = "Logged Out!";
            s.className = "show";
            setTimeout(function(){ s.className = s.className.replace("show", ""); }, 12000);*/
        };

        logout.send();
    });
}
