var instance = false;
var state;
var file;

function Chat() {
    this.update = updateChat;
    this.send = sendChat;
    this.getState = getStateOfChat;
}

//gets the state of the chat
function getStateOfChat() {
    if (instance) {
        return;
    }
    instance = true;
    $.ajax({
        type: "POST",
        url: "process.php",
        data: {
            'function': 'getState',
            'file': file
        },
        dataType: "json",
        success: function (data) {
            state = data.state;
            instance = false;
        }
    });
}

//Updates the chat
function updateChat() {
    if (instance) {
        return;
    }
    instance = true;
    $.ajax({
        type: "POST",
        url: "process.php",
        data: {
            'function': 'update',
            'state': state,
            'file': file
        },
        dataType: "json",
        success: function (data) {
            if (data.text) {
                for (var i = 0; i < data.text.length; i++) {
                    $('#chat-area').append($("<p>" + data.text[i] + "</p>"));
                }
                document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
            }
            instance = false;
            state = data.state;
        }
    });
}

//send the message
function sendChat(message, nickname) {
    if (instance) {
        return;
    }
    instance = true;
    $.ajax({
        type: "POST",
        url: "process.php",
        data: {
            'function': 'send',
            'message': message,
            'nickname': nickname,
            'file': file
        },
        dataType: "json",
        success: function (data) {
            instance = false;
            updateChat();
        }
    });
}
