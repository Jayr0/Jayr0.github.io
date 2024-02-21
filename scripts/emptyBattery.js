const batteryOverlay = document.querySelector('#batteryOverlay');
const delayUntilEmpty = 780000; // 13 minutes

function hideOverlay() {
    batteryOverlay.style.display = 'none';
}

function emptyBattery() {
    batteryOverlay.style.display = 'flex';

    // start listening to if the batteri is goiing to get charged or is already charging. then hide the overlay
    const battery = navigator
        .getBattery()
        .then((battery) => {
            if (battery.charging) {
                hideOverlay();
                return
            }
            battery.addEventListener('chargingchange', () => {
                if (battery.charging) {
                    hideOverlay();
                }
            });
        });
}

if (!navigator.getBattery) {
    alert('Battery API not supported!! please use a different browser');
}


setTimeout(() => {
    emptyBattery();
}, delayUntilEmpty);