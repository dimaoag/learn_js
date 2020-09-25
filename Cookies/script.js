/*
  document.cookie

  Запись в document.cookie обновит только упомянутые в ней куки, но при этом не затронет все остальные.

  path=/mypath
    Если куки установлено с path=/admin, то оно будет доступно на страницах /admin и /admin/something, но не на страницах /home или /adminpage

  domain=site.com
    Однако, если мы всё же хотим дать поддоменам типа forum.site.com доступ к куки, это можно сделать.
    Достаточно при установке куки на сайте site.com в качестве значения опции domain указать корневой домен: domain=site.com:
    // находясь на странице site.com
    // сделаем куки доступным для всех поддоменов *.site.com:
    document.cookie = "user=John; domain=site.com"

  expires=Tue, 19 Jan 2038 03:14:07 GMT
    Дата истечения срока действия куки, когда браузер удалит его автоматически.
    Дата должна быть точно в этом формате, во временной зоне GMT. Мы можем использовать date.toUTCString, чтобы получить правильную дату.
    // +1 день от текущей даты
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = "user=John; expires=" + date;

  max-age=3600
    Альтернатива expires, определяет срок действия куки в секундах с текущего момента.
    Если задан ноль или отрицательное значение, то куки будет удалено:

  secure
    Куки следует передавать только по HTTPS-протоколу.
    По умолчанию куки, установленные сайтом http://site.com, также будут доступны на сайте https://site.com и наоборот.
    // предполагается, что сейчас мы на https://
    // установим опцию secure для куки (куки доступно только через HTTPS)
    document.cookie = "user=John; secure";

  httpOnly
    Эта настройка запрещает любой доступ к куки из JavaScript. Мы не можем видеть такое куки или манипулировать им с помощью document.cookie.

 */

document.cookie = "user=John"; // обновляем только куки с именем 'user'
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2021 03:14:07 GMT"
console.log(document.cookie)


// getCookie(name)
// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// setCookie(name, value, options)
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Пример использования:
setCookie('user', 'John', {secure: true, 'max-age': 3600});

// deleteCookie(name)

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
