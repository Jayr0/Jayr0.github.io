async function sendGeduld(newGeduld) {
    await fetch('https://api.rutgerpronk.com/geduld', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newGeduld})
    });
}
