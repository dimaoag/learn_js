/*
  Формы в документе входят в специальную коллекцию document.forms
    document.forms.my - форма с именем "my" (name="my")
    document.forms[0] - первая форма в документе

  Может быть несколько элементов с одним и тем же именем, это часто бывает с кнопками-переключателями radio.
  В этом случае form.elements[name] является коллекцией, например:

  вместо form.elements.login мы можем написать form.login.

 */

// получаем форму
let form = document.forms.my; // <form name="my"> element

// получаем элемент
let elem = form.elements.one; // <input name="one"> element

console.log(elem.value); // 1
console.log(elem.form); // HTMLFormElement

/*
  input и textarea
  К их значению можно получить доступ через свойство input.value (строка) или input.checked (булево значение) для чекбоксов.
    input.value = "Новое значение";
    textarea.value = "Новый текст";
    input.checked = true; // для чекбоксов и переключателей


  select и option
  Элемент <select> имеет 3 важных свойства:
    select.options – коллекция из подэлементов <option>,
    select.value – значение выбранного в данный момент <option>,
    select.selectedIndex – номер выбранного <option>.

  Они дают три разных способа установить значение в <select>:
    Найти соответствующий элемент <option> и установить в option.selected значение true.
    Установить в select.value значение нужного <option>.
    Установить в select.selectedIndex номер нужного <option>.
 */

// все три строки делают одно и то же
form.select.options[2].selected = true;
form.select.selectedIndex = 2;
form.select.value = 'banana';

/*
  Создания элемента <option>
  option = new Option(text, value, defaultSelected, selected);
    Параметры:
      text – текст внутри <option>,
      value – значение,
      defaultSelected – если true, то ставится HTML-атрибут selected,
      selected – если true, то элемент <option> будет выбранным.

  Элементы <option> имеют свойства:
    option.selected - Выбрана ли опция.
    option.index - Номер опции среди других в списке <select>.
    option.text - Содержимое опции (то, что видит посетитель).
 */
let option = new Option("Манго", "mango", false, false);
form.select.append(option)


/*
  События focus/blur

  Событие focus вызывается в момент фокусировки, а blur – когда элемент теряет фокус.

  Потеря фокуса может произойти по множеству причин.
    Одна из них – когда посетитель кликает куда-то ещё. Но и JavaScript может быть причиной, например:
      - alert переводит фокус на себя – элемент теряет фокус (событие blur), а когда alert закрывается – элемент получает фокус обратно (событие focus).
      - Если элемент удалить из DOM, фокус также будет потерян. Если элемент добавить обратно, то фокус не вернётся.
 */
input.onblur = function() {
  if (!input.value.includes('@')) { // не email
    input.classList.add('invalid');
    error.innerHTML = 'Пожалуйста, введите правильный email.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};

/*
  Включаем фокусировку на любом элементе: tabindex

  Любой элемент поддерживает фокусировку, если имеет tabindex.
  То есть: если у нас два элемента, первый имеет tabindex="1", а второй tabindex="2",
  то находясь в первом элементе и нажав Tab – мы переместимся во второй.

  Есть два специальных значения:
    - tabindex="0" ставит элемент в один ряд с элементами без tabindex. То есть, при переключении такие элементы
                   будут после элементов с tabindex ≥ 1.
                   Обычно используется, чтобы включить фокусировку на элементе, но не менять порядок переключения. Чтобы элемент мог участвовать в форме наравне с обычными <input>.

    - tabindex="-1" позволяет фокусироваться на элементе только программно.
                    Клавиша Tab проигнорирует такой элемент, но метод elem.focus() будет действовать.
 */
tab_list.lastElementChild.tabIndex = 3;

/*
  События focus и blur не всплывают.

  У этой проблемы два решения.
    - focus/blur не всплывают, но передаются вниз на фазе перехвата (погружение).
      form.addEventListener("focus", () => form.classList.add('focused'), true);
      form.addEventListener("blur", () => form.classList.remove('focused'), true);

    - события focusin и focusout – такие же, как и focus/blur, но они всплывают.
      Заметьте, что эти события должны использоваться с elem.addEventListener, но не с on<event>
      form.addEventListener("focusin", () => form.classList.add('focused'));
      form.addEventListener("focusout", () => form.classList.remove('focused'));
 */

/*
  Событие: change

  Событие change срабатывает по окончании изменения элемента.
  Для текстовых <input> это означает, что событие происходит при потере фокуса.

  Для других элементов: select, input type=checkbox/radio событие запускается сразу после изменения значения
 */


/*
  Событие: input

  Событие input срабатывает каждый раз при изменении значения.

  Событие input происходит после изменения значения.
  Поэтому мы не можем использовать event.preventDefault() там – будет уже слишком поздно, никакого эффекта не будет.

 */
input2.oninput = function() {
  result.innerHTML = input2.value;
};

/*
  Событие: submit

  Есть два основных способа отправить форму:
    Первый – нажать кнопку <input type="submit"> или <input type="image">.
    Второй – нажать Enter, находясь на каком-нибудь поле.

  При отправке формы по нажатию Enter в текстовом поле, генерируется событие click на кнопке <input type="submit">

  Чтобы отправить форму на сервер вручную, мы можем вызвать метод form.submit(). При этом событие submit не генерируется.

 */
form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// перед отправкой формы, её нужно вставить в документ
document.body.append(form);

// form.submit();
