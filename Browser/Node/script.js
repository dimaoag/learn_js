/*
  Корнем иерархии является EventTarget, от него наследует Node и остальные DOM-узлы.

                                    EventTarget
                                         ^
                                         |
                                        Node
                       ___________ /   |   \_________
                   Text             Element         Comment
           <div>[Text]</div>      [<div></div>]     [<!-- comment -->]
                                         |   \______________
                                HTMLElement               SVGElement
                               /     |     \___________
                HTMLInputElement   HTMLBodyElement     HTMLAnchorElement
               <input type="...">     <body>            <a href="...">


      + EventTarget  – это корневой «абстрактный» класс. Объекты этого класса никогда не создаются.
                       Он служит основой, благодаря которой все DOM-узлы поддерживают так называемые «события».

      + Node – также является «абстрактным» классом, и служит основой для DOM-узлов.
               Он обеспечивает базовую функциональность: parentNode, nextSibling, childNodes и т.д. (это геттеры).
               Объекты класса Node никогда не создаются. Но есть определённые классы узлов, которые наследуют от него:
               Text – для текстовых узлов, Element – для узлов-элементов и более экзотический Comment – для узлов-комментариев.

      + Element – это базовый класс для DOM-элементов. Он обеспечивает навигацию на уровне элементов: nextElementSibling,
                  children и методы поиска: getElementsByTagName, querySelector. Браузер поддерживает не только HTML, но также XML и SVG.
                  Класс Element служит базой для следующих классов: SVGElement, XMLElement и HTMLElement.

      + HTMLElement – является базовым классом для всех остальных HTML-элементов. От него наследуют конкретные элементы:
                      HTMLInputElement – класс для тега <input>,
                      HTMLBodyElement – класс для тега <body>,
                      HTMLAnchorElement – класс для тега <a>,
                      …и т.д, каждому тегу соответствует свой класс, который предоставляет определённые свойства и методы.

      Для того, чтобы узнать имя класса DOM-узла, вспомним, что обычно у объекта есть свойство constructor.
 */

console.log( document.body.constructor.name ); // HTMLBodyElement
console.dir( document.body ); // [object HTMLBodyElement]

console.log( document.body instanceof HTMLBodyElement ); // true
console.log( document.body instanceof HTMLElement ); // true
console.log( document.body instanceof Element ); // true
console.log( document.body instanceof Node ); // true
console.log( document.body instanceof EventTarget ); // true

/*
  Свойство nodeType предоставляет ещё один, «старомодный» способ узнать «тип» DOM-узла.

    elem.nodeType == 1 для узлов-элементов,
    elem.nodeType == 3 для текстовых узлов,
    elem.nodeType == 9 для объектов документа,

  Мы не можем изменить значение nodeType, только прочитать его.

  Получив DOM-узел, мы можем узнать имя его тега из свойств nodeName и tagName
  Свойство tagName есть только у элементов Element.
 */

console.log( document.body.nodeName ); // BODY
console.log( document.body.tagName ); // BODY


/*
  Свойство innerHTML позволяет получить HTML-содержимое элемента в виде строки.
  Будьте внимательны: «innerHTML+=» осуществляет перезапись. Старое содержимое удаляется.
  Свойство innerHTML есть только у узлов-элементов
 */
console.log( document.body.innerHTML ); // читаем текущее содержимое
// document.body.innerHTML = 'Новый BODY!'; // заменяем содержимое


/*
  Свойство outerHTML содержит HTML элемента целиком. Это как innerHTML плюс сам элемент.
 */
let elem = document.getElementById('elem-content');
console.log(elem.outerHTML); // <div id="elem-content">Element</div>

/*
  nodeValue/data: содержимое текстового узла

 */
let text = document.body.firstChild;
console.log(text.data); // Привет

/*
  Свойство textContent предоставляет доступ к тексту внутри элемента за вычетом всех <тегов>.
 */
let news = document.getElementById('news');
console.log(news.textContent); // Срочно в номер! Марсиане атаковали человечество!

/*
  Атрибут и DOM-свойство «hidden» указывает на то, видим ли мы элемент или нет.
  Технически, hidden работает так же, как style="display:none". Но его применение проще.
 */
let hidden = document.getElementById('hidden');
// hidden.hidden = true
setInterval(() => hidden.hidden = !hidden.hidden, 1000);  // Мигающий элемент

/*
  У DOM-элементов есть дополнительные свойства, в частности, зависящие от класса:

    value – значение для <input>, <select> и <textarea> (HTMLInputElement, HTMLSelectElement…).
    href – адрес ссылки «href» для <a href="..."> (HTMLAnchorElement).
    id – значение атрибута «id» для всех элементов (HTMLElement).
    …и многие другие…
 */

