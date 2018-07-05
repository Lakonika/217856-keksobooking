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
          onError('Страница не найдена');
          break;
        case HTTPStatuses.SERVER_ERROR:
          onError('На сервере произошла ошибка.');
          break;
        default:
          onError('Ошибка с неизвестным статусом: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
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
