'use strict';
(function () {

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

  // Перевод карты в активное состояние, генерация пинов на карте
  var activateMap = function () {
    window.commonElements.mapElement.classList.remove('map--faded');
    var allPins = makeRandomOffers();
    window.pin.createPins(allPins);
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
      newOffer.offer.title = OFFER_DETAILS.TITLES[window.utils.getRandomNumber(0, OFFER_DETAILS.TITLES.length - 1)];
      newOffer.location = {};
      newOffer.location.x = window.utils.getRandomNumber(300, 900);
      newOffer.location.y = window.utils.getRandomNumber(100, 500);
      newOffer.offer.address = newOffer.location.x + ', ' + newOffer.location.y;
      newOffer.offer.price = window.utils.getRandomNumber(1000, 100000);
      newOffer.offer.type = OFFER_DETAILS.HOUSE_TYPE[window.utils.getRandomNumber(0, OFFER_DETAILS.HOUSE_TYPE.length)];
      newOffer.offer.rooms = window.utils.getRandomNumber(1, 5);
      newOffer.offer.guests = window.utils.getRandomNumber(1, 5);
      newOffer.offer.checkin = OFFER_DETAILS.CHECK_TIMES[window.utils.getRandomNumber(0, 2)];
      newOffer.offer.checkout = OFFER_DETAILS.CHECK_TIMES[window.utils.getRandomNumber(0, 2)];
      newOffer.offer.description = '';
      newOffer.offer.photos = window.utils.getRandomCollection(window.utils.getRandomNumber(0, OFFER_DETAILS.PHOTOS.length), OFFER_DETAILS.PHOTOS);
      newOffer.offer.features = window.utils.getRandomCollection(window.utils.getRandomNumber(0, OFFER_DETAILS.FEATURES.length - 1), OFFER_DETAILS.FEATURES);

      result.push(newOffer);
    }

    return result;
  };

  window.map = {
    activateMap: activateMap,
    offerDetails: OFFER_DETAILS
  };

})();
