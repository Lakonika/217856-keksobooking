'use strict';
(function () {
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
    window.common.mapElement.classList.remove('map--faded');
    window.backend.downloadData(window.pin.createPins);
  };

  // Перевод карты в неактивное состояние, удаление элементов на карте
  var deactivateMap = function () {
    window.common.mapElement.classList.add('.map--faded');
    window.pin.deletePins();
    var card = window.common.mapElement.querySelector('.map__card');
    card.remove(0);
  };

  window.map = {
    offerDetails: OFFER_DETAILS,
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };

})();
