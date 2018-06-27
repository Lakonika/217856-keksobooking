'use strict';
(function () {


  // Генерация случайного числа
  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Генерация
  window.getRandomCollection = function (count, source) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push(source[window.getRandomNumber(0, source.length)]);
    }
    return result;
  };

})();
