$(document).ready(function () {
    var t;
    (t = {
        init: function () {
            this.cacheDom(), this.bindEvents()
        },
        cacheDom: function () {
            this.articleTable = $("#articles-table"), this.title = $("#article_title").val(), this.discription = $("#article_discription").val(), this.content = $("#article_content").val(), this.img1 = $("#img1").val(), this.img2 = $("#img2").val(), this.img3 = $("#img3").val(), this.img4 = $("#img4").val(), this.img5 = $("#img5").val(), this.img6 = $("#img6").val(), this.img7 = $("#img7").val(), this.img8 = $("#img8").val(), this.img9 = $("#img9").val(), this.img10 = $("#img10").val(), this.btnAllArticles = $("#btnAllArticles"), this.btnDelArticle = $("#btnDelArticle"), this.THidIWantDel = $("#THdel-article-id").val(), this.btnNewArticle = $("#btnSubmitNewArticle"), this.btnRefreshTable = $("#refreshTable")
        },
        bindEvents: function () {
            this.btnAllArticles.on("click", this.printArticles.bind(this)), this.btnDelArticle.on("click", this.delArticleMethod.bind(this)), this.btnNewArticle.on("click", this.articleToDB.bind(this)), this.btnRefreshTable.on("click", this.refreshTable.bind(this))
        },
        printArticles: function () {
            $.ajax({
                url: "ajax/ajaxShowArticles.php",
                async: !0,
                method: "get",
                data: {},
                type: "json",
                success: function (i) {
                    t.createColums(i)
                }
            }), this.btnAllArticles.attr("disabled", "disabled")
        },
        createColums: function (i) {
            var e = "";
            $.each(i, function (i, t) {
                e += "<tr>", e += "<td>" + t.id + "</td>", e += "<td>" + t.title + "</td>", e += "<td>" + t.description + "</td>", e += "</tr>"
            }), this.articleTable.append(e)
        },
        delArticle: function (i) {
            $.ajax({
                url: "ajax/ajaxDeleteWithID.php",
                async: !0,
                method: "post",
                data: {
                    id: i
                },
                type: "json"
            })
        },
        delArticleMethod: function () {
            this.cacheDom();
            for (var i = this.THidIWantDel.split(" "), t = 0; t < i.length; t++) this.delArticle(i[t]);
            alert("The article Have Deleted")
        },
        articleToDB: function () {
            this.cacheDom(), $.ajax({
                url: "ajax/ajaxNewArticle.php",
                async: !0,
                method: "post",
                data: {
                    title: t.title,
                    discription: t.discription,
                    content: t.content,
                    img1: t.img1,
                    img2: t.img2,
                    img3: t.img3,
                    img4: t.img4,
                    img5: t.img5,
                    img6: t.img6,
                    img7: t.img7,
                    img8: t.img8,
                    img9: t.img9,
                    img10: t.img10
                },
                type: "json",
                success: function (i) {
                    alert("New Article Have Created");
                },
                error:function(){
                   alert("New Article Have Created"); 
                }
            })
        },
        refreshTable: function () {
            this.articleTable.empty(), this.printArticles()
        }
    }).init()
});
