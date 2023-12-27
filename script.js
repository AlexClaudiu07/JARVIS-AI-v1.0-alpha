const dayElement = document.querySelector('.day');
const monthElement = document.querySelector('.month');
const responseTextElement = document.querySelector('.response-text');

function updateDateTime() {
    const currentDate = new Date();

    // Display the current day
    const dayOfMonth = currentDate.getDate();
    dayElement.textContent = dayOfMonth;
    // Display the current month
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[currentDate.getMonth()];
    monthElement.textContent = month;
}

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if (hr >= 0 && hr < 12) {
        speak("Good Morning sir");
    } else if (hr == 12) {
        speak("Good noon sir");
    } else if (hr > 12 && hr <= 17) {
        speak("Good Afternoon sir");
    } else {
        speak("Good Evening sir");
    }
}

window.addEventListener('load', () => {
    updateDateTime();
    speak("Activating JARVIS");
    speak("JARVIS online");
    wishMe();
});

setInterval(updateDateTime, 60000);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    document.querySelector('.content').textContent = transcript;
    speakThis(transcript.toLowerCase());
}

document.querySelector('.talk').addEventListener('click', () => {
    recognition.start();
});

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I did not understand what you said. Please try again.";

    if (message.includes('hey') || message.includes('hello') || message.includes("hi")) {
        const finalText = "Hello sir";
        speech.text = finalText;
    } else if (message.includes('how are you')) {
        const finalText = "I am fine sir. Tell me how can I help you";
        speech.text = finalText;
    } else if (message.includes('name')) {
        const finalText = "My name is JARVIS";
        speech.text = finalText;
    } else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    } else if (message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening Instagram";
        speech.text = finalText;
    } else if (message.includes('open youtube')) {
        window.open("https://youtube.com", "_blank");
        const finalText = "Opening YouTube";
        speech.text = finalText;
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speech.text = finalText;
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speech.text = finalText;
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        const finalText = time;
        speech.text = finalText;
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" })
        const finalText = date;
        speech.text = finalText;
    } else if (message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    } else if (message.includes('discord')) {
        window.open('Discord:///')
        const finalText = "Opening Discord";
        speech.text = finalText;
    }else if (message.includes('spotify')) {
        window.open('Spotify:///')
        const finalText = "Opening Spotify";
        speech.text = finalText;
    }
    
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speech.text = finalText;
    }

    // Actualizează conținutul elementului .response-text cu răspunsul asistentului
    responseTextElement.textContent = speech.text;

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}
