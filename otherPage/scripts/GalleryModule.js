$(document).ready(function () {
    var e, a;
    e = [], (a = {
        init: function () {
            this.cacheDom(), this.bindEvents()
        },
        cacheDom: function () {
            this.btnDelGalImg = $("#btndelGalImg"), this.btnShowGallery = $("#btnShowGallery"), this.imgGalleryList = $("#images-galery-list"), this.THdelGalImg = $("#delImgId").val(), this.btnAddGalleryImg = $("#btnAddGalleryImg"), this.galleryImgUrl = $("#galleryImgUrl").val(), this.btnRefreshGallery = $("#refreshGallery"), this.description = $("#galleryImgDescription").val()
        },
        bindEvents: function () {
            this.btnShowGallery.on("click", this.printGalleryToHTML.bind(this)), this.btnDelGalImg.on("click", this.delGalleryImgMethod.bind(this)), this.btnAddGalleryImg.on("click", this.sendAllGalleryImg.bind(this)), this.btnRefreshGallery.on("click", this.refreshGallery.bind(this))
        },
        getDataFromDB: function () {
            $.ajax({
                url: "ajax/ajaxGetImgsUrl.php",
                async: !1,
                method: "get",
                data: {},
                type: "json",
                success: function (l) {
                    a.putDataToArray(l)
                }
            })
        },
        putDataToArray: function (l) {
            for (var a = 0; a < l.length; a++) e[a] = l[a]
        },
        stringToHTML: function () {
            var t = "";
            $.each(e, function (l, a) {
                t += "<div class='media my-2 col-sm-12'>", t += "<div class='media-body col-sm-9'>", t += "<p style ='word-wrap : break-word;'>" + a.url + "</p>", t += "<p>ID of Image: " + a.id + "</p>", t += "</div>", t += "<div class='media-right col-sm-3'>", t += "<img src='" + a.url + "' class='media-object' style='width:150px'>", t += "</div>", t += "</div>"
            }), this.imgGalleryList.append(t)
        },
        printGalleryToHTML: function () {
            this.getDataFromDB(), this.stringToHTML(), this.btnShowGallery.attr("disabled", "disabled")
        },
        delGalleryImgMethod: function () {
            this.cacheDom();
            for (var l = this.THdelGalImg.split(" "), a = 0; a < l.length; a++) this.delGalImage(l[a]);
            alert("Gallery Image Have Deleted Successfully")
        },
        delGalImage: function (l) {
            $.ajax({
                url: "ajax/ajaxDeleteGalleryImgWithID.php",
                async: !0,
                method: "post",
                data: {
                    id: l
                },
                type: "json"
            })
        },
        galleryImgToDB: function (l) {
            $.ajax({
                url: "ajax/ajaxAddGalleryImg.php",
                async: !0,
                method: "post",
                data: {
                    url: l
                },
                type: "json"
            })
        },
        sendAllGalleryImg: function () {
            this.cacheDom();
            var l = this.galleryImgUrl,
                a = this.description;
            $.ajax({
                url: "ajax/ajaxAddGalleryImg.php",
                async: !0,
                method: "post",
                data: {
                    url: l,
                    description: a
                },
                type: "json"
            }), alert("Gallery Image Have Successfully Imported To Database")
        },
        refreshGallery: function () {
            this.imgGalleryList.empty(), this.printGalleryToHTML()
        }
    }).init()
});
