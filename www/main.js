$(document).ready(function () {
    // 🔠 Text animation for "Ask me anything"
    $('.text').textillate({
        loop: true,
        sync: true,
        in: { effect: "bounceIn" },
        out: { effect: "bounceOut" }
    });

    // 🌊 Siri wave animation setup
    var siriWave = new SiriWave({
        container: document.getElementById("siri-container"),
        width: 800,
        height: 200,
        style: "ios9",
        amplitude: 1,
        speed: 0.30,
        autostart: true
    });

    // 📝 Siri message animation
    $('.siri-message').textillate({
        loop: true,
        sync: true,
        in: { effect: "fadeInUp", sync: true },
        out: { effect: "fadeOutUp", sync: true }
    });

    // 🎤 Mic button click handler
    $("#MicBtn").on("click", function () {
        try { eel.play_assistant_sound(); } catch (e) { console.warn("eel not found"); }
        $("#Oval").hide();      
        $("#SiriWave").show();  
        eel.allCommands();
    });

    // ⌨️ Keyboard shortcuts
    function doc_keyUp(e) {
        // Ctrl/Cmd + J → Start assistant
        if ((e.key === 'j' || e.key === 'J') && (e.ctrlKey || e.metaKey)) {
            try { eel.play_assistant_sound(); } catch (e) { console.warn("eel not found"); }
            $("#Oval").hide();
            $("#SiriWave").show();
            try { eel.allCommands(); } catch (e) { console.warn("eel not found"); }
        }
        
        // Ctrl + K → Stop assistant
        if ((e.key === 'k' || e.key === 'K') && e.ctrlKey) {
            $("#SiriWave").hide();
            $("#Oval").show();
        }
    }
    document.addEventListener('keyup', doc_keyUp, false);

    // ▶️ Play assistant with typed message
    function PlayAssistant(message) {
        if (message && message.trim() !== "") {
            $("#Oval").hide();
            $("#SiriWave").show();
            try { eel.allCommands(message); } catch (e) { console.warn("eel not found"); }
            $("#chatbox").val("");      
            $("#MicBtn").show();        
            $("#SendBtn").hide();       
        }
    }

    // 📩 Send button event handler (Sender button)
    $("#SendBtn").on("click", function () {
        let message = $("#chatbox").val();
        PlayAssistant(message);
    });

    // ⌨️ Typing in chatbox
    $("#chatbox").on("keyup", function (e) {
        let message = $("#chatbox").val();
        ShowHideButton(message);

        if (e.key === "Enter") {
            e.preventDefault();
            PlayAssistant(message);
        }
    });

    // 🔄 Toggle mic / send buttons
    function ShowHideButton(message) {
        if (!message || message.trim().length === 0) {
            $("#MicBtn").show();
            $("#SendBtn").hide();
        } else {
            $("#MicBtn").hide();
            $("#SendBtn").show();
        }
    }

    // ✅ Exposed to Python → Hide SiriWave when speaking is done
    eel.expose(ShowHUD);
    function ShowHUD() {
        // Smooth fade-out instead of instant hide
        $("#SiriWave").fadeOut(500, function () {
            $("#Oval").fadeIn(500);
        });
    }
    document.getElementById("SettingsBtn").addEventListener("click", () => {
  document.getElementById("settingsPanel").classList.add("show");
});

document.getElementById("closeSettingsBtn").addEventListener("click", () => {
  document.getElementById("settingsPanel").classList.remove("show");
});

document.getElementById("saveSettingsBtn").addEventListener("click", () => {
  let rate = document.getElementById("voiceRate").value;
  let theme = document.getElementById("themeSelect").value;
  let language = document.getElementById("languageSelect").value;

  eel.saveSettings(rate, theme, language);  // call Python exposed function
  document.getElementById("settingsPanel").classList.remove("show");
});
eel.expose(applyTheme);
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
  }
}

});