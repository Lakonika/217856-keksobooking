'use strict';
(function () {

  var OFFER_COUNT = 8;
  var AVATAR_PATH = 'img/avatars/user0';
  var AVATAR_EXT = '.png';


  window.window.OFFER_DETAILS = {
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

  window.template = document.querySelector('template').content;
  window.map = document.querySelector('.map');

  // Перевод карты в активное состояние, генерация пинов на карте
  window.activateMap = function () {
    window.map.classList.remove('map--faded');
    var allPins = makeRandomOffers();
    window.createPins(allPins);
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
      newOffer.offer.title = window.OFFER_DETAILS.TITLES[window.getRandomNumber(0, window.OFFER_DETAILS.TITLES.length - 1)];
      newOffer.location = {};
      newOffer.location.x = window.getRandomNumber(300, 900);
      newOffer.location.y = window.getRandomNumber(100, 500);
      newOffer.offer.address = newOffer.location.x + ', ' + newOffer.location.y;
      newOffer.offer.price = window.getRandomNumber(1000, 100000);
      newOffer.offer.type = window.OFFER_DETAILS.HOUSE_TYPE[window.getRandomNumber(0, window.OFFER_DETAILS.HOUSE_TYPE.length)];
      newOffer.offer.rooms = window.getRandomNumber(1, 5);
      newOffer.offer.guests = window.getRandomNumber(1, 5);
      newOffer.offer.checkin = window.OFFER_DETAILS.CHECK_TIMES[window.getRandomNumber(0, 2)];
      newOffer.offer.checkout = window.OFFER_DETAILS.CHECK_TIMES[window.getRandomNumber(0, 2)];
      newOffer.offer.description = '';
      newOffer.offer.photos = window.getRandomCollection(window.getRandomNumber(0, window.OFFER_DETAILS.PHOTOS.length), window.OFFER_DETAILS.PHOTOS);
      newOffer.offer.features = window.getRandomCollection(window.getRandomNumber(0, window.OFFER_DETAILS.FEATURES.length - 1), window.OFFER_DETAILS.FEATURES);

      result.push(newOffer);
    }

    return result;
  };

})();
