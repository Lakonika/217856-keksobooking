'use strict';
(function () {

  var adForm = document.querySelector('.ad-form');
  var sendForm = adForm.querySelector('.ad-form__submit');
  var checkInField = adForm.querySelector('#timein');
  var checkOutField = adForm.querySelector('#timeout');
  var roomsField = adForm.querySelector('#room_number');
  var capacityField = adForm.querySelector('#capacity');
  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');
  var adFieldset = adForm.querySelectorAll('.ad-form__element');
  var adTitleInput = adForm.querySelector('#title');
  var adPriceInput = adForm.querySelector('#price');
  var success = document.querySelector('.success');

  var prices = {
    MIN: 0,
    MAX: 1000000
  };

  // Установление корреляций минимальной цены и типа жилья
  var MinPrices = {
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
  // Проверка введенных пользователем данных в поле цены
  var checkPriceValue = function () {
    if (adPriceInput.validity > prices.MAX) {
      adPriceInput.setCustomValidity('Цена не должна превышать 1000000.');
    } else if (adPriceInput.valueMissing) {
      adPriceInput.setCustomValidity('Укажите цену.');
    } else {
      adPriceInput.setCustomValidity('');
    }
  };

  adPriceInput.addEventListener('change', checkPriceValue);

  // Проверка введенных пользователем данных в поле заголовка
  var checkTitleValue = function () {
    if (adTitleInput.validity.tooShort) {
      adTitleInput.setCustomValidity('Заголовок объявления должен содержать не меньше 30 симоволов.');
    } else if (adTitleInput.validity.tooLong) {
      adTitleInput.setCustomValidity('Заголовок объявления должен содержать не более 100 символов.');
    } else if (adTitleInput.validity.valueMissing) {
      adTitleInput.setCustomValidity('Озаглавьте объявление.');
    } else {
      adTitleInput.setCustomValidity('');
    }
  };

  adTitleInput.addEventListener('change', checkTitleValue);

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
    setMinPrice(MinPrices[evt.target.value]);
  });

  var enableFieldsets = function () {
    adFieldset.forEach(function (item) {
      item.disabled = false;
    });
  };

  // Перевод формы в активное состояние
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    enableFieldsets();
  };

  var disableFieldsets = function () {
    adFieldset.forEach(function (item) {
      item.disabled = true;
    });
  };

  // Отключение формы
  var deactivateForm = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    disableFieldsets();
  };

  // Появление окна успешной отправки формы
  var formSuccessMessage = function () {
    success.classList.remove('hidden');
  };

  var formErrorMessage = function (errorMessage) {
    document.body.insertAdjacentElement('afterbegin', window.error.createPopup(errorMessage));
  };

  var closeSuccess = function () {
    success.classList.add('hidden');
  };

  // Обработчик события по кнопке отправки формы
  var onSendClick = function () {
    var data = new FormData(adForm);
    window.backend.uploadData(data, formSuccessMessage, formErrorMessage);
    deactivateForm();
    window.map.deactivateMap();
  };

  // Обработчик события по кнопке закрытия попапа
  success.addEventListener('click', function () {
    closeSuccess();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESCAPE_KEY) {
      closeSuccess();
    }
  });

  sendForm.addEventListener('click', onSendClick);

  window.form = {
    activateForm: activateForm,
    adFieldset: adFieldset,
  };
})();
