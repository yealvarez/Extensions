// Function to update the popup UI with detected WAFs and their values
function updateDetectedWafs() {
    chrome.runtime.sendMessage({ action: "getDetectedWaf" }, (response) => {
        let wafElement = document.getElementById('wafDetected');
        let wafCountElement = document.getElementById('wafCount');
        wafElement.innerHTML = ""; // Clear previous results

        if (response.wafs.length > 0) {
            wafElement.innerHTML = "<h2>Detected WAFs:</h2>";
            response.wafs.forEach(waf => {
                let wafDiv = document.createElement("div");
                wafDiv.textContent = waf;
                wafDiv.style.backgroundColor = "#ffcccc"; // Highlight each WAF detected
                wafDiv.style.padding = "5px";
                wafDiv.style.margin = "5px 0";
                wafElement.appendChild(wafDiv);
            });
            // Update WAF count and show the number
            wafCountElement.textContent = response.wafs.length;
            wafCountElement.style.display = "block";
        } else {
            wafElement.textContent = "No WAF detected.";
            wafCountElement.style.display = "none"; // Hide count if no WAF is detected
        }
    });
}

// Automatically update WAFs when popup is opened
updateDetectedWafs();
