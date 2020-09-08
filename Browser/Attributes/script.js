/*
  elem.hasAttribute(name) – проверяет наличие атрибута.
  elem.getAttribute(name) – получает значение атрибута.
  elem.setAttribute(name, value) – устанавливает значение атрибута.
  elem.removeAttribute(name) – удаляет атрибут.
  elem.attributes коллекция объектов, которая принадлежит ко встроенному классу Attr со свойствами name и value

  У HTML-атрибутов есть следующие особенности:
    Их имена регистронезависимы (id то же самое, что и ID).
    Их значения всегда являются строками.

  Все атрибуты, в том числе те, которые мы установили, видны в outerHTML.

  свойство input.checked (для чекбоксов) имеет логический тип

  DOM-свойство href всегда содержит полный URL, даже если атрибут содержит относительный URL или просто #hash.
 */

console.log(document.body.getAttribute('something')); // non-standard

for (let attr of document.body.attributes) { // весь список
  console.log( `${attr.name} = ${attr.value}` );
}


/*
    Когда стандартный атрибут изменяется, соответствующее свойство автоматически обновляется.
    Это работает и в обратную сторону (за некоторыми исключениями).

 */

let input = document.querySelector('input');

// атрибут => свойство
input.setAttribute('id', 'id');
console.log(input.id); // id (обновлено)

// свойство => атрибут
input.id = 'newId';
console.log(input.getAttribute('id')); // newId (обновлено)

// Но есть и исключения, например, input.value синхронизируется только в одну сторону – атрибут → значение, но не в обратную
// атрибут => значение
input.setAttribute('value', 'text');
console.log(input.value); // text

// свойство => атрибут
input.value = 'newValue';
console.log(input.getAttribute('value')); // text (не обновилось!) (в браузере обновилось)


/*
  Атрибут style – строка, но свойство style является объектом:
 */
let div = document.getElementById('div')
console.log(div.getAttribute('style')); // color:red;font-size:120%

// объект
console.log(div.style); // [object CSSStyleDeclaration]
console.log(div.style.color); // red
div.style.color = 'green'

/*
  Все атрибуты, начинающиеся с префикса «data-», зарезервированы для использования программистами.
  Они доступны в свойстве dataset.
  Например, если у elem есть атрибут "data-about", то обратиться к нему можно как elem.dataset.about.
 */
console.log(document.body.dataset.about); // Elephants
console.log(document.body.dataset.orderState); // New
document.body.dataset.orderState = 'Closed' // New
