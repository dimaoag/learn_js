// -- Type of data --

/*
    Number
    Bigint
    String
    Boolean
    Object
    Symbol
    Null
    Undefined
 */
{
    let number = 42;
    let bigIntTest = 1234567890123456789012345678901234567890n;
    let string = 'string message';
    let bool = true;
    let object = {a: 1};
    let nothing = null;
    let undef = undefined;

    console.log(typeof undef)

}

// ======== Number =========
{
// Infinity - математическую бесконечность ∞. Это особое значение, которое больше любого числа.
    console.log(1 / 0)

// NaN означает вычислительную ошибку
    console.log("не число" / 2)

// BigInt - числа больше, чем 2 в 53 степени (или меньше, чем -2 в 53 для отрицательных)
    const bigInt = 1234567890123456789012345678901234567890n;
    console.log(bigInt)


// ======== String =========

    let str = "Привет";
    let str2 = 'Одинарные кавычки тоже подойдут';
    let phrase = `Обратные кавычки позволяют встраивать переменные ${str}`;
    console.log(phrase)

// ======== Boolean =========

// ======== Null =========

// ======== Undefined =========
    let x;
    console.log(x); // выведет "undefined"


// ======== Object =========
    console.log(typeof undefined) // "undefined"
    console.log(typeof (0)) // "number"
    console.log(typeof 10n) // "bigint"
    console.log(typeof true) // "boolean"
    console.log(typeof "foo") // "string"
    console.log(typeof Symbol("id")) // "symbol"
    console.log(typeof Math) // "object"  (1)
    console.log(typeof null) // "object"  (2) // not correct error
    console.log(typeof alert) // "function"  (3)

    let name = "Ilya";
    console.log(`hello ${1}`); // hello 1
    console.log(`hello ${"name"}`); // hello name
    console.log(`hello ${name}`); // hello Ilya

}

// ======== Conversion types =========

{
// to string
    let value = true;
    console.log(typeof value); // boolean
    value = String(value); // теперь value это строка "true"
    console.log(typeof value); // string

// to number
    let str = "123";
    console.log(typeof str); // string
    let num = Number(str); // становится числом 123
    console.log(typeof num); // number
    let age = Number("Любая строка вместо числа");
    console.log(age); // NaN, преобразование  не удалось

    let apples = "2";
    let oranges = "3";
    // оба операнда предварительно преобразованы в числа
    console.log( +apples + +oranges ); // 5
    // более длинный вариант
    // console.log( Number(apples) + Number(oranges) ); // 5

    /*
    undefined -> NaN
    null -> 0
    true / false -> 1 / 0
    string  -> 	Пробельные символы по краям обрезаются. Далее, если остаётся пустая строка, то 0,
    иначе из непустой строки «считывается» число. При ошибке результат NaN.
    */

// to boolean
    console.log( Boolean(1) ); // true
    console.log( Boolean(0) ); // false
    console.log( Boolean("Привет!") ); // true
    console.log( Boolean("") ); // false
    console.log( Boolean("0") ); // true
    console.log( Boolean(" ") ); // пробел это тоже true (любая непустая строка это true)

    /*
    0, null, undefined, NaN, "" -> false
    любое другое значение       -> true
     */

    let currentUser = null;
    let defaultUser = "John";

    let name = currentUser || defaultUser || "unnamed";

    console.log( name ); // выбирается "John" – первое истинное значение

}

