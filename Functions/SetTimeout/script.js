// setTimeout позволяет вызвать функцию один раз через определённый интервал времени.
{
    /*
        Задержка перед запуском в миллисекундах (1000 мс = 1 с). Значение по умолчанию – 0
     */

    function sayHi(phrase, who) {
        console.log( phrase + ', ' + who );
    }

    setTimeout(sayHi, 2000, "Привет", "Джон"); // Привет, Джон

    /*
        Вызов setTimeout возвращает «идентификатор таймера» timerId,
        который можно использовать для отмены дальнейшего выполнения
    */
    let timerId = setTimeout(() => console.log('Привет'), 1000);
    clearTimeout(timerId);
}

// setInterval позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени.
{
    // Метод setInterval имеет такой же синтаксис как setTimeout
    // повторить с интервалом 2 секунды
    let timerId = setInterval(() => console.log('tick'), 2000);

    // остановить вывод через 5 секунд
    setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 5000);

    /*
    В большинстве браузеров, включая Chrome и Firefox,
    внутренний счётчик продолжает тикать во время показа alert/confirm/prompt.
     */
}
// Рекурсивный setTimeout
{
    /** вместо:
     let timerId = setInterval(() => alert('tick'), 2000);
     */

    let timerId = setTimeout(function tick() {
        console.log('tick');
        timerId = setTimeout(tick, 2000); // (*)
    }, 2000);
}
// сервис, который отправляет запрос для получения данных на сервер каждые 5 секунд,
// но если сервер перегружен, то необходимо увеличить интервал запросов до 10, 20, 40 секунд…
{
    let delay = 5000;

    let timerId = setTimeout(function request() {
        //...отправить запрос...


        if (false) {
            // ошибка запроса из-за перегрузки сервера
            // увеличить интервал для следующего запроса
            delay *= 2;
        }

        timerId = setTimeout(request, delay);

    }, delay);
}
// setTimeout с нулевой задержкой
{
    /*
    Особый вариант использования: setTimeout(func, 0) или просто setTimeout(func).

    Это планирует вызов func настолько быстро, насколько это возможно.
    Но планировщик будет вызывать функцию только после завершения выполнения текущего кода.

    Так вызов функции будет запланирован сразу после выполнения текущего кода.

    Например, этот код выводит «Привет» и затем сразу «Мир»:
     */

    setTimeout(() => console.log("Мир"));

    console.log("Привет");
}
//task
{
    function printNumbers(from, to) {
        let current = from;

        let timerId = setInterval(function () {
            console.log(current++);
            if (current > to) {
                clearInterval(timerId)
            }
        }, 1000)
    }

    printNumbers(1, 5);
}
{
    function printNumbers2(from, to) {
        let current = from;

        setTimeout(function go() {
            console.log(current++);
            if (current <= to) {
                setTimeout(go, 1000);
            }
        }, 1000);
    }

    printNumbers2(1, 5);
}