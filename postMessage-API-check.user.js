// ==UserScript==
// @name         postMessage-API-check
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script to detect if a page is recieving any messages via postMessage API (possible xsleaks)
// @author       Abishek V Ashok
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // TODO: Move to base script
    function showNotification(message) {
        const modal = document.createElement('div');
        modal.innerHTML = `
          <div style="position: absolute; top: 5px; right: 5px; background: #FFF; z-index: 1000; border-radius: 4px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); padding: 20px;">
              <p>${message}</p>
              <button>OK</button>
          </div>`;
        document.body.appendChild(modal);
        modal.querySelector('button').addEventListener('click', () => {
            modal.remove();
        });
    }
    window.addEventListener('message', function(event) {
        showNotification("Page is recieving data using postMessage API - this can lead to XSLeaks.");
        console.log("postMessage log:");
        console.log(event.data);
        console.log("postMessage log end");
    });
})();