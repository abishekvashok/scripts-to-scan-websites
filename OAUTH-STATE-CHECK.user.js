// ==UserScript==
// @name         OAUTH-STATE-CHECK
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script to detect if all oauth requests have the state parameter
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
    const oauth_domains = ["accounts.google.com",""];
    const current_url = window.location.href;
    if (window.location.hostname in oauth_domains && "oauth" in window.location.href) {
        const search_params = new URLSearchParams(window.location.search);
        const state = search_params.get('state');
        if (state === undefined || state === null) {
            showNotification("No state param, this OAuth flow is vulnerable to CSRF and can lead to account take overs");
        }
    }
})();