/*
  XMLHttpRequest – это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы.

  На сегодняшний день не обязательно использовать XMLHttpRequest, так как существует другой, более современный метод fetch.

  XMLHttpRequest имеет два режима работы: синхронный и асинхронный.

  1) Создать XMLHttpRequest.
    let xhr = new XMLHttpRequest(); // у конструктора нет аргументов

  2) Инициализировать его.
    xhr.open(method, URL, [async, user, password])
      В него передаются основные параметры запроса:
      method – HTTP-метод. Обычно это "GET" или "POST".
      URL – URL, куда отправляется запрос: строка, может быть и объект URL.
      async – если указать false, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
      user, password – логин и пароль для базовой HTTP-авторизации (если требуется).

  3) Послать запрос.
    xhr.send([body])

  4) Слушать события на xhr, чтобы получить ответ.
     Три наиболее используемых события:
      load – происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой, например 404.
      error – когда запрос не может быть выполнен, например, нет соединения или невалидный URL.
      progress – происходит периодически во время загрузки ответа, сообщает о прогрессе.

     xhr.onload = function() {
       alert(`Загружено: ${xhr.status} ${xhr.response}`);
     };

    xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
      alert(`Ошибка соединения`);
    };

    xhr.onprogress = function(event) { // запускается периодически
      // event.loaded - количество загруженных байт
      // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
      // event.total - количество байт всего (только если lengthComputable равно true)
      alert(`Загружено ${event.loaded} из ${event.total}`);
    };


  URL с параметрами

    let url = new URL('https://google.com/search');
    url.searchParams.set('q', 'test me!');

    // параметр 'q' закодирован
    xhr.open('GET', url); // https://google.com/search?q=test+me%21


  Тип ответа

  Мы можем использовать свойство xhr.responseType, чтобы указать ожидаемый тип ответа:
    "" (по умолчанию) – строка,
    "text" – строка,
    "arraybuffer" – ArrayBuffer (для бинарных данных, смотрите в ArrayBuffer, бинарные массивы),
    "blob" – Blob (для бинарных данных, смотрите в Blob),
    "document" – XML-документ (может использовать XPath и другие XML-методы),
    "json" – JSON (парсится автоматически).

  let xhr = new XMLHttpRequest();

  xhr.open('GET', '/article/xmlhttprequest/example/json');

  xhr.responseType = 'json';

  xhr.send();

  // тело ответа {"сообщение": "Привет, мир!"}
  xhr.onload = function() {
    let responseObj = xhr.response;
    alert(responseObj.message); // Привет, мир!
  };


  Состояния запроса

  Текущее состояние можно посмотреть в свойстве xhr.readyState.
    UNSENT = 0; // исходное состояние
    OPENED = 1; // вызван метод open
    HEADERS_RECEIVED = 2; // получены заголовки ответа
    LOADING = 3; // ответ в процессе передачи (данные частично получены)
    DONE = 4; // запрос завершён

  Состояния объекта XMLHttpRequest меняются в таком порядке: 0 → 1 → 2 → 3 → … → 3 → 4.
  Состояние 3 повторяется каждый раз, когда получена часть данных.

  Изменения в состоянии объекта запроса генерируют событие readystatechange:
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 3) {
        // загрузка
      }
      if (xhr.readyState == 4) {
        // запрос завершён
      }
    };

  Отмена запроса

  Если мы передумали делать запрос, можно отменить его вызовом xhr.abort()
  При этом генерируется событие abort, а xhr.status устанавливается в 0.



  Синхронные запросы

  Если в методе open третий параметр async установлен на false, запрос выполняется синхронно.
  Другими словами, выполнение JavaScript останавливается на send() и возобновляется после получения ответа.
  Так ведут себя, например, функции alert или prompt

  let xhr = new XMLHttpRequest();

    xhr.open('GET', '/article/xmlhttprequest/hello.txt', false);

    try {
      xhr.send();
      if (xhr.status != 200) {
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      } else {
        alert(xhr.response);
      }
    } catch(err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
      alert("Запрос не удался");
    }


  HTTP-заголовки

  Для работы с HTTP-заголовками есть 3 метода:
    xhr.setRequestHeader('Content-Type', 'application/json'); Ещё одной особенностью XMLHttpRequest является то, что отменить setRequestHeader невозможно.
    xhr.getResponseHeader('Content-Type')
    getAllResponseHeaders()
      Возвращает все заголовки ответа, кроме Set-Cookie и Set-Cookie2.
      Заголовки возвращаются в виде единой строки, например:
        Cache-Control: max-age=31536000
        Content-Length: 4260
        Content-Type: image/png
        Date: Sat, 08 Sep 2012 16:53:16 GMT
      let headers = xhr
        .getAllResponseHeaders()
        .split('\r\n')
        .reduce((result, current) => {
          let [name, value] = current.split(': ');
          result[name] = value;
          return result;
        }, {});

      // headers['Content-Type'] = 'image/png'


  POST, FormData
  xhr.send(formData) – отсылаем форму серверу.


  Прогресс отправки

  Событие progress срабатывает только на стадии загрузки ответа с сервера.
  Существует другой объект, без методов, только для отслеживания событий отправки: xhr.upload.

  Он генерирует события, похожие на события xhr, но только во время отправки данных на сервер:
    loadstart – начало загрузки данных.
    progress – генерируется периодически во время отправки на сервер.
    abort – загрузка прервана.
    error – ошибка, не связанная с HTTP.
    load – загрузка успешно завершена.
    timeout – вышло время, отведённое на загрузку (при установленном свойстве timeout).
    loadend – загрузка завершена, вне зависимости от того, как – успешно или нет.

  function upload(file) {
    let xhr = new XMLHttpRequest();

    // отслеживаем процесс отправки
    xhr.upload.onprogress = function(event) {
      console.log(`Отправлено ${event.loaded} из ${event.total}`);
    };

    // Ждём завершения: неважно, успешного или нет
    xhr.onloadend = function() {
      if (xhr.status == 200) {
        console.log("Успех");
      } else {
        console.log("Ошибка " + this.status);
      }
    };

    xhr.open("POST", "/article/xmlhttprequest/post/upload");
    xhr.send(file);
  }



  Запросы на другой источник
  xhr.withCredentials = true;

 */
let xhr = new XMLHttpRequest(); // у конструктора нет аргументов


