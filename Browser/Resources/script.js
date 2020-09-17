/*
  У жизненного цикла HTML-страницы есть три важных события:
    - DOMContentLoaded – браузер полностью загрузил HTML, было построено DOM-дерево, но внешние ресурсы, такие как картинки <img> и стили, могут быть ещё не загружены.
    - load – браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.).
    - beforeunload/unload – пользователь покидает страницу.


  DOMContentLoaded

  Событие DOMContentLoaded срабатывает на объекте document.

  Когда браузер обрабатывает HTML-документ и встречает тег <script>, он должен выполнить его перед тем, как продолжить строить DOM.
  Это делается на случай, если скрипт захочет изменить DOM или даже дописать в него (document.write), так что DOMContentLoaded должен подождать.

  Скрипты, которые не блокируют DOMContentLoaded
  Есть два исключения из этого правила:
     - Скрипты с атрибутом async, который мы рассмотрим немного позже, не блокируют DOMContentLoaded.
     - Скрипты, сгенерированные динамически при помощи document.createElement('script') и затем добавленные на страницу, также не блокируют это событие.

  Внешние таблицы стилей не затрагивают DOM, поэтому DOMContentLoaded их не ждёт.
  Но здесь есть подводный камень. Если после стилей у нас есть скрипт, то этот скрипт должен дождаться, пока загрузятся стили
 */

function ready() {
  // изображение ещё не загружено (если не было закешировано), так что размер будет 0x0
  console.log(`Размер изображения: ${img.offsetWidth}x${img.offsetHeight}`);
}

document.addEventListener("DOMContentLoaded", ready);

/*
  window.onload

  Событие load на объекте window наступает, когда загрузилась вся страница, включая стили, картинки и другие ресурсы.


 */

window.onload = function() {
  // к этому моменту страница загружена
  console.log(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
};

/*
  window.onunload

  Когда посетитель покидает страницу, на объекте window генерируется событие unload

  Для этого существует специальный метод navigator.sendBeacon(url, data), описанный в спецификации https://w3c.github.io/beacon/.
 */
let analyticsData = { /* объект с собранными данными */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
})

/*
  window.onbeforeunload

  Если посетитель собирается уйти со страницы или закрыть окно, обработчик beforeunload попросит дополнительное подтверждение.
 */

window.onbeforeunload = function() {
  return false;
};

/*
  readyState

  Свойство document.readyState показывает нам текущее состояние загрузки.

  Есть три возможных значения:
    "loading" – документ загружается.
    "interactive" – документ был полностью прочитан.
    "complete" – документ был полностью прочитан и все ресурсы (такие как изображения) были тоже загружены.
 */

function work() { console.log('work') }

if (document.readyState === 'loading') {
  // ещё загружается, ждём события
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM готов!
  work();
}

/*
  Также есть событие readystatechange, которое генерируется при изменении состояния
 */

// текущее состояние
console.log(document.readyState);

// вывести изменения состояния
document.addEventListener('readystatechange', () => console.log(document.readyState));

/*
  Типичный вывод:
    [1] начальный readyState:loading
    [2] readyState:interactive
    [2] DOMContentLoaded
    [3] iframe onload
    [4] img onload
    [4] readyState:complete
    [4] window onload
 */

