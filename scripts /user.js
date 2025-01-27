// ==UserScript==
// @name         Script Update Checker
// @namespace    https://example.com/
// @version      1.0
// @description  Automatically checks for script updates by comparing hashes of current and remote script content
// @author       Your Name
// @match        *://*/*
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @connect      github.com
// ==/UserScript==

(function() {
    const scriptUrl = "https://raw.githubusercontent.com/MineverseTutorials/Userscripts/refs/heads/main/scripts%20";

    // Function to get the current script's version or hash
    function getCurrentScriptHash() {
        const script = GM_info.script;
        return script ? script.version : null;
    }

    // Function to fetch the latest script from the URL
    async function checkForUpdates() {
        try {
            const response = await fetch(scriptUrl);
            const latestScriptContent = await response.text();

            const latestScriptHash = hashString(latestScriptContent);
            const currentScriptHash = hashString(GM_info.scriptSource);

            if (latestScriptHash !== currentScriptHash) {
                console.log("Update available!");
                alert("A new update is available for the script!");
            } else {
                console.log("You are using the latest version!");
            }
        } catch (error) {
            console.error("Error checking for updates:", error);
        }
    }


    function hashString(str) {
        let hash = 0, i, chr;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
        }
        return hash;
    }

    checkForUpdates();
})();
