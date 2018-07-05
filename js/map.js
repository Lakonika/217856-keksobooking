'use strict';
(function () {
  var SIMILAR_OFFERS_NUMBER = 5;
  var OFFER_DETAILS = {
    HOUSE_TYPE: [
      'flat',
      'house',
      'bungalo'
    ],

    houseTypesTranslation: {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало',
      palace: 'Дворец'
    },
  };

  // Перевод карты в активное состояние, генерация пинов на карте
  var activateMap = function () {
    var createdPins = window.common.mapElement.querySelectorAll('.map__pin');
    window.common.mapElement.classList.remove('map--faded');
    if (createdPins.length === 1) {
      window.backend.downloadData(function (loadedData) {
        window.common.allPins = loadedData.slice(0, SIMILAR_OFFERS_NUMBER);
        window.pin.createPins(window.common.allPins);
      });
    }
  };

  // Перевод карты в неактивное состояние, удаление элементов на карте
  var deactivateMap = function () {
    window.common.mapElement.classList.add('map--faded');
    window.pin.deletePins();
    window.pin.returnMainPin();
    window.card.dropActiveCard();
  };

  window.map = {
    offerDetails: OFFER_DETAILS,
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };

})();
