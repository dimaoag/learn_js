//
{
    class User {
        constructor(name) { this.name = name; }
        sayHi() { console.log(this.name); }
    }

    // класс - это функция
    console.log(typeof User); // function

    // ...или, если точнее, это метод constructor
    console.log(User === User.prototype.constructor); // true

    // Методы находятся в User.prototype, например:
    console.log(User.prototype.sayHi); // alert(this.name);

    // в прототипе ровно 2 метода
    console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
}
{
    // перепишем класс User на чистых функциях

    // 1. Создаём функцию constructor
    function User(name) {
        this.name = name;
    }
    // каждый прототип функции имеет свойство constructor по умолчанию,
    // поэтому нам нет необходимости его создавать

    // 2. Добавляем метод в прототип
    User.prototype.sayHi = function() {
        console.log(this.name);
    };

    // Использование:
    let user = new User("Иван");
    user.sayHi();

    /*
        Отличия обявления обекта через class and function:
            - конструктор класса не может быть вызван без new
                class User {
                  constructor() {}
                }
                User(); // Error: Class constructor User cannot be invoked without 'new'

            - Методы класса являются неперечислимыми.
              Определение класса устанавливает флаг enumerable вfalse для всех методов в "prototype"

            - Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.

     */
}

// Class Expression
{
    // (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
    let User = class MyClass {
        sayHi() {
            console.log(MyClass); // имя MyClass видно только внутри класса
        }
    };

    new User().sayHi(); // работает, выводит определение MyClass

    // console.log(MyClass); // ошибка, имя MyClass не видно за пределами класса
}
{
    function makeClass(phrase) {
        // объявляем класс и возвращаем его
        return class {
            sayHi() {
                console.log(phrase);
            };
        };
    }

    // Создаём новый класс
    let User = makeClass("Привет");

    new User().sayHi(); // Привет
}
// Геттеры/сеттеры, другие сокращения
{
    class User {

        constructor(name) {
            // вызывает сеттер
            this.name = name;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            if (value.length < 4) {
                console.log("Имя слишком короткое.");
                return;
            }
            this._name = value;
        }

    }

    let user = new User("Иван");
    console.log(user.name); // Иван

    user = new User(""); // Имя слишком короткое.
}
{
    class Clock {
        constructor({ template }) {
            this.template = template;
        }

        render() {
            let date = new Date();

            let hours = date.getHours();
            if (hours < 10) hours = '0' + hours;

            let mins = date.getMinutes();
            if (mins < 10) mins = '0' + mins;

            let secs = date.getSeconds();
            if (secs < 10) secs = '0' + secs;

            let output = this.template
                .replace('h', hours)
                .replace('m', mins)
                .replace('s', secs);

            console.log(output);
        }

        stop() {
            clearInterval(this.timer);
        }

        start() {
            this.render();
            this.timer = setInterval(() => this.render(), 1000);
        }
    }


    let clock = new Clock({template: 'h:m:s'});
    clock.start();
}

// Наследование классов
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        run(speed) {
            this.speed = speed;
            console.log(`${this.name} бежит со скоростью ${this.speed}.`);
        }
        stop() {
            this.speed = 0;
            console.log(`${this.name} стоит.`);
        }
    }

    // Наследуем от Animal указывая "extends Animal"
    class Rabbit extends Animal {
        hide() {
            console.log(`${this.name} прячется!`);
        }
    }

    let rabbit = new Rabbit("Белый кролик");

    rabbit.run(5); // Белый кролик бежит со скоростью 5.
    rabbit.hide(); // Белый кролик прячется!

    console.log(Rabbit.prototype.__proto__ === Animal.prototype)
}

// Переопределение методов
{
    /*
        У классов есть ключевое слово "super" для таких случаев.

        super.method(...) вызывает родительский метод.
        super(...) вызывает родительский конструктор (работает только внутри нашего конструктора).
        У стрелочных функций нет super
     */

    class Animal {

        constructor(name) {
            this.speed = 0;
            this.name = name;
        }

        run(speed) {
            this.speed = speed;
            console.log(`${this.name} бежит со скоростью ${this.speed}.`);
        }

        stop() {
            this.speed = 0;
            console.log(`${this.name} стоит.`);
        }

    }

    class Rabbit extends Animal {
        hide() {
            console.log(`${this.name} прячется!`);
        }

        stop() {
            super.stop(); // вызываем родительский метод stop
            this.hide(); // и затем hide
        }
    }

    let rabbit = new Rabbit("Белый кролик");

    rabbit.run(5); // Белый кролик бежит со скоростью 5.
    rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!
}

// Переопределение конструктора
{
    /*
        Если коротко, то в классах-потомках конструктор обязан вызывать super(...),
        и (!) делать это перед использованием this.
     */

    class Animal {

        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
    }

    class Rabbit extends Animal {

        constructor(name, earLength) {
            super(name);
            this.earLength = earLength;
        }

        // ...
    }

    let rabbit = new Rabbit("Белый кролик", 10);
    console.log(rabbit.name); // Белый кролик
    console.log(rabbit.earLength); // 10
}

// Static methods
{
    class Article {
        constructor(title, date) {
            this.title = title;
            this.date = date;
        }

        static createTodays() {
            // помним, что this = Article
            return new this("Сегодняшний дайджест", new Date());
        }
    }

    let article = Article.createTodays();

    console.log( article.title ); // Сегодняшний дайджест

    /*
     Статические свойства и методы наследуются.

    Для class B extends A прототип класса B указывает на A: B.[[Prototype]] = A.
    Таким образом, если поле не найдено в B, поиск продолжается в A.
     */
}

// Защищённые свойства обычно начинаются с префикса _.
{
    /*
        Защищённые поля наследуются
     */
    class CoffeeMachine {
        _waterAmount = 0;

        set waterAmount(value) {
            if (value < 0) throw new Error("Отрицательное количество воды");
            this._waterAmount = value;
        }

        get waterAmount() {
            return this._waterAmount;
        }

        constructor(power) {
            this._power = power;
        }

    }

    // создаём новую кофеварку
    let coffeeMachine = new CoffeeMachine(100);

    // устанавливаем количество воды
    //coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды
}
{
    class CoffeeMachine {
        // ...

        constructor(power) {
            this._power = power;
        }

        get power() {
            return this._power;
        }

    }

    // создаём кофеварку
    let coffeeMachine = new CoffeeMachine(100);

    console.log(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W

    coffeeMachine.power = 25; // Error (no setter)
}
{
    class CoffeeMachine {
        _waterAmount = 0;

        setWaterAmount(value) {
            if (value < 0) throw new Error("Отрицательное количество воды");
            this._waterAmount = value;
        }

        getWaterAmount() {
            return this._waterAmount;
        }
    }

    new CoffeeMachine().setWaterAmount(100)
}

// Приватное свойство «#waterLimit»
{

    /*
        class CoffeeMachine {
            #waterLimit = 200;

            #checkWater(value) {
                if (value < 0) throw new Error("Отрицательный уровень воды");
                if (value > this.#waterLimit) throw new Error("Слишком много воды");
            }
        }

        let coffeeMachine = new CoffeeMachine();

        // снаружи  нет доступа к приватным методам класса
        coffeeMachine.#checkWater(); // Error
        coffeeMachine.#waterLimit = 1000; // Error
    */
}

// От встроенных классов, таких как Array, Map и других, тоже можно наследовать.
{
    // добавим один метод (можно более одного)
    class PowerArray extends Array {
        isEmpty() {
            return this.length === 0;
        }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    console.log(arr.isEmpty()); // false

    let filteredArr = arr.filter(item => item >= 10);
    console.log(filteredArr); // 10, 50
    console.log(filteredArr.isEmpty()); // false
    console.log(arr.constructor === PowerArray); // true
}

// obj instanceof Class
{
    class Rabbit {}
    let rabbit = new Rabbit();

    // это объект класса Rabbit?
    console.log( rabbit instanceof Rabbit ); // true
}
{
    // вместо класса
    function Rabbit() {}

    console.log( new Rabbit() instanceof Rabbit ); // true
}
{
    let arr = [1, 2, 3];
    console.log( arr instanceof Array ); // true
    console.log( arr instanceof Object ); // true
}