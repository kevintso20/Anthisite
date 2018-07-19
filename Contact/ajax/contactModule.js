$(function () {
    var contactModule = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function () {
            this.contact = $("#contact");
            this.name = this.contact.find("#name").val();
            this.email = this.contact.find("#email").val();
            this.subject = this.contact.find("#subject").val();
            this.message = this.contact.find("#message").val();
            this.sendMessageBtn = this.contact.find("button");
            this.mailStatus = this.contact.find("#mailstatus ");
            this.mailStatusSpan = this.contact.find("#mailstatus span");

        },
        bindEvents: function () {
            this.sendMessageBtn.on("click", this.sendContact.bind(this));
        },
        sendContact: function () {
            this.cacheDom();
            var valid = this.validateContact();
            this.saveItToDb(valid);
            this.sendItToEmail(valid);


        },
        sendItToEmail: function (valid) {
            if (valid) {
                jQuery.ajax({
                    url: "ajax/contact_mail.php",
                    data: {
                        "name": contactModule.name,
                        "email": contactModule.email,
                        "subject": contactModule.subject,
                        "message": contactModule.message
                    },
                    type: "POST",
                    success: function (output) {
                        contactModule.mailStatus.show();
                        contactModule.mailStatus.css("color", "green");
                        contactModule.mailStatusSpan.text(output);
                        contactModule.emptyFields();
                    },
                    error: function () {}
                });
            }
        },
        saveItToDb: function (valid) {
            if (valid) {
                var date = this.getCurrentDate();
                jQuery.ajax({
                    url: "ajax/ajaxSaveMessage.php",
                    async: !0,
                    data: {
                        "name": contactModule.name,
                        "email": contactModule.email,
                        "subject": contactModule.subject,
                        "message": contactModule.message,
                        "date": date
                    },
                    type: "POST",
                    success: function () {},
                    error: function () {}
                });
            }
        },
        validateContact: function () {
            var valid = true;
            this.mailStatus.css("color", "firebrick");
            var validateMessage = "";

            if (this.name == "") {
                validateMessage += "Fill Your Name,";
                valid = false;
            }
            if (this.email == "") {
                validateMessage += "Fill Your Email,";
                valid = false;
            }
            if (!this.isEmail(this.email)) {
                validateMessage += "This isn't email,"
                valid = false;
            }
            if (this.subject == "") {
                validateMessage += "Type the subject,";
                valid = false;
            }
            if (this.message == "") {
                validateMessage += "Type your message,";
                valid = false;
            }
            if (valid == false) {
                this.mailStatus.show();
                this.mailStatusSpan.text(validateMessage);
            }

            return valid;
        },
        isEmail: function (email) {
            var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return filter.test(email);
        },
        emptyFields: function () {
            $("#name ").val("");
            $("#email").val("");
            $("#subject").val("");
            $("#message").val("");
        },
        getCurrentDate: function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }

            today = dd + '/' + mm + '/' + yyyy;
            return today;
        }


    };


    contactModule.init();



});
