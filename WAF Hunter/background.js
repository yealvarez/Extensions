// WAF patterns for each brand
const wafPatterns = {
    "F5": ["f5_big_ip", "big-ip", "f5 network", "f5-", "f5_", "f5_cspm", "x-big-ip-server"],
    "Imperva": ["imperva", "incapsula", "x-iinfo", "visid_incap_"],
    "Cloudflare": ["cloudflare", "cf-ray", "cf-cache-status"],
    "Barracuda": ["barracuda", "bnedge", "barra-"],
    "Akamai": ["akamai", "akamai-accel", "akamai-bot", "aka-", "akamaighost", "x-akamai-transformed"],
    "ModSecurity": ["mod_security", "modsecurity", "modsec", "x-mod-security"],
    "Citrix": ["citrix", "netscaler", "ctx", "nsc_"],
    "WebKnight": ["webknight", "webknight/", "alkras-"],
    "Sucuri": ["sucuri", "x-sucuri", "sucuri-", "server: sucuri/cloudproxy", "x-sucuri-id", "x-sucuri-cache", "x-sucuri-block"],
    "Distil": ["distil", "x-distil-cs"],
    "Moonshield": ["moonshield", "x-moonshield"],
    "Edgecast": ["edgecast", "ecdf"],
    "CloudFront": ["cloudfront", "x-amz-cf-id"],
    "NSFocus": ["nsfocus"],
    "OtherWAF": [
        "waf",
        "web-application-firewall",
        "x-waf",
        "x-waf-event",
        "x-waf-status",
        "x-firewall",
        "x-powered-by",
        "x-cdn",
        "x-cache",
        "x-edge-ip",
        "x-edge-location",
        "x-check-cacheable",
        "x-cacheable",
        "x-request-id",
        "x-imforwards"
    ]
};

// Function to check headers and cookies for WAF detection
function checkWafInHeadersAndCookies(details) {
    let detectedWafs = [];

    // Check all headers for each pattern
    for (let header of details.responseHeaders) {
        const headerValue = header.value.toLowerCase();

        for (let brand in wafPatterns) {
            for (let pattern of wafPatterns[brand]) {
                // Check pattern in the header value
                if (headerValue.includes(pattern.toLowerCase()) && !detectedWafs.some(waf => waf.includes(brand))) {
                    detectedWafs.push(`${brand} (${header.value.trim()})`);
                    console.log(`Detected WAF in headers: ${brand} with pattern: ${pattern} in value: ${header.value}`);
                }
            }
        }

        // Additional check for 'set-cookie' headers
        if (header.name.toLowerCase() === 'set-cookie') {
            const cookies = headerValue.split(';');
            for (let cookie of cookies) {
                for (let brand in wafPatterns) {
                    for (let pattern of wafPatterns[brand]) {
                        // Check pattern in each cookie value
                        if (cookie.includes(pattern.toLowerCase()) && !detectedWafs.some(waf => waf.includes(brand))) {
                            detectedWafs.push(`${brand} (${cookie.trim()})`);
                            console.log(`Detected WAF in cookies (set-cookie header): ${brand} with pattern: ${pattern} in value: ${cookie}`);
                        }
                    }
                }
            }
        }
    }

    // Store all detected WAFs for the specific tab
    if (details.tabId >= 0) {
        let wafData = {};
        wafData[details.tabId] = detectedWafs;
        chrome.storage.local.set(wafData);

        // Update badge text with number of detected WAFs
        if (detectedWafs.length > 0) {
            chrome.action.setBadgeText({ text: detectedWafs.length.toString(), tabId: details.tabId });
            chrome.action.setBadgeBackgroundColor({ color: "#f44336", tabId: details.tabId }); // Set background color of badge
        } else {
            chrome.action.setBadgeText({ text: "", tabId: details.tabId }); // Clear badge if no WAFs detected
        }
    }
}

// Function to check if the extension has already executed on the current tab
function hasExecutedInTab(tabId, callback) {
    chrome.storage.local.get(['executedTabs'], (result) => {
        const executedTabs = result.executedTabs || {};
        callback(!!executedTabs[tabId]);
    });
}

// Mark the tab as executed
function markTabAsExecuted(tabId) {
    chrome.storage.local.get(['executedTabs'], (result) => {
        const executedTabs = result.executedTabs || {};
        executedTabs[tabId] = true;
        chrome.storage.local.set({ executedTabs: executedTabs });
    });
}

// Monitor HTTP responses
chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        if (details.tabId >= 0) {
            hasExecutedInTab(details.tabId, (executed) => {
                if (!executed) {
                    checkWafInHeadersAndCookies(details);
                    markTabAsExecuted(details.tabId); // Mark the tab as executed
                }
            });
        }
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
);

// Check cookies for WAF detection
function checkWafInCookies(details) {
    chrome.cookies.getAll({ url: details.url }, (cookies) => {
        let detectedWafs = [];

        for (let cookie of cookies) {
            const cookieNameValue = `${cookie.name.toLowerCase()}=${cookie.value.toLowerCase()}`;
            for (let brand in wafPatterns) {
                for (let pattern of wafPatterns[brand]) {
                    // Check pattern in cookie name and value
                    if (cookieNameValue.includes(pattern.toLowerCase()) && !detectedWafs.some(waf => waf.includes(brand))) {
                        detectedWafs.push(`${brand} (${cookie.name}=${cookie.value})`);
                        console.log(`Detected WAF in cookies: ${brand} with pattern: ${pattern} in value: ${cookie.name}=${cookie.value}`);
                    }
                }
            }
        }

        // Store detected WAFs in cookies for the specific tab
        if (details.tabId >= 0 && detectedWafs.length > 0) {
            chrome.storage.local.get([details.tabId.toString()], (result) => {
                const existingWafs = result[details.tabId] || [];
                const allWafs = Array.from(new Set([...existingWafs, ...detectedWafs]));
                let wafData = {};
                wafData[details.tabId] = allWafs;
                chrome.storage.local.set(wafData);

                // Update badge text with number of detected WAFs
                chrome.action.setBadgeText({ text: allWafs.length.toString(), tabId: details.tabId });
                chrome.action.setBadgeBackgroundColor({ color: "#f44336", tabId: details.tabId });
            });
        }
    });
}

// Monitor web requests to check for cookies
chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.tabId >= 0) {
            hasExecutedInTab(details.tabId, (executed) => {
                if (!executed) {
                    checkWafInCookies(details);
                    markTabAsExecuted(details.tabId); // Mark the tab as executed
                }
            });
        }
    },
    { urls: ["<all_urls>"] }
);

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getDetectedWaf") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.storage.local.get([tabs[0].id.toString()], (result) => {
                sendResponse({ wafs: result[tabs[0].id] || [] });
            });
        });
        return true; // Indicates that the response is asynchronous
    }
});

// Clear storage and badge when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.storage.local.remove(tabId.toString());
    chrome.storage.local.get(['executedTabs'], (result) => {
        const executedTabs = result.executedTabs || {};
        delete executedTabs[tabId]; // Remove the tab from executed list
        chrome.storage.local.set({ executedTabs: executedTabs });
    });
    chrome.action.setBadgeText({ text: "", tabId: tabId }); // Clear badge when tab is closed
});
