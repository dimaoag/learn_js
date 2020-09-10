/*
  className и classList
    elem.className соответствует атрибуту "class".
    elem.classList – это специальный объект с методами для добавления/удаления одного класса

    Методы classList:
      elem.classList.add/remove("class") – добавить/удалить класс.
      elem.classList.toggle("class") – добавить класс, если его нет, иначе удалить.
      elem.classList.contains("class") – проверка наличия класса, возвращает true/false.

  elem.style – это объект, который соответствует тому, что написано в атрибуте "style"
    background-color  => elem.style.backgroundColor
    z-index           => elem.style.zIndex

  Полная перезапись style.cssText - удаляет все существующие стили: оно не добавляет, а заменяет их.
  То же самое можно сделать установкой атрибута: div.setAttribute('style', 'color: red...').


  Свойство style оперирует только значением атрибута "style", без учёта CSS-каскада.
  Поэтому, используя elem.style, мы не можем прочитать ничего, что приходит из классов CSS

  getComputedStyle(element, [pseudo]) - объект со стилями, похожий на elem.style, но с учётом всех CSS-классов. (pseudo = ::before)

 */

console.log(document.body.className); // wrapper some
document.body.classList.add('main');

for (let name of document.body.classList) {
  console.log(name); // wrapper, затем some, main
}

// document.body.style.backgroundColor =  'green';

div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

let computedStyle = getComputedStyle(document.body);
console.log( computedStyle.marginTop ); // 5px
console.log( computedStyle.color ); // rgb(255, 0, 0)


