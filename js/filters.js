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

  var filtersForm = document.querySelector('.map__filters');
  var filtersFields = filtersForm.querySelectorAll('select');
  var housingTypeField = filtersForm.querySelector('#housing-type');
  var housingPriceField = filtersForm.querySelector('#housing-price');
  var housingRoomsField = filtersForm.querySelector('#housing-rooms');
  var housingGuestsField = filtersForm.querySelector('#housing-guests');

  var featuresList = filtersForm.querySelectorAll('input[name="features"]');

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
    var featuresArr = Array.from(featuresList);
    var selectedfeatures = featuresArr.filter(function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.common.allPins.filter(function (item) {
      if (!compareValues(housingTypeField.value, item.offer.type)) {
        return false;
      }

      if (!compareValues(housingRoomsField.value, item.offer.rooms.toString())) {
        return false;
      }

      if (!compareValues(housingGuestsField.value, item.offer.guests.toString())) {
        return false;
      }

      if (!compareByPrice(item.offer.price)) {
        return false;
      }

      if (!compareFeatures(selectedfeatures, item.offer.features)) {
        return false;
      }

      return true;
    });
  };

  var onfiltersFormChange = window.utils.debounce(function () {
    window.card.dropActiveCard();
    window.pin.deletePins();
    window.common.filtredPins = setPacketsFilters();
    window.pin.createPins(window.common.filtredPins);
    window.pin.pageActivated = true;
  });

  var resetFilters = function () {
    filtersFields.forEach(function (item) {
      item.value = ANY;
    });
    featuresList.forEach(function (item) {
      item.checked = false;
    });
  };

  var disableFilters = function () {
    Array.from(filtersForm.elements).forEach(function (item) {
      item.disabled = true;
    });
    filtersForm.removeEventListener('change', onfiltersFormChange);
  };

  var enableFilters = function () {
    Array.from(filtersForm.elements).forEach(function (item) {
      item.disabled = false;
    });
    filtersForm.addEventListener('change', onfiltersFormChange);
  };

  filtersForm.addEventListener('change', onfiltersFormChange);

  window.filters = {
    resetFilters: resetFilters,
    disableFilters: disableFilters,
    enableFilters: enableFilters,
    onfiltersFormChange: onfiltersFormChange
  };
})();
