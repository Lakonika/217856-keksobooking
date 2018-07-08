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

  var AVATAR_SIZE = {
    WIDTH: 44,
    HEIGHT: 44
  };

  var IMAGE_SIZE = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var uploadAvatarControl = document.querySelector('.ad-form-header__input');
  var previewAvatarContainer = document.querySelector('.ad-form-header__preview');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var uploadImagesControl = document.querySelector('.ad-form__input');

  var setAvatar = function (avatarPath) {
    var newAvatar = document.createElement('img');
    newAvatar.src = avatarPath || DEFAULT_AVATAR_SRC;
    newAvatar.width = AVATAR_SIZE.WIDTH;
    newAvatar.height = AVATAR_SIZE.HEIGHT;
    newAvatar.alt = 'Аватар пользователя';
    previewAvatarContainer.appendChild(newAvatar);
  };

  var onAvatarFileReader = function (evt) {
    setAvatar(evt.target.result);
  };

  var showPreviewAvatar = function (avatarFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(avatarFile.type)) {
      window.form.formErrorMessage('Допустимые форматы файлов: jpg, png, svg, gif');
      return;
    }

    var fileReader = new FileReader();
    fileReader.addEventListener('load', onAvatarFileReader);
    fileReader.readAsDataURL(avatarFile);
  };

  var deletePhotos = function () {
    photoContainer.querySelectorAll('.ad-form__photo').forEach(function (item) {
      item.remove();
    });
  };

  var resetInputs = function () {
    previewAvatarContainer.innerHTML = '';
    setAvatar();
    deletePhotos();
  };

  var createImage = function (evt) {
    var newContainer = document.createElement('div');
    newContainer.classList.add('ad-form__photo');
    photoContainer.appendChild(newContainer);
    var uploadImage = document.createElement('img');
    uploadImage.src = evt.target.result;
    uploadImage.width = IMAGE_SIZE.WIDTH;
    uploadImage.height = IMAGE_SIZE.HEIGHT;
    uploadImage.alt = '';
    newContainer.appendChild(uploadImage);
  };

  var showPreviewImage = function (imageFile) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');

    if (!fileRegExp.test(imageFile.type)) {
      window.form.formErrorMessage('Допустимые форматы файлов: jpg, png, svg, gif');
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
