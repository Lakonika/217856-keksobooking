'use strict';

(function () {
  var createPopup = function (text) {
    var errorMessage = document.createElement('div');
    var closeButton = document.createElement('button');
    errorMessage.classList.add('error');
    closeButton.classList.add('error__close');
    errorMessage.textContent = text;
    errorMessage.appendChild(closeButton);

    closeButton.addEventListener('click', function () {
      errorMessage.remove();
    });
    return errorMessage;
  };

  window.error = {
    createPopup: createPopup
  };
})();
