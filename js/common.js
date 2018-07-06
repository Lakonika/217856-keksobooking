'use strict';

(function () {
  var SIMILAR_OFFERS_NUMBER = 5;

  window.common = {
    SIMILAR_OFFERS_NUMBER: SIMILAR_OFFERS_NUMBER,
    templateElement: document.querySelector('template').content,
    mapElement: document.querySelector('.map'),
    allPins: [],
    filteredPins: []
  };

})();
