$(document).ready(function() {
    $("#login").on("submit", function() {
        event.preventDefault();
        const user = {};
        user.email = $("input[name='email']", this).val();
        user.password = $("input[name='email']", this).val();
        //make sure they filled out the form
        if (!user.email || !user.password) {
            return;
        }
        //runs the login function and clears the form
        loginUser(user.email, user.password);
        $("#login").trigger("reset");
    });

    $("#new-user").on("submit", function() {
        event.preventDefault();
        const user = {};
        user.email = $("input[name='email']", this).val();
        user.password = $("input[name='email']", this).val();
        console.log(user);
        createUser(user);
    });
});

function createUser(user) {
    $.ajax({
        type: "POST",
        url: "/api/signup",
        data: user
    });
}

function loginUser(email, password) {
    $.post("/api/login", {
            email: email,
            password: password
        })
        .then(function(data) {
            window.location.replace(data);
            // If there's an error, log the error
        })
        .catch(function(err) {
            console.log(err);
        });
}