'use strict';
(function () {

  var ESCAPE = 'Escape';
  var photoSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  // Удаление карточки объявления на карте
  var dropActiveCard = function (card) {
    window.commonElements.mapElement.removeChild(card);
    document.removeEventListener('keydown', onKeydownEsc);
  };

  var onCloseCard = function (evt) {
    dropActiveCard(evt.currentTarget.parentNode);
  };

  var onKeydownEsc = function (evt) {
    if (evt.key === ESCAPE) {
      var currentCard = window.commonElements.mapElement.querySelector('.map__card');
      dropActiveCard(currentCard);
    }
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
      newPhotoImg.src = window.utils.getRandomCollection(window.utils.getRandomNumber(1, window.map.offerDetails.PHOTOS.length - 1), window.map.offerDetails.PHOTOS);
      newPhotoImg.className = 'popup__photo';
      newPhotoImg.width = photoSize.WIDTH;
      newPhotoImg.height = photoSize.HEIGHT;
      newPhotoImg.alt = 'Фотография жилья';
      photosFragment.appendChild(newPhotoImg);
    });
    return photosFragment;
  };

  // создание карточки объявления на карте
  var renderCard = function (offerObject) {
    var newOfferCard = window.commonElements.templateElement.querySelector('.map__card').cloneNode(true);
    newOfferCard.querySelector('.popup__avatar').src = offerObject.author.avatar;
    newOfferCard.querySelector('.popup__title').textContent = offerObject.offer.title;
    newOfferCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
    newOfferCard.querySelector('.popup__text--price').textContent = offerObject.offer.price + ' ' + '\u20bd/ночь';
    newOfferCard.querySelector('.popup__type').textContent = window.map.offerDetails.houseTypesTranslation[offerObject.offer.type];
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

    var currentCard = window.commonElements.mapElement.querySelector('.map__card');

    if (currentCard) {
      return window.commonElements.mapElement.replaceChild(newOfferCard, currentCard);
    }
    window.commonElements.mapElement.appendChild(newOfferCard);
    return newOfferCard;
  };

  window.card = {
    renderCard: renderCard
  };

})();
