$(document).ready(function() {
  $(".search").click(function() {
    $.ajax({
      url: "http://localhost:8080/api/job-search",
      method: "GET"
    }).then(x => console.log(x));
  });
});
