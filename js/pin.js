'use strict';
(function () {


  var pinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var mainPinOptions = {
    start: {
      LEFT: 570,
      TOP: 375
    },
    moveLimits: {
      MIN: 130,
      MAX: 630
    },
    on: {
      WIDTH: 65,
      HEIGHT: 77
    },
    off: {
      WIDTH: 65,
      HEIGHT: 65
    }
  };

  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var pageActivated = false;

  // Поставили обработчик события по pin
  var onPinClick = function (offer) {
    window.renderCard(offer);
  };

  // Удаление класса выделенного элемента
  var deactivatePin = function () {
    var activePins = window.map.querySelector('.map__pin--active');
    if (activePins) {
      activePins.classList.remove('map__pin--active');
    }
  };

  // Добавление класса выделенного элемента
  window.activatePin = function (evt) {
    evt.currentTarget.classList.add('map__pin--active');
  };

  // создание DOM элементов для метки на карте
  window.createPins = function (offersArr) {

    var pinsMap = document.createDocumentFragment();
    for (var i = 0; i < offersArr.length - 1; i++) {
      var newPinNode = window.template.querySelector('.map__pin').cloneNode(true);
      newPinNode.querySelector('img').src = offersArr[i].author.avatar;
      newPinNode.style.top = (offersArr[i].location.y - pinSize.WIDTH / 2) + 'px';
      newPinNode.style.left = (offersArr[i].location.x - pinSize.HEIGHT / 2) + 'px';

      pinsMap.appendChild(newPinNode);

      newPinNode.addEventListener('click', onPinClick.bind(undefined, offersArr[i]));
      newPinNode.addEventListener('click', deactivatePin);
      newPinNode.addEventListener('click', window.activatePin);
    }
    mapPins.appendChild(pinsMap);
  };

  var moveMainPin = function (x, y) {
    mainPin.style.top = y + 'px';
    mainPin.style.left = x + 'px';
  };

  var setAddress = function (address) {
    inputAddress.value = address.x + ', ' + address.y;
  };

  // Получение адреса метки mainPin на карте
  window.getMainPinAddress = function () {
    var addressX = Math.round(mainPin.offsetLeft + (pageActivated ? mainPinOptions.on.WIDTH / 2 : mainPinOptions.off.WIDTH / 2));
    var addressY = Math.round(mainPin.offsetTop + (pageActivated ? mainPinOptions.on.HEIGHT / 2 : mainPinOptions.off.HEIGHT / 2));
    var coord = {
      x: addressX,
      y: addressY
    };
    return coord;
  };

  window.mainPinHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      moveMainPin(newCoords.x, newCoords.y);
      window.adForm.setAddress(window.getMainPinAddress());
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      window.adForm.setAddress(window.getMainPinAddress());
    };
  };

  var movePin = function () {
    window.activateForm();
    window.activateMap();
    setAddress(window.getMainPinAddress());
    mainPin.removeEventListener('mouseup', movePin);
  };

  mainPin.addEventListener('mouseup', movePin);

})();
