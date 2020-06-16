// Литералы и свойства
{
    let user1 = new Object(); // синтаксис "конструктор объекта"
    let user2 = {};  // синтаксис "литерал объекта"
}
// Квадратные скобки
{
    let user = {     // объект
        name: "John",  // под ключом "name" хранится значение "John"
        age: 30,        // под ключом "age" хранится значение 30
        "likes birds": true  // имя свойства из нескольких слов должно быть в кавычках
    };
    console.log(user["likes birds"]); // true
    delete user["likes birds"]; // удаление свойства

    let key = "name";
    console.log(user[key]); // John
}
// Свойство из переменной
{
    function makeUser(name, age) {
        return {
            name: name,
            age: age
            // ...другие свойства
        };
    }

    let user = makeUser("John", 30);
    console.log(user.name); // John

    function makeUser1(name, age) {
        return {
            name, // то же самое, что и name: name
            age   // то же самое, что и age: age
            // ...
        };
    }
}
// Проверка существования свойства, оператор «in»
{
    let user = { name: "John", age: 30 };

    console.log( "age" in user ); // true, user.age существует
    console.log( "blabla" in user ); // false, user.blabla не существует
}
// Цикл «for…in»
{
    let user = {
        name: "John",
        age: 30,
        isAdmin: true
    };

    for (let key in user) {
        // ключи
        console.log( key );  // name, age, isAdmin
        // значения ключей
        console.log( user[key] ); // John, 30, true
    }
}
// Целочисленные свойства - означает строку, которая может быть преобразована в целое число и обратно без изменений
{
    let codes = {
        "49": "Германия",
        "41": "Швейцария",
        "44": "Великобритания",
        // ..,
        "1": "США"
    };

    for (let code in codes) {
        console.log(code); // 1, 41, 44, 49
    }
}
// Переменная хранит не сам объект, а его «адрес в памяти», другими словами «ссылку» на него

{
    let user = { name: "John" };

    let admin = user; // копируется ссылка
}
// Сравнение объектов - Два объекта равны только в том случае, если это один и тот же объект
{
    let a = {};
    let b = a; // копирование по ссылке

    console.log( a == b ); // true, обе переменные ссылаются на один и тот же объект
    console.log( a === b ); // true
}
// Объекты-константы объявленный через const, может быть изменён.
{
    const user = {
        name: "John"
    };

    user.age = 25; // (*)

    console.log(user.age); // 25
}
//  Клонирование и объединение объектов
{
    let user = {
        name: "John",
        age: 30
    };

    let clone = {}; // новый пустой объект

// скопируем все свойства user в него
    for (let key in user) {
        clone[key] = user[key];
    }

// теперь в переменной clone находится абсолютно независимый клон объекта.
    clone.name = "Pete"; // изменим в нём данные

    console.log( user.name ); // в оригинальном объекте значение свойства `name` осталось прежним – John.
}
// Object.assign
{
    let user = { name: "John" };

    let permissions1 = { canView: true };
    let permissions2 = { canEdit: true };

// копируем все свойства из permissions1 и permissions2 в user
    Object.assign(user, permissions1, permissions2);
    console.log(user.canView)

// now user = { name: "John", canView: true, canEdit: true }
}

