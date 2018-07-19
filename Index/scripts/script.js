$(document).ready(function () {


    $('#myCarousel').carousel({
        interval: 3000
    });

    $('#cards').on('click', '.card', function () {
        var id = this.id;
        article.idOfArticle = id;
        article.createSessionIDArticle();
        window.location.href = "../MoreArticles/MoreArticles";
    });

    var article = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.putArticlesToCards();
        },
        cacheDom: function () {
            this.cards = $("#cards");
            this.idOfArticle;
        },
        bindEvents: function () {
            //this.cards.on('click', '.card', this.createSessionIDArticle.bind(this));
        },
        putArticlesToCards: function () {
            $.ajax({
                url: 'ajax/ajaxGetArticles.php',
                async: true,
                method: 'get',
                data: {},
                type: "json",
                success: function (data) {
                    var articles_data = "";
                    var count = 0;
                    $.each(data, function (key, value) {
                        articles_data += "<div class='col-sm-12 col-sm-3 col-md-3  col-lg-3 '>";
                        articles_data += "<div id='" + value.id + "' class='card'>";
                        articles_data += "<img class='card-img-top' src='" + value.img1 + "' alt='Card image cap'>";
                        articles_data += "<div class='card-body'>";
                        articles_data += " <p class='card-text'>" + value.title + "</p>";
                        articles_data += "</div>";
                        articles_data += "</div>";
                        articles_data += "</div>";
                        count++;
                    });
                    article.cards.append(articles_data);
                }
            });
        },
        createSessionIDArticle: function () {
             sessionStorage.setItem("id", this.idOfArticle);
        }

    };

    
    article.init();

});
