document.addEventListener('DOMContentLoaded', () => {
    const forwardSecondsInput = document.getElementById('forwardSeconds');
    const rewindSecondsInput = document.getElementById('rewindSeconds');
    const saveButton = document.getElementById('saveButton');

    chrome.storage.sync.get(['forwardSeconds', 'rewindSeconds'], (result) => {
        forwardSecondsInput.value = result.forwardSeconds || 2;
        rewindSecondsInput.value = result.rewindSeconds || 2;
    });

    saveButton.addEventListener('click', () => {
        const forwardSeconds = parseFloat(forwardSecondsInput.value);
        const rewindSeconds = parseFloat(rewindSecondsInput.value);

        chrome.storage.sync.set({
        forwardSeconds,
        rewindSeconds
        }, () => {
            alert('Settings saved!');
        });
    });
});
