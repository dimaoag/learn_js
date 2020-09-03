/*
  Модуль – это просто файл. Один скрипт – это один модуль.

  Модули могут загружать друг друга и использовать директивы export и import,
  чтобы обмениваться функциональностью, вызывать функции одного модуля из другого:
    - export отмечает переменные и функции, которые должны быть доступны вне текущего модуля.
    - import позволяет импортировать функциональность из других модулей.

  Каждый модуль имеет свою собственную область видимости.
  Другими словами, переменные и функции, объявленные в модуле, не видны в других скриптах.

  Код в модуле выполняется только один раз при импорте.

  // 📁 admin.js
      export let admin = {
        name: "John"
      };

  // 📁 1.js
      import {admin} from './admin.js';
      admin.name = "Pete";

  // 📁 2.js
      import {admin} from './admin.js';
      alert(admin.name); // Pete

  // Оба файла, 1.js и 2.js, импортируют один и тот же объект
  // Изменения, сделанные в 1.js, будут видны в 2.js

  Ещё раз заметим – модуль выполняется только один раз. Генерируется экспорт и после передаётся всем импортёрам,
  поэтому, если что-то изменится в объекте admin, то другие модули тоже увидят эти изменения.

  В модуле «this» не определён
  В модуле на верхнем уровне this не определён (undefined).
  Сравним с не-модульными скриптами, там this – глобальный объект.


  Модули являются отложенными (deferred)
  Модули всегда выполняются в отложенном (deferred) режиме, точно так же, как скрипты с атрибутом defer
  загрузка внешних модулей, таких как <script type="module" src="...">, не блокирует обработку HTML.
  модули, даже если загрузились быстро, ожидают полной загрузки HTML документа, и только затем выполняются.


  При использовании модулей нам стоит иметь в виду, что HTML-страница будет показана браузером до того,
  как выполнятся модули и JavaScript-приложение будет готово к работе. Некоторые функции могут ещё не работать.
  Нам следует разместить «индикатор загрузки» или что-то ещё, чтобы не смутить этим посетителя.

  Атрибут async работает во встроенных скриптах

  <!-- загружаются зависимости (analytics.js) и скрипт запускается -->
  <!-- модуль не ожидает загрузки документа или других тэгов <script> -->
  <script async type="module">
    import {counter} from './analytics.js';

    counter.count();
  </script>


  // Внешние скрипты

  Внешний скрипт, который загружается с другого домена, требует указания заголовков CORS.
  Другими словами, если модульный скрипт загружается с другого домена, то удалённый сервер должен установить
  заголовок Access-Control-Allow-Origin означающий, что загрузка скрипта разрешена.

  <!-- another-site.com должен указать заголовок Access-Control-Allow-Origin -->
  <!-- иначе, скрипт не выполнится -->
  <script type="module" src="http://another-site.com/their.js"></script>


  Не допускаются «голые» модули
  import {sayHi} from 'sayHi'; // Ошибка, "голый" модуль
  // путь должен быть, например './sayHi.js' или абсолютный

  // экспорт массива
  export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // экспорт константы
  export const MODULES_BECAME_STANDARD_YEAR = 2015;

  // экспорт класса
  export class User {
    constructor(name) {
      this.name = name;
    }
  }



  // 📁 say.js
  function sayHi(user) {
    alert(`Hello, ${user}!`);
  }

  function sayBye(user) {
    alert(`Bye, ${user}!`);
  }

  export {sayHi, sayBye}; // список экспортируемых переменных


  // 📁 main.js
  import {sayHi, sayBye} from './say.js';

  sayHi('John'); // Hello, John!
  sayBye('John'); // Bye, John!

  // 📁 main.js
  import * as say from './say.js';

  say.sayHi('John');
  say.sayBye('John');


  // 📁 say.js
  ...
  export {sayHi as hi, sayBye as bye};


    // 📁 main.js
  import {sayHi as hi, sayBye as bye} from './say.js';

  hi('John'); // Hello, John!
  bye('John'); // Bye, John!



  // 📁 user.js
  export default class User { // просто добавьте "default"
    constructor(name) {
      this.name = name;
    }
  }
  // 📁 main.js
  import User from './user.js'; // не {User}, просто User
  new User('John');


  Обратите внимание, что инструкции import/export не работают внутри {...}


  // Выражение import()

  Выражение import(module) загружает модуль и возвращает промис,
  результатом которого становится объект модуля, содержащий все его экспорты.

  let modulePath = prompt("Какой модуль загружать?");

  import(modulePath)
    .then(obj => <объект модуля>)
    .catch(err => <ошибка загрузки, например если нет такого модуля>)



    // 📁 say.js
    export function hi() {
      alert(`Привет`);
    }

    export function bye() {
      alert(`Пока`);
    }

    let {hi, bye} = await import('./say.js');
    hi();
    bye();


 */

import {sayHi} from './sayHi.js';

sayHi('John'); // Hello, John!


