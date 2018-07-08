'use strict';

(function () {

  // var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var TYPES_OF_IMAGES = {
    'GIF': '',
    'JPEG': '',
    'JPG': '',
    'PNG': '',
    'SVG': ''
  };

  var avatarSize = {
    WIDTH: 44,
    HEIGHT: 44
  };

  var imageSize = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var uploadAvatarControl = document.querySelector('.ad-form-header__input');
  var previewAvatarContainer = document.querySelector('.ad-form-header__preview');
  var uploadImagesControl = document.querySelector('.ad-form__input');
  var previewImageContainer = document.querySelector('.ad-form__photo');

  var displayAvatarViaFileRader = function (evt) {
    var uploadAvatar = document.createElement('img');
    uploadAvatar.src = evt.target.result;
    uploadAvatar.width = avatarSize.WIDTH;
    uploadAvatar.height = avatarSize.HEIGHT;
    uploadAvatar.alt = 'Аватар пользователя';
    previewAvatarContainer.appendChild(uploadAvatar);
  };

  var showPreviewAvatar = function (avatarFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(avatarFile.type)) {
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', displayAvatarViaFileRader);
    fileReader.readAsDataURL(avatarFile);
  };

  var displayImageViaFileRader = function (evt) {
    var uploadImage = document.createElement('img');
    uploadImage.width = imageSize.WIDTH;
    uploadImage.height = imageSize.HEIGHT;
    uploadImage.alt = '';
    previewImageContainer.appendChild(uploadImage);
    uploadImage.src = evt.target.result;
  };

  var showPreviewImage = function (imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', displayImageViaFileRader);
    fileReader.readAsDataURL(imageFile);
  };

  var onChangeInputAvatar = function () {
    for (var i = 0; i < this.files.length; i++) {
      previewAvatarContainer.innerHTML = '';
      showPreviewAvatar(this.files[i]);
    }
  };

  var onChangeInputFiles = function () {
    for (var i = 0; i < this.files.length; i++) {
      previewImageContainer.innerHTML = '';
      showPreviewImage(this.files[i]);
    }
  };

  uploadAvatarControl.addEventListener('change', onChangeInputAvatar);
  uploadImagesControl.addEventListener('change', onChangeInputFiles);
})();
