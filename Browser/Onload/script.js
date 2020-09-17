/*
  Браузер позволяет отслеживать загрузку сторонних ресурсов: скриптов, ифреймов, изображений и др.
  Для этого существуют два события:
    load – успешная загрузка,
    error – во время загрузки произошла ошибка.


  script.onload

  Главный помощник – это событие load. Оно срабатывает после того, как скрипт был загружен и выполнен.

 */
let script = document.createElement('script');

// мы можем загрузить любой скрипт с любого домена
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

script.onload = function() {
  // в скрипте создаётся вспомогательная функция с именем "_"
  console.log(_); // функция доступна
};

/*
  Таким образом, в обработчике onload мы можем использовать переменные, вызывать функции и т.д., которые предоставляет нам сторонний скрипт.
 */

/*
  script.onerror

  Ошибки, которые возникают во время загрузки скрипта, могут быть отслежены с помощью события error.
 */

// script = document.createElement('script');
// script.src = "https://example.com/404.js"; // такого файла не существует
// document.head.append(script);
//
// script.onerror = function() {
//   console.log("Error loading " + this.src); // Ошибка загрузки https://example.com/404.js
// };


/*
    Другие ресурсы

    События load и error также срабатывают и для других ресурсов, а вообще, для любых ресурсов, у которых есть внешний src.

    Однако есть некоторые особенности:
      Большинство ресурсов начинают загружаться после их добавления в документ. За исключением тега <img>. Изображения начинают загружаться, когда получают src (*).
      Для <iframe> событие load срабатывает по окончании загрузки как в случае успеха, так и в случае ошибки.

 */

let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function() {
  console.log(`Изображение загружено, размеры ${img.width}x${img.height}`);
};

img.onerror = function() {
  console.log("Ошибка во время загрузки изображения");
};
