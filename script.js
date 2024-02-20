const partnerMessages = [
    "Wie is Emma?",
    "Waar ben je? Ik ben nu onderweg naar jou.",
    "Waar was je gister?",
    "WHO THE HELL IS EMMA!!?",
    "Ben je alleen thuis??",
    "Met wie was je gister uit??",
    "Ik ben er bijna…",
]

const messageResponses = [
    ["Over wie heb je het??", "Ik heb een kater en herinner me niets meer", "Mijn nieuwe vriendin"],
    ["Ik ben thuis, me klaar aan het maken voor jou", "Ik ben thuis", "Ik ben aan het slapen"],
    ["Ik weet het niet ik ben gister uit geweest en heb nu een kater", "Ik herinner me niets meer", "Gaat je niets aan"],
    ["Over wie heb je het??", "Ik weet het niet", "HOE MOET IK DAT WETEN!!"],
    ["Ik ben alleen thuis en bezig met me klaar maken", "Ik ben alleen en bezig met me klaar maken", "Ik ben thuis en bezig met me klaar maken"],
    ["Ik was uit met mijn familie", "Ik was uit met onze vrienden", "Ik was uit met vrienden"],
    ["Ik kan niet wachten", "Oké", "Isg"],
]

const partnerResponses = [
    ["DAT VRAAG IK AAN JOU!!", "Je had ook nooit moeten drinken 😡 Ik kom eraan", "JE KAN HIER MAAR BETER EEN GOEDE UITLEG VOOR HEBBEN, IK KOM ERAAN!!!"],
    ["Wat lief, ik kom eraan ❤️", "Oké ik kom eraan blijf daar.", "Kom dan uit bed en zorg dat je je shit bij elkaar hebt, ik kom eraan."],
    ["Hoezo weet je dat niet?? Je had ook niet zoveel moeten drinken!!", "Hoezo herinner je niets meer 😡", "Ik ben je partner natuurlijk gaat het me aan waar je gister was!!!"],
    ["OVER EMMA, WIE IS ZE!!?", "Blijf zoeken", "Ga dan zoeken!! 😡"],
    ["Oké", "Ben je nu thuis of niet??", "Maar ben je alleen??"],
    ["Echt waar??", "Waarom was ik niet uitgenodigd!!? 😡", "Met wie, is een van hen Emma??"],
    ["Whatever", "Oke??", "You’re Done!!!"],
];

const messageInterval = 340000; // 5 minutes 40 seconds
const responseDelay = 12000 // 20 seconds
const geduldCountDownInterval = 3000; // 3 seconds

let geduld = 50;
let geduldCountdownInterval;

let currentMessageIndex = 0;

/**
 * Change the value of geduld. and send it to the API.
 * The geduld cant go lower than 0 and higher than 100.
 * @param valueChange number to add to geduld. e.g: 15, -5
 */
function setCurrentGeduld(valueChange) {
    geduld += valueChange

    if (geduld > 100) {
        geduld = 100
    } else if (geduld < 0) {
        geduld = 0;
    }

    sendGeduld(geduld);
}

function sendGeduld(newGeduld) {
    fetch('https://api.rutgerpronk.com/geduld', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newGeduld})
    });
}

/**
 * Send a message to the chat and scroll to the bottom of the chat.
 * @param message The message to send.
 * @param messageType The type of message to greate. e.g: "user" or "partner"
 */
function sendMessage(message, messageType) {
    const now = new Date();
    // To add a leading zero to the hours and minutes when they are less than 10
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const messageElement = document.createElement(`${messageType}-chat-bubble`);
    messageElement.setAttribute("text", message);
    messageElement.setAttribute("time", `${hours}:${minutes}`);

    const messagesContainer = document.querySelector('#messages-container');
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the chat
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function startMessageCycle() {
    sendMessage(partnerMessages[currentMessageIndex], "partner");

    const messageElements = document.querySelectorAll(".message-opptions");
    messageElements.forEach((element, index) => {
        element.innerText = messageResponses[currentMessageIndex][index];
        element.style.visibility = "visible";
    });

    geduldCountdownInterval = setInterval(() => {
        setCurrentGeduld(-1);
    }, geduldCountDownInterval);
}

async function handleUserMessage(message) {
    const messageElements = document.querySelectorAll(".message-opptions");
    messageElements.forEach((element) => {
        element.style.visibility = "hidden";
    });

    sendMessage(message, "user");

    clearInterval(geduldCountdownInterval);

    const index = messageResponses[currentMessageIndex].indexOf(message);
    if (index === 0) {
        setCurrentGeduld(20);
    } else if (index === 2) {
        setCurrentGeduld(-10);
    }

    const partnerResponseMessage = partnerResponses[currentMessageIndex][index];

    // Send response message in 20s while waiting until this is done.
    await new Promise(resolve => setTimeout(() => {
        sendMessage(partnerResponseMessage, "partner");
        resolve();
    }, responseDelay));

    currentMessageIndex++;

    // If messages left to send schedule next message
    if (currentMessageIndex < partnerMessages.length) {
        setTimeout(startMessageCycle, messageInterval);
    }
}

startMessageCycle();
