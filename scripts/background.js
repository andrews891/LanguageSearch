addEventListener("DOMContentLoaded", (event) => {
    var button = document.getElementById("submit");
    var input = document.getElementById("appendText");

    chrome.storage.local.get("appendText", (res) => {
        input.value = res.appendText;
    });

    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submit").click();
        }
    });

    button.addEventListener("click", () => {
        appendText = input.value;
        updateRules(input.value)
    })
});

function updateRules(text) {
    console.log(`updating to ${text}`)
    chrome.storage.local.set({"appendText": text})
    chrome.declarativeNetRequest.updateDynamicRules(
        {
            removeRuleIds: [1, 2],
            addRules: [
                {
                    "id": 1,
                    "action": { 
                        "type": "allow" 
                    },
                    "condition": {
                        "urlFilter": `https://www.google.com/search?q=${text}+*`,
                        "resourceTypes": [
                            "main_frame"
                        ] 
                    }
                },
                {
                    "id": 2,
                    "action": { 
                        "type": "redirect", 
                        "redirect": {
                            "regexSubstitution": `https://www.google.com/search?q=${text}+\\1`
                        } 
                    },
                    "condition": {
                        "regexFilter": "^https:\\/\\/www\\.google\\.com\\/search\\?q=(...)",
                        "resourceTypes": [
                            "main_frame"
                        ]
                    }
                },
            ],
        },
    )
}

