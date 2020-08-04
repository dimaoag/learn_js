// new Date()
{
    let now = new Date();
    console.log( now ); // показывает текущие дату и время
}
// new Date(milliseconds)
{
    // 0 соответствует 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    console.log( Jan01_1970 );

    // теперь добавим 24 часа и получим 02.01.1970 UTC+0
    let milliseconds = 24 * 3600 * 1000;
    let Jan02_1970 = new Date(milliseconds);
    console.log( Jan02_1970 );
    console.log( Jan02_1970.getTime() );
}
// new Date(datestring)
{
    let date = new Date("2017-01-26");
    console.log(date);
    // Время не указано, поэтому оно ставится в полночь по Гринвичу и
    // меняется в соответствии с часовым поясом места выполнения кода
    // Так что в результате можно получить
    // Thu Jan 26 2017 11:00:00 GMT+1100 (восточно-австралийское время)
    // или
    // Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)
}
// new Date(year, month, date, hours, minutes, seconds, ms)
{
    /*
    Создать объект Date с заданными компонентами в местном часовом поясе. Обязательны только первые два аргумента.

    year - должен состоять из четырёх цифр: значение 2013 корректно, 98 – нет.
    month - начинается с 0 (январь) по 11 (декабрь).
    Параметр date здесь представляет собой день месяца. Если параметр не задан, то принимается значение 1.
    Если параметры hours/minutes/seconds/ms отсутствуют, их значением становится 0.
    */

    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // то же самое, так как часы и проч. равны 0
}
// Получение компонентов даты
{
    /*
    getFullYear() - Получить год (4 цифры)
    getMonth() - Получить месяц, от 0 до 11.
    getDate() - Получить день месяца, от 1 до 31, что несколько противоречит названию метода.
    getHours(), getMinutes(), getSeconds(), getMilliseconds() - Получить, соответственно, часы, минуты, секунды или миллисекунды.
    getDay() - день недели от 0 (воскресенье) до 6 (суббота)
    getTime() - возвращает таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0.
    getTimezoneOffset() - Возвращает разницу в минутах между местным часовым поясом и UTC

    getUTCFullYear(), getUTCMonth(), getUTCDay() - UTC+0
    */

    // если вы в часовом поясе UTC-1, то выводится 60
    // если вы в часовом поясе UTC+3, выводится -180
    console.log( new Date().getTimezoneOffset() );

    // текущая дата
    let date = new Date();

    // час в вашем текущем часовом поясе
    console.log( date.getHours() );

    // час в часовом поясе UTC+0 (лондонское время без перехода на летнее время)
    console.log( date.getUTCHours() );
}
// Установка компонентов даты
{
    /*
    setFullYear(year, [month], [date])
    setMonth(month, [date])
    setDate(date)
    setHours(hour, [min], [sec], [ms])
    setMinutes(min, [sec], [ms])
    setSeconds(sec, [ms])
    setMilliseconds(ms)
    setTime(milliseconds) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)
    У всех этих методов, кроме setTime(), есть UTC-вариант, например: setUTCHours().
     */

    let today = new Date();

    today.setHours(0);
    console.log(today); // выводится сегодняшняя дата, но значение часа будет 0

    today.setHours(0, 0, 0, 0);
    console.log(today); // всё ещё выводится сегодняшняя дата, но время будет ровно 00:00:00.
}
// Автоисправление даты
{
    let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
    console.log(date); // ...1st Feb 2013!

    let date1 = new Date(2016, 1, 28);
    date1.setDate(date1.getDate() + 2);

    console.log( date1 ); // 1 Mar 2016
}
// Преобразование к числу, разность дат
{
    let date = new Date();
    console.log(+date); // количество миллисекунд, то же самое, что date.getTime()
}
// Date.now()
{
    let start = Date.now(); // количество миллисекунд с 1 января 1970 года

    // выполняем некоторые действия
    for (let i = 0; i < 100000; i++) {
        let doSomething = i * i * i;
    }

    let end = Date.now(); // заканчиваем отсчёт времени

    console.log( `Цикл отработал за ${end - start} миллисекунд` ); // вычитаются числа, а не даты
}
// Date.parse(str)
{
    /*
    YYYY-MM-DDTHH:mm:ss.sssZ

    YYYY-MM-DD – это дата: год-месяц-день.
    Символ "T" используется в качестве разделителя.
    HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
    Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0
     */

    let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

    console.log(ms); // 1327611110417 (таймстамп)
}