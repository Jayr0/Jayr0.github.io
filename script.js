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
    ["DAT VRAAG IK AAN JOU!!", "Je had ook nooit moeten drinken (boze emoji) Ik kom eraan", "JE KAN HIER MAAR BETER EEN GOEDE UITLEG VOOR HEBBEN, IK KOM ERAAN!!!"],
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

/*
* Change the value of geduld. and also send it to the API.
* The geduld cant go lower than 0 and higher than 100.
* @param valueChange number to add to geduld. e.g: 15, -5
 */
function setCurrentGeduld(valueChange) {
    geduld += valueChange
    sendGeduld(geduld);
}

async function sendGeduld(newGeduld) {
    await fetch('https://api.rutgerpronk.com/geduld', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newGeduld})
    });
}

function sendPartnerMessage(message) {
    const now = new Date();
    console.log(`${now.getHours()}:${now.getMinutes()} [PARTNER]: ${message}`) // TODO make logic for altering HTML
}

function sendUserMessage(message) {
    const now = new Date();
    console.log(`${now.getHours()}:${now.getMinutes()} [USER]: ${message}`) // TODO make logic for altering HTML
}

function startMessageCycle() {
    sendPartnerMessage(partnerMessages[currentMessageIndex]);
    geduldCountdownInterval = setInterval(() => {
        setCurrentGeduld(-1);
    }, geduldCountDownInterval);
}

// TODO make logic for sending message in HTML
async function handleUserMessage(message) {
    sendUserMessage(message);

    clearInterval(geduldCountdownInterval);

    const index = messageResponses[currentMessageIndex].indexOf(message);

    if (index === 0) {
        setCurrentGeduld(20);
    } else if (index === 2) {
        setCurrentGeduld(-10);
    } else if (index === -1) {
        throw new Error('Invalid message');
    }

    const partnerResponseMessage = partnerResponses[currentMessageIndex][index];

    // Send response message in 20s and wait until this is done.
    await new Promise(resolve =>
        setTimeout(() => {
            sendPartnerMessage(partnerResponseMessage);
            return resolve
        }, responseDelay)
    );

    currentMessageIndex++;

    setTimeout(startMessageCycle, messageInterval);
}

startMessageCycle();