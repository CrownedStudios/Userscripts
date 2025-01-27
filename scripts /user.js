// ==UserScript==
// @name         Script Update Checker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically checks for script updates by comparing hashes of current and remote script content
// @author       Your Name
// @match        *://*/*
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @connect      github.com
// ==/UserScript==

(function() {
    const scriptUrl = "https://raw.githubusercontent.com/MineverseTutorials/Userscripts/main/scripts%20/user.js"; 

    function getCurrentScriptContent() {
        const script = GM_info.script;
        if (script && script.source) {
            return script.source;
        } else {
            console.warn("Unable to get the current script content from GM_info.");
            return null;
        }
    }

    async function checkForUpdates() {
        try {
            const response = await fetch(scriptUrl);
            const latestScriptContent = await response.text();

            const currentScriptContent = getCurrentScriptContent();
            
            if (currentScriptContent === null) {
                console.error("Current script content is unavailable for comparison.");
                return;
            }

            const latestScriptHash = hashString(latestScriptContent);
            const currentScriptHash = hashString(currentScriptContent);

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
        if (typeof str !== 'string') {
            console.error("The value passed to hashString is not a string.");
            return 0;
        }

        let hash = 0, i, chr;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
        }
        return hash;
    }

    checkForUpdates();
})();
