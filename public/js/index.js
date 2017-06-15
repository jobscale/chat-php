var main = function () {
    // ask user for name with popup prompt
    var name = prompt("Enter your chat name:", "Guest");

    // default name is 'Guest'
    if (!name || name === ' ') {
        name = "Guest";
    }

    // strip tags
    name = name.replace(/(<([^>]+)>)/ig, "");

    // display name on page
    $("#name-area").html("You are: <span>" + name + "</span>");

    // kick off chat
    var chat = new Chat();
    $(function () {

        chat.getState();

        // watch textarea for key presses
        $("#sendie").keydown(function (event) {

            var key = event.which;

            //all keys including return.
            if (key >= 33) {

                var maxLength = $(this).attr("maxlength");
                var length = this.value.length;

                // don't allow new content if length is maxed out
                if (length >= maxLength) {
                    event.preventDefault();
                }
            }
        });
        // watch textarea for release of key press
        $('#sendie').keyup(function (e) {

            if (e.keyCode == 13) {

                var text = $(this).val();
                $(this).val("");
                var maxLength = $(this).attr("maxlength");
                var length = text.length;

                // send
                if (length <= maxLength + 1) {

                    chat.send(text, name);

                } else {

                    $(this).val(text.substring(0, maxLength));

                }
            }
        });

        setInterval(chat.update, 1000);
    });
};

$(window).on("load", function () {
    main();
});
