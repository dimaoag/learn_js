// JSON.stringify - для преобразования объектов в JSON.
{
    let student = {
        name: 'John',
        age: 30,
        isAdmin: false,
        courses: ['html', 'css', 'js'],
        wife: null
    };

    let json = JSON.stringify(student);

    console.log(typeof json); // мы получили строку!

    console.log(json);
    /* выведет объект в формате JSON:
    {
      "name": "John",
      "age": 30,
      "isAdmin": false,
      "courses": ["html", "css", "js"],
      "wife": null
    }
    */
}
// Available Types
{
    /*
    JSON поддерживает следующие типы данных:

    Объекты { ... }
    Массивы [ ... ]
    Примитивы:
        строки,
        числа,
        логические значения true/false,
        null.
     */

    // число в JSON остаётся числом
    console.log( JSON.stringify(1) ) // 1

    // строка в JSON по-прежнему остаётся строкой, но в двойных кавычках
    console.log( JSON.stringify('test') ) // "test"

    console.log( JSON.stringify(true) ); // true

    console.log( JSON.stringify([1, 2, 3]) ); // [1,2,3]
}
// Unavailable Types
{
    /*
    JSON.stringify пропускает некоторые специфические свойства объектов JavaScript.
     - Свойства-функции (методы).
     - Символьные свойства.
     - Свойства, содержащие undefined.
     */

    let user = {
        sayHi() { // будет пропущено
            alert("Hello");
        },
        [Symbol("id")]: 123, // также будет пропущено
        something: undefined // как и это - пропущено
    };

    console.log( JSON.stringify(user) ); // {} (пустой объект)
}
// JSON.parse - для преобразования JSON обратно в объект.
{
    // строковый массив
    let numbers = "[0, 1, 2, 3]";

    numbers = JSON.parse(numbers);

    console.log( numbers[1] ); // 1




    let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

    user = JSON.parse(user);

    console.log( user.friends[1] ); // 1




    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    let meetup = JSON.parse(str, function(key, value) {
        if (key == 'date') return new Date(value);
        return value;
    });

    console.log( meetup.date.getDate() ); // 30 - теперь работает!
}