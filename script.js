document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.querySelector(".chat-form");
    const messageInput = document.querySelector(".message-input");
    const chatBody = document.querySelector(".chat-body");
    const closeBtn = document.querySelector(".close-btn");

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, "user-message");
            messageInput.value = "";
            setTimeout(() => botReply(userMessage), 1000);
        }
    });

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
        
        // Auto-scroll to the latest message
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function botReply(userMessage) {
        // Typing Indicator
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "bot-message");
        typingIndicator.innerHTML = `<span class="material-icons">smart_toy</span> <span>Typing...</span>`;
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Bot response logic
        const botResponses = {
            "hello": "Hi there! How can I assist you my nigga?",
            "help": "Sure! What do you need help with?  \n\n - Select from the options below -\n 1) Delivery issue\n 2) Payment issue\n 3) Other",
            "bye": "Goodbye! Have a great day!, my G",
            "hey!" : "Hey!!, whatsupp , nigga",
            "who are you": "I'm an AI chatbot here to assist you.",
            "what can you do": "I can chat with you, answer questions, and even talk!",
            "tell me a joke": "Why don’t skeletons fight each other? Because they don’t have the guts!",
            "1": "Please enter your Delivery ID.",
            "2": "Please enter your Transaction ID.",
            "3": "Would you like to call our Customer Support Agent? Type 'yes' or 'no'.",
            "yes": "You can reach us at: XXXX-XXX-XXXX",
            "no": "Alright! Let me know if you need anything else.",
            "hi": "Hi there! Looking for something specific?",
            "what products do you sell": "We offer electronics, clothing, and accessories. What are you looking for?",
            "do you have discounts": "Yes! We have ongoing discounts. Are you interested in electronics, clothing, or accessories?",
            "current offers": "We have special offers this week! Would you like to hear about discounts on specific items?",
            "how much is shipping": "Shipping costs depend on your location. Could you provide your country or region?",
            "do you offer free shipping": "Yes, free shipping is available on orders above $100!",
            "what is the delivery time": "Our delivery time is typically 3-7 business days, depending on your location.",
            "how can I place an order": "You can order through our website. Would you like guidance?",
            "how do I track my order": "Use the tracking ID sent to your email. Need help finding it?",
            "do you have bulk discounts": "Yes! We offer special discounts for bulk orders. How many items are you looking for?",
            "do you provide wholesale prices": "Yes, we do. Would you like to talk to a sales agent?",
            "payment options": "We accept credit/debit cards, PayPal, and bank transfers. Need help with payment?",
            "do you offer cash on delivery": "Yes, cash on delivery is available in select locations.",
            "return policy": "We have a 30-day return policy. Would you like to know how to return an item?",
            "refund process": "Refunds are processed within 5-7 business days. Need assistance?",
            "customer support": "Our support team is available 24/7. Would you like to chat with an agent?",
            "can I speak to an agent": "Sure! Let me connect you with our sales team.",
            "where are you located": "Our headquarters are in [Your Location], but we ship worldwide!",
            "do you have a physical store": "Yes, we have multiple store locations. Which city are you in?",
            "thank you": "You're welcome! Let me know if you need anything else.",
            "bye": "Goodbye! Have a great shopping experience!",
            "hey": "Hey! How can I help you today?",
            "what products do you sell": "We offer a variety of products including electronics, clothing, and accessories. What are you looking for?",
            "do you have discounts": "Yes! We have ongoing discounts. Could you tell me which product or category you’re interested in?",
            "current offers": "We have special offers on selected items! Would you like to know about discounts on electronics, clothing, or accessories?",
            "how much is shipping": "Shipping costs depend on your location. Could you provide your country or region?",
            "do you offer free shipping": "Yes! We offer free shipping on orders above $100. Let me know if you need more details.",
            "what is the delivery time": "Our standard delivery time is 3-7 business days, depending on your location.",
            "how can I place an order": "You can place an order through our website. Would you like me to guide you through the process?",
            "how do I track my order": "You can track your order using the tracking ID sent to your email. Need help finding it?",
            "do you have bulk purchase discounts": "Yes! We offer special discounts for bulk purchases. How many items are you looking to buy?",
            "do you provide wholesale prices": "Yes, we offer wholesale pricing for large orders. Would you like to speak with a sales representative?",
            "payment options": "We accept credit/debit cards, PayPal, and bank transfers. Would you like help with payment?",
            "do you offer cash on delivery": "Yes, cash on delivery is available in select locations. Where would you like the order delivered?",
            "return policy": "We offer a 30-day return policy. Would you like details on how to return an item?",
            "refund process": "Refunds are processed within 5-7 business days. Need help initiating a return?",
            "customer support": "Our customer support is available 24/7. Would you like to chat with an agent?",
            "can I speak to an agent": "Sure! Let me connect you with a customer support agent.",
            "where are you located": "Our headquarters are in [Your Location], but we ship worldwide!",
            "do you have a physical store": "Yes, we have stores in multiple locations. Which city are you in?",
            "thank you": "You're welcome! Let me know if you need anything else.",
            "thanks" : "Happy to help!",
             
        };

        setTimeout(() => {
            // Remove typing indicator
            chatBody.removeChild(typingIndicator);

            const reply = botResponses[userMessage.toLowerCase()] || "I'm not sure how to respond to that.";
            appendMessage(reply, "bot-message");

            // Speech Output
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
