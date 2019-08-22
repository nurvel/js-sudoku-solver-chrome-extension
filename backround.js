
// not seen in html page console
console.log('Backround go!');

// button of the extention icon
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log("button clicked!");
    //console.log(tab);
    //console.log(tab);
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);

}