'use strict';

(function () {
  var Prices = {
    MIN: 0,
    MAX: 1000000
  };

  var Messages = {
    LESS_SYMBOLS: 'Заголовок объявления должен содержать не меньше 30 симоволов',
    MORE_SYMBOLS: 'Заголовок объявления должен содержать не более 100 символов',
    EMPTY_TITLE: 'Озаглавьте объявление',
    SET_PRICE: 'Укажите цену',
    PRICE_EXCEED: 'Цена не должна превышать 1000000'
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

  var adForm = document.querySelector('.ad-form');
  var sendForm = adForm.querySelector('.ad-form__submit');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var checkInField = adForm.querySelector('#timein');
  var checkOutField = adForm.querySelector('#timeout');
  var roomsField = adForm.querySelector('#room_number');
  var capacityField = adForm.querySelector('#capacity');
  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');
  var adFieldset = adForm.querySelectorAll('.ad-form__element');
  var adTitleField = adForm.querySelector('#title');
  var adPriceField = adForm.querySelector('#price');
  var success = document.querySelector('.success');


  // Проверка введенных пользователем данных в поле цены
  var onPriceValueCheck = function () {
    if (adPriceField.validity > Prices.MAX) {
      adPriceField.focus();
      adPriceField.setCustomValidity(Messages.PRICE_EXCEED);
    } else if (adPriceField.valueMissing) {
      adPriceField.focus();
      adPriceField.setCustomValidity(Messages.SET_PRICE);
    } else {
      adPriceField.setCustomValidity('');
    }
  };

  adPriceField.addEventListener('change', function (evt) {
    onPriceValueCheck(evt.target.value);
  });

  // Проверка введенных пользователем данных в поле заголовка
  var onTitleValueCheck = function () {
    if (adTitleField.validity.tooShort) {
      adTitleField.focus();
      adTitleField.setCustomValidity(Messages.LESS_SYMBOLS);
    } else if (adTitleField.validity.tooLong) {
      adTitleField.focus();
      adTitleField.setCustomValidity(Messages.MORE_SYMBOLS);
    } else if (adTitleField.validity.valueMissing) {
      adTitleField.focus();
      adTitleField.setCustomValidity(Messages.EMPTY_TITLE);
    } else {
      adTitleField.setCustomValidity('');
    }
  };

  adTitleField.addEventListener('change', function (evt) {
    onTitleValueCheck(evt.target.value);
  });

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
    window.filters.onfiltersFormChange();
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
    document.body.insertAdjacentElement('afterbegin', window.error.showMessage(errorMessage));
  };

  var closeSuccess = function () {
    success.classList.add('hidden');
  };

  // Обработчик события по кнопке отправки формы
  var onSendClick = function (evt) {
    evt.preventDefault();
    if (adTitleField.validity.valid && adPriceField.validity.valid) {
      var data = new FormData(adForm);
      window.backend.uploadData(data, formSuccessMessage, formErrorMessage);
      deactivateForm();
      window.map.deactivateMap();
    }
  };

  var onFormReset = function (evt) {
    evt.preventDefault();
    window.pin.deletePins();
    window.card.dropActiveCard();
    window.filters.resetFilters();
    window.pin.returnMainPin();
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

  resetForm.addEventListener('click', onFormReset);

  window.form = {
    activateForm: activateForm,
    adFieldset: adFieldset,
  };
})();
