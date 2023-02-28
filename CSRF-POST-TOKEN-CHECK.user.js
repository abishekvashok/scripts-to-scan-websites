// ==UserScript==
// @name         CSRF-POST-TOKEN-CHECK
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script to detect if all forms(with post param) are having csrf token fields
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
    function formHasCsrfToken(form) {
        // Non exhaustive list, add once found
        const commonNames = ['csrf_token', 'csrf', 'csrfmiddlewaretoken', 'authenticity_token', '_token', '_csrf'];
        return commonNames.some(name => !!form.querySelector(`input[name="${name}"]`));
    }
    const forms = document.getElementsByTagName('form');
    var f = 0;
    for(var i = 0; i < forms.length; i++){
        const form = forms[i];
        if((form.method.toLowerCase() == "post") && !(formHasCsrfToken(form))) {
            console.log("Information for form with post method: ");
            console.log(form.id);
            for (let j = 0; j < form.elements.length; j++) {
                const control = form.elements[j];
                if (control instanceof HTMLInputElement) {
                    console.log(control.name);
                }
            }
            console.log("End information");
            f += 1;
        }
    }
    if (f > 0) {
        showNotification(`${f} forms that have method POST seem to lack csrf protection`);
    }
})();