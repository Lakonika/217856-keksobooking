'use strict';

var OFFER_COUNT = 8;
var AVATAR_PATH = 'img/avatars/user0';
var AVATAR_EXT = '.png';

var OFFER_DETAILS = {
  TITLES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],

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

  CHECKIN_TIME: [
    '12:00',
    '13:00',
    '14:00'
  ],

  CHECKOUT_TIME: [
    '12:00',
    '13:00',
    '14:00'
  ],

  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],

  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
};

var photoSize = {
  WIDTH: 45,
  HEIGHT: 40
};

var pinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

var mainPinSize = {
  on: {
    WIDTH: 65,
    HEIGHT: 77
  },
  off: {
    WIDTH: 65,
    HEIGHT: 65
  }
};

var locationParams = {
  X: {
    MIN: 300,
    MAX: 900
  },
  Y: {
    MIN: 130,
    MAX: 630
  }
};

var ESC_KEYCODE = 27;
var template = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var inputAddress = document.querySelector('#address');

var activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

var activateMap = function () {
  map.classList.remove('map--faded');
  var allPins = makeRandomOffers();
  createPins(allPins);
};

// Генерация случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Генерация
var getRandomCollection = function (count, source) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push(source[getRandomNumber(0, source.length - 1)]);
  }
  return result;
};

// расположение элементов массива в случайном порядке
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// получение пути к файлу аватара
var getAvatarPath = function (avatarNumber) {
  return AVATAR_PATH + avatarNumber + AVATAR_EXT;
};

var features = getRandomCollection(OFFER_DETAILS.FEATURES);

// генерация случайного объявления
var makeRandomOffers = function () {
  var result = [];

  for (var i = 0; i < OFFER_COUNT; i++) {
    var newOffer = {};
    newOffer.author = {};
    newOffer.author.avatar = getAvatarPath(i + 1);
    newOffer.offer = {};
    newOffer.offer.title = OFFER_DETAILS.TITLES[getRandomNumber(0, OFFER_DETAILS.TITLES.length - 1)];
    newOffer.location = {};
    newOffer.location.x = getRandomNumber(300, 900);
    newOffer.location.y = getRandomNumber(100, 500);
    newOffer.offer.address = newOffer.location.x + ', ' + newOffer.location.y;
    newOffer.offer.price = getRandomNumber(1000, 100000);
    newOffer.offer.type = OFFER_DETAILS.HOUSE_TYPE[getRandomNumber(0, OFFER_DETAILS.HOUSE_TYPE.length)];
    newOffer.offer.rooms = getRandomNumber(1, 5);
    newOffer.offer.guests = getRandomNumber(1, 5);
    newOffer.offer.checkin = OFFER_DETAILS.CHECKIN_TIME[getRandomNumber(0, 2)];
    newOffer.offer.checkout = OFFER_DETAILS.CHECKOUT_TIME[getRandomNumber(0, 2)];
    newOffer.offer.description = '';
    newOffer.offer.photos = getRandomCollection(getRandomNumber(1, OFFER_DETAILS.PHOTOS.length), OFFER_DETAILS.PHOTOS);
    newOffer.offer.features = features;

    result.push(newOffer);
  }

  return result;
};

// создание элемента дополнительных опций
var getFeaturesFragment = function () {
  var featuresFragment = document.createDocumentFragment();
  features.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'feature__image feature__image--' + item;
    featuresFragment.appendChild(li);
  });
  return featuresFragment;
};

// создание карточки объявления на карте
var renderCard = function (offerObject) {
  var newOfferCard = template.querySelector('.map__card');
  newOfferCard.querySelector('.popup__avatar').src = offerObject.author.avatar;
  newOfferCard.querySelector('.popup__title').textContent = offerObject.offer.title;
  newOfferCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  newOfferCard.querySelector('.popup__text--price').textContent = offerObject.offer.price + ' ' + '\u20bd/ночь';
  newOfferCard.querySelector('.popup__type').textContent = OFFER_DETAILS.houseTypesTranslation[offerObject.offer.type];
  newOfferCard.querySelector('.popup__text--capacity').textContent = 'Для ' + offerObject.offer.guests + ' гостей в ' + offerObject.offer.rooms + ' комнатах';
  newOfferCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;

  var featuresFragment = getFeaturesFragment(offerObject.offer.features);
  newOfferCard.querySelector('.popup__features').appendChild(featuresFragment);
  newOfferCard.querySelector('.popup__description').textContent = offerObject.offer.description;

  var popupPhotosElement = newOfferCard.querySelector('.popup__photos');
  popupPhotosElement.innerHTML = '';

  for (var i = 0; i < offerObject.offer.photos.length - 1; i++) {
    var newPhotoImg = document.createElement('img');
    newPhotoImg.src = offerObject.offer.photos[i];
    newPhotoImg.className = 'popup__photo';
    newPhotoImg.width = photoSize.WIDTH;
    newPhotoImg.height = photoSize.HEIGHT;
    newPhotoImg.alt = 'Фотография жилья';

    popupPhotosElement.appendChild(newPhotoImg);
  }

  map.appendChild(newOfferCard);
};

// создание DOM элементов для метки на карте
var createPins = function (offersArr) {

  var pinsMap = document.createDocumentFragment();
  for (var i = 0; i < offersArr.length - 1; i++) {
    var newPinNode = template.querySelector('.map__pin').cloneNode(true);
    newPinNode.querySelector('img').src = offersArr[i].author.avatar;
    newPinNode.style.top = (offersArr[i].location.y - pinSize.WIDTH / 2) + 'px';
    newPinNode.style.left = (offersArr[i].location.x - pinSize.HEIGHT / 2) + 'px';

    pinsMap.appendChild(newPinNode);
    var activatePin = function () {
      newPinNode.classList.add('map__pin--active');
    };
    var deactivatePin = function () {
      newPinNode.classList.remove('map__pin--active');
    };
  }
  newPinNode.addEventListener('click', function (evt) {
    deactivatePin();
    activatePin(evt.currentTarget);
  });
  mapPins.appendChild(pinsMap);
};

// Получение адреса метки mainPin на карте
var getMainPinAddress = function () {
  var addressX = Math.round(mainPin.offsetLeft + mainPinSize.on.WIDTH / 2);
  var addressY = Math.round(mainPin.offsetTop + mainPinSize.on.HEIGHT / 2);
  var coord = {
    x: addressX,
    y: addressY
  };
  return coord;
};

var setAddress = function (address) {
  inputAddress.value = address.x + ', ' + address.y;
};

var movePin = function () {
  activateForm();
  activateMap();
  setAddress(getMainPinAddress());
  mainPin.removeEventListener('mouseup', movePin);
};

mainPin.addEventListener('mouseup', movePin);
