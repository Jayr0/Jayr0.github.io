const sendButton = document.querySelector('#sendButton');

function handleInput(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight - 8) + "px";

    if (element.value.length > 0) {
        console.log('not empty')
        sendButton.classList.remove("la-microphone");
        sendButton.classList.add("la-paper-plane");
    } else {
        console.log('empty')
        sendButton.classList.remove("la-paper-plane");
        sendButton.classList.add("la-microphone");
    }
}

