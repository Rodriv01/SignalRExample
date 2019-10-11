    "use strict";

    var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
    var chartBlock = '\u25A3';

    connection.start().catch((err) => {
        return console.error(err.toString());
    });

    document.getElementById("sendButton").addEventListener("click", (event) => {
        var user = document.getElementById("userInput").value;
        var message = "";
        if (!user) {
            user = "Anonimo";
        }
        if ($('input:radio[name=myLanguage]').is(':checked')) {
            var myLanguageId = $('input[name=myLanguage]:checked').attr('id');
            var myLanguageVal = $('input[name=myLanguage]:checked').val();
            connection.invoke("SendMessage", user, message, myLanguageId, myLanguageVal).catch((err) => {
                return console.error(err.toString());
            });
        } else {
            return console.log("No selecciono un lenguaje.");
        }
        event.preventDefault();
    });

    connection.on("ReceiveMessage", (user, message, myLanguageId, myLanguageVal) => {
        var pollResultMsg = user + " voto por '" + myLanguageVal + "'.";
        var ulPoll = document.getElementById("messagesList");
        var liPollResult = document.createElement("li");
        liPollResult.textContent = pollResultMsg;
        // append to top
        ulPoll.insertBefore(liPollResult, ulPoll.childNodes[0]);
        // append to chart block
        document.getElementById(myLanguageId + 'Block').innerHTML += chartBlock;
    });