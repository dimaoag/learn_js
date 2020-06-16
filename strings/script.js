// Кавычки
{
    let single = 'single-quoted';
    let double = "double-quoted";

    let backticks = `backticks`;

    function sum(a, b) {
        return a + b;
    }

    console.log(`1 + 2 = ${sum(1, 2)}`); // 1 + 2 = 3
    let guestList = `Guests:
     * John
     * Pete
     * Mary
    `;

    console.log(guestList); // список гостей, состоящий из нескольких строк with tabulations

    let guestList1 = "Guests:\n * John\n * Pete\n * Mary";

    console.log(guestList1); // список гостей, состоящий из нескольких стро

    console.log( 'I\'m the Walrus!' ); // I'm the Walrus!
    console.log( `I'm the Walrus!` );  // I'm the Walrus!
    console.log( `My\n`.length ); // 3

    let str = `Hello`;

    // получаем первый символ
    console.log( str[0] ); // H
    console.log( str.charAt(0) ); // H

    // получаем последний символ
    console.log( str[str.length - 1] ); // o

    for (let char of "Hello") {
        console.log(char); // H,e,l,l,o (char — сначала "H", потом "e", потом "l" и т. д.)
    }

    console.log( 'Interface'.toUpperCase() ); // INTERFACE
    console.log( 'Interface'.toLowerCase() ); // interface

    console.log( ' Interface '.trim() ); // Interface — убирает пробелы в начале и конце строки.
}

{
    // str.indexOf(substr, pos) - Он ищет подстроку substr в строке str,
    // начиная с позиции pos, и возвращает позицию, на которой располагается совпадение, либо -1 при отсутствии совпадений.
    let str = 'Widget with id';

    console.log( str.indexOf('Widget') ); // 0, потому что подстрока 'Widget' найдена в начале
    console.log( str.indexOf('widget') ); // -1, совпадений нет, поиск чувствителен к регистру

    console.log( str.indexOf("with") ); // 7, подстрока "with" найдена на позиции 7
    console.log( str.indexOf('id', 2) ) // 12
    // str.lastIndexOf(substr, position), который ищет с конца строки к её началу.
}

{
    //  str.includes(substr, pos) возвращает true, если в строке str есть подстрока substr, либо false, если нет.
    console.log( "Widget with id".includes("Widget") ); // true
    console.log( "Hello".includes("Bye") ); // false
    console.log( "Midget".includes("id", 3) ); // false, поиск начат с позиции 3

    // Методы str.startsWith и str.endsWith проверяют, соответственно, начинается ли и заканчивается ли строка определённой строкой:
    console.log( "Widget".startsWith("Wid") ); // true, "Wid" — начало "Widget"
    console.log( "Widget".endsWith("get") ); // true, "get" — окончание "Widget"
}
// Получение подстроки
{
    // str.slice(start [, end]) - Возвращает часть строки от start до (не включая) end.
    let str = "stringify";
    console.log( str.slice(2) ); // ringify, с позиции 2 и до конца
    console.log( str.slice(0, 5) ); // 'strin', символы от 0 до 5 (не включая 5)

    //Также для start/end можно задавать отрицательные значения.
    // Это означает, что позиция определена как заданное количество символов с конца строки:
    console.log( str.slice(-4, -1) ); // gif начинаем с позиции 4 справа, а заканчиваем на позиции 1 справа

    // str.substring(start [, end]) — почти то же, что и slice, но можно задавать start больше end
    // Отрицательные значения substring, в отличие от slice, не поддерживает, они интерпретируются как 0
    console.log( str.substring(2, 6) ); // "ring"
    console.log( str.substring(6, 2) ); // "ring"

    // str.substr(start [, length]) - Возвращает часть строки от start длины length.
    console.log( str.substr(2, 4) ); // ring, получаем 4 символа, начиная с позиции 2
}