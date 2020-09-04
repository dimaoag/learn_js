
{
  /*

  Все операции с DOM начинаются с объекта document. Это главная «точка входа» в DOM.
  Из него мы можем получить доступ к любому узлу.

                                            document
                                                ^
                                                |
                                        document.documentElement <html>
                     __________________/        ^
                   /                            |
      document.head  <head>          document.body <body> (if inside body)
                                                ^
                                                |
                                            parentNode
                                                ^
                                                |
                       previousSibling  <===  <div>  ===>  nextSibling
                                             /    \
                                  firstChild       lastChild


    Есть одна тонкость: document.body может быть равен null

    <html>
      <head>
        <script>
          alert( "Из HEAD: " + document.body ); // null, <body> ещё нет
        </script>
      </head>

    <body>
      <script>
        alert( "Из BODY: " + document.body ); // HTMLBodyElement, теперь он есть
      </script>
      </body>
    </html>


     - Дочерние узлы (или дети) – элементы, которые являются непосредственными детьми узла.
       Другими словами, элементы, которые лежат непосредственно внутри данного.
       Например, <head> и <body> являются детьми элемента <html>.

     - Потомки – все элементы, которые лежат внутри данного, включая детей, их детей и т.д.

     Коллекция childNodes содержит список всех детей, включая текстовые узлы.
     for (let i = 0; i < document.body.childNodes.length; i++) {
        alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
     }

    elem.childNodes[0] === elem.firstChild
    elem.childNodes[elem.childNodes.length - 1] === elem.lastChild

    childNodes -  это не массив, а коллекция – особый перебираемый объект-псевдомассив.
    Методы массивов не будут работать, потому что коллекция – это не массив
    console.log(document.body.childNodes.filter); // undefined (у коллекции нет метода filter!)

    - DOM-коллекции – только для чтения
    - DOM-коллекции живые - они отражают текущее состояние DOM.
    - Не используйте цикл for..in для перебора коллекций
 */

  for (let node of document.body.childNodes) {
    console.log(node); // покажет все узлы (дети) из коллекции
  }

  console.log(document.body.childNodes.filter); // undefined (у коллекции нет метода filter!)
  console.log( Array.from(document.body.childNodes).filter); // сделали массив


  // Соседи и родитель

  // родителем <body> является <html>
  console.log( document.body.parentNode === document.documentElement ); // выведет true
  console.log( document.head.nextSibling ); // (node) #text (перенос строки)
  console.log( document.body.previousSibling ); // (node) #text (перенос строки)


  // после <head> идёт <body>
  console.log( document.head.nextElementSibling ); // HTMLBodyElement

  // перед <body> находится <head>
  console.log( document.body.previousElementSibling ); // HTMLHeadElement


  // Навигация только по элементам

  /*

                                        document.documentElement <html>
                                                ^
                                                |
                                      document.body <body> (if inside body)
                                                ^
                                                |
                                            parentElement
                                                ^
                                                |
                previousElementSibling  <===  <div>  ===>  nextElementSibling
                                           /          \
                        firstElementChild  [children]  lastElementChild

     children – коллекция детей, которые являются элементами.

   */





  // document.getElementById

  // получить элемент
  let elem = document.getElementById('elem');

  // сделать его фон красным
  elem.style.background = 'red';

  /*
    Значение id должно быть уникальным

    Метод getElementById можно вызвать только для объекта document. Он осуществляет поиск по id по всему документу.
   */




  // querySelectorAll
  /*
    это elem.querySelectorAll(css), он возвращает все элементы внутри elem, удовлетворяющие данному CSS-селектору.

    Псевдоклассы тоже работают document.querySelectorAll(':hover')
   */
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    console.log(elem.innerHTML); // "тест", "пройден"
  }

  /*
    // querySelector
    Метод elem.querySelector(css) возвращает первый элемент, соответствующий данному CSS-селектору.
  */


  /*
    // matches
    Метод elem.matches(css) ничего не ищет, а проверяет, удовлетворяет ли elem CSS-селектору, и возвращает true или false.

    elemA.contains(elemB) вернёт true, если elemB находится внутри elemA (elemB потомок elemA) или когда elemA==elemB.
  */

  /*
    // closest
    Предки элемента – родитель, родитель родителя, его родитель и так далее.
    Метод elem.closest(css) ищет ближайшего предка, который соответствует CSS-селектору. Сам элемент также включается в поиск.
  */

  /*
    // getElementsBy*

    Все методы "getElementsBy*" возвращают живую коллекцию.
    Такие коллекции всегда отражают текущее состояние документа и автоматически обновляются при его изменении.

    - elem.getElementsByTagName(tag) ищет элементы с данным тегом и возвращает их коллекцию.
      Передав "*" вместо тега, можно получить всех потомков.

    - elem.getElementsByClassName(className) возвращает элементы, которые имеют данный CSS-класс.
  */

}


