// try catch
{
    /*
        try..catch работает синхронно

        try..catch работает только для ошибок, возникающих во время выполнения кода



     */
    try {

        console.log('Начало блока try');  // (1) <--

        lalala; // ошибка, переменная не определена!

        console.log('Конец блока try (никогда не выполнится)');  // (2)

    } catch(err) {

        console.log(`Возникла ошибка!`); // (3) <--

    }

    setTimeout(function() {
        try {
            noSuchVariable; // try..catch обрабатывает ошибку!
        } catch {
            console.log( "ошибка поймана!" );
        }
    }, 1000);
}

// Объект ошибки
{
    try {
        lalala; // ошибка, переменная не определена!
    } catch(err) {
        console.log(err.name); // ReferenceError
        console.log(err.message); // lalala is not defined
        console.log(err.stack); // ReferenceError: lalala is not defined at (...стек вызовов)

        // Можем также просто вывести ошибку целиком
        // Ошибка приводится к строке вида "name: message"
        console.log(err); // ReferenceError: lalala is not defined
    }
}
{
    let json = "{ некорректный JSON }";

    try {

        let user = JSON.parse(json); // <-- тут возникает ошибка...
        console.log( user.name ); // не сработает

    } catch (e) {
        // ...выполнение прыгает сюда
        console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз.");
        console.log(e.name);
        console.log(e.message);
    }
}

// throw
{
    let json = '{ "age": 30 }'; // данные неполны

    try {

        let user = JSON.parse(json); // <-- выполнится без ошибок

        if (!user.name) {
            throw new SyntaxError("Данные неполны: нет имени"); // (*)
        }

        console.log( user.name );

    } catch(e) {
        console.log( "JSON Error: " + e.message ); // JSON Error: Данные неполны: нет имени
    }
}
{
    function readData() {
        let json = '{ "age": 30 }';

        try {
            // ...
            blabla(); // ошибка!
        } catch (e) {
            // ...
            if (e.name != 'SyntaxError') {
                throw e; // проброс исключения (не знаю как это обработать)
            }
        }
    }

    try {
        readData();
    } catch (e) {
        console.log( "Внешний catch поймал: " + e ); // поймал!
    }
}

// finally
{
    try {
    //... пробуем выполнить код...
    } catch(e) {
    //... обрабатываем ошибки ...
    } finally {
    //... выполняем всегда ...
    }

    /*
        Переменные внутри try..catch..finally локальны

        Блок finally срабатывает при любом выходе из try..catch, в том числе и return.
     */

    function func() {

        try {
            return 1;

        } catch (e) {
            /* ... */
        } finally {
            console.log( 'finally' );
        }
    }

    console.log( func() ); // сначала срабатывает alert из finally, а затем этот код
}

// Extended Errors
{
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }

// Использование
    function readUser(json) {
        let user = JSON.parse(json);

        if (!user.age) {
            throw new ValidationError("Нет поля: age");
        }
        if (!user.name) {
            throw new ValidationError("Нет поля: name");
        }

        return user;
    }

    // Рабочий пример с try..catch

    try {
        let user = readUser('{ "age": 25 }');
    } catch (err) {
        if (err instanceof ValidationError) {
            console.log("Некорректные данные: " + err.message); // Некорректные данные: Нет поля: name
        } else if (err instanceof SyntaxError) { // (*)
            console.log("JSON Ошибка Синтаксиса: " + err.message);
        } else {
            throw err; // неизвестная ошибка, пробросить исключение (**)
        }
    }
}