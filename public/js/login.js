$(document).ready(function() {
    $("#login").on("submit", function() {
        event.preventDefault();
        const user = {};
        user.email = $("input[name='email']", this).val();
        user.password = $("input[name='password']", this).val();
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
        user.password = $("input[name='password']", this).val();
        console.log(user);
        createUser(user);
    });

    $(".search").click(function() {
        const search = {};
        if ($("#location").val() !== "") {
            search.location = $("#location").val();
        }
        if ($("#radius").val() !== "") {
            search.radius = $("#radius").val();
        } else {
            search.radius = 25;
        }
        if ($("#salary").val() !== "") {
            search.salary = $("#salary").val();
        }
        if ($("#page").val() !== "") {
            search.page = $("#page").val();
        } else {
            search.page = 1;
        }
        console.log(search);
        if ($("#keywords").val() !== "") {
            search.keywords = $("#keywords").val();
            console.log(search);
            $.post({
                url: "/api/job-search",
                method: "POST",
                data: search
            }).then(x => console.log(x));
        }
    });
});

function createUser(user) {
    $.post({
        type: "POST",
        url: "/api/signup",
        data: user
    }).then(function(data) {
        window.location.replace(data);
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