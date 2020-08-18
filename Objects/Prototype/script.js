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