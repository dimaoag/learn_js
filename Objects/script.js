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
// Значение this – это объект «перед точкой», который использовался для вызова метода.
{
    let user = { name: "Джон" };
    let admin = { name: "Админ" };

    function sayHi() {
        console.log( this.name );
    }

// используем одну и ту же функцию в двух объектах
    user.f = sayHi;
    admin.f = sayHi;
    user.f(); // Джон  (this == user)
    admin.f(); // Админ  (this == admin)
}
// У стрелочных функций нет «this»
{
    let user = {
        firstName: "Илья",
        sayHi() {
            let arrow = () => console.log(this.firstName);
            arrow();
        }
    };

    user.sayHi(); // Илья
}
// Symbol.toPrimitive  transformation a object to primitive type
{
    /*
        - string
        - number
        - default
     */
    let user = {
        name: "John",
        money: 1000,

        [Symbol.toPrimitive](hint) {
            console.log(`hint: ${hint}`);
            return hint == "string" ? `{name: "${this.name}"}` : this.money;
        }
    };

// демонстрация результатов преобразований:
    console.log(user.toString()); // hint: string -> {name: "John"}
    console.log(+user); // hint: number -> 1000
    console.log(user + 500); // hint: default -> 1500
}
{
    let user = {
        name: "John",
        money: 1000,

        // для хинта равного "string"
        toString() {
            return `{name: "${this.name}"}`;
        },

        // для хинта равного "number" или "default"
        valueOf() {
            return this.money;
        }

    };

    console.log(user.toString()); // toString -> {name: "John"}
    console.log(+user); // valueOf -> 1000
    console.log(user + 500); // valueOf -> 1500

    /*
    для примитимов создаётся специальный «объект-обёртка»,
    который предоставляет нужную функциональность, а после удаляется.
    Каждый примитив имеет свой собственный «объект-обёртку»,
    которые называются: String, Number, Boolean и Symbol. Таким образом, они имеют разный набор методов.
 */
}
// Функция-конструктор
{
    function User(name) {
        this.name = name;
        this.isAdmin = false;
        this.sayHi = function() {
            console.log( "Меня зовут: " + this.name );
        };
    }

    let user = new User("Вася");

    console.log(user.name); // Вася
    console.log(user.isAdmin); // false
    user.sayHi(); // Меня зовут: Вася
}
{
    function User() {
        this.name = 'John';
        this.isAdmin = false;
    }

    let user = new User; // <-- без скобок
    // то же, что и
    let user1 = new User();
}
// Перебираемые объекты
{
    // Перебираемые (или итерируемые) объекты – это концепция, которая позволяет использовать
    // любой объект в цикле for..of

    let range = {
        from: 1,
        to: 5
    };

    // 1. вызов for..of сначала вызывает эту функцию
    range[Symbol.iterator] = function() {

        // ...она возвращает объект итератора:
        // 2. Далее, for..of работает только с этим итератором, запрашивая у него новые значения
        return {
            current: this.from,
            last: this.to,

            // 3. next() вызывается на каждой итерации цикла for..of
            next() {
                // 4. он должен вернуть значение в виде объекта {done:.., value :...}
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    };

    // теперь работает!
    for (let num of range) {
        console.log(num); // 1, затем 2, 3, 4, 5
    }
}
// Map
{
    // Map - это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа
    /*
    new Map() – создаёт коллекцию.
    map.set(key, value) – записывает по ключу key значение value.
    map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
    map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
    map.delete(key) – удаляет элемент по ключу key.
    map.clear() – очищает коллекцию от всех элементов.
    map.size – возвращает текущее количество элементов.
    */

    let map = new Map();
    map.set("1", "str1")
        .set(1, "num1")
        .set(true, "bool1");

    /*
    map.keys() – возвращает итерируемый объект по ключам,
    map.values() – возвращает итерируемый объект по значениям,
    map.entries() – возвращает итерируемый объект по парам вида [ключ, значение], этот вариант используется по умолчанию в for..of.
    */

    let recipeMap = new Map([
        ["огурец", 500],
        ["помидор", 350],
        ["лук",    50]
    ]);

    // перебор по ключам (овощи)
    for (let vegetable of recipeMap.keys()) {
        console.log(vegetable); // огурец, помидор, лук
    }

    // перебор по значениям (числа)
    for (let amount of recipeMap.values()) {
        console.log(amount); // 500, 350, 50
    }

    // перебор по элементам в формате [ключ, значение]
    for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
        console.log(entry); // огурец,500 (и так далее)
    }

    // выполняем функцию для каждой пары (ключ, значение)
    recipeMap.forEach((value, key, map) => {
        console.log(`${key}: ${value}`); // огурец: 500 и так далее
    });

    // массив пар [ключ, значение]
    let map1 = new Map([
        ['1',  'str1'],
        [1,    'num1'],
        [true, 'bool1']
    ]);

    console.log( map1.get('1') ); // str1
}
// Set
{
    // Set – это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться только один раз.
    /*
    new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
    set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
    set.delete(value) – удаляет значение, возвращает true если value было в множестве на момент вызова, иначе false.
    set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
    set.clear() – удаляет все имеющиеся значения.
    set.size – возвращает количество элементов в множестве.
    */

    let set = new Set();

    let john = { name: "John" };
    let pete = { name: "Pete" };
    let mary = { name: "Mary" };

    // считаем гостей, некоторые приходят несколько раз
    set.add(john);
    set.add(pete);
    set.add(mary);
    set.add(john);
    set.add(mary);

    // set хранит только 3 уникальных значения
    console.log(set.size); // 3

    for (let user of set) {
        console.log(user.name); // John (потом Pete и Mary)
    }

    let set1 = new Set(["апельсин", "яблоко", "банан"]);

    for (let value of set1) console.log(value);

    // то же самое с forEach:
    set1.forEach((value, valueAgain, set) => {
        console.log(value);
    });
}
{
    /*
    WeakMap – это Map-подобная коллекция, позволяющая использовать в качестве ключей только объекты,
    и автоматически удаляющая их вместе с соответствующими значениями,
    как только они становятся недостижимыми иными путями.

    WeakSet – это Set-подобная коллекция, которая хранит только объекты и удаляет их,
    как только они становятся недостижимыми иными путями.
     */
}
// Object.keys, values, entries
{
    /*
    Object.keys(obj) – возвращает массив ключей.
    Object.values(obj) – возвращает массив значений.
    Object.entries(obj) – возвращает массив пар [ключ, значение].
     */

    let user = {
        name: "John",
        age: 30
    };

    Object.keys(user) //= ["name", "age"]
    Object.values(user) //= ["John", 30]
    Object.entries(user) //= [ ["name","John"], ["age",30] ]

    // Например, у нас есть объект с ценами, и мы хотели бы их удвоить:
    let prices = {
        banana: 1,
        orange: 2,
        meat: 4,
    };

    let doublePrices = Object.fromEntries(
        // преобразовать в массив, затем map, затем fromEntries обратно объект
        Object.entries(prices).map(([key, value]) => [key, value * 2])
    );

    console.log(doublePrices.meat); // 8
}
// Деструктурирующее присваивание
{
    // у нас есть массив с именем и фамилией
    let arr = ["Ilya", "Kantor"]

    // деструктурирующее присваивание
    // записывает firstName=arr[0], surname=arr[1]
    let [firstName, surname] = arr;

    console.log(firstName); // Ilya
    console.log(surname);  // Kantor

    let [firstName1, surname1] = "Ilya Kantor".split(' ');
    console.log(firstName1); // Ilya
    console.log(surname1);  // Kantor
}
{
    // второй элемент не нужен
    let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    console.log( title ); // Consul
}
{
    let [a, b, c] = "abc";
    let [one, two, three] = new Set([1, 2, 3]);
}
{
    let user = {};
    [user.name, user.surname] = "Ilya Kantor".split(' ');

    console.log(user.name); // Ilya
}
{
    let user = {
        name: "John",
        age: 30
    };

    // цикл по ключам и значениям
    for (let [key, value] of Object.entries(user)) {
        console.log(`${key}:${value}`); // name:John, затем age:30
    }
}
{
    let user = new Map();
    user.set("name", "John");
    user.set("age", "30");

    for (let [key, value] of user) {
        console.log(`${key}:${value}`); // name:John, затем age:30
    }
}
{
    let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    console.log(name1); // Julius
    console.log(name2); // Caesar

    // Обратите внимание, что `rest` является массивом.
    console.log(rest[0]); // Consul
    console.log(rest[1]); // of the Roman Republic
    console.log(rest.length); // 2
}
{
    // значения по умолчанию
    let [name = "Guest", surname = "Anonymous"] = ["Julius"];

    console.log(name);    // Julius (из массива)
    console.log(surname); // Anonymous (значение по умолчанию)
}
{
    // Деструктуризация объекта
    let options = {
        title: "Menu",
        width: 100,
        height: 200
    };

    let {title, width, height} = options;

    console.log(title);  // Menu
    console.log(width);  // 100
    console.log(height); // 200
}
{
    // Если мы хотим присвоить свойство объекта переменной с другим названием, например,
    // свойство options.width присвоить переменной w, то мы можем использовать двоеточие:
    let options = {
        title: "Menu",
        width: 100,
        height: 200
    };

    // { sourceProperty: targetVariable }
    let {width: w, height: h, title} = options;

    // width -> w
    // height -> h
    // title -> title

    console.log(title);  // Menu
    console.log(w);      // 100
    console.log(h);      // 200
}
{
    // Мы также можем совмещать : и =:
    let options = {
        title: "Menu"
    };

    let {width: w = 100, height: h = 200, title} = options;

    console.log(title);  // Menu
    console.log(w);      // 100
    console.log(h);      // 200
}
{
    let options = {
        title: "Menu",
        width: 100,
        height: 200
    };

    // взять только title, игнорировать остальное
    let { title } = options;

    console.log(title); // Menu
}
{
    let options = {
        title: "Menu",
        height: 200,
        width: 100
    };

    // title = свойство с именем title
    // rest = объект с остальными свойствами
    let {title, ...rest} = options;

    // сейчас title="Menu", rest={height: 200, width: 100}
    console.log(rest.height);  // 200
    console.log(rest.width);   // 100
}
{
    // Вложенная деструктуризация
    let options = {
        size: {
            width: 100,
            height: 200
        },
        items: ["Cake", "Donut"],
        extra: true
    };

    // деструктуризация разбита на несколько строк для ясности
    let {
        size: { // положим size сюда
            width,
            height
        },
        items: [item1, item2], // добавим элементы к items
        title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
    } = options;

    console.log(title);  // Menu
    console.log(width);  // 100
    console.log(height); // 200
    console.log(item1);  // Cake
    console.log(item2);  // Donut
}