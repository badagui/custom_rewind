chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    forwardSeconds: 2,
    rewindSeconds: 2,
  });
});

chrome.commands.onCommand.addListener((command) => {
  chrome.storage.sync.get(['forwardSeconds', 'rewindSeconds'], (result) => {
    const seconds = command === 'forward' ? result.forwardSeconds : -result.rewindSeconds;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: offsetVideo,
          args: [seconds]
        });
      }
    });
  });
});

function offsetVideo(offset) {
  var videoPlayer = document.querySelector('video');
  if (videoPlayer) {
      var currentTime = videoPlayer.currentTime;
      videoPlayer.currentTime = currentTime + offset;
  } else {
     alert('Video player not found');
  }
}
