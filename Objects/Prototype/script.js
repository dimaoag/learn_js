{
    /*
        В JavaScript объекты имеют специальное скрытое свойство [[Prototype]] (так оно названо в спецификации),
        которое либо равно null, либо ссылается на другой объект. Этот объект называется «прототип»:

        Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
        Обратите внимание, что __proto__ — не то же самое, что [[Prototype]]. Это геттер/сеттер для него.
     */

    let animal = {
        eats: true
    };
    let rabbit = {
        jumps: true
    };

    rabbit.__proto__ = animal; // (*)

    // теперь мы можем найти оба свойства в rabbit:
    console.log( rabbit.eats ); // true (**)
    console.log( rabbit.jumps ); // true
}
{
    let animal = {
        eats: true,
        walk() {
            console.log("Animal walk");
        }
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    // walk взят из прототипа
    rabbit.walk(); // Animal walk
}
{
    let user = {
        name: "John",
        surname: "Smith",

        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        },

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    let admin = {
        __proto__: user,
        isAdmin: true
    };

    console.log(admin.fullName); // John Smith (*)

    // срабатывает сеттер!
    admin.fullName = "Alice Cooper"; // (**)
    console.log(admin.name); // Alice
    console.log(admin.surname); // Cooper

    /*
        Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.
     */
}
// For..in
{
    let animal = {
        eats: true
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    // Object.keys возвращает только собственные ключи
    console.log(Object.keys(rabbit)); // jumps

    // for..in проходит и по своим, и по унаследованным ключам
    for(let prop in rabbit) console.log(prop); // jumps, затем eats
}

//  obj.hasOwnProperty(key): он возвращает true, если у obj есть собственное, не унаследованное, свойство с именем key.
{
    let animal = {
        eats: true
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    for(let prop in rabbit) {
        let isOwn = rabbit.hasOwnProperty(prop);

        if (isOwn) {
            console.log(`Our: ${prop}`); // Our: jumps
        } else {
            console.log(`Inherited: ${prop}`); // Inherited: eats
        }
    }
    /*
        Почти все остальные методы, получающие ключи/значения, такие как Object.keys, Object.values
        и другие – игнорируют унаследованные свойства.
        Они учитывают только свойства самого объекта, не его прототипа.
     */
}
{
    let hamster = {
        stomach: [],

        eat(food) {
            // присвоение значения this.stomach вместо вызова this.stomach.push
            this.stomach = [food];
        }
    };

    let speedy = {
        __proto__: hamster
    };

    let lazy = {
        __proto__: hamster
    };

    // Шустрый хомяк нашёл еду
    speedy.eat("apple");
    console.log( speedy.stomach ); // apple

    // Живот ленивого хомяка пуст
    console.log( lazy.stomach ); // <ничего>
}

// F.prototype
{
    /*
        Если в F.prototype содержится объект, оператор new устанавливает его в качестве [[Prototype]] для нового объекта.

        Обратите внимание, что F.prototype означает обычное свойство с именем "prototype" для F.
        Это ещё не «прототип объекта», а обычное свойство F с таким именем.

        Установка Rabbit.prototype = animal буквально говорит интерпретатору следующее:
        "При создании объекта через new Rabbit() запиши ему animal в [[Prototype]]".

        F.prototype используется только в момент вызова new F()
     */

    let animal = {
        eats: true
    };

    function Rabbit(name) {
        this.name = name;
    }

    Rabbit.prototype = animal;

    let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

    console.log( rabbit.eats ); // true
}
{
    // По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.

    function Rabbit() {}
    // по умолчанию:
    // Rabbit.prototype = { constructor: Rabbit }

    console.log( Rabbit.prototype.constructor == Rabbit ); // true
}
{
    function Rabbit() {}
    // по умолчанию:
    // Rabbit.prototype = { constructor: Rabbit }

    let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}

    console.log(rabbit.constructor == Rabbit); // true (свойство получено из прототипа)
}
{
    /*
        В частности, если мы заменим прототип по умолчанию на другой объект, то свойства "constructor" в нём не будет.
     */

    function Rabbit() {}
    Rabbit.prototype = {
        jumps: true
    };

    let rabbit = new Rabbit();
    console.log(rabbit.constructor === Rabbit); // false
}
// Fix
{
    function Rabbit() {}

    // Не перезаписываем Rabbit.prototype полностью,
    // а добавляем к нему свойство
    Rabbit.prototype.jumps = true
    // Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Rabbit.prototype.constructor
}
// Or
{
    Rabbit.prototype = {
        jumps: true,
        constructor: Rabbit
    };

    // теперь свойство constructor снова корректное, так как мы добавили его
    // По умолчанию все функции имеют F.prototype = { constructor: F },
    // поэтому мы можем получить конструктор объекта через свойство "constructor".
}
// встроеные прототипи
{
    /*
        obj = {} – это то же самое, что и obj = new Object(),
        где Object – встроенная функция-конструктор для объектов с собственным свойством prototype,
        которое ссылается на огромный объект с методом toString и другими.
     */

    let obj = {};

    console.log(obj.__proto__ === Object.prototype); // true
    // obj.toString === obj.__proto__.toString == Object.prototype.toString

    /*
         Иерархия встроеных прототипов:

                                            null
                                             |
                                        Object.prototype
                          -----------  (toString: function ...)--------------------------------------------------
                         |                  |                              \                       \      \      \
                        |                   |                               \                       \      \      \

             Array.prototype            Function.prototype             Number.prototype             Date  String Boolean
            (slice: function ...)       (call: function ...)          (toFixed: function ...)
                    |                           |                              |
                [1, 2, 3]               function f(args) { ... }              56

     */

    /*
        Некоторые методы в прототипах могут пересекаться,
        например, у Array.prototype есть свой метод toString, который выводит элементы массива через запятую:
     */

    let arr = [1, 2, 3]
    console.log(arr); // 1,2,3 <-- результат Array.prototype.toString

    /*
        Самое сложное происходит со строками, числами и булевыми значениями.
        Как мы помним, они не объекты. Но если мы попытаемся получить доступ к их свойствам,
        то тогда будет создан временный объект-обёртка с использованием встроенных конструкторов String, Number и Boolean,
        который предоставит методы и после этого исчезнет.

        Значения null и undefined не имеют объектов-обёрток

        Встроенные прототипы можно изменять.
        Например, если добавить метод к String.prototype, метод становится доступен для всех строк:
     */

    String.prototype.show = function() {
        console.log(this);
    };

    "BOOM!".show(); // BOOM!
}
{
    /*
        Современные же методы это:
            Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]],
                    указанным как proto, и необязательными дескрипторами свойств descriptors.
            Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
            Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.
        Эти методы нужно использовать вместо __proto__.

     */

    let animal = {
        eats: true
    };

    // создаём новый объект с прототипом animal
    let rabbit = Object.create(animal);

    console.log(rabbit.eats); // true

    console.log(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit

    Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}
}
// Object.create
{

    // Такой вызов создаёт точную копию объекта obj, включая все свойства: перечисляемые и неперечисляемые,
    // геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]].
    let obj = {name: 'John'};
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    console.log(clone)
}