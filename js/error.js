'use strict';

(function () {
  var errorMessage = document.createElement('div');
  var closeButton = errorMessage.createElement('button');
  errorMessage.classList.add('error');
  closeButton.classList.add('error__close');
  errorMessage.textContent = 'text';
  errorMessage.appendChild(closeButton);
  closeButton.addEventListener('click', function () {
    errorMessage.remove();
  });
  return errorMessage;
})();
