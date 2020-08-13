// Decorator
{
    function slow(x) {
        // здесь могут быть ресурсоёмкие вычисления
        console.log(`Called with ${x}`);
        return x;
    }

    function cachingDecorator(func) {
        let cache = new Map();

        return function(x) {
            if (cache.has(x)) {    // если кеш содержит такой x,
                return cache.get(x); // читаем из него результат
            }

            let result = func(x); // иначе, вызываем функцию

            cache.set(x, result); // и кешируем (запоминаем) результат
            return result;
        };
    }

    slow = cachingDecorator(slow);

    console.log( slow(1) ); // slow(1) кешируем
    console.log( "Again: " + slow(1) ); // возвращаем из кеша

    console.log( slow(2) ); // slow(2) кешируем
    console.log( "Again: " + slow(2) ); // возвращаем из кеша
}

//  func.call(context, …args) - который позволяет вызывать функцию, явно устанавливая ей this.
{
    function sayHi() {
        console.log(this.name);
    }

    let user = { name: "John" };
    let admin = { name: "Admin" };

    // используем 'call' для передачи различных объектов в качестве 'this'
    sayHi.call( user ); // John
    sayHi.call( admin ); // Admin

    function say(phrase) {
        console.log(this.name + ': ' + phrase);
    }

    let user2 = { name: "John" };

    // 'user' становится 'this', и "Hello" становится первым аргументом
    say.call( user2, "Hello" ); // John: Hello
}
// Decorator  with object
{
    let worker = {
        someMethod() {
            return 1;
        },

        slow(x) {
            console.log("Called with " + x);
            return x * this.someMethod(); // (*)
        }
    };

    function cachingDecorator(func) {
        let cache = new Map();
        return function(x) {
            if (cache.has(x)) {
                return cache.get(x);
            }
            let result = func.call(this, x); // теперь 'this' передаётся правильно
            cache.set(x, result);
            return result;
        };
    }

    worker.slow = cachingDecorator(worker.slow); // теперь сделаем её кеширующей

    console.log( worker.slow(2) ); // работает
    console.log( worker.slow(2) ); // работает, не вызывая первоначальную функцию (кешируется)
}
// more params
{
    let worker = {
        slow(min, max) {
            console.log(`Called with ${min},${max}`);
            return min + max;
        }
    };

    function cachingDecorator(func, hash) {
        let cache = new Map();
        return function() {
            let key = hash(arguments); // (*)
            if (cache.has(key)) {
                return cache.get(key);
            }

            let result = func.call(this, ...arguments); // (**)

            cache.set(key, result);
            return result;
        };
    }

    function hash() {
        return [].join.call(arguments);
    }

    worker.slow = cachingDecorator(worker.slow, hash);

    console.log( worker.slow(3, 4) ); // работает
    console.log( "Again " + worker.slow(3, 4) ); // аналогично (из кеша)
}
// func.apply(context, args)
{
    /*
        Единственная разница в синтаксисе между call и apply состоит в том, что call ожидает список аргументов,
        в то время как apply принимает псевдомассив.

        func.call(context, ...args); // передаёт массив как список с оператором расширения
        func.apply(context, args);   // тот же эффект
     */
}
// test
{
    function work(a, b) {
        console.log( a + b ); // произвольная функция или метод
    }

    function spy(func) {
        function wrapper(...args) {
            wrapper.calls.push(args);
            return func.apply(this, arguments);
        }

        wrapper.calls = [];

        return wrapper;
    }


    work = spy(work);

    work(1, 2); // 3
    work(4, 5); // 9

    for (let args of work.calls) {
        console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
    }
}
{
    function delay(f, ms) {

        return function() {
            setTimeout(() => f.apply(this, arguments), ms);
        };

    }

    let f1000 = delay(console.log, 1000);

    f1000("test"); // показывает "test" после 1000 мс
}