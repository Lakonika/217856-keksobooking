'use strict';

(function () {

  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

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
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var uploadImagesControl = document.querySelector('.ad-form__input');

  var setDefaultAvatar = function () {
    var setAvatar = document.createElement('img');
    setAvatar.src = DEFAULT_AVATAR_SRC;
    setAvatar.width = avatarSize.WIDTH;
    setAvatar.height = avatarSize.HEIGHT;
    setAvatar.alt = 'Аватар пользователя';
    previewAvatarContainer.appendChild(setAvatar);
  };

  var createNewAvatar = function (evt) {
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
    fileReader.addEventListener('load', createNewAvatar);
    fileReader.readAsDataURL(avatarFile);
  };

  var deletePhotos = function () {
    photoContainer.querySelectorAll('.ad-form__photo').forEach(function (item) {
      item.remove();
    });
  };

  var resetInputs = function () {
    previewAvatarContainer.innerHTML = '';
    setDefaultAvatar();
    deletePhotos();
  };

  var createImage = function (evt) {
    var newContainer = document.createElement('div');
    newContainer.classList.add('ad-form__photo');
    photoContainer.appendChild(newContainer);
    var uploadImage = document.createElement('img');
    uploadImage.src = evt.target.result;
    uploadImage.width = imageSize.WIDTH;
    uploadImage.height = imageSize.HEIGHT;
    uploadImage.alt = '';
    newContainer.appendChild(uploadImage);
  };

  var showPreviewImage = function (imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', createImage);
    fileReader.readAsDataURL(imageFile);
  };

  var onChangeInputAvatar = function () {
    previewAvatarContainer.innerHTML = '';
    var newAvatar = uploadAvatarControl.files;
    Array.from(newAvatar).forEach(function (element) {
      showPreviewAvatar(element);
    });
  };

  var onChangeInputFiles = function () {
    var newPhotoPreview = uploadImagesControl.files;
    Array.from(newPhotoPreview).forEach(function (element) {
      deletePhotos();
      showPreviewImage(element);
    });
  };

  uploadAvatarControl.addEventListener('change', onChangeInputAvatar);
  uploadImagesControl.addEventListener('change', onChangeInputFiles);

  window.upload = {
    resetInputs: resetInputs,
  };
})();
