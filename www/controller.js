$(document).ready(function () {

    // =========================
    // Escape HTML (safety)
    // =========================
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // =========================
    // Track last message to prevent duplicates
    // =========================
    let lastMessage = { sender: "", text: "" };

    // =========================
    // Append message to chat
    // =========================
    function appendMessage(sender, message, save = true) {
        if (!message || message.trim() === "") return;

        // ✅ Prevent consecutive duplicates
        if (lastMessage.sender === sender && lastMessage.text === message) {
            return;
        }
        lastMessage = { sender, text: message };

        const chatBox = document.getElementById("chat-canvas-body");

        if (sender === "user") {
            chatBox.innerHTML += `
                <div class="row justify-content-end mb-4">
                    <div class="width-size">
                        <div class="sender_message">${escapeHtml(message)}</div>
                    </div>
                </div>`;
        } else {
            chatBox.innerHTML += `
                <div class="row justify-content-start mb-4">
                    <div class="width-size">
                        <div class="receiver_message">${escapeHtml(message)}</div>
                    </div>
                </div>`;
        }

        chatBox.scrollTop = chatBox.scrollHeight;

        if (save) saveChatMessage(sender, message);
    }

    // =========================
    // Save chat in localStorage
    // =========================
    function saveChatMessage(sender, message) {
        const today = new Date().toISOString().split("T")[0];
        let history = JSON.parse(localStorage.getItem("chatHistory")) || {};

        if (!history[today]) history[today] = [];

        history[today].push({
            sender,
            text: message,
            time: new Date().toLocaleTimeString()
        });

        localStorage.setItem("chatHistory", JSON.stringify(history));
    }

    // =========================
    // Load chat history (without saving again)
    // =========================
    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem("chatHistory")) || {};
        const chatBox = document.getElementById("chat-canvas-body");
        chatBox.innerHTML = "";

        for (let date in history) {
            chatBox.innerHTML += `<div class="chat-date-separator">${date}</div>`;
            history[date].forEach(entry => {
                appendMessage(entry.sender, entry.text, false); // 🚫 don't save again
            });
        }
    }

    // =========================
    // Expose only ONCE (fix duplicate calls)
    // =========================
    if (!window.eelFunctionsExposed) {
        eel.expose(senderText);
        function senderText(message) {
            appendMessage("user", message, true);
        }

        eel.expose(receiverText);
        function receiverText(message) {
            appendMessage("bot", message, true);
        }

        eel.expose(DisplayMessage);
        function DisplayMessage(message) {
            $(".siri-message li:first").text(message);
            $('.siri-message').textillate('start');
            $('#siriwave').attr('hidden', false);
            $('#oval').attr('hidden', true);
        }

        eel.expose(hideSiriWave);
        function hideSiriWave() {
            $('#siriwave').attr('hidden', true);
            $('#oval').attr('hidden', false);
        }

        window.eelFunctionsExposed = true; // ✅ never expose twice
    }

    // =========================
    // Enter key = send message
    // =========================
    $("#chatbox").keypress(function (e) {
        if (e.which == 13) {
            let message = $("#chatbox").val().trim();
            if (message !== "") {
                PlayAssistant(message);
                $("#chatbox").val("");
            }
        }
    });

    // =========================
    // Clear Chat Button
    // =========================
    $("#clearChatBtn").click(function () {
        if (confirm("Clear all chat history?")) {
            localStorage.removeItem("chatHistory");
            $("#chat-canvas-body").html("");
            lastMessage = { sender: "", text: "" }; // reset duplicate check
        }
    });

    // =========================
    // Load old chats on startup
    // =========================
    loadChatHistory();
});