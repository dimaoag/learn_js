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
