'use strict';
(function () {

  var ESCAPE_KEY = 'Escape';

  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    ESCAPE_KEY: ESCAPE_KEY,
    debounce: debounce
  };

})();
