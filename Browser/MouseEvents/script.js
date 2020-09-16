/*
  Типы событий мыши:
    - Простые события:
      - mousedown/mouseup - Кнопка мыши нажата/отпущена над элементом.
      - mouseover/mouseout - Курсор мыши появляется над элементом и уходит с него.
      - mousemove - Каждое движение мыши над элементом генерирует это событие.
      - contextmenu - Вызывается при попытке открытия контекстного меню, как правило, нажатием правой кнопки мыши.

    - Комплексные события:
      - click - Вызывается при mousedown , а затем mouseup над одним и тем же элементом, если использовалась левая кнопка мыши.
      - dblclick - Вызывается двойным кликом на элементе.


  Порядок событий
    - event.which == 1 (левая кнопка мыши, один тап пальцем) mousedown ->| mouseup -> click
    - event.which == 2 (средня кнопка мыши) mousedown ->| mouseup
    - event.which == 3 (правая кнопка мыши, двома пальцами) mousedown -> contextmenu ->| mouseup

  если задержка между ними более 1 секунды, то они разделяются чертой

  Все события мыши включают в себя информацию о нажатых клавишах-модификаторах.
  Свойства объекта события: ()
    shiftKey: Shift
    altKey: Alt (или Opt для Mac)
    ctrlKey: Ctrl
    metaKey: Cmd для Mac
  Они равны true, если во время события была нажата соответствующая клавиша.

  Все события мыши имеют координаты двух видов:
    Относительно окна: clientX и clientY.
    Относительно документа: pageX и pageY.


 */

button.onclick = function(event) {
  if (event.altKey && event.shiftKey) {
    alert('Ура!');
  }
};

/*
  События mouseover/mouseout, relatedTarget

  Событие mouseover происходит в момент, когда курсор оказывается над элементом, а событие mouseout – в момент, когда курсор уходит с элемента.

  Эти события являются особенными, потому что у них имеется свойство relatedTarget. Оно «дополняет» target.
  Когда мышь переходит с одного элемента на другой, то один из них будет target, а другой relatedTarget.

  Для события mouseover:
    event.target – это элемент, на который курсор перешёл.
    event.relatedTarget – это элемент, с которого курсор ушёл (relatedTarget → target).

  Для события mouseout наоборот:
    event.target – это элемент, с которого курсор ушёл.
    event.relatedTarget – это элемент, на который курсор перешёл (target → relatedTarget).

  Свойство relatedTarget может быть null.
 */

container.onmouseover = container.onmouseout = handler;

function handler(event) {

  function str(el) {
    if (!el) return "null"
    return el.className || el.tagName;
  }

  log.value += event.type + ':  ' +
    'target=' + str(event.target) +
    ',  relatedTarget=' + str(event.relatedTarget) + "\n ---------------------------------------- \n";
  log.scrollTop = log.scrollHeight;

  if (event.type == 'mouseover') {
    event.target.style.background = 'pink'
  }
  if (event.type == 'mouseout') {
    event.target.style.background = ''
  }
}

/*
  Пропуск элементов

  Если был mouseover, то будет и mouseout
  По логике браузера, курсор мыши может быть только над одним элементом в любой момент времени – над самым глубоко вложенным и верхним по z-index.
*/

function mouselog(event) {
  let d = new Date();
  text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
  text.scrollTop = text.scrollHeight;
}


/*
mouseenter/mouseleave похожи на mouseover/mouseout. Они тоже генерируются, когда курсор мыши переходит на элемент или покидает его.

  Но есть и пара важных отличий:
  Переходы внутри элемента, на его потомки и с них, не считаются.
  События mouseenter/mouseleave не всплывают.

*/


function mouselog2(event) {
  let d = new Date();
  text2.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
  text2.scrollTop = text.scrollHeight;
}

/*
  Делегирование событий


 */

// ячейка <td> под курсором в данный момент (если есть)
let currentElem = null;

table.onmouseover = function(event) {
  // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
  // если currentElem есть, то мы ещё не ушли с предыдущего <td>,
  // это переход внутри - игнорируем такое событие
  if (currentElem) return;

  let target = event.target.closest('td');

  // переход не на <td> - игнорировать
  if (!target) return;

  // переход на <td>, но вне нашей таблицы (возможно при вложенных таблицах)
  // игнорировать
  if (!table.contains(target)) return;

  // ура, мы зашли на новый <td>
  currentElem = target;
  target.style.background = 'pink';
};


table.onmouseout = function(event) {
  // если мы вне <td>, то игнорируем уход мыши
  // это какой-то переход внутри таблицы, но вне <td>,
  // например с <tr> на другой <tr>
  if (!currentElem) return;

  // мы покидаем элемент – но куда? Возможно, на потомка?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
    // если да, то это переход внутри элемента – игнорируем
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // мы действительно покинули элемент
  currentElem.style.background = '';
  currentElem = null;
};

