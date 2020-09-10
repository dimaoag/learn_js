/*
  Большинство соответствующих методов JavaScript работают в одной из двух указанных ниже систем координат:

    Относительно окна браузера – как position:fixed, отсчёт идёт от верхнего левого угла окна.
    мы будем обозначать эти координаты как clientX/clientY, причина выбора таких имён будет ясна позже, когда мы изучим свойства событий.

    Относительно документа – как position:absolute на уровне документа, отсчёт идёт от верхнего левого угла документа.
    мы будем обозначать эти координаты как pageX/pageY.

  Координаты относительно окна: getBoundingClientRect:
    elem.getBoundingClientRect() - возвращает координаты в контексте окна для минимального по размеру прямоугольника,
    который заключает в себе элемент elem, в виде объекта встроенного класса DOMRect.

    Основные свойства объекта типа DOMRect:

      x/y – X/Y-координаты начала прямоугольника относительно окна,
      width/height – ширина/высота прямоугольника (могут быть отрицательными).
      Дополнительные, «зависимые», свойства:

      top/bottom – Y-координата верхней/нижней границы прямоугольника,
      left/right – X-координата левой/правой границы прямоугольника.

  Все координаты в контексте окна считаются от верхнего левого угла, включая right/bottom.

  document.elementFromPoint(x, y) возвращает самый глубоко вложенный элемент в окне, находящийся по координатам (x, y)
  Для координат за пределами окна метод elementFromPoint возвращает null

  Любая точка на странице имеет координаты:
    Относительно окна браузера – elem.getBoundingClientRect().
    Относительно документа – elem.getBoundingClientRect() плюс текущая прокрутка страницы.

 */

console.log(example.getBoundingClientRect());

let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

// elem.style.background = "red";
console.log(elem.tagName);





// получаем координаты элемента в контексте документа
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function createMessageUnder(elem, html) {
  // создаём элемент, который будет содержать сообщение
  let message = document.createElement('div');
  // для стилей лучше было бы использовать css-класс здесь
  message.style.cssText = "position:fixed; color: red";

  // устанавливаем координаты элементу, не забываем про "px"!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}

function createMessageUnder2(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "position:absolute; color: red";

  let coords = getCoords(elem);

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}

// Использование:
// добавим сообщение на страницу на 5 секунд
let message = createMessageUnder(some, 'Hello, world!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);
