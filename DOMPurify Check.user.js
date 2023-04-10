// ==UserScript==
// @name         DOMPurify Check
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script to detect if we use DOMPurify in a website
// @author       Abishek V Ashok
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
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
    if (DOMPurify !== undefined) {
        showNotification(`DOMPurify is used by the website - consider the bfcache attack`);
    }
})();