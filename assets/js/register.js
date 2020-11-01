var subButton = document.getElementById("regsubmit");


subButton.addEventListener("click", function () {

    var s = document.getElementById("snackbar");

    let newuser = document.getElementById("newuser").value;

    document.getElementById("newuser").value = "";

    let password = document.getElementById("newpass").value;

    document.getElementById("newpass").value = "";

    let conpassword = document.getElementById("conpw").value;

    document.getElementById("conpw").value = "";

    let email = document.getElementById("newemail").value;

    document.getElementById("newemail").value = "";


    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        console.log(re.test(email));
    }

    if (validateEmail(email)) {

        if (newuser.length >= 4 && newuser.length <= 14) {

            if (password == conpassword) {

                if (password.length >= 4) {

                    var login = new XMLHttpRequest();

                    login.open("POST", "/assets/php/register.php", true);

                    login.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                    login.onreadystatechange = function () {

                        if (login.readyState != 4 || login.status != 200) {

                            $('#regModal').modal('hide');
                            $('#myModal').modal('show');

                            if (login.status == 201) {                                                                                           //%0A
                                s.innerHTML = "User has been added!";
                                s.className = "show";
                                setTimeout(function () {
                                    s.className = s.className.replace("show", "");
                                }, 3000);
                            }
                            ;
                            if (login.status == 400) {
                                s.innerHTML = "User already exists!";
                                s.className = "show";
                                setTimeout(function () {
                                    s.className = s.className.replace("show", "");
                                }, 3000);
                            }
                            ;
                            return;
                        }

                        let json = JSON.parse(login.responseText);


                    };

                    login.send("pass=" + password + "&user=" + newuser + "&email=" + email);

                } else {
                    s.innerHTML = "Password must be have least 8 characters!";
                    s.className = "show";
                    setTimeout(function () {
                        s.className = s.className.replace("show", "");
                    }, 3000);
                }
            } else {
                s.innerHTML = "Passwords have to be the same!";
                s.className = "show";
                setTimeout(function () {
                    s.className = s.className.replace("show", "");
                }, 3000);
            }

        } else {
            s.innerHTML = "Username must be between 4 and 14 characters!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);
        }
    } else {
        s.innerHTML = "Invalid email!";
        s.className = "show";
        setTimeout(function () {
            s.className = s.className.replace("show", "");
        }, 3000);
    }


});
