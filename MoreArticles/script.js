$(document).ready(function () {

    var article = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.loadAllPage();
        },
        cacheDom: function () {
            this.theArticle = $("#theArticle");
            this.title = this.theArticle.find("h1");
            this.articleBody = this.theArticle.find("#articleBody");
            this.carouselInner = $(".carousel-inner");
            this.carouselIndicators = $(".carousel-indicators");
            this.rightArticles = $(".right-articles");
            this.bottomCards = $("#bottomSideCards");
        },
        bindEvents: function () {

        },
        loadAllPage: function () {
            this.loadArticle();
            this.loadBottomArticles();
            this.loadRightArticles();
        },
        loadArticle: function () {
            //   this.getArticleID(); // WATCH den kserw an tha to kratisw
            this.getArticleData();
        },
        loadBottomArticles: function () {
            // to noymero einai gia to posa arthra tha ferei apo to DB
            this.getRandomArticles(9);
        },
        loadRightArticles: function () {
            // to noymero einai gia to posa arthra tha ferei apo to DB
            this.getRandomArticles(11);
        },
        getArticleID: function () {
            this.idOfArticle = sessionStorage.getItem("id");
            sessionStorage.removeItem("id");
        },
        printTheArticle: function (data) {
            this.title.text(data[0].title);
            this.articleBody.append(data[0].content);
            this.printCarousel(data);
        },
        printCarousel: function (data) {
            var img = this.putImgsToString(data);;
            this.printCarouselItem(img);
            this.printCarouselIndicators(img);
        },
        getArticleData: function () {
            var id = sessionStorage.getItem("id");

            $.ajax({
                url: 'ajax/ajaxGetTheArticle.php',
                async: true,
                method: 'post',
                data: {
                    "id": id
                },
                type: "json",
                success: function (data) {
                    article.printTheArticle(data);
                }
            });

        },
        getRandomArticles: function (noumberRandomArticles) {
            $.ajax({
                url: 'ajax/ajaxGetRandomArticles.php',
                async: true,
                method: 'post',
                data: {
                    "noumberRandomArticles": noumberRandomArticles
                },
                type: "json",
                success: function (data) {
                    if (noumberRandomArticles === 9) {
                        article.printArticlesToBottomSide(data);
                    } else if (noumberRandomArticles === 11) {
                        article.printArticlesToRightSide(data);
                    }
                }
            });
        },
        putImgsToString: function (data) {
            var img = [];
            $.each(data, function (key, value) {
                img[0] = value.img1;
                img[1] = value.img2;
                img[2] = value.img3;
                img[3] = value.img4;
                img[4] = value.img5;
                img[5] = value.img6;
                img[6] = value.img7;
                img[7] = value.img8;
                img[8] = value.img9;
                img[9] = value.img10;
            });
            return img;
        },
        printCarouselItem: function (img) {
            var articles_data = "";
            var isFirstImg = true;
            for (var i = 0; i < img.length; i++) {
                if (img[i] !== "") {
                    if (isFirstImg) {
                        articles_data += "<div class='carousel-item active'>";
                        articles_data += "<img class='d-block w-100' src='" + img[i] + "' alt='" + i + " slide'>";
                        articles_data += "</div>";
                        isFirstImg = false;
                    } else {
                        articles_data += "<div class='carousel-item'>";
                        articles_data += "<img class='d-block w-100' src='" + img[i] + "' alt='" + i + " slide'>";
                        articles_data += "</div>";
                    }

                }
            }
            article.carouselInner.append(articles_data);

        },
        printCarouselIndicators: function (img) {
            var articles_data = "";
            var isFirstImg = true;
            for (var i = 0; i < img.length; i++) {
                if (img[i] !== "") {
                    if (isFirstImg) {
                        articles_data += "<li data-target='#carousel-thumb' data-slide-to='" + i + "' class='active'>";
                        articles_data += " <img class='d-block w-100' src='" + img[i] + "' class='img-fluid'>";
                        articles_data += "</li>";
                        isFirstImg = false;
                    } else {
                        articles_data += "<li data-target='#carousel-thumb' data-slide-to='" + i + "' class=''>";
                        articles_data += " <img class='d-block w-100' src='" + img[i] + "' class='img-fluid'>";
                        articles_data += "</li>";
                    }
                }
            }
            article.carouselIndicators.append(articles_data);
        },
        printArticlesToRightSide: function (data) {
            var articles_data = "";
            $.each(data, function (key, value) {
                articles_data += "<div class='article-item ml-3'>";
                articles_data += "<div id='" + value.id + "' class='card'>";
                articles_data += "<div class='card-body'>";
                articles_data += "<h4 class='card-title text-center'>" + value.title + "</h4>";
                articles_data += "<p class='card-text' style='color: black'> " + value.description + "</p>";
                articles_data += "</div>";
                articles_data += "</div>";
                articles_data += "</div>";
            });
            this.rightArticles.append(articles_data);
        },
        printArticlesToBottomSide: function (data) {
            var articles_data = "";
            $.each(data, function (key, value) {
                articles_data += "<div class='col-md-4 col-sm-6'>";
                articles_data += "<div id='" + value.id + "' class='card'>";
                articles_data += "<img class='card-img-top' src='" + value.img1 + "' alt='Card image cap'>";
                articles_data += "<div class='card-body'>";
                articles_data += "<p class='card-text'>" + value.title + "</p>";
                articles_data += "</div>";
                articles_data += "</div>";
                articles_data += "</div>";
            });
            this.bottomCards.append(articles_data);
        }
    };

    $('#main').on('click', '.card', function () {
        sessionStorage.removeItem("id");
        var id = this.id;
        sessionStorage.setItem("id", id);
        location.reload();
    });


    article.init();
});
