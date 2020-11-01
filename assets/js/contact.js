/*var button = document.querySelector("#submit");*/
var button = document.getElementById("submitComment");
var messageListRef = firebase.database().ref('Comments');

//DATE Formater
function formatDate(date) {
    let parsedDate = new Date(date);

    let dd = parsedDate.getDate();
    let mm = parsedDate.getMonth() + 1; //January is 0!
    let yyyy = parsedDate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return dd + '/' + mm + '/' + yyyy;
}

//Comments
button.addEventListener("click", function main() {
    //Ipchecker
    var ip = new XMLHttpRequest();
    ip.open("GET", "../assets/likes/likes.php", true);
    ip.onreadystatechange = function () {
        if (ip.readyState != 4) return;
        /*console.log(ip.responseText);*/
        comment(JSON.parse(ip.responseText));
    };
    ip.send();
});
messageListRef.on('value', function (snapshot) {
    /*updateNachrichten(newString);*/
    var output = document.querySelector("#output");
    output.innerHTML = "";
    var newhtml = "";
    var temp = snapshot.val();
    for (var child in temp) {
        var div = document.createElement("p");
        div.innerHTML += "<strong>" + formatDate(temp[child].timestamp) + "</strong>: " + temp[child].message;
        output.appendChild(div);
    }

});

function comment(bool) {
    let message = document.querySelector("#message").value;
    document.querySelector("#message").value = "";
    var s = document.getElementById("snackbar");
    var temp = bool.found;

    if (temp == true) {
        // error
        s.innerHTML = "Only one comment!";
        s.className = "show";
        setTimeout(function () {
            s.className = s.className.replace("show", "");
        }, 3000);
        return;
    } else {
        if (message === "") {
            // error
            s.innerHTML = "Empty message!";
            s.className = "show";
            setTimeout(function () {
                s.className = s.className.replace("show", "");
            }, 3000);
            return;
        } else {
            // ok
            var newMessageRef = messageListRef.push();
            newMessageRef.set({
                "timestamp": Date.now(),
                "message": message
            });
        }
    }
};
