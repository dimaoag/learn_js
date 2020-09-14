/*
  Делегирование событий

 */
let selectedTd;

table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return;

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};

function highlight(td) {
  if (selectedTd) { // убрать существующую подсветку, если есть
    selectedTd.style.backgroundColor = null;
  }
  selectedTd = td;
  selectedTd.style.backgroundColor = 'red'; // подсветить новый td
}


class Menu {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this); // (*)
  }

  save() {
    console.log('сохраняю');
  }

  load() {
    console.log('загружаю');
  }

  search() {
    console.log('ищу');
  }

  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  };
}

new Menu(menu);

// Поведение: «Счётчик»

document.addEventListener('click', function(event) {

  if (event.target.dataset.counter != undefined) { // если есть атрибут...
    event.target.value++;
  }

});

// Поведение: «Переключатель» (Toggler)

document.addEventListener('click', function(event) {
  let id = event.target.dataset.toggleId;
  if (!id) return;

  let elem = document.getElementById(id);

  elem.hidden = !elem.hidden;
});

/*
  Отмена действия браузера

  Есть два способа отменить действие браузера:
    Основной способ – это воспользоваться объектом event. Для отмены действия браузера существует стандартный метод event.preventDefault().
    Если же обработчик назначен через on<событие> (не через addEventListener), то также можно вернуть false из обработчика.

 */

menu2.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  console.log( href ); // может быть подгрузка с сервера, генерация интерфейса и т.п.

  return false; // отменить действие браузера (переход по ссылке)
};

/*
  События, вытекающие из других

  Например, событие mousedown для поля <input> приводит к фокусировке на нём и запускает событие focus.
  Если мы отменим событие mousedown, то фокусирования не произойдёт.

  Как мы можем видеть, event.stopPropagation() и event.preventDefault() (также известный как return false) –
  это две разные функции. Они никак не связаны друг с другом.
 */

elem2.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  alert("Контекстное меню кнопки");
};

document.oncontextmenu = function(event) {
  event.preventDefault();
  alert("Контекстное меню документа");
};

/*
  Custom events

  Событие встроенного класса Event можно создать так: let event = new Event(type[, options]);
    type – тип события, строка, например "click" или же любой придуманный нами – "my-event".
    options – объект с тремя необязательными свойствами:
      bubbles: true/false – если true, тогда событие всплывает.
      cancelable: true/false – если true, тогда можно отменить действие по умолчанию. Позже мы разберём, что это значит для пользовательских событий.
      composed: true/false – если true, тогда событие будет всплывать наружу за пределы Shadow DOM. Позже мы разберём это в разделе Веб-компоненты.

  Можно легко отличить «настоящее» событие от сгенерированного кодом.
  Свойство event.isTrusted принимает значение true для событий, порождаемых реальными действиями пользователя, и false для генерируемых кодом.
 */

let event = new Event("click");
elem3.dispatchEvent(event);

// ловим на document...
document.addEventListener("hello", function(event) { // (1)
  console.log("Привет от " + event.target.tagName); // Привет от H1
});

// ...запуск события на элементе!
event = new Event("hello", {bubbles: true}); // (2)
elem4.dispatchEvent(event);

/*
  Вот небольшой список конструкторов для различных событий пользовательского интерфейса,
  которые можно найти в спецификации UI Event:
    UIEvent
    FocusEvent
    MouseEvent
    WheelEvent
    KeyboardEvent
    …
  Стоит использовать их вместо new Event, если мы хотим создавать такие события. К примеру, new MouseEvent("click").

  Для генерации событий совершенно новых типов, таких как "hello", следует использовать конструктор new CustomEvent.
  У второго аргумента-объекта есть дополнительное свойство detail, в котором можно указывать информацию для передачи в событие.
 */

// дополнительная информация приходит в обработчик вместе с событием
elem5.addEventListener("hello", function(event) {
  console.log(event.detail.name);
});

elem5.dispatchEvent(new CustomEvent("hello", {
  detail: { name: "Вася" }
}));

// hide() будет вызван автоматически через 2 секунды
function hide() {
  let event = new CustomEvent("hide", {
    cancelable: true // без этого флага preventDefault не сработает
  });
  if (!rabbit.dispatchEvent(event)) {
    alert('Действие отменено обработчиком');
  } else {
    rabbit.hidden = true;
  }
}

rabbit.addEventListener('hide', function(event) {
  if (confirm("Вызвать preventDefault?")) {
    event.preventDefault();
  }
});

/*
  Вложенные события обрабатываются синхронно

 */

