'use strict';

var OFFER_COUNT = 8;
var AVATAR_PATH = 'img/avatars/user0';
var AVATAR_EXT = '.png';
var ESCAPE = 'Escape';

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

  CHECK_TIMES: [
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

var template = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var inputAddress = document.querySelector('#address');
var checkInField = adForm.querySelector('#timein');
var checkOutField = adForm.querySelector('#timeout');
var roomsField = adForm.querySelector('#room_number');
var capacityField = adForm.querySelector('#capacity');
var typeField = adForm.querySelector('#type');
var priceField = adForm.querySelector('#price');

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
var setCapacity = function (roomsPrice) {
  var capacityOptions = capacityField.options;

  for (var i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = !RoomsCapacity[roomsPrice].includes(capacityOptions[i].value);
  }

  if (capacityField.options[capacityField.selectedIndex].disabled) {
    capacityField.value = RoomsCapacity[roomsPrice][0];
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

// Перевод карты в активное состояние, генерация пинов на карте
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
    result.push(source[getRandomNumber(0, source.length)]);
  }
  return result;
};

// получение пути к файлу аватара
var getAvatarPath = function (avatarNumber) {
  return AVATAR_PATH + avatarNumber + AVATAR_EXT;
};

// генерация случайного объявления
var makeRandomOffers = function () {
  var result = [];

  for (var i = 0; i <= OFFER_COUNT; i++) {
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
    newOffer.offer.checkin = OFFER_DETAILS.CHECK_TIMES[getRandomNumber(0, 2)];
    newOffer.offer.checkout = OFFER_DETAILS.CHECK_TIMES[getRandomNumber(0, 2)];
    newOffer.offer.description = '';
    newOffer.offer.photos = getRandomCollection(getRandomNumber(0, OFFER_DETAILS.PHOTOS.length), OFFER_DETAILS.PHOTOS);
    newOffer.offer.features = getRandomCollection(getRandomNumber(0, OFFER_DETAILS.FEATURES.length - 1), OFFER_DETAILS.FEATURES);

    result.push(newOffer);
  }

  return result;
};

// создание элемента дополнительных опций
var getFeaturesFragment = function (features) {
  var featuresFragment = document.createDocumentFragment();
  features.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + item;
    featuresFragment.appendChild(li);
  });
  return featuresFragment;
};

// создание элемента с фото
var getPhotosFragment = function (photos) {
  var photosFragment = document.createDocumentFragment();
  photos.forEach(function () {
    var newPhotoImg = document.createElement('img');
    newPhotoImg.src = getRandomCollection(getRandomNumber(1, OFFER_DETAILS.PHOTOS.length - 1), OFFER_DETAILS.PHOTOS);
    newPhotoImg.className = 'popup__photo';
    newPhotoImg.width = photoSize.WIDTH;
    newPhotoImg.height = photoSize.HEIGHT;
    newPhotoImg.alt = 'Фотография жилья';
    photosFragment.appendChild(newPhotoImg);
  });
  return photosFragment;
};

// Удаление карточки объявления на карте
var dropActiveCard = function (card) {
  map.removeChild(card);
  document.removeEventListener('keydown', onKeydownEsc);
};

var onCloseCard = function (evt) {
  dropActiveCard(evt.currentTarget.parentNode);
};

var onKeydownEsc = function (evt) {
  if (evt.key === ESCAPE) {
    var currentCard = map.querySelector('.map__card');
    dropActiveCard(currentCard);
  }
};

// создание карточки объявления на карте
var renderCard = function (offerObject) {
  var newOfferCard = template.querySelector('.map__card').cloneNode(true);
  newOfferCard.querySelector('.popup__avatar').src = offerObject.author.avatar;
  newOfferCard.querySelector('.popup__title').textContent = offerObject.offer.title;
  newOfferCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  newOfferCard.querySelector('.popup__text--price').textContent = offerObject.offer.price + ' ' + '\u20bd/ночь';
  newOfferCard.querySelector('.popup__type').textContent = OFFER_DETAILS.houseTypesTranslation[offerObject.offer.type];
  newOfferCard.querySelector('.popup__text--capacity').textContent = 'Для ' + offerObject.offer.guests + ' гостей в ' + offerObject.offer.rooms + ' комнатах';
  newOfferCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;

  var featuresFragment = getFeaturesFragment(offerObject.offer.features);
  var popupFeaturesElement = newOfferCard.querySelector('.popup__features');
  popupFeaturesElement.innerHTML = '';
  popupFeaturesElement.appendChild(featuresFragment);

  newOfferCard.querySelector('.popup__description').textContent = offerObject.offer.description;

  var photosFragment = getPhotosFragment(offerObject.offer.photos);
  var popupPhotosElement = newOfferCard.querySelector('.popup__photos');
  popupPhotosElement.innerHTML = '';
  popupPhotosElement.appendChild(photosFragment);

  newOfferCard.querySelector('.popup__close').addEventListener('click', onCloseCard);

  document.addEventListener('keydown', onKeydownEsc);

  var currentCard = map.querySelector('.map__card');

  if (currentCard) {
    return map.replaceChild(newOfferCard, currentCard);
  }
  map.appendChild(newOfferCard);
  return newOfferCard;
};

// Поставили обработчик события по pin
var onPinClick = function (offer) {
  renderCard(offer);
};

// Удаление класса выделенного элемента
var deactivatePin = function () {
  var activePins = map.querySelector('.map__pin--active');
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
    var newPinNode = template.querySelector('.map__pin').cloneNode(true);
    newPinNode.querySelector('img').src = offersArr[i].author.avatar;
    newPinNode.style.top = (offersArr[i].location.y - pinSize.WIDTH / 2) + 'px';
    newPinNode.style.left = (offersArr[i].location.x - pinSize.HEIGHT / 2) + 'px';

    pinsMap.appendChild(newPinNode);

    newPinNode.addEventListener('click', onPinClick.bind(undefined, offersArr[i]));
    newPinNode.addEventListener('click', deactivatePin);
    newPinNode.addEventListener('click', activatePin);
  }
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
