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
