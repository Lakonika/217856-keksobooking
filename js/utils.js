'use strict';
(function () {

  // Генерация случайного числа
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Генерация
  var getRandomCollection = function (count, source) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push(source[window.utils.getRandomNumber(0, source.length)]);
    }
    return result;
  };

  window.utils = {
    getRandomCollection: getRandomCollection,
    getRandomNumber: getRandomNumber
  };

})();
