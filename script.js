const partnerMessages = [
    "Wie is Emma?",
    "Waar ben je? Ik ben nu onderweg naar jou.",
    "Waar was je gister?",
    "WHO THE HELL IS EMMA!!?",
    "Ben je alleen thuis??",
    "Met wie was je gister uit??",
    "Ik ben er bijna…",
    "Ik ben er, wie is Emma!!?"
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

const messagesContainer = document.querySelector('#messages-container');
const responseOptionsContainer = document.querySelector('.message-opptions-container');
const messageElements = document.querySelectorAll(".message-opptions");
const textArea = document.querySelector("#text-area")

function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const debugMode = getUrlParameter('debug');

let messageInterval = 210000; // 3 minutes 30 seconds
let responseDelay = 20000 // 20 seconds
let geduldCountDownInterval = 6000; // 6 seconds

if (!!debugMode) {
    messageInterval = 2000; // 2 seconds
    responseDelay = 1000 // 1 second
    geduldCountDownInterval = 1000; // 1 seconds
}

let geduld = 50
sendGeduld(geduld);

let geduldCountdownInterval;

let currentMessageIndex = 0;

/**
 * Change the value of geduld. and send it to the API.
 * The geduld cant go lower than 0 and higher than 100.
 * @param valueChange number to add to geduld. e.g: 15, -5
 */
function setGeduld(valueChange) {
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

// Fisher-Yates (aka Knuth) Shuffle function
function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function createMessageElement(message, messageType) {
    const now = new Date();
    // To add a leading zero to the hours and minutes when they are less than 10
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const messageElement = document.createElement(`${messageType}-chat-bubble`);
    messageElement.setAttribute("text", message);
    messageElement.setAttribute("time", `${hours}:${minutes}`);
    return messageElement;
}

/**
 * Send a message to the chat and scroll to the bottom of the chat.
 * @param message The message to send.
 * @param messageType The type of message to greate. e.g: "user" or "partner"
 */
function sendMessage(message, messageType) {
    const messageElement = createMessageElement(message, messageType);

    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the chat
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 20);

}

async function startMessageCycle() {
    sendMessage(partnerMessages[currentMessageIndex], "partner");

    new Audio('assets/audio/recieveMessage.mp3').play();

    // If not the last message
    if (currentMessageIndex < partnerMessages.length - 1) {
        const shuffledResponses = shuffleArray(messageResponses[currentMessageIndex]);
        messageElements.forEach((element, index) => {
            element.innerText = shuffledResponses[index];
        });
        responseOptionsContainer.style.display = "flex";
    } else {
        textArea.innerText = "Ik weet wie Emma is ze is mijn: ";
        textArea.dispatchEvent(new Event('input'));
        textArea.disabled = false;
    }


    geduldCountdownInterval = setInterval(() => {
        setGeduld(-1);
    }, geduldCountDownInterval);
}


async function handleUserMessage(message) {
    responseOptionsContainer.style.display = "none";

    sendMessage(message, "user");

    await new Audio('assets/audio/sendMessage.mp3').play();

    clearInterval(geduldCountdownInterval);

    const index = messageResponses[currentMessageIndex].indexOf(message);
    if (index === 0) {
        setGeduld(30);
        console.info("Correct message, Geduld +20");
    } else if (index === 2) {
        setGeduld(-10);
        console.info("Wrong message, Geduld -10");
    } else {
        console.info("\"Meh\" message, Geduld 0");
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

function handleTextFieldMessage(message) {
    responseOptionsContainer.style.display = "none";

    sendMessage(message, "user");

    clearInterval(geduldCountdownInterval);

    const validWords = [
        " zus",
        " zusje",
        " sus",
        " susje",
        " zuis",
        " zuls",
        " zuz",
        " zuus",
        " suze",
        " zuzje",
        " zuz",
        " zuss",
        " zussje",
        " zusjj",
    ];

    const messageContainsValidWord = validWords.some(word => message.toLowerCase().includes(word));

    if (messageContainsValidWord) {
        setGeduld(100);
        console.info("Correct last message, Geduld +100");
    } else {
        setGeduld(-100);
        console.info("Wrong last message, Geduld -100");
    }
}

function handleSendMessageButton() {
    handleTextFieldMessage(textArea.value);
    textArea.value = "";
    // Fire textarea event so the size is reset and sendButton will return to microphone icon.
    textArea.dispatchEvent(new Event('input'));


    textArea.disabled = true;
}

startMessageCycle();
