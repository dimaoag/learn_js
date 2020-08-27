// callback
{
    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => callback(script);
        document.head.append(script);
    }

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
        console.log(`Здорово, скрипт ${script.src} загрузился`);
        console.log( _ ); // функция, объявленная в загруженном скрипте
    });


    // Колбэк в колбэке

    /*
        loadScript('/my/script.js', function(script) {
            console.log(`Здорово, скрипт ${script.src} загрузился, загрузим ещё один`);

            loadScript('/my/script2.js', function(script) {
                console.log(`Здорово, второй скрипт загрузился`);
            });
        });
     */

}
// Promise
{
    /*
        Когда он получает результат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:

            resolve(value) — если работа завершилась успешно, с результатом value.
            reject(error) — если произошла ошибка, error – объект ошибки.

        У объекта promise, возвращаемого конструктором new Promise, есть внутренние свойства:

            state   («состояние») — вначале "pending" («ожидание»), потом меняется на "fulfilled"
                    («выполнено успешно») при вызове resolve или на "rejected" («выполнено с ошибкой») при вызове reject.
            result  («результат») — вначале undefined, далее изменяется на value при вызове resolve(value)
                    или на error при вызове reject(error).
     */
    let promise = new Promise(function(resolve, reject) {
        // функция-исполнитель (executor)
        // "певец"
    });
}
// resolve
{
    let promise = new Promise(function(resolve, reject) {
        // эта функция выполнится автоматически, при вызове new Promise

        // через 1 секунду сигнализировать, что задача выполнена с результатом "done"
        setTimeout(() => resolve("done"), 1000);
    });

    // resolve запустит первую функцию, переданную в .then
    promise.then(
        result => console.log(result), // выведет "done!" через одну секунду
        error => console.log(error) // не будет запущена
    );
}
// reject
{
    let promise = new Promise(function(resolve, reject) {
        // спустя одну секунду будет сообщено, что задача выполнена с ошибкой
        setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

    // reject запустит вторую функцию, переданную в .then
    promise.then(
        result => console.log(result), // не будет запущена
        error => console.log(error) // выведет "Error: Whoops!" спустя одну секунду
    );
}
// .then
{

    let promise = new Promise(resolve => {
        setTimeout(() => resolve("done2!"), 1000);
    });

    promise.then(
        function(result) { /* обработает успешное выполнение */ },
        function(error) { /* обработает ошибку */ }
    );

    promise.then(console.log); // выведет "done2!" спустя одну секунду
}
// .catch
{
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Ошибка!")), 1000);
    });

    // .catch(f) это тоже самое, что promise.then(null, f)
    promise.catch(console.log); // выведет "Error: Ошибка!" спустя одну секунду
}
// .finally
{
    /*
        - Обработчик, вызываемый из finally, не имеет аргументов
        - Обработчик finally «пропускает» результат или ошибку дальше, к последующим обработчикам

     */
    new Promise((resolve, reject) => {
        setTimeout(() => resolve("result"), 2000)
    })
        .finally(() => console.log("Промис завершён"))
        .then(result => console.log(result));
}

// test
{
    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

            document.head.append(script);
        });
    }

    let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

    promise.then(
        script => console.log(`${script.src} загружен!`),
        error => console.log(`Ошибка: ${error.message}`)
    );



    promise.then(script => console.log('Ещё один обработчик...'));
}
{
    function delay(ms) {
        return new Promise(function(resolve, reject) {
            return setTimeout(() => resolve(), ms)
        });
    }

    delay(3000).then(() => console.log('выполнилось через 3 секунды'));
}

// Цепочка промисов
{
    /*
        loadScript("/article/promise-chaining/one.js")
            .then(script => loadScript("/article/promise-chaining/two.js"))
            .then(script => loadScript("/article/promise-chaining/three.js"))
            .then(script => {
                // скрипты загружены, мы можем использовать объявленные в них функции
                one();
                two();
                three();
        });

    ============================================================

      function loadJson(url) {
          return fetch(url)
              .then(response => response.json());
      }

      function loadGithubUser(name) {
          return fetch(`https://api.github.com/users/${name}`)
              .then(response => response.json());
      }

      function showAvatar(githubUser) {
          return new Promise(function(resolve, reject) {
              let img = document.createElement('img');
              img.src = githubUser.avatar_url;
              img.className = "promise-avatar-example";
              document.body.append(img);

              setTimeout(() => {
                  img.remove();
                  resolve(githubUser);
              }, 3000);
          });
      }

      // Используем их:
      loadJson('/article/promise-chaining/user.json')
          .then(user => loadGithubUser(user.name))
          .then(showAvatar)
          .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));
      // ...

     */
}

// обработка ошибок
{
  fetch('https://no-such-server.blabla') // ошибка
    .then(response => response.json())
    .catch(err => console.log(err)) // TypeError: failed to fetch (текст может отличаться)
}
{
  // Самый лёгкий путь перехватить все ошибки – это добавить .catch в конец цепочки:
  fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);

      setTimeout(() => {
        img.remove();
        resolve(githubUser);
      }, 3000);
    }))
    .catch(error => console.log(error.message));
}

// Неявный try…catch
{
  /*
    "Невидимый try..catch" вокруг промиса автоматически перехватывает ошибку и превращает её в отклонённый промис.


   */
  new Promise((resolve, reject) => {
    throw new Error("Ошибка1!");
  }).catch(console.log); // Error: Ошибка!

  // …Работает так же, как и этот:
  new Promise((resolve, reject) => {
    reject(new Error("Ошибка2!"));
  }).catch(console.log); // Error: Ошибка!

  new Promise((resolve, reject) => {
    resolve("ок");
  }).then((result) => {
    throw new Error("Ошибка3!"); // генерируем ошибку
  }).catch(console.log); // Error: Ошибка!
}

// Пробрасывание ошибок
{
  // the execution: catch -> then
  new Promise((resolve, reject) => {

    throw new Error("Ошибка4!");

  }).catch(function(error) {

    console.log("Ошибка обработана, продолжить работу");

  }).then(() => console.log("Управление перейдёт в следующий then"));
}

// the execution: catch -> catch -> then
{
  new Promise((resolve, reject) => {

    throw new Error("Ошибка5!");

  }).catch(function(error) { // (*)

    if (error instanceof URIError) {
      // обрабатываем ошибку
    } else {
      console.log("Не могу обработать ошибку");

      throw error; // пробрасывает эту или другую ошибку в следующий catch
    }

  }).then(function() {
    /* не выполнится */
  }).catch(error => { // (**)

    console.log(`Неизвестная ошибка: ${error}`);
    // ничего не возвращаем => выполнение продолжается в нормальном режиме
  });
}

// Promise.all([promises])
{
  Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
  ]).then(console.log); // когда все промисы выполнятся, результат будет 1,2,3
// каждый промис даёт элемент массива
}
{
  let names = ['iliakan', 'remy', 'jeresig'];

  let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

  Promise.all(requests)
    .then(responses => {
      // все промисы успешно завершены
      for(let response of responses) {
        console.log(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
      }

      return responses;
    })
    // преобразовать массив ответов response в response.json(),
    // чтобы прочитать содержимое каждого
    .then(responses => Promise.all(responses.map(r => r.json())))
    // все JSON-ответы обработаны, users - массив с результатами
    .then(users => users.forEach(user => console.log(user.name)));
}
{
  /*
    Если любой из промисов завершится с ошибкой, то промис, возвращённый Promise.all, немедленно завершается с этой ошибкой.

    В случае ошибки, остальные результаты игнорируются
    Например, если сделано несколько вызовов fetch, как в примере выше, и один не прошёл,
    то остальные будут всё ещё выполняться, но Promise.all за ними уже не смотрит. Скорее всего,
    они так или иначе завершатся, но их результаты будут проигнорированы.

    Promise.all(iterable) разрешает передавать не-промисы в iterable (перебираемом объекте)
   */
  Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(11), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка7!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(33), 3000))
  ]).catch(console.log); // Error: Ошибка!
}

// Promise.allSettled([promises])
{
  /*
    Даже если в каком-то запросе ошибка, нас всё равно интересуют остальные.


   */

  let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
  ];

  Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
      results.forEach((result, num) => {
        if (result.status == "fulfilled") {
          console.log(`${urls[num]}: ${result.value.status}`);
        }
        if (result.status == "rejected") {
          console.log(`${urls[num]}: ${result.reason}`);
        }
      });
    });

  /*
    Массив results в строке (*) будет таким:

    [
      {status: 'fulfilled', value: ...объект ответа...},
      {status: 'fulfilled', value: ...объект ответа...},
      {status: 'rejected', reason: ...объект ошибки...}
    ]
   */
}

// Async/await
{
  /*
    async - функция всегда возвращает промис
   */
  async function f() {
    return 111;
  }

  f().then(console.log); // 111

  // результат будет одинаковым

  async function f2() {
    return Promise.resolve(111);
  }

  f2().then(console.log); // 111
}
// await - которое можно использовать только внутри async-функций
{
  /*
    // работает только внутри async–функций
    let value = await promise;

    заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится.

    await нельзя использовать на верхнем уровне вложенности


   */

  async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("123готово!"), 1000)
    });

    let result = await promise; // будет ждать, пока промис не выполнится (*)

    console.log(result); // "готово!"
  }

  f();
}
{
    async function showAvatar() {

      // запрашиваем JSON с данными пользователя
      let response = await fetch('/article/promise-chaining/user.json');
      let user = await response.json();

      // запрашиваем информацию об этом пользователе из github
      let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
      let githubUser = await githubResponse.json();

      // отображаем аватар пользователя
      let img = document.createElement('img');
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);

      // ждём 3 секунды и затем скрываем аватар
      await new Promise((resolve, reject) => setTimeout(resolve, 3000));

      img.remove();

      return githubUser;
    }

    showAvatar();
}

// Асинхронные методы классов
{
  class Waiter {
    async wait() {
      return await Promise.resolve(1);
    }
  }

  new Waiter()
    .wait()
    .then(console.log); // 1
}

// Обработка ошибок
{
  /*
   Когда промис завершается успешно, await promise возвращает результат.
   Когда завершается с ошибкой – будет выброшено исключение. Как если бы на этом месте находилось выражение throw.
   */

  async function f() {
    await Promise.reject(new Error("Упс!"));
  }

  // Делает тоже самое, что и такой:

  async function f2() {
    throw new Error("Упс!");
  }
}
{
  async function f() {

    try {
      let response = await fetch('/no-user-here');
      let user = await response.json();
    } catch(err) {
      // перехватит любую ошибку в блоке try: и в fetch, и в response.json
      alert(err);
    }
  }

  f();
}

