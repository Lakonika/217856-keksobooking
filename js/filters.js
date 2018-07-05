'use strict';

(function () {
  var ANY = 'any';

  var PriceTypes = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var PriceValues = {
    MIN: '10000',
    MAX: '50000'
  };

  var filtresForm = document.querySelector('.map__filters');
  var housingTypeField = filtresForm.querySelector('#housing-type');
  var housingPriceField = filtresForm.querySelector('#housing-price');
  var housingRoomsField = filtresForm.querySelector('#housing-rooms');
  var housingGuestsField = filtresForm.querySelector('#housing-guests');

  var feauturesList = filtresForm.querySelectorAll('input[name="features"]');

  var compareValues = function (filterValue, compareValue) {
    return filterValue === ANY || compareValue === filterValue;
  };

  var compareFeatures = function (filteredFeatures, comparedValues) {
    for (var i = 0; i < filteredFeatures.length; i++) {
      if (!comparedValues.includes(filteredFeatures[i])) {
        return false;
      }
    }

    return true;
  };

  var compareByPrice = function (offerPrice) {
    var selectedPrice = housingPriceField.value;

    switch (selectedPrice) {
      case PriceTypes.MIDDLE:
        return offerPrice >= PriceValues.MIN && offerPrice < PriceValues.MAX;
      case PriceTypes.LOW:
        return offerPrice < PriceValues.MIN;
      case PriceTypes.HIGH:
        return offerPrice >= PriceValues.MAX;
      default:
        return true;
    }
  };

  var setPacketsFilters = function () {
    var feauturesArr = Array.from(feauturesList);
    var selectedFeautures = feauturesArr.filter(function (it) {
      return it.checked;
    }).map(function (it) {
      return it.value;
    });

    return window.common.allPins.filter(function (it) {
      if (!compareValues(housingTypeField.value, it.offer.type)) {
        return false;
      }

      if (!compareValues(housingRoomsField.value, it.offer.rooms.toString())) {
        return false;
      }

      if (!compareValues(housingGuestsField.value, it.offer.guests.toString())) {
        return false;
      }

      if (!compareByPrice(it.offer.price)) {
        return false;
      }

      if (!compareFeatures(selectedFeautures, it.offer.features)) {
        return false;
      }

      return true;
    });
  };

  var onFiltresFormChange = window.utils.debounce(function () {
    window.card.dropActiveCard();
    window.pin.deletePins();
    window.common.filtredPins = setPacketsFilters();
    window.pin.createPins(window.common.filtredPins);
    window.pin.pageActivated = true;
  });

  filtresForm.addEventListener('change', onFiltresFormChange);
})();
