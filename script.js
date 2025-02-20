let userName = prompt("What's your name?") || "Developer"; // Default if user cancels

        // Expanded greeting messages
        let greetings = [
            `Hey ${userName}, ready to rock JavaScript today? 🚀`,
            `Hello ${userName}! Let's make some magic with code. ✨`,
            `${userName}, your JavaScript journey starts NOW! 🔥`,
            `Welcome, ${userName}! JavaScript is waiting for you. 💻`,
            `Hey ${userName}, let's add some colors to your coding world! 🎨`,
            `Hey ${userName}, every bug is a lesson. Keep coding! 🐞💡`,
            `Good to see you, ${userName}! Every great dev starts somewhere. 💻😊`,
            `${userName}, let's make the web beautiful today! 🎨🚀`,
            `Hey ${userName}, coding is just problem-solving with fun! 🔥`,
            `Welcome back, ${userName}! Today’s a great day to learn something new. 🚀`
        ];

        let greetingElement = document.getElementById("greeting");
        let currentIndex = 0;

        // Function to generate a random color
        function getRandomColor() {
            let letters = "89ABCDEF"; // Avoids very dark colors
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        }

        // Function to display greeting one by one
        function showNextGreeting() {
            if (currentIndex >= greetings.length) {
                currentIndex = 0; // Restart loop when all messages are shown
            }

            let message = greetings[currentIndex];
            greetingElement.style.opacity = "0"; // Fade out effect

            setTimeout(() => {
                greetingElement.textContent = message; // Change text
                greetingElement.style.color = getRandomColor(); // Change color
                greetingElement.style.opacity = "1"; // Fade in effect
                speakGreeting(message); // Speak the message
            }, 1000);

            currentIndex++; // Move to next message
        }

        // Function to speak the greeting
        function speakGreeting(message) {
            let speech = new SpeechSynthesisUtterance(message);
            speech.lang = "en-US";
            speech.rate = 1;  // Adjust speaking speed (0.5 = slow, 1 = normal, 1.5 = fast)
            speech.pitch = 1; // Adjust voice pitch
            speech.onend = () => setTimeout(showNextGreeting, 2000); // Wait & show next greeting
            window.speechSynthesis.speak(speech);
        }

        // Start greetings when button is clicked
        function startGreeting() {
            showNextGreeting();
        }