$(function () {
    var messages = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function () {
            this.btnViewMessages = $("#btnViewMessages");
            this.messagesTable = $("#messages-table");
        },
        bindEvents: function () {
            this.btnViewMessages.on('click', this.showMessages.bind(this));
        },
        showMessages: function () {
            $.ajax({
                url: 'ajax/ajaxGetMessages.php',
                async: true,
                method: 'get',
                data: {},
                type: "json",
                success: function (data) {
                    messages.createColums(data);
                }
            });
            this.btnViewMessages.attr('disabled', 'disabled');
        },
        createColums: function (data) {
            var message_data = "";
            $.each(data, function (key, value) {
                message_data += "<tr>";
                message_data += "<td>" + value.date + "</td>";
                message_data += "<td>" + value.name + "</td>";
                message_data += "<td>" + value.email + "</td>";
                message_data += "<td>" + value.subject + "</td>";
                message_data += "<td>" + value.message + "</td>";
                message_data += "</tr>";
            });
            this.messagesTable.append(message_data);
        }

    };
    
    messages.init();

});
