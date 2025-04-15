document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.querySelector(".chat-form");
    const messageInput = document.querySelector(".message-input");
    const chatBody = document.querySelector(".chat-body");
    const closeBtn = document.querySelector(".close-btn");

    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY";

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, "user-message");
            messageInput.value = "";
            setTimeout(() => botReply(userMessage), 1000);
        }
    });

    async function getAIResponse(userMessage) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            })
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || "API request failed");
            }

            return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond to that.";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Oops! Something went wrong.";
        }
    }

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
    }

    async function botReply(userMessage) {
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "bot-message");
        typingIndicator.innerHTML = `<span class="material-icons">smart_toy</span> <span>Typing...</span>`;
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        const botResponses = {
            "hello": "Hi there! How can I assist you today?",
            "help": "Sure! What do you need help with?\n\n1) Delivery issue\n2) Payment issue\n3) Other",
            "bye": "Goodbye! Have a great day!",
            "who are you": "I'm an AI chatbot here to assist you.",
            "what can you do": "I can chat with you, answer questions, and even talk!",
            "tell me a joke": "Why don’t skeletons fight each other? Because they don’t have the guts!",
            "hi": "Hi there! Looking for something specific?",
            "what products do you sell": "We offer electronics, clothing, and accessories. What are you looking for?",
            "do you have discounts": "Yes! We have ongoing discounts. Are you interested in electronics, clothing, or accessories?",
            "how much is shipping": "Shipping costs depend on your location. Could you provide your country or region?",
            "do you offer free shipping": "Yes, free shipping is available on orders above $100!",
            "what is the delivery time": "Our delivery time is typically 3-7 business days, depending on your location.",
            "how do I track my order": "Use the tracking ID sent to your email. Need help finding it?",
            "do you have bulk discounts": "Yes! We offer special discounts for bulk orders. How many items are you looking for?",
            "do you provide wholesale prices": "Yes, we do. Would you like to talk to a sales agent?",
            "return policy": "We have a 30-day return policy. Would you like to know how to return an item?",
            "refund process": "Refunds are processed within 5-7 business days. Need assistance?",
            "customer support": "Our support team is available 24/7. Would you like to chat with an agent?",
            "can I speak to an agent": "Sure! Let me connect you with our support team.",
            "where are you located": "Our headquarters are in [Your Location], but we ship worldwide!",
            "do you have a physical store": "Yes, we have multiple store locations. Which city are you in?",
            "thank you": "You're welcome! Let me know if you need anything else.",
        };

        setTimeout(async () => {
            chatBody.removeChild(typingIndicator);
            let reply;

            // **Math Calculation Handling**
            if (/^\d+[\+\-\*/]\d+$/.test(userMessage)) {
                try {
                    reply = eval(userMessage);
                } catch {
                    reply = "I couldn't calculate that. Please enter a valid mathematical expression.";
                }
            } 
            // **Check for Predefined Responses**
            else if (botResponses[userMessage.toLowerCase()]) {
                reply = botResponses[userMessage.toLowerCase()];
            } 
            // **Fallback to AI Response**
            else {
                reply = await getAIResponse(userMessage);
            }

            appendMessage(reply, "bot-message");
            speak(reply);
        }, 1500);
    }

    function speak(text) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = "en-US";
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }

    closeBtn.addEventListener("click", () => {
        document.querySelector(".chatbot-container").style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.querySelector(".chat-form");
    const messageInput = document.querySelector(".message-input");
    const chatBody = document.querySelector(".chat-body");
    const closeBtn = document.querySelector(".close-btn");

    let helpEnabled = false;

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userMessage = messageInput.value.trim().toLowerCase();
        if (userMessage) {
            appendMessage(userMessage, "user-message");
            messageInput.value = "";
            setTimeout(() => botReply(userMessage), 1000);
        }
    });

    function appendMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);
        const messageText = document.createElement("span");
        messageText.textContent = text;
        messageDiv.appendChild(messageText);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function botReply(userMessage) {
        let reply = "I didn't understand that. Try typing 'help'.";

        switch (true) {
            case userMessage === "help":
                helpEnabled = true;
                reply = "Sure! What do you need help with?\n1) Delivery issue\n2) Payment issue\n3) Other";
                break;
            case helpEnabled && userMessage === "1":
                reply = "Please enter your Delivery ID.";
                break;
            case helpEnabled && userMessage === "2":
                reply = "Please enter your Transaction ID.";
                break;
            case helpEnabled && userMessage === "3":
                reply = "Would you like to call our Customer Support Agent? Type 'yes' or 'no'.";
                break;
            case userMessage === "yes":
                reply = "You can reach us at: XXXX-XXX-XXXX";
                break;
            case userMessage === "no":
                reply = "Alright! Let me know if you need anything else.";
                break;
            default:
                reply = "I'm not sure how to respond to that. Try 'help' for assistance.";
        }

        appendMessage(reply, "bot-message");
    }

    closeBtn.addEventListener("click", () => {
        document.querySelector(".chatbot-container").style.display = "none";
    });
});
