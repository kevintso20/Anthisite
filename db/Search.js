$(document).ready(function () {

    $("#articlesListBtn").click(function () {
        sessionStorage.removeItem('searchInput');
    });


    $('#s').bind('keyup', function (e) {
        var searchInput = $("#s").val();
        if (e.keyCode === 13) {
            sessionStorage.setItem("searchInput", searchInput);
            window.location = "../ArticlesList/ArticlesList";
        }
    });
    document.addEventListener("touchstart", function () {}, true);


});
