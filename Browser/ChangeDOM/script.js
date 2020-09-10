//

/*
  Создание элемента

    document.createElement(tag)
    document.createTextNode(text)

  Методы вставки

    node.append(...nodes or strings) – добавляет узлы или строки в конец node,
    node.prepend(...nodes or strings) – вставляет узлы или строки в начало node,
    node.before(...nodes or strings) –- вставляет узлы или строки до node,
    node.after(...nodes or strings) –- вставляет узлы или строки после node,
    node.replaceWith(...nodes or strings) –- заменяет node заданными узлами или строками.

  elem.insertAdjacentHTML(where, html)
    "beforebegin" – вставить html непосредственно перед elem,
    "afterbegin" – вставить html в начало elem,
    "beforeend" – вставить html в конец elem,
    "afterend" – вставить html непосредственно после elem.

  У метода есть два брата:
    elem.insertAdjacentText(where, text) – такой же синтаксис, но строка text вставляется «как текст», вместо HTML,
    elem.insertAdjacentElement(where, elem) – такой же синтаксис, но вставляет элемент elem.

  Удаление узлов
    node.remove()

  Клонирование узлов: cloneNode
    elem.cloneNode(true) создаёт «глубокий» клон элемента – со всеми атрибутами и дочерними элементами.
    elem.cloneNode(false), тогда клон будет без дочерних элементов.

 */

let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

document.body.append(div);

div.insertAdjacentHTML('afterend', '<p>привет</p>');

setTimeout(() => div.remove(), 1000);

let div2 = div.cloneNode(true); // клонировать сообщение
div2.querySelector('strong').innerHTML = 'Всем пока!'; // изменить клонированный элемент
div.after(div2); // показать клонированный элемент после существующего div




