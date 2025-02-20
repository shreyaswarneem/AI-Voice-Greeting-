// AI Voice Greetings (Multi-Language)
const greetings = {
    en: [
        "Hello {name}! Welcome to my JavaScript AI Project.",
        "Hope you're having an amazing day, {name}!",
        "This is a dynamic voice greeting powered by AI.",
        "Enjoy the experience, {name}!",
        "{name}, remember – every great coder starts somewhere!",
        "Believe in yourself, {name}! You are capable of amazing things.",
        "{name}, keep pushing forward, success is waiting for you!",
        "A new day, a new opportunity, {name}! Make the most of it.",
        "Great things take time, {name}. Keep going!",
        "You're awesome, {name}! Never stop learning!"
    ],
    hi: [
        "नमस्ते {name}! मेरे जावास्क्रिप्ट एआई प्रोजेक्ट में आपका स्वागत है।",
        "आपका दिन शानदार हो, {name}!",
        "यह एक गतिशील आवाज़ एआई अभिवादन प्रणाली है।",
        "इस अनुभव का आनंद लें, {name}!",
        "{name}, याद रखें - हर महान कोडर कहीं से शुरू करता है!",
        "खुद पर विश्वास रखो, {name}! आप अद्भुत चीजों के काबिल हैं।",
        "{name}, आगे बढ़ते रहो, सफलता आपका इंतजार कर रही है!",
        "नया दिन, नई संभावनाएं, {name}! इसका पूरा लाभ उठाएं।",
        "बड़ी चीज़ों में समय लगता है, {name}. लगे रहो!",
        "आप अद्भुत हैं, {name}! सीखना कभी मत छोड़ो!"
    ],
    es: [
        "¡Hola {name}! Bienvenido a mi proyecto de JavaScript AI.",
        "¡Espero que tengas un día increíble, {name}!",
        "Este es un saludo de voz dinámico con IA.",
        "¡Disfruta la experiencia, {name}!",
        "{name}, recuerda – ¡todo gran programador empieza en algún lugar!",
        "Cree en ti mismo, {name}! Eres capaz de cosas increíbles.",
        "{name}, sigue adelante, ¡el éxito te está esperando!",
        "Un nuevo día, una nueva oportunidad, {name}! Aprovecha al máximo.",
        "Las grandes cosas toman tiempo, {name}. ¡Sigue adelante!",
        "¡Eres increíble, {name}! ¡Nunca dejes de aprender!"
    ],
    fr: [
        "Bonjour {name}! Bienvenue sur mon projet AI JavaScript.",
        "J'espère que tu passes une excellente journée, {name}!",
        "Ceci est un message de bienvenue vocal dynamique propulsé par l'IA.",
        "Profite de l'expérience, {name}!",
        "{name}, souviens-toi - chaque grand développeur commence quelque part!",
        "Crois en toi, {name}! Tu es capable de grandes choses.",
        "{name}, continue à avancer, le succès t'attend!",
        "Un nouveau jour, une nouvelle opportunité, {name}! Profites-en au maximum.",
        "Les grandes choses prennent du temps, {name}. Continue!",
        "Tu es génial, {name}! N'arrête jamais d'apprendre!"
    ],
    de: [
        "Hallo {name}! Willkommen in meinem JavaScript AI-Projekt.",
        "Ich hoffe, du hast einen tollen Tag, {name}!",
        "Dies ist eine dynamische KI-Sprachbegrüßung.",
        "Genieße das Erlebnis, {name}!",
        "{name}, denk daran – jeder großartige Programmierer fängt irgendwo an!",
        "Glaube an dich selbst, {name}! Du bist zu erstaunlichen Dingen fähig.",
        "{name}, mach weiter, der Erfolg wartet auf dich!",
        "Ein neuer Tag, eine neue Chance, {name}! Nutze sie.",
        "Große Dinge brauchen Zeit, {name}. Bleib dran!",
        "Du bist großartig, {name}! Hör niemals auf zu lernen!"
    ]
};

let greetingIndex = 0;
const greetingElement = document.getElementById("greeting");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const submitNameBtn = document.getElementById("submitName");

// Language Selector
const languageSelect = document.getElementById("languageSelect");

let userName = "";

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
    speakText(`Nice to meet you, ${userName}! Click Start AI Greeting`, "en");
});

// Function to Speak Text and Display It
function speakTextAndShow(text, lang, callback) {
    greetingElement.innerText = text;
    greetingElement.style.color = getBrightColor(); // Ensure color is bright
    greetingElement.style.opacity = "0"; // Hide initially
    greetingElement.style.transition = "opacity 1s"; // Smooth fade-in effect
    setTimeout(() => greetingElement.style.opacity = "1", 100); // Show gradually

    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang; // Set language dynamically

    speech.onend = function () {
        setTimeout(callback, 1000); // Move to next message after 1 sec delay
    };

    speechSynthesis.speak(speech);
}

// Function to Start Displaying Messages One by One
function displayGreetings() {
    let selectedLang = languageSelect.value; // Get selected language
    let greetingList = greetings[selectedLang]; // Get greeting messages in that language

    if (greetingIndex < greetingList.length) {
        let personalizedGreeting = greetingList[greetingIndex].replace("{name}", userName);
        speakTextAndShow(personalizedGreeting, selectedLang, () => {
            greetingIndex++;
            displayGreetings();
        });
    } else {
        greetingIndex = 0; // Reset index to loop again
        setTimeout(displayGreetings, 1000);
    }
}

// Start AI Voice Greeting
startBtn.addEventListener("click", () => {
    greetingIndex = 0;
    displayGreetings();
});

// Function to Generate Bright Colors for Visibility
function getBrightColor() {
    const brightColors = [
        "#FF5733", "#FFC300", "#DAF7A6", "#FF33FF", "#33FF57", "#33A1FF", "#FF5733",
        "#FF6B81", "#FFD700", "#A0FF33", "#FF33A6", "#33FFF5", "#6BFF33", "#FF3333"
    ];
    return brightColors[Math.floor(Math.random() * brightColors.length)];
}
