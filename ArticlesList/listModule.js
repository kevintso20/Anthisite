$(document).ready(function () {
    var list = {
        pinigationPosition: 1,
        articles: null,
        noumberOfArticlesPerPage: 10,
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.loadPage();
        },
        cacheDom: function () {
            this.listArtilcesDiv = $(".list-unstyled");
            this.piginationUp = $("#piginationUp");
            this.piginationDown = $("#piginationDown");
            this.suggested = $("#suggested .list-group");
        },
        bindEvents: function () {

        },
        loadPage: function () {
            this.getAllArticles();
            this.printArticles();
            this.renderPigination();
            this.printSuggestedArticles();
        },
        getAllArticles: function () {
            $.ajax({
                url: "ajax/ajaxGetAllArticles.php",
                method: "post",
                async: false,
                data: {},
                type: "json",
                success: function (data) {
                    list.articles = data;
                }
            });
        },
        printArticles: function () {
            if (this.haveSearched()) {
                this.getSearchedArticles();
            } else {
                this.renderArticles(0);
            }
        },
        calculateHowMannyPages: function () {
            var noumberOfArticles = this.articles.length;
            var pagesFloat = noumberOfArticles / this.noumberOfArticlesPerPage;
            var pages = pagesFloat + 1;
            return Math.floor(pages);
        },
        renderArticles: function (page) {
            var articles_data = "";
            for (var i = this.noumberOfArticlesPerPage * page; i < this.noumberOfArticlesPerPage * (page + 1) && i < this.articles.length; i++) {
                articles_data += "<li id=" + this.articles[i].id + " class='media my-4'>";
                articles_data += "<img class='mr-1' src='" + this.articles[i].img1 + "' alt='Generic placeholder image' style='width: 70px;height: 70px;'>";
                articles_data += "<div class='media-body'>";
                articles_data += "<h5 class='mt-0 mb-1'>" + this.articles[i].title + "</h5>";
                articles_data += "<p>" + this.articles[i].description + "</p>";
                articles_data += "</div>";
                articles_data += "</li>";
            }
            this.listArtilcesDiv.append(articles_data);
        },
        renderPigination: function () {
            var noumberOfPages = this.calculateHowMannyPages();
            var pigination = "<div class='piginationControlerLeft'>‹</div>";
            for (var i = 1; i <= noumberOfPages && i < 7; i++) {
                if (i == 1) {
                    pigination += "<div id='piginationItem" + i + "' class='selected piginationItem'>" + i + "</div>";
                } else {
                    pigination += "<div id='piginationItem" + i + "' class='piginationItem'>" + i + "</div>";
                }
            }
            pigination += "<div class='piginationControlerRight'>›</div>";
            this.piginationUp.append(pigination);
            this.piginationDown.append(pigination);
        },
        blueEffectOnPigination: function (noumberOfPages) {
            for (var i = 1; i <= noumberOfPages; i++) {
                if (i == list.pinigationPosition) {
                    $("#piginationUp #piginationItem" + i).addClass("selected");
                    $("#piginationDown #piginationItem" + i).addClass("selected");
                } else {
                    $("#piginationUp #piginationItem" + i).removeClass("selected");
                    $("#piginationDown #piginationItem" + i).removeClass("selected");
                }
            }
        },
        printSuggestedArticles: function () {
            $.ajax({
                url: '../MoreArticles/ajax/ajaxGetRandomArticles.php',
                async: true,
                method: 'post',
                data: {
                    "noumberRandomArticles": 5
                },
                type: "json",
                success: function (data) {
                    var suggested_data = "<li class='list-group-item d-flex justify-content-center align-items-center' style='font-weight: bold; font-size: 1.2rem;'>Suggested</li>";
                    $.each(data, function (key, value) {
                        suggested_data += "<button id='" + value.id + "' type='button' class='list-group-item list-group-item-action'>" + value.title + "</button>";
                    });
                    list.suggested.append(suggested_data);
                }
            });
        },
        getSearchedArticles: function () {
            var searchInput = sessionStorage.getItem('searchInput');
            $.ajax({
                url: "ajax/ajaxSearchArticle.php",
                async: false,
                method: "post",
                data: {
                    searchInput: searchInput
                },
                type: "json",
                success: function (data) {
                    if (data == null) {                        
                        list.listArtilcesDiv.append("<div id='mailstatus' class='col-md-10'><span>We have not An article with that content</span></div>");
                        list.articles = "nothing";
                    } else {
                        list.articles = data;
                        var articles_data = "";
                        $.each(data, function (key, value) {
                            articles_data += "<li id=" + value.id + " class='media my-4'>";
                            articles_data += "<img class='mr-1' src='" + value.img1 + "' alt='Generic placeholder image' style='width: 70px;height: 70px;'>";
                            articles_data += "<div class='media-body'>";
                            articles_data += "<h5 class='mt-0 mb-1'>" + value.title + "</h5>";
                            articles_data += "<p>" + value.description + "</p>";
                            articles_data += "</div>";
                            articles_data += "</li>";
                        });
                        list.listArtilcesDiv.append(articles_data);
                    }
                }
            });
            sessionStorage.removeItem('searchInput');
        },
        haveSearched: function () {
            var searchInput = sessionStorage.getItem('searchInput');
            if (searchInput == null) {
                return false;
            }
            return true;
        }
    }


    list.init();

    $("#piginationUp ,#piginationDown").on('click', '.piginationItem', function () {
        var page = $(this).text();
        list.pinigationPosition = page;
        $(".list-unstyled").empty();
        list.renderArticles(page - 1);

        var noumberOfPages = list.calculateHowMannyPages();
        list.blueEffectOnPigination(noumberOfPages);
    });

    $("#piginationUp ,#piginationDown").on('click', '.piginationControlerRight', function () {
        var page = $(this).text();
        var noumberOfPages = list.calculateHowMannyPages();

        if (list.pinigationPosition < noumberOfPages) {
            list.pinigationPosition = parseInt(list.pinigationPosition) + 1;
            $(".list-unstyled").empty();
            list.renderArticles(list.pinigationPosition - 1);
        }
        list.blueEffectOnPigination(noumberOfPages);
    });

    $("#piginationUp ,#piginationDown").on('click', '.piginationControlerLeft', function () {
        var page = $(this).text();
        var noumberOfPages = list.calculateHowMannyPages();

        if (list.pinigationPosition > 1) {
            list.pinigationPosition = parseInt(list.pinigationPosition) - 1;
            $(".list-unstyled").empty();
            list.renderArticles(list.pinigationPosition - 1);
        }
        list.blueEffectOnPigination(noumberOfPages);
    });

    $('#list').on('click', 'li', function () {
        sessionStorage.removeItem("id");
        var id = this.id;
        sessionStorage.setItem("id", id);
        window.location = "../MoreArticles/MoreArticles";
    });

    $('#suggested').on('click', 'button', function () {
        sessionStorage.removeItem("id");
        var id = this.id;
        sessionStorage.setItem("id", id);
        window.location = "../MoreArticles/MoreArticles";
    });


});
