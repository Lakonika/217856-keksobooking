'use strict';

(function () {

  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var HTTPStatuses = {
    PAGE_NOT_FOUND: 404,
    PAGE_SUCCESS: 200,
    SERVER_ERROR: 500
  };

  var Messages = {
    PAGE_NOT_FOUND: 'Страница не найдена',
    SERVER_ERROR: 'На сервере произошла ошибка',
    DEFAULT_ERROR: 'Ошибка с неизвестным статусом: ',
    CONNECTION_ERROR: 'Ошибка соединения',
    TIMEOUT_ERROR: 'Запрос не успел выполниться за ',
  };

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case HTTPStatuses.PAGE_SUCCESS:
          onLoad(xhr.response);
          break;
        case HTTPStatuses.PAGE_NOT_FOUND:
          onError(Messages.PAGE_NOT_FOUND);
          break;
        case HTTPStatuses.SERVER_ERROR:
          onError(Messages.SERVER_ERROR);
          break;
        default:
          onError(Messages.DEFAULT_ERROR + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Messages.CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(Messages.TIMEOUT_ERROR + xhr.timeout + ' мс.');
    });

    return xhr;
  };

  var uploadData = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var downloadData = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };

  window.backend = {
    uploadData: uploadData,
    downloadData: downloadData
  };

})();
