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

