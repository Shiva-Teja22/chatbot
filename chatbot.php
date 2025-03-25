<?php
header("Content-Type: application/json");

// Predefined chatbot responses
$botResponses = [
    "hello" => "Hi there! How can I assist you today?",
    "help" => "Sure! What do you need help with? 

                - Select from the options below -
                1) Delivery issue
                2) Payment issue
                3) Other",
    "bye" => "Goodbye! Have a great day!",
    "who are you" => "I'm an AI chatbot here to assist you.",
    "what can you do" => "I can chat with you, answer questions, and even talk!",
    "tell me a joke" => "Why don’t skeletons fight each other? Because they don’t have the guts!",
    "1" => "Please enter your Delivery ID.",
    "2" => "Please enter your Transaction ID.",
    "3" => "Would you like to call our Customer Support Agent? Type 'yes' or 'no'.",
    "yes" => "You can reach us at: XXXX-XXX-XXXX",
    "no" => "Alright! Let me know if you need anything else."
];

// Get user message
$userMessage = strtolower(trim($_POST['message'] ?? ''));

// Determine response
$reply = $botResponses[$userMessage] ?? "I'm not sure how to respond to that. Please try again.";

// Return JSON response
echo json_encode(["reply" => $reply]);
