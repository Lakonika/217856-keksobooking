'use strict';
(function () {

  var PhotoSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  // Удаление карточки объявления на карте
  var dropActiveCard = function (card) {
    window.common.mapElement.removeChild(card);
    document.removeEventListener('keydown', onKeydownEsc);
  };

  var onCloseCard = function (evt) {
    dropActiveCard(evt.currentTarget.parentNode);
  };

  var onKeydownEsc = function (evt) {
    if (evt.key === window.utils.ESCAPE_KEY) {
      var currentCard = window.common.mapElement.querySelector('.map__card');
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
  var getPhotosFragment = function (src) {
    var newPhotoImg = document.createElement('img');
    newPhotoImg.classList.add('popup__photo');
    newPhotoImg.src = src;
    newPhotoImg.width = PhotoSize.WIDTH;
    newPhotoImg.height = PhotoSize.HEIGHT;
    newPhotoImg.alt = 'Фотография жилья';

    return newPhotoImg;
  };

  // создание карточки объявления на карте
  var renderCard = function (offerObject) {
    var newOfferCard = window.common.templateElement.querySelector('.map__card').cloneNode(true);
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

    offerObject.offer.photos.forEach(function (item) {
      newOfferCard.querySelector('.popup__photos').appendChild(getPhotosFragment(item));
    });

    newOfferCard.querySelector('.popup__close').addEventListener('click', onCloseCard);

    document.addEventListener('keydown', onKeydownEsc);

    var currentCard = window.common.mapElement.querySelector('.map__card');

    if (currentCard) {
      return window.common.mapElement.replaceChild(newOfferCard, currentCard);
    }
    window.common.mapElement.appendChild(newOfferCard);
    return newOfferCard;
  };

  window.card = {
    renderCard: renderCard,
    dropActiveCard: dropActiveCard
  };

})();
