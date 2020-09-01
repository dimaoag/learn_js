{
  /*
    Генераторы - Обычные функции возвращают только одно-единственное значение (или ничего).
    Генераторы могут порождать (yield) множество значений одно за другим, по мере необходимости.

    Функции-генераторы ведут себя не так, как обычные. Когда такая функция вызвана, она не выполняет свой код.
    Вместо этого она возвращает специальный объект, так называемый «генератор», для управления её выполнением.

   */

  function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
  }

  // "функция-генератор" создаёт объект "генератор"
  let generator = generateSequence();
  console.log(generator); // [object Generator]
}
// next()
{
  /*
    Основным методом генератора является next().
    При вызове он запускает выполнение кода до ближайшей инструкции yield <значение> (значение может отсутствовать,
    в этом случае оно предполагается равным undefined). По достижении yield выполнение функции приостанавливается,
    а соответствующее значение – возвращается во внешний код:

     Результатом метода next() всегда является объект с двумя свойствами:
      - value: значение из yield.
      - done: true, если выполнение функции завершено, иначе false.

   */

  function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
  }

  let generator = generateSequence();

  let one = generator.next();

  console.log(JSON.stringify(one)); // {value: 1, done: false}

  // Повторный вызов generator.next() возобновит выполнение кода и вернёт результат следующего yield:

  let two = generator.next();

  console.log(JSON.stringify(two)); // {value: 2, done: false}

  let three = generator.next();

  console.log(JSON.stringify(three)); // {value: 3, done: true}
}

// Перебор генераторов
{
  function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
  }

  let generator = generateSequence();

  for(let value of generator) {
    console.log(value); // 1, затем 2
  }

  /*
    …Но обратите внимание: пример выше выводит значение 1, затем 2. Значение 3 выведено не будет!
    Это из-за того, что перебор через for..of игнорирует последнее значение, при котором done: true.
    Поэтому, если мы хотим, чтобы были все значения при переборе через for..of, то надо возвращать их через yield:
   */

  function* generateSequence1() {
    yield 1;
    yield 2;
    yield 3;
  }

  let sequence = [0, ...generateSequence1()];

  console.log(sequence); // 0, 1, 2, 3
}
// Композиция генераторов – это особенная возможность генераторов, которая позволяет прозрачно «встраивать» генераторы друг в друга.
{
  /*
    Для генераторов есть особый синтаксис yield*, который позволяет «вкладывать» генераторы один в другой (осуществлять их композицию).

    Директива yield* делегирует выполнение другому генератору.
    Этот термин означает, что yield* gen перебирает генератор gen и прозрачно направляет его вывод наружу.
    Как если бы значения были сгенерированы внешним генератором.
   */
  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }

  function* generatePasswordCodes() {

    // 0..9
    yield* generateSequence(48, 57);

    // A..Z
    yield* generateSequence(65, 90);

    // a..z
    yield* generateSequence(97, 122);

  }

  let str = '';

  for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
  }

  console.log(str); // 0..9A..Za..z
}

// generator.next(arg)
{
  /*
      Всё дело в том, что yield – дорога в обе стороны: он не только возвращает результат наружу,
      но и может передавать значение извне в генератор.

      Чтобы это сделать, нам нужно вызвать generator.next(arg) с аргументом.
      Этот аргумент становится результатом yield.
   */

  function* gen() {
    // Передаём вопрос во внешний код и ожидаем ответа
    let result = yield "2 + 2 = ?"; // (*)

    console.log(result);
  }

  let generator = gen();

  let question = generator.next().value; // <-- yield возвращает значение

  console.log(question)
  generator.next(4); // --> передаём результат в генератор

  /*
    1)  Первый вызов generator.next() – всегда без аргумента, он начинает выполнение и возвращает результат первого yield "2+2=?".
        На этой точке генератор приостанавливает выполнение.

    2)  Затем, как показано на картинке выше, результат yield переходит во внешний код в переменную question.

    3)  При generator.next(4) выполнение генератора возобновляется, а 4 выходит из присваивания как результат: let result = 4.
   */
}
{
  function* gen() {
    let ask1 = yield "2 + 2 = ?";

    console.log(ask1); // 4

    let ask2 = yield "3 * 3 = ?"

    console.log(ask2); // 9
  }

  let generator = gen();

  console.log( generator.next().value ); // "2 + 2 = ?"

  console.log( generator.next(4).value ); // "3 * 3 = ?"

  console.log( generator.next(9).done ); // true
}
// generator.throw
{
  /*
    Для того, чтобы передать ошибку в yield, нам нужно вызвать generator.throw(err).
    В таком случае исключение err возникнет на строке с yield.

    Ошибка, которая проброшена в генератор на строке (2), приводит к исключению на строке (1) с yield.
   */
  function* gen() {
    try {
      let result = yield "2 + 2 = ?"; // (1)

      console.log("Выполнение программы не дойдёт до этой строки, потому что выше возникнет исключение");
    } catch(e) {
      console.log(e); // покажет ошибку
    }
  }

  let generator = gen();

  let question = generator.next().value;

  generator.throw(new Error("Ответ не найден в моей базе данных")); // (2)
}
// task
{
  function* pseudoRandom(seed) {
    let val = seed;

    while(true) {
      val = val * 16807 % 2147483647
      yield val;
    }

  }

  let generator = pseudoRandom(1);

  console.log(generator.next().value); // 16807
  console.log(generator.next().value); // 282475249
  console.log(generator.next().value); // 1622650073
}

// Асинхронные итераторы
{
  let range = {
    from: 1,
    to: 5,

    // for await..of вызывает этот метод один раз в самом начале
    [Symbol.asyncIterator]() { // (1)
      // ...возвращает объект-итератор:
      // далее for await..of работает только с этим объектом,
      // запрашивая у него следующие значения вызовом next()
      return {
        current: this.from,
        last: this.to,

        // next() вызывается на каждой итерации цикла for await..of
        async next() { // (2)
          // должен возвращать значение как объект {done:.., value :...}
          // (автоматически оборачивается в промис с помощью async)

          // можно использовать await внутри для асинхронности:
          await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };

  (async () => {

    for await (let value of range) { // (4)
      console.log(value); // 1,2,3,4,5
    }

  })()
  /*
    1)  Чтобы сделать объект асинхронно итерируемым, он должен иметь метод Symbol.asyncIterator (1).
    2)  Этот метод должен возвращать объект с методом next(), который в свою очередь возвращает промис (2).
    3)  Метод next() не обязательно должен быть async, он может быть обычным методом, возвращающим промис,
        но async позволяет использовать await, так что это удобно. Здесь мы просто делаем паузу на одну секунду (3).
    4)  Для итерации мы используем for await (let value of range) (4), добавляя «await» после «for».
        Он вызовет range[Symbol.asyncIterator]() один раз, а затем его метод next() для получения значений.
   */
}

// Асинхронные генераторы
{
  async function* generateSequence(start, end) {

    for (let i = start; i <= end; i++) {

      // ура, можно использовать await!
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield i;
    }

  }

  (async () => {

    let generator = generateSequence(1, 5);
    for await (let value of generator) {
      console.log(value); // 1, потом 2, потом 3, потом 4, потом 5
    }

  })();
}

// test
{
  async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;

    while (url) {
      const response = await fetch(url, { // (1)
        headers: {'User-Agent': 'Our script'}, // GitHub требует заголовок user-agent
      });

      const body = await response.json(); // (2) ответ в формате JSON (массив коммитов)

      // (3) Ссылка на следующую страницу находится в заголовках, извлекаем её
      let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
      nextPage = nextPage && nextPage[1];

      url = nextPage;

      for(let commit of body) { // (4) вернуть коммиты один за другим, до окончания страницы
        yield commit;
      }
    }
  }

  (async () => {

    let count = 0;

    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

      console.log(commit.author.login);

      if (++count === 100) { // остановимся на 100 коммитах
        break;
      }
    }

  })();
}
