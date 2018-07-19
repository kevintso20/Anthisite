function openPage(s, t) {
    $.ajax({
        url: "ajax/ajaxCheckIfAdmin.php",
        async: !0,
        method: "post",
        data: {
            var1: s,
            var2: t
        },
        type: "json",
        success: function (a) {
            "exist" == a && (sessionStorage.setItem("var1", s), sessionStorage.setItem("var2", t), window.location.href = "../otherPage/otherPage")
        }
    })
}
$(document).ready(function () {
    var s = {
        init: function () {
            this.cacheDom(), this.bindEvents(), this.loadPage()
        },
        cacheDom: function () {
            this.carouselInner = $(".carousel-inner"), this.carouselIndicators = $(".carousel-indicators")
        },
        bindEvents: function () {},
        loadPage: function () {
            this.getDataFromDB()
        },
        printCarousel: function (a) {
            this.printCarouselItem(a), this.printCarouselIndicators(a)
        },
        getDataFromDB: function () {
            $.ajax({
                url: "ajax/ajaxGetUrl.php",
                async: !0,
                method: "get",
                data: {},
                type: "json",
                success: function (a) {
                    s.printCarousel(a)
                }
            })
        },
        printCarouselItem: function (a) {
            var t = "",
                i = !0,
                o = 1;
            $.each(a, function (a, s) {
                i ? (t += "<div class='carousel-item active'>", t += "<img class='d-block w-100' src='" + s.url + "' alt='" + o + " slide'>", t += "<div class='jumbotron jumbotron-fluid mt-3'>", t += "<div class='container'>", t += "<p class='lead'>" + s.description + "</p>", t += "</div>", t += "</div>", t += "</div>", i = !1) : (t += "<div class='carousel-item'>", t += "<img class='d-block w-100' src='" + s.url + "' alt='" + o + " slide'>", t += "<div class='jumbotron jumbotron-fluid mt-3'>", t += "<div class='container'>", t += "<p class='lead'>" + s.description + "</p>", t += "</div>", t += "</div>", t += "</div>"), o++
            }), this.carouselInner.append(t)
        },
        printCarouselIndicators: function (a) {
            var t = "",
                i = !0,
                o = 0;
            $.each(a, function (a, s) {
                i ? (t += "<li data-target='#carousel-thumb' data-slide-to='" + o + "' class='active'>", t += " <img class='d-block w-100' src='" + s.url + "' class='img-fluid col-sm-3'>", t += "</li>", i = !1) : (t += "<li data-target='#carousel-thumb' data-slide-to='" + o + "' class=''>", t += " <img class='d-block w-100' src='" + s.url + "' class='img-fluid col-sm-3'>", t += "</li>"), o++
            }), this.carouselIndicators.append(t)
        }
    };
    s.init()
});
