async function sendGeduld(newGeduld) {
    await fetch('https://api.rutgerpronk.com/geduld', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newGeduld})
    });
}

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

