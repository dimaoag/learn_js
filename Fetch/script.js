/*
  let promise = fetch(url, [options])
  Без options это простой GET-запрос, скачивающий содержимое по адресу url.

  Процесс получения ответа обычно происходит в два этапа:
    - Во-первых, promise выполняется с объектом встроенного класса Response в качестве результата, как только сервер пришлёт заголовки ответа.
        Промис завершается с ошибкой, если fetch не смог выполнить HTTP-запрос,
        например при ошибке сети или если нет такого сайта. HTTP-статусы 404 и 500 не являются ошибкой.

        Мы можем увидеть HTTP-статус в свойствах ответа:
          status – код статуса HTTP-запроса, например 200.
          ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299.

    - Во-вторых, для получения тела ответа нам нужно использовать дополнительный вызов метода.
      Response предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:
        response.text() – читает ответ и возвращает как обычный текст,
        response.json() – декодирует ответ в формате JSON,
        response.formData() – возвращает ответ как объект FormData (разберём его в следующей главе),
        response.blob() – возвращает объект как Blob (бинарные данные с типом),
        response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных),
        помимо этого, response.body – это объект ReadableStream, с помощью которого можно считывать тело запроса по частям.
 */

fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => console.log(commits[0].author.login))


fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(function (response){
    // получить один заголовок
    console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8

    // перебрать все заголовки
    for (let [key, value] of response.headers) {
      console.log(`${key} = ${value}`);
    }
  });

/*
  FormData

  let formData = new FormData([form]);
  Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля.
  Его особенность заключается в том, что методы для работы с сетью, например fetch,
    позволяют указать объект FormData в свойстве тела запроса body.

  Методы объекта FormData:
    formData.append(name, value) – добавляет к объекту поле с именем name и значением value,
    formData.append(name, blob, fileName) – добавляет поле, как будто в форме имеется элемент <input type="file">, третий аргумент fileName устанавливает имя файла (не имя поля формы), как будто это имя из файловой системы пользователя,
    formData.delete(name) – удаляет поле с заданным именем name,
    formData.get(name) – получает значение поля с именем name,
    formData.has(name) – если существует поле с именем name, то возвращает true, иначе false

  Ещё существует метод set, его синтаксис такой же, как у append. Разница в том,
  что .set удаляет все уже имеющиеся поля с именем name и только затем добавляет новое.
  То есть этот метод гарантирует, что будет существовать только одно поле с именем name, в остальном он аналогичен .append:
    formData.set(name, value),
    formData.set(name, blob, fileName).
 */

formElem.onsubmit = async (e) => {
  e.preventDefault();

  let response = await fetch('/article/formdata/post/user', {
    method: 'POST',
    body: new FormData(formElem)
  });

  let result = await response.json();

  alert(result.message);
};

/*
  Отправка формы с Blob-данными
 */

canvasElem.onmousemove = function(e) {
  let ctx = canvasElem.getContext('2d');
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
};

async function submit() {
  let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

  let formData = new FormData();
  formData.append("firstName", "John");
  formData.append("image", imageBlob, "image.png");

  let response = await fetch('/article/formdata/post/image-form', {
    method: 'POST',
    body: formData
  });
  let result = await response.json();
  alert(result.message);
}


/*
  Fetch: ход загрузки


 */

// Шаг 1: начинаем загрузку fetch, получаем поток для чтения
async function loader() {
  let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

  const reader = response.body.getReader();

// Шаг 2: получаем длину содержимого ответа
  const contentLength = +response.headers.get('Content-Length');


// Шаг 3: считываем данные:
  let receivedLength = 0; // количество байт, полученных на данный момент
  let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
  while(true) {
    const {done, value} = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    console.log(`Получено ${receivedLength} из ${contentLength}`)
  }

// Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
  let chunksAll = new Uint8Array(receivedLength); // (4.1)
  let position = 0;
  for(let chunk of chunks) {
    chunksAll.set(chunk, position); // (4.2)
    position += chunk.length;
  }

// Шаг 5: декодируем Uint8Array обратно в строку
  let result = new TextDecoder("utf-8").decode(chunksAll);

// Готово!
  let commits = JSON.parse(result);
  alert(commits[0].author.login);
}

loader();

/*
  Fetch: запросы на другие сайты

  Ключевым понятием здесь является источник (origin) – комбинация домен/порт/протокол.
  Запросы на другой источник – отправленные на другой домен (или даже поддомен), или протокол,
  или порт – требуют специальных заголовков от удалённой стороны.

  Эта политика называется «CORS»: Cross-Origin Resource Sharing («совместное использование ресурсов между разными источниками»).

  Есть два вида запросов на другой источник:
    Простые.
    Все остальные.

  Простой запрос – это запрос, удовлетворяющий следующим условиям:
    Простой метод: GET, POST или HEAD
    Простые заголовки – разрешены только:
      Accept,
      Accept-Language,
      Content-Language,
      Content-Type со значением application/x-www-form-urlencoded, multipart/form-data или text/plain.

  Принципиальное отличие между ними состоит в том, что «простой запрос» может быть сделан через <form> или <script>,
  без каких-то специальных методов.

  CORS для простых запросов
  При запросе на другой источник браузер всегда ставит «от себя» заголовок Origin.
  Например, если мы запрашиваем https://anywhere.com/request со страницы https://javascript.info/page, заголовки будут такими:
    GET /request
    Host: anywhere.com
    Origin: https://javascript.info
    ...

  Сервер может проверить Origin и, если он согласен принять такой запрос, добавить особый заголовок Access-Control-Allow-Origin к ответу.
  Этот заголовок должен содержать разрешённый источник (в нашем случае https://javascript.info) или звёздочку *.
  Тогда ответ успешен, в противном случае возникает ошибка.

  Вот пример ответа сервера, который разрешает доступ:
    200 OK
    Content-Type:text/html; charset=UTF-8
    Access-Control-Allow-Origin: https://javascript.info


  Заголовки ответа
  По умолчанию при запросе к другому источнику JavaScript может получить доступ только к так называемым «простым» заголовкам ответа:
    Cache-Control
    Content-Language
    Content-Type
    Expires
    Last-Modified
    Pragma

  Обратите внимание: нет Content-Length
  Чтобы разрешить JavaScript доступ к любому другому заголовку ответа, сервер должен указать заголовок Access-Control-Expose-Headers.
  Он содержит список, через запятую, заголовков, которые не являются простыми, но доступ к которым разрешён.

  200 OK
  Content-Type:text/html; charset=UTF-8
  Content-Length: 12345
  API-Key: 2c9de507f2c54aa1
  Access-Control-Allow-Origin: https://javascript.info
  Access-Control-Expose-Headers: Content-Length,API-Key


  «Непростые» запросы
  Предварительный запрос использует метод OPTIONS, у него нет тела, но есть два заголовка:
    Access-Control-Request-Method содержит HTTP-метод «непростого» запроса.
    Access-Control-Request-Headers предоставляет разделённый запятыми список его «непростых» HTTP-заголовков.

  Если сервер согласен принимать такие запросы, то он должен ответить без тела, со статусом 200 и с заголовками:
    Access-Control-Allow-Methods должен содержать разрешённые методы.
    Access-Control-Allow-Headers должен содержать список разрешённых заголовков.
    Кроме того, заголовок Access-Control-Max-Age может указывать количество секунд, на которое нужно кешировать разрешения.
      Так что браузеру не придётся посылать предзапрос для последующих запросов, удовлетворяющих данным разрешениям.

  примере PATCH запроса

  let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
    'API-Key': 'secret'
  }

  Шаг 1 (предзапрос)

    OPTIONS /service.json
    Host: site.com
    Origin: https://javascript.info
    Access-Control-Request-Method: PATCH
    Access-Control-Request-Headers: Content-Type,API-Key

  Шаг 2 (ответ сервера на предзапрос)

    200 OK
    Access-Control-Allow-Methods: PUT,PATCH,DELETE
    Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
    Access-Control-Max-Age: 86400

    Кроме того, ответ на предзапрос кешируется на время, указанное в заголовке Access-Control-Max-Age (86400 секунд, один день),
    так что последующие запросы не вызовут предзапрос.

  Шаг 3 (основной запрос)

    PATCH /service.json
    Host: site.com
    Content-Type: application/json
    API-Key: secret
    Origin: https://javascript.info

  Шаг 4 (основной ответ)

    200 OK
    Access-Control-Allow-Origin: https://javascript.info

  Предзапрос осуществляется «за кулисами», невидимо для JavaScript.
  JavaScript получает только ответ на основной запрос или ошибку, если со стороны сервера нет разрешения.

  Чтобы включить отправку авторизационных данных в fetch, нам нужно добавить опцию credentials: "include", вот так:
    fetch('http://another.com', {
      credentials: "include"
    });

  Теперь fetch пошлёт куки с домена another.com вместе с нашим запросом на этот сайт.
  Если сервер согласен принять запрос с авторизационными данными, он должен добавить заголовок
  Access-Control-Allow-Credentials: true к ответу, в дополнение к Access-Control-Allow-Origin.

  Пожалуйста, обратите внимание: в Access-Control-Allow-Origin запрещено использовать звёздочку * для запросов с авторизационными данными.
});
 */


/*

  Объекты URL

  new URL(url, [base])
    url – полный URL-адрес или только путь, если указан второй параметр,
    base – необязательный «базовый» URL: если указан и аргумент url содержит только путь, то адрес будет создан относительно него (пример ниже).

  Свойства:
    href это полный URL-адрес, то же самое, что url.toString()
    protocol – протокол, заканчивается символом двоеточия https:
    search строка параметров, начинается с вопросительного знака ?sort=2
    hash начинается с символа #id

 */

let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

console.log(url1); // https://javascript.info/profile/admin
console.log(url2); // https://javascript.info/profile/admin

// Можно легко создать новый URL по пути относительно существующего URL-адреса:
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

console.log(newUrl); // https://javascript.info/profile/tester
console.log(newUrl.protocol); // https:
console.log(newUrl.host);     // javascript.info
console.log(newUrl.pathname); // /profile/tester

/*
  SearchParams «?…»

  Так что для этого есть свойство url.searchParams – объект типа URLSearchParams.

  Он предоставляет удобные методы для работы с параметрами:
    append(name, value) – добавить параметр по имени,
    delete(name) – удалить параметр по имени,
    get(name) – получить параметр по имени,
    getAll(name) – получить все параметры с одинаковым именем name (такое возможно, например: ?user=John&user=Pete),
    has(name) – проверить наличие параметра по имени,
    set(name, value) – задать/заменить параметр,
    sort() – отсортировать параметры по имени, используется редко,
    …и является перебираемым, аналогично Map.
 */

url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!'); // добавим параметр, содержащий пробел и !

console.log(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // параметр с двоеточием :

// параметры автоматически кодируются
console.log(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// перебрать параметры (в исходном виде)
for(let [name, value] of url.searchParams) {
  console.log(`${name}=${value}`); // q=test me!, далее tbs=qdr:y
}

/*
  Для этого есть встроенные функции:
    encodeURI – кодирует URL-адрес целиком.
    decodeURI – декодирует URL-адрес целиком.
    encodeURIComponent – кодирует компонент URL, например, параметр, хеш, имя пути и т.п.
    decodeURIComponent – декодирует компонент URL.

  encodeURI кодирует только символы, полностью запрещённые в URL.
  encodeURIComponent кодирует эти же символы плюс, в дополнение к ним, символы #, $, &, +, ,, /, :, ;, =, ? и @.
 */

url = encodeURI('http://site.com/привет');
console.log(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82

let music = encodeURIComponent('Rock&Roll');
url = `https://google.com/search?q=${music}`;
console.log(url); // https://google.com/search?q=Rock%26Roll

