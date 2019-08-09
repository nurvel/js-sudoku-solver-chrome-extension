
function sendToContent(action) {
    console.log("sendToContent");

    let params = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        console.log("gotTabs");
        chrome.tabs.sendMessage(tabs[0].id, action);
    }
}

function importSudoku() {
    console.log("import popup");
    let msg = { txt: "import" }
    sendToContent(msg);
}

function solveSudoku() {
    console.log("solve popup");
    let msg = { txt: "solve" }
    sendToContent(msg);
}

function exportSudoku() {
    console.log("export popup");
    let msg = { txt: "export" }
    sendToContent(msg);
}

window.addEventListener("load", function () {
    let el = document.getElementById("import");
    el.addEventListener("click", importSudoku);
});

window.addEventListener("load", function () {
    let el = document.getElementById("solve");
    el.addEventListener("click", solveSudoku);
});

window.addEventListener("load", function () {
    let el = document.getElementById("export");
    el.addEventListener("click", exportSudoku);
});