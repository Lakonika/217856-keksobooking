'use strict';
(function () {

  var adForm = document.querySelector('.ad-form');
  var checkInField = adForm.querySelector('#timein');
  var checkOutField = adForm.querySelector('#timeout');
  var roomsField = adForm.querySelector('#room_number');
  var capacityField = adForm.querySelector('#capacity');
  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  // Установление корреляций минимальной цены и типа жилья
  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Установление корреляций между количеством гостей и комнат
  var RoomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  // Установление корреляций между временем прибытия и отъезда
  var setTimeField = function (field, value) {
    field.value = value;
  };

  checkInField.addEventListener('change', function (evt) {
    setTimeField(checkOutField, evt.target.value);
  });

  checkOutField.addEventListener('change', function (evt) {
    setTimeField(checkInField, evt.target.value);
  });

  // Установление корреляций между количеством гостей и комнат
  var setCapacity = function (roomsNumber) {
    var capacityOptions = capacityField.querySelectorAll('option');
    var capacityArr = Array.from(capacityOptions);
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityArr[i].disabled = !RoomsCapacity[roomsNumber].includes(capacityArr[i].value);
    }

    if (capacityField.options[capacityField.selectedIndex].disabled) {
      capacityField.value = RoomsCapacity[roomsNumber][0];
    }
  };

  roomsField.addEventListener('change', function (evt) {
    setCapacity(evt.target.value);
  });

  // Установление корреляций минимальной цены и типа жилья
  var setMinPrice = function (price) {
    priceField.placeholder = price;
    priceField.min = price;
  };

  typeField.addEventListener('change', function (evt) {
    setMinPrice(minPrices[evt.target.value]);
  });

  // Перевод формы в активное состояние
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  window.form = {
    activateForm: activateForm,
  };
})();
