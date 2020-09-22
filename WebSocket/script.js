/*
  Протокол WebSocket («веб-сокет»), описанный в спецификации RFC 6455, обеспечивает возможность обмена данными
  между браузером и сервером через постоянное соединение. Данные передаются по нему в обоих направлениях
  в виде «пакетов», без разрыва соединения и дополнительных HTTP-запросов.

  Также существует протокол wss://, использующий шифрование. Это как HTTPS для веб-сокетов.

  Как только объект WebSocket создан, мы должны слушать его события. Их всего 4:
    open – соединение установлено,
    message – получены данные,
    error – ошибка,
    close – соединение закрыто.

 */

/*

  Вот пример заголовков для запроса, который делает new WebSocket("wss://javascript.info/chat").
    GET /chat
    Host: javascript.info
    Origin: https://javascript.info
    Connection: Upgrade
    Upgrade: websocket
    Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
    Sec-WebSocket-Version: 13

  Origin – источник текущей страницы (например https://javascript.info). Объект WebSocket по своей природе не завязан на текущий источник. Нет никаких специальных заголовков или других ограничений. Старые сервера все равно не могут работать с WebSocket, поэтому проблем с совместимостью нет. Но заголовок Origin важен, так как он позволяет серверу решать, использовать ли WebSocket с этим сайтом.
  Connection: Upgrade – сигнализирует, что клиент хотел бы изменить протокол.
  Upgrade: websocket – запрошен протокол «websocket».
  Sec-WebSocket-Key – случайный ключ, созданный браузером для обеспечения безопасности.
  Sec-WebSocket-Version – версия протокола WebSocket, текущая версия 13.

  Если сервер согласен переключиться на WebSocket, то он должен отправить в ответ код 101:
    101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=

  Здесь Sec-WebSocket-Accept – это Sec-WebSocket-Key, перекодированный с помощью специального алгоритма.
  Браузер использует его, чтобы убедиться, что ответ соответствует запросу.




  Расширения и подпротоколы

  Могут быть дополнительные заголовки Sec-WebSocket-Extensions и Sec-WebSocket-Protocol, описывающие расширения и подпротоколы.
  Например:
    Sec-WebSocket-Extensions: deflate-frame означает, что браузер поддерживает сжатие данных.
      Расширение – это что-то, связанное с передачей данных, расширяющее сам протокол WebSocket.
      Заголовок Sec-WebSocket-Extensions отправляется браузером автоматически со списком всевозможных расширений, которые он поддерживает.

    Sec-WebSocket-Protocol: soap, wamp означает, что мы будем передавать не только произвольные данные,
      но и данные в протоколах SOAP или WAMP (The WebSocket Application Messaging Protocol" – «протокол обмена
      сообщениями WebSocket приложений»). То есть, этот заголовок описывает не передачу, а формат данных,
      который мы собираемся использовать. Официальные подпротоколы WebSocket регистрируются в каталоге IANA.

  let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
  Например, запрос:
    GET /chat
    Host: javascript.info
    Upgrade: websocket
    Connection: Upgrade
    Origin: https://javascript.info
    Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
    Sec-WebSocket-Version: 13
    Sec-WebSocket-Extensions: deflate-frame
    Sec-WebSocket-Protocol: soap, wamp

  Ответ:
    101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
    Sec-WebSocket-Extensions: deflate-frame
    Sec-WebSocket-Protocol: soap



  Передача данных

  Поток данных в WebSocket состоит из «фреймов», фрагментов данных, которые могут быть отправлены любой стороной, и которые могут быть следующих видов:
    «текстовые фреймы» – содержат текстовые данные, которые стороны отправляют друг другу.
    «бинарные фреймы» – содержат бинарные данные, которые стороны отправляют друг другу.
    «пинг-понг фреймы» используется для проверки соединения; отправляется с сервера, браузер реагирует на них автоматически.
    также есть «фрейм закрытия соединения» и некоторые другие служебные фреймы.

  Вызов socket.send(body) принимает body в виде строки или любом бинарном формате включая Blob, ArrayBuffer и другие.
  Дополнительных настроек не требуется, просто отправляем в любом формате.

  При получении данных, текст всегда поступает в виде строки.
  А для бинарных данных мы можем выбрать один из двух форматов: Blob или ArrayBuffer.

  socket.bufferType = "arraybuffer";
  socket.onmessage = (event) => {
    // event.data является строкой (если текст) или arraybuffer (если двоичные данные)
  };



  Закрытие подключения

  socket.close([code], [reason]);
    code – специальный WebSocket-код закрытия (не обязателен).
    reason – строка с описанием причины закрытия (не обязательна).

  Наиболее распространённые значения:
    1000 – по умолчанию, нормальное закрытие,
    1006 – невозможно установить такой код вручную, указывает, что соединение было потеряно (нет фрейма закрытия).
    Есть и другие коды:

    1001 – сторона отключилась, например сервер выключен или пользователь покинул страницу,
    1009 – сообщение слишком большое для обработки,
    1011 – непредвиденная ошибка на сервере,
    …и так далее.

  // закрывающая сторона:
  socket.close(1000, "работа закончена");

  // другая сторона:
  socket.onclose = event => {
    // event.code === 1000
    // event.reason === "работа закончена"
    // event.wasClean === true (закрыто чисто)
  };




  Состояние соединения

  Чтобы получить состояние соединения, существует дополнительное свойство socket.readyState со значениями:
    0 – «CONNECTING»: соединение ещё не установлено,
    1 – «OPEN»: обмен данными,
    2 – «CLOSING»: соединение закрывается,
    3 – «CLOSED»: соединение закрыто.


 */

// Пример чата

let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// отправка сообщения из формы
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// получение сообщения - отобразить данные в div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}

