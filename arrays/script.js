{
    let arr = new Array();
    let arr1 = [];
    let fruits = ["Яблоко", "Апельсин", "Слива"];

    console.log( fruits ); // [ 'Яблоко', 'Апельсин', 'Слива' ]
    console.log( fruits.length ); // 3
    // разные типы значений
    let arr2 = [ 'Яблоко', { name: 'Джон' }, true, function() { console.log('привет'); } ];

    // получить элемент с индексом 1 (объект) и затем показать его свойство
    console.log( arr2[1].name ); // Джон

    // получить элемент с индексом 3 (функция) и выполнить её
    arr2[3](); // привет
}
// queue - «первый пришёл — первый вышел» (FIFO, англ. first in, first out).
{
    // unshift Добавляет элемент в начало массива:
    let fruits = ["Апельсин", "Груша"];
    fruits.unshift('Яблоко');
    console.log( fruits ); // Яблоко, Апельсин, Груша

    // shift удаляет элемент в начале, сдвигая очередь, так что второй элемент становится первым.
    let fruits1 = ["Яблоко", "Апельсин", "Груша"];
    console.log( fruits1.shift() ); // удаляем Яблоко и выводим его
    console.log( fruits1 ); // Апельсин, Груша



}
// stack - «последним пришёл — первым вышел» (LIFO англ. last in — first out).
{
    // push добавляет элемент в конец.
    let fruits1 = ["Яблоко", "Апельсин"];
    fruits1.push("Груша");
    console.log( fruits1 ); // Яблоко, Апельсин, Груша

    // pop удаляет последний элемент.
    let fruits = ["Яблоко", "Апельсин", "Груша"];
    console.log( fruits.pop() ); // удаляем "Груша" и выводим его
    console.log( fruits ); // Яблоко, Апельсин
}
// for and for of
{
    let arr = ["Яблоко", "Апельсин", "Груша"];

    for (let i = 0; i < arr.length; i++) {
        console.log( arr[i] );
    }

    let fruits = ["Яблоко", "Апельсин", "Слива"];

    // проходит по значениям
    for (let fruit of fruits) {
        console.log( fruit );
    }
}
// length
{
    let fruits = [];
    fruits[123] = "Яблоко";

    console.log( fruits.length ); // 124
    console.log( fruits[10] ); // undefined

    // length – его можно перезаписать

    let arr = [1, 2, 3, 4, 5];

    arr.length = 2; // укорачиваем до двух элементов
    console.log( arr ); // [1, 2]

    arr.length = 5; // возвращаем length как было
    console.log( arr[3] ); // undefined: значения не восстановились

    // самый простой способ очистить массив – это arr.length = 0;
}
// splice(pos, deleteCount, ...items) – начиная с индекса pos, удаляет deleteCount(не включая deleteCount) элементов и вставляет items
{
    // Умеет всё: добавлять, удалять и заменять элементы.

    // delete
    let arr = ["Я", "изучаю", "JavaScript"];
    let res = arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент ()
    console.log( res ); // изучаю
    console.log( arr ); // осталось ["Я", "JavaScript"]

    // update
    let arr1 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
    let res1 = arr1.splice(0, 3, "Давай", "танцевать"); // удалить 3 первых элемента и заменить их другими
    console.log( res1 ) // [ 'Я', 'изучаю', 'JavaScript' ]
    console.log( arr1 ) // теперь ["Давай", "танцевать", "прямо", "сейчас"]

    // add
    // Метод splice также может вставлять элементы без удаления, для этого достаточно установить deleteCount в 0
    let arr2 = ["Я", "изучаю", "JavaScript"];
    arr2.splice(2, 0, "сложный", "язык"); // с позиции 2 удалить 0 элементов вставить "сложный", "язык"
    console.log( arr2 ); // "Я", "изучаю", "сложный", "язык", "JavaScript"
}
// slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end (не включая end).
{
    let arr = ["t", "e", "s", "t"];
    let res = arr.slice(1, 3) // e,s (копирует с 1 до 3)
    console.log( res );
}
// concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items
{
    let arr = [1, 2];

    // создать массив из: arr и [3,4]
    console.log(res1 = arr.concat([3, 4]) ); // 1,2,3,4

    // создать массив из: arr и [3,4] и [5,6]
    console.log(res2 = arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

    // создать массив из: arr и [3,4], потом добавить значения 5 и 6
    console.log(res3 =  arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
}
// forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.
{
    ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
        console.log(`${item} имеет позицию ${index} в ${array}`);
    });
}
// Поиск в массиве
{
    // arr.indexOf(item, from) ищет item, начиная с индекса from, и возвращает индекс, на котором был найден искомый элемент, в противном случае -1
    let arr = [1, 0, false];

    console.log( arr.indexOf(0) ); // 1
    console.log( arr.indexOf(1) ); // 0
    console.log( arr.indexOf(1, 1) ); // -1 not found
    console.log( arr.indexOf(false) ); // 2
    console.log( arr.indexOf(null) ); // -1

    // arr.lastIndexOf(item, from) – то же самое, но ищет справа налево.

    // arr.includes(item, from) – ищет item, начиная с индекса from, и возвращает true, если поиск успешен.
    console.log( arr.includes(1) ); // true

    // find(item, index, array)
    let result = arr.find(function(item, index, array) {
        // если true - возвращается текущий элемент и перебор прерывается
        // если все итерации оказались ложными, возвращается undefined
    });

    let users = [
        {id: 1, name: "Вася"},
        {id: 2, name: "Петя"},
        {id: 3, name: "Маша"}
    ];

    let user = users.find(item => item.id == 1);

    console.log(user.name); // Вася


    // findIndex(item, index, array) по сути, то же самое, но возвращает индекс, на котором был найден элемент,
    console.log( users.findIndex(item => item.id == 2) ); // 1

    // filter(item, index, array)
    let results = arr.filter(function(item, index, array) {
        // если true - элемент добавляется к результату, и перебор продолжается
        // возвращается пустой массив в случае, если ничего не найдено
    });
}