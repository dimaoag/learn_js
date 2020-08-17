{
    /*
        Есть два типа свойств объекта:
            Первый тип это свойства-данные (data properties). Мы уже знаем, как работать с ними.
            Все свойства, которые мы использовали до текущего момента, были свойствами-данными.

            Второй тип свойств мы ещё не рассматривали. Это свойства-аксессоры (accessor properties).
            По своей сути это функции, которые используются для присвоения и получения значения,
            но во внешнем коде они выглядят как обычные свойства объекта.
     */
    let obj = {
        get propName() {
            // геттер, срабатывает при чтении obj.propName
        },

        set propName(value) {
            // сеттер, срабатывает при записи obj.propName = value
        }
    };
}
// get
{
    let user = {
        name: "John",
        surname: "Smith",

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    console.log(user.fullName); // John Smith
}

// set
{
    let user = {
        name: "John",
        surname: "Smith",

        get fullName() {
            return `${this.name} ${this.surname}`;
        },

        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        }
    };

    // set fullName запустится с данным значением
    user.fullName = "Alice Cooper";

    console.log(user.name); // Alice
    console.log(user.surname); // Cooper
}
{
    /*
        Свойства-аксессоры не имеют value и writable, но взамен предлагают функции get и set.

        То есть, дескриптор аксессора может иметь:
            get – функция без аргументов, которая сработает при чтении свойства,
            set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
            enumerable – то же самое, что и для свойств-данных,
            configurable – то же самое, что и для свойств-данных.
     */

    let user = {
        name: "John",
        surname: "Smith"
    };

    Object.defineProperty(user, 'fullName', {
        get() {
            return `${this.name} ${this.surname}`;
        },

        set(value) {
            [this.name, this.surname] = value.split(" ");
        }
    });

    console.log(user.fullName); // John Smith

    for(let key in user) console.log(key); // name, surname
}
{
    let user = {
        get name() {
            return this._name;
        },

        set name(value) {
            if (value.length < 4) {
                console.log("Имя слишком короткое, должно быть более 4 символов");
                return;
            }
            this._name = value;
        }
    };

    user.name = "Pete";
    console.log(user.name); // Pete

    user.name = ""; // Имя слишком короткое...
}
{
    function User(name, birthday) {
        this.name = name;
        this.birthday = birthday;

        // возраст рассчитывается из текущей даты и дня рождения
        Object.defineProperty(this, "age", {
            get() {
                let todayYear = new Date().getFullYear();
                return todayYear - this.birthday.getFullYear();
            }
        });
    }

    let john = new User("John", new Date(1992, 6, 1));

    console.log( john.birthday ); // доступен как день рождения
    console.log( john.age );      // ...так и возраст
}