'use strict';

(function () {
  var SIMILAR_OFFERS_NUMBER = 5;

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  window.common = {
    SIMILAR_OFFERS_NUMBER: SIMILAR_OFFERS_NUMBER,
    templateElement: document.querySelector('template').content,
    mapElement: document.querySelector('.map'),
    shuffle: shuffle,
    allPins: [],
    filteredPins: []
  };

})();
