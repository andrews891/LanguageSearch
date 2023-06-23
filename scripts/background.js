console.log("Hello, World");

updateRules("javascript")
sleep(10)
updateRules("python")

function updateRules(language) {
    console.log(`updating to ${language}`)
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
                        "urlFilter": `https://www.google.com/search?q=${language}+*`,
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
                            "regexSubstitution": `https://www.google.com/search?q=${language}+\\1`
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