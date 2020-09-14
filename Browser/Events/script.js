
/*

  DOMContentLoaded – когда HTML загружен и обработан, DOM документа полностью построен и доступен.

  Обработчик всегда хранится в свойстве DOM-объекта, а атрибут – лишь один из способов его инициализации.
 */

elem.onclick = () => console.log('Спасибо')

elem.onclick = null

/*
  Функция должна быть присвоена как sayThanks, а не sayThanks()

  Внутри обработчика события this ссылается на текущий элемент, то есть на тот, на котором, как говорят, «висит» (т.е. назначен) обработчик.
 */

function sayThanks() {
  console.log(this.value);
}

elem.onclick = sayThanks;

/*
  element.addEventListener(event, handler[, options]); - позволяет назначить несколько обработчиков

    - event - Имя события, например "click".
    - handler - Ссылка на функцию-обработчик.
    - options - Дополнительный объект со свойствами:
      - once: если true, тогда обработчик будет автоматически удалён после выполнения.
      - capture: фаза, на которой должен сработать обработчик
      - passive: если true, то указывает, что обработчик никогда не вызовет preventDefault()

    Для удаления нужно передать именно ту функцию-обработчик которая была назначена.
    Обратим внимание – если функцию обработчик не сохранить где-либо, мы не сможем её удалить.
    Нет метода, который позволяет получить из элемента обработчики событий, назначенные через addEventListener.
 */

function handler() {
  console.log( 'Спасибо2!' );
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);

function handler1() {
  console.log('Спасибо!');
};

function handler2() {
  console.log('Спасибо ещё раз!');
}

button2.addEventListener("click", handler1); // Спасибо!
button2.addEventListener("click", handler2); // Спасибо ещё раз!

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM построен"); // а вот так сработает
});

/*
  Объект события - Когда происходит событие, браузер создаёт объект события, записывает в него детали
                   и передаёт его в качестве аргумента функции-обработчику.


  Некоторые свойства объекта event:
    - event.type Тип события, в данном случае "click".
    - event.currentTarget - Элемент, на котором сработал обработчик.
    - event.clientX / event.clientY Координаты курсора в момент клика относительно окна, для событий мыши.

 */
elem.onclick = function(event) {
  // вывести тип события, элемент и координаты клика
  console.log(event.type + " на " + event.currentTarget.id);
  console.log("Координаты: " + event.clientX + ":" + event.clientY);
};

/*
  Объект-обработчик: handleEvent

  Мы можем назначить обработчиком не только функцию, но и объект при помощи addEventListener.
  В этом случае, когда происходит событие, вызывается метод объекта handleEvent


 */

class Menu {
  handleEvent(event) {
    // mousedown -> onMousedown
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onMousedown() {
    elem3.innerHTML = "Кнопка мыши нажата";
  }

  onMouseup() {
    elem3.innerHTML += "...и отжата.";
  }
}

let menu = new Menu();
elem3.addEventListener('mousedown', menu);
elem3.addEventListener('mouseup', menu);

/*
  Всплытие
    Когда на элементе происходит событие, обработчики сначала срабатывают на нём, потом на его родителе,
    затем выше и так далее, вверх по цепочке предков.


  <form onclick="alert('form')">FORM
    <div onclick="alert('div')">DIV
      <p onclick="alert('p')">P</p>
    </div>
  </form>

  Клик по внутреннему <p> вызовет обработчик onclick:
    Сначала на самом <p>.
    Потом на внешнем <div>.
    Затем на внешнем <form>.
    И так далее вверх по цепочке до самого document

  event.target - Самый глубокий элемент, который вызывает событие, называется целевым элементом

  Отличия от this (=event.currentTarget):
    event.target – это «целевой» элемент, на котором произошло событие, в процессе всплытия он неизменен.
    this – это «текущий» элемент, до которого дошло всплытие, на нём сейчас выполняется обработчик.

  event.stopPropagation() препятствует продвижению события дальше, но на текущем элементе все обработчики будут вызваны.
  event.stopImmediatePropagation(). Он не только предотвращает всплытие, но и останавливает обработку событий на текущем элементе.

  Не прекращайте всплытие без необходимости!




  Погружение

  Стандарт DOM Events описывает 3 фазы прохода события:
    Фаза погружения (capturing phase) – событие сначала идёт сверху вниз.
    Фаза цели (target phase) – событие достигло целевого(исходного) элемента.
    Фаза всплытия (bubbling stage) – событие начинает всплывать.

  То есть при клике на <td> событие путешествует по цепочке родителей сначала вниз к элементу (погружается),
  затем оно достигает целевой элемент (фаза цели), а потом идёт наверх (всплытие), вызывая по пути обработчики.

  Обработчики, добавленные через on<event>-свойство или через HTML-атрибуты, или через addEventListener(event, handler)
  с двумя аргументами, ничего не знают о фазе погружения, а работают только на 2-ой и 3-ей фазах.

  elem.addEventListener(..., {capture: true})
  // или просто "true", как сокращение для {capture: true}
  elem.addEventListener(..., true)

  Обратите внимание, что хоть и формально существует 3 фазы, 2-ую фазу («фазу цели»: событие достигло элемента)
  нельзя обработать отдельно, при её достижении вызываются все обработчики: и на всплытие, и на погружение.


  Чтобы убрать обработчик removeEventListener, нужна та же фаза
  Если мы добавили обработчик вот так addEventListener(..., true), то мы должны передать то же значение
  аргумента capture в removeEventListener(..., true), когда снимаем обработчик.

  На каждой фазе разные обработчики на одном элементе срабатывают в порядке назначения

 */

for(let elem of document.querySelectorAll('.from_wrapper *')) {

  elem.addEventListener("click", e => alert(`Погружение: ${elem.tagName}`), true);
  elem.addEventListener("click", e => alert(`Всплытие: ${elem.tagName}`));

}


