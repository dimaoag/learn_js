/*
    int = 23;
    BigInt 2^53
 */
{
    let billion = 1e9;  // 1 миллиард, буквально: 1 и 9 нулей
    let ms = 1e-6; // шесть нулей, слева от 1; 0.000001;
    console.log(ms);  // 7.3 миллиардов (7 300 000 000)
    console.log( 7.3e9 );  // 7.3 миллиардов (7 300 000 000)

    let num = 255;

    console.log( num.toString(10) );  // 255
    console.log( num.toString(16) );  // ff
    console.log( num.toString(2) );   // 11111111
    console.log( 255..toString(2) );  // 11111111
}
// Округление
{
    /*
        0-4 <; 5-9 >;
        Math.floor  - Округление в меньшую сторону: 3.1 становится 3, а -1.1 — -2
        Math.ceil   - Округление в большую сторону: 3.1 становится 4, а -1.1 — -1
        Math.round  - Округление до ближайшего целого: 3.1 становится 3, 3.6 — 4, а -1.1 — -1.
        Math.trunc (не поддерживается в Internet Explorer) - Производит удаление дробной части без округления:
        3.1 становится 3, а -1.1 — -1
     */
    let num = 1.23456;

    console.log( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    console.log( +num.toFixed(2) ); // "1.23" - return string
}
// Неточные вычисления
{
    /*
        Внутри JavaScript число представлено в виде 64-битного формата IEEE-754.
        Для хранения числа используется 64 бита: 52 из них используется для хранения цифр,
        11 из них для хранения положения десятичной точки (если число целое, то хранится 0),
        и один бит отведён на хранение знака.
        Если число слишком большое, оно переполнит 64-битное хранилище, JavaScript вернёт бесконечность:
     */
    console.log( 1e500 ); // Infinity
    console.log( 0.1 + 0.2 == 0.3 ); // false
    console.log( (0.1 + 0.2).toFixed(1) == 0.3 ); // true
    console.log( 0.1 + 0.2 ); // 0.30000000000000004
    console.log( 0.1.toFixed(20) ); // 0.10000000000000000555
    console.log( 0.3.toFixed(20) ); // 0.29999999999999998890
}
// Проверка: isFinite и isNaN
{
    /*
     - Infinity (и -Infinity) — особенное численное значение, которое ведёт себя в точности как математическая бесконечность ∞.
     - NaN - представляет ошибку.
     */

    // isNaN(value) преобразует значение в число и проверяет является ли оно NaN
    console.log( isNaN(NaN) ); // true
    console.log( isNaN("str") ); // true
    console.log( NaN === NaN ); // false

    // isFinite(value) преобразует аргумент в число и возвращает true, если оно является обычным числом,
    // т.е. не NaN/Infinity/-Infinity
    console.log( isFinite("15") ); // true
    console.log( isFinite("str") ); // false, потому что специальное значение: NaN
    console.log( isFinite(Infinity) ); // false, потому что специальное значение: Infinity
    console.log(Object.is(NaN, NaN));
    console.log(Object.is(0, -0));
}
// parseInt и parseFloat
{
    console.log( parseInt('100px') ); // 100
    console.log( parseFloat('12.5em') ); // 12.5

    console.log( parseInt('12.3') ); // 12, вернётся только целая часть
    console.log( parseFloat('12.3.4') ); // 12.3, произойдёт остановка чтения на второй точке

    console.log( Math.random() ); // 0.1234567894322
    console.log( Math.random() ); // 0.5435252343232

    console.log( Math.max(3, 5, -10, 0, 1) ); // 5
    console.log( Math.min(1, 2) ); // 1
    console.log( Math.pow(2, 10) ); // 2 в степени 10 = 1024


    function randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    console.log( randomInteger(1, 100) ); // 34

}
