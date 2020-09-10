/*
  width: 300px;
  height: 200px;
  border: 25px solid #E8C48F;
  padding: 20px;
  overflow: scroll;

  В свойстве offsetParent находится предок элемента, который используется внутри браузера для вычисления координат при рендеринге.

  Существует несколько ситуаций, когда offsetParent равно null:
    Для скрытых элементов (с CSS-свойством display:none или когда его нет в документе).
    Для элементов <body> и <html>.
    Для элементов с position:fixed.

  Если элемент (или любой его родитель) имеет display:none или отсутствует в документе, то все его метрики равны нулю (или null, если это offsetParent).

  offsetLeft/offsetTop - содержат координаты x/y относительно верхнего левого угла offsetParent.
  offsetWidth/Height - содержат «внешнюю» ширину/высоту элемента, то есть его полный размер, включая рамки.
  clientTop/Left - (border) ширина левой/верхней рамки. Но на самом деле эти свойства – вовсе не ширины рамок,
                    а отступы внутренней части элемента от внешней.
  clientWidth/Height - размер области внутри рамок элемента. Они включают в себя ширину области содержимого вместе с
                       внутренними отступами padding без scroll
  scrollWidth/Height - Эти свойства – как clientWidth/clientHeight, но также включают в себя прокрученную (которую не видно) часть элемента.
  scrollLeft/scrollTop - ширина/высота невидимой, прокрученной в данный момент, части элемента слева и сверху.

  Не стоит брать width/height из CSS

  Ширина/высота окна
    document.documentElement.clientWidth/clientHeight
    Не window.innerWidth/Height, потому что включают в себя полосу прокрутки.


 */
console.log(example.offsetParent.id); // main
console.log(example.offsetLeft); // 180 (обратите внимание: число, а не строка "180px")
console.log(example.offsetTop); // 180
console.log(example.offsetWidth); // 390  25+20+285+20+15+25 = 390px
console.log(example.offsetHeight); // 290
console.log(example.clientLeft); // 25
console.log(example.clientTop); // 25
console.log(example.clientWidth); // 20+285+20 = 325px
console.log(example.clientHeight); // 20+200+20 = 240px
console.log(example.scrollWidth); // 325px
console.log(example.scrollHeight); // 382 полная внутренняя высота, включая прокрученную область.
console.log(example.scrollLeft); // 0
console.log(example.scrollTop); // 0 (при загрузке страницы)


console.log(document.documentElement.clientWidth); // 1050
console.log(document.documentElement.clientHeight); // 859


// распахнуть элемент на всю высоту
// example.style.height = `${example.scrollHeight}px`;

// example.scrollTop = 50;

let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

console.log('Полная высота документа с прокручиваемой частью: ' + scrollHeight);

// Получение текущей прокрутки
console.log('Текущая прокрутка сверху: ' + window.pageYOffset);
console.log('Текущая прокрутка слева: ' + window.pageXOffset);

/*
  Для прокрутки страницы из JavaScript её DOM должен быть полностью построен.
  Например, если мы попытаемся прокрутить страницу из скрипта в <head>, это не сработает.

  scrollBy(x,y) прокручивает страницу относительно её текущего положения. Например, scrollBy(0,10) прокручивает страницу на 10px вниз.
  scrollTo(pageX,pageY) прокручивает страницу на абсолютные координаты (pageX,pageY)

  Вызов elem.scrollIntoView(top) прокручивает страницу, чтобы elem оказался вверху. У него есть один аргумент:
    если top=true (по умолчанию), то страница будет прокручена, чтобы elem появился в верхней части окна. Верхний край элемента совмещён с верхней частью окна.
    если top=false, то страница будет прокручена, чтобы elem появился внизу. Нижний край элемента будет совмещён с нижним краем окна.

  Запретить прокрутку
    document.body.style.overflow = "hidden"
 */

