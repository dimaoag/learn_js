{
    /*
        All flags:

        value - значение
        writable – если true, свойство можно изменить, иначе оно только для чтения.
        enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
        configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
     */
}

// Object.getOwnPropertyDescriptor(obj, property) - вернуть дескрыптор свойства
{
    /*
    позволяет получить полную информацию о свойстве
    Когда мы создаём свойство «обычным способом», все они имеют значение true
     */

    let user = {
        name: "John"
    };

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    console.log( JSON.stringify(descriptor, null, 2 ) );
    /* дескриптор свойства:
    {
      "value": "John",
      "writable": true,
      "enumerable": true,
      "configurable": true
    }
    */
}

// Object.defineProperty(obj, property, attributes = {"value": "John", "writable": false}) - установить дескрыптор свойства
{
    /*
        Если свойство существует, defineProperty обновит его флаги.
        В противном случае метод создаёт новое свойство с указанным значением и флагами; если какой-либо флаг не указан явно,
        ему присваивается значение false.
     */

    let user = {};

    Object.defineProperty(user, "name", {
        value: "John"
    });

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    console.log( JSON.stringify(descriptor, null, 2 ) );
    /*
    {
      "value": "John",
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
     */
}

// Только для чтения
{
    let user = {
        name: "John"
    };

    Object.defineProperty(user, "name", {
        writable: false
    });

    user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'
    /*
        В нестрогом режиме, без use strict, мы не увидим никаких ошибок при записи в свойства «только для чтения» и т.п.
        Но эти операции всё равно не будут выполнены успешно.
        Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча игнорируются.
     */
}

// Неперечислимое свойство
{
    let user = {
        name: "John",
        toString() {
            return this.name;
        }
    };

    Object.defineProperty(user, "toString", {
        enumerable: false
    });

    // Теперь наше свойство toString пропало из цикла:
    for (let key in user) console.log(key); // name
}

// Неконфигурируемое свойство
{
    let user = { };

    Object.defineProperty(user, "name", {
        value: "John",
        writable: false,
        configurable: false
    });

    // теперь невозможно изменить user.name или его флаги
    // всё это не будет работать:
    //   user.name = "Pete"
    //   delete user.name
    //   defineProperty(user, "name", ...)
    // Object.defineProperty(user, "name", {writable: true}); // Ошибка
}


{
    // Object.defineProperties(obj,descriptors) - установить для несколько свойств

    let user = {};

    Object.defineProperties(user, {
        name: { value: "John", writable: false },
        surname: { value: "Smith", writable: false },
    });

    // Object.getOwnPropertyDescriptors(obj) - все дескрыпторы всех свойств обекта
    // так можно склоныровать обект
    let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));
    console.log( JSON.stringify(Object.getOwnPropertyDescriptors(clone), null, 2 ) );
    /*
        {
          "name": {
            "value": "John",
            "writable": false,
            "enumerable": false,
            "configurable": false
          },
          "surname": {
            "value": "Smith",
            "writable": false,
            "enumerable": false,
            "configurable": false
          }
        }
     */
}
{
    /*
        Но ещё есть методы, которые ограничивают доступ ко всему объекту:

        Object.preventExtensions(obj) - Запрещает добавлять новые свойства в объект.
        Object.seal(obj) - Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
        Object.freeze(obj) - Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false для всех существующих свойств.

        А также есть методы для их проверки:

        Object.isExtensible(obj) - Возвращает false, если добавление свойств запрещено, иначе true.
        Object.isSealed(obj) - Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств установлено configurable: false.
        Object.isFrozen(obj) - Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено configurable: false, writable: false.
     */
}