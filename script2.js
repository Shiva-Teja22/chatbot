document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.querySelector(".chat-form");
    const messageInput = document.querySelector(".message-input");
    const chatBody = document.querySelector(".chat-body");
    const closeBtn = document.querySelector(".close-btn");

    // Check if Speech Synthesis is available
    const synth = window.speechSynthesis;

    // Function to speak text
    function speak(text) {
        if (synth.speaking) {
            console.error("Speech synthesis is already in progress...");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";  // Set language
        utterance.rate = 1;  // Normal speed
        utterance.pitch = 1;  // Normal pitch
        synth.speak(utterance);
    }

    // Append message to chat
    function appendMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);

        if (className === "bot-message") {
            const icon = document.createElement("span");
            icon.classList.add("material-icons");
            icon.textContent = "smart_toy";
            messageDiv.appendChild(icon);
        }

        const messageText = document.createElement("span");
        messageText.textContent = text;
        messageDiv.appendChild(messageText);
        chatBody.appendChild(messageDiv);

        chatBody.scrollTop = chatBody.scrollHeight;

        // Speak bot responses
        if (className === "bot-message") {
            speak(text);
        }
    }

    // Generate bot reply
    function botReply(userMessage) {
        const botResponses = {
            "hello": "Hi there! How can I assist you today?",
            "help": "Sure! What do you need help with?",
            "bye": "Goodbye! Have a great day!"
        };

        const response = botResponses[userMessage.toLowerCase()] || "I'm not sure how to respond to that.";
        appendMessage(response, "bot-message");
    }

    // Form submission
    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let userMessage = messageInput.value.trim();
        
        if (!userMessage) return;

        appendMessage(userMessage, "user-message");
        setTimeout(() => botReply(userMessage), 1000);

        messageInput.value = "";
    });

    // Submit message on Enter key (without Shift)
    messageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            chatForm.dispatchEvent(new Event("submit"));
        }
    });

    // Toggle chatbot visibility
    closeBtn.addEventListener("click", () => {
        const chatContainer = document.querySelector(".chatbot-container");
        chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
    });
});
