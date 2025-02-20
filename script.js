// AI Voice Greetings
const greetings = [
    "Hello {name}! Welcome to my JavaScript AI Project.",
    "Hope you're having an amazing day, {name}!",
    "This is a dynamic voice greeting powered by AI.",
    "Enjoy the experience, {name}! 🎤",
    "You're doing great, {name}. Keep exploring AI!",
    "Welcome to the future, {name}. AI is awesome!",
    "Did you know? AI is changing the world, {name}!",
    "Keep coding, keep learning, {name}! 🚀",
    "Your journey into AI starts today, {name}! 🌟",
    "AI and JavaScript make a great team, right {name}?",
    "Success comes to those who keep learning, {name}.",
    "You're not just learning JavaScript, {name}. You're creating magic!",
    "Every expert was once a beginner. Keep going, {name}!"
];

let greetingIndex = 0;
const greetingElement = document.getElementById("greeting");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const submitNameBtn = document.getElementById("submitName");

// Voice Controls
const voiceSelect = document.getElementById("voiceSelect");
const speedRange = document.getElementById("speedRange");
const pitchRange = document.getElementById("pitchRange");

let userName = "";
let voices = [];

// Function to Load Available Voices
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = ""; // Clear previous options

    if (voices.length === 0) {
        console.warn("No voices found! Trying again...");
        setTimeout(loadVoices, 500); // Retry after a short delay
        return;
    }

    voices.forEach((voice, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// **Fix: Ensure voices are loaded properly**
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// **Call `loadVoices()` when clicking the start button (ensures voices load)**
startBtn.addEventListener("click", () => {
    loadVoices(); // Load voices before starting greetings
    greetingIndex = 0;
    shuffleGreetings();
    displayGreetings();
});

// Ask for Name
submitNameBtn.addEventListener("click", () => {
    userName = nameInput.value.trim();
    if (userName === "") {
        alert("Please enter your name!");
        return;
    }

    greetingElement.innerText = `Nice to meet you, ${userName}! Click "Start AI Greeting"`;
    nameInput.style.display = "none";
    submitNameBtn.style.display = "none";
    startBtn.style.display = "block";
    speakText(`Nice to meet you, ${userName}! Click Start AI Greeting`);
});

// Function to Speak Text and Display It
function speakTextAndShow(text, callback) {
    greetingElement.innerText = text;
    greetingElement.style.color = getBrightColor(); // Ensure color is bright
    greetingElement.style.opacity = "0"; // Hide initially
    greetingElement.style.transition = "opacity 1s"; // Smooth fade-in effect
    setTimeout(() => greetingElement.style.opacity = "1", 100); // Show gradually

    let speech = new SpeechSynthesisUtterance(text);
    let selectedVoice = voices[voiceSelect.value]; // Get selected voice
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    speech.lang = "en-US";
    speech.rate = parseFloat(speedRange.value); // Get speed value
    speech.pitch = parseFloat(pitchRange.value); // Get pitch value

    speech.onend = function () {
        setTimeout(callback, 1000); // Move to next message after 1 sec delay
    };

    speechSynthesis.speak(speech);
}

// Function to Start Displaying Messages One by One
function displayGreetings() {
    if (greetingIndex < greetings.length) {
        let personalizedGreeting = greetings[greetingIndex].replace("{name}", userName);
        speakTextAndShow(personalizedGreeting, () => {
            greetingIndex++;
            displayGreetings();
        });
    } else {
        greetingIndex = 0; // Reset index to loop again
        shuffleGreetings(); // Shuffle messages for variety
        setTimeout(displayGreetings, 1000);
    }
}

// Function to Shuffle Greetings Order
function shuffleGreetings() {
    for (let i = greetings.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [greetings[i], greetings[j]] = [greetings[j], greetings[i]];
    }
}

// Function to Generate Bright Colors for Visibility
function getBrightColor() {
    const brightColors = [
        "#FF5733", "#FFC300", "#DAF7A6", "#FF33FF", "#33FF57", "#33A1FF", "#FF5733",
        "#FF6B81", "#FFD700", "#A0FF33", "#FF33A6", "#33FFF5", "#6BFF33", "#FF3333"
    ];
    return brightColors[Math.floor(Math.random() * brightColors.length)];
}
