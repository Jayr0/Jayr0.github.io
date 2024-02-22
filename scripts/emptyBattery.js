const batteryOverlay = document.querySelector('#batteryOverlay');
const delayUntilEmpty = 780000; // 13 minutes
let battery;

function hideOverlay() {
    batteryOverlay.style.display = 'none';
}

function showOverlay() {
    batteryOverlay.style.display = 'flex';
}

function emptyBattery() {
    navigator
        .getBattery()
        .then((b) => {
            battery = b;
            battery.addEventListener('chargingchange', handleChargingChange);
            handleChargingChange();
        });
}


function handleChargingChange() {
    if (battery.charging) {
        hideOverlay();
    } else {
        showOverlay();
    }
}

if (!navigator.getBattery) {
    alert('Battery API not supported!! please use a different browser');
}


setTimeout(() => {
    emptyBattery();
}, delayUntilEmpty);