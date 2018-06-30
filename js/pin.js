'use strict';
(function () {


  var pinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var MainPinOptions = {
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
    window.card.renderCard(offer);
  };

  // Удаление класса выделенного элемента
  var deactivatePin = function () {
    var activePins = window.commonElements.mapElement.querySelector('.map__pin--active');
    if (activePins) {
      activePins.classList.remove('map__pin--active');
    }
  };

  // Добавление класса выделенного элемента
  var activatePin = function (evt) {
    evt.currentTarget.classList.add('map__pin--active');
  };

  // создание DOM элементов для метки на карте
  var createPins = function (offersArr) {

    var pinsMap = document.createDocumentFragment();
    for (var i = 0; i < offersArr.length - 1; i++) {
      var newPinNode = window.commonElements.templateElement.querySelector('.map__pin').cloneNode(true);
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
  var getMainPinAddress = function () {
    var addressX = Math.round(mainPin.offsetLeft + (pageActivated ? MainPinOptions.on.WIDTH / 2 : MainPinOptions.off.WIDTH / 2));
    var addressY = Math.round(mainPin.offsetTop + (pageActivated ? MainPinOptions.on.HEIGHT / 2 : MainPinOptions.off.HEIGHT / 2));
    var coord = {
      x: addressX,
      y: addressY
    };
    return coord;
  };

  var mainPinHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var minCoords = {
        x: -mainPin.clientWidth / 2,
        y: MainPinOptions.moveLimits.MIN - MainPinOptions.on.HEIGHT
      };

      var maxCoords = {
        x: window.commonElements.mapElement.clientWidth - mainPin.clientWidth / 2,
        y: MainPinOptions.moveLimits.MAX - MainPinOptions.on.HEIGHT
      };

      if (newCoords.y > maxCoords.y || newCoords.y < minCoords.y) {
        newCoords.y = mainPin.offsetTop;
      }

      if (newCoords.x < minCoords.x || newCoords.x > maxCoords.x) {
        newCoords.x = mainPin.offsetLeft;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      moveMainPin(newCoords.x, newCoords.y);
      setAddress(getMainPinAddress());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      setAddress(getMainPinAddress());
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  var initPin = function () {
    document.addEventListener('mousedown', mainPinHandler);
    window.map.activateMap();
    window.form.activateForm();
    setAddress(getMainPinAddress());
    mainPin.removeEventListener('mousedown', initPin);
  };

  mainPin.addEventListener('mousedown', initPin);

  window.pin = {
    activatePin: activatePin,
    createPins: createPins,
    getMainPinAddress: getMainPinAddress,
    mainPinHandler: mainPinHandler,
  };

})();
