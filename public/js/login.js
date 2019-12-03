$(document).ready(function() {
    $("#login").on("submit", function() {
        event.preventDefault();
        const user = {};
        user.email = $("input[name='email']", this).val();
        user.password = $("input[name='email']", this).val();
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