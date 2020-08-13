// Потеря «this»
{
    let user = {
        firstName: "Вася",
        sayHi() {
            console.log(`Привет, ${this.firstName}!`);
        }
    };

    setTimeout(user.sayHi, 1000); // Привет, undefined!

    // Это произошло потому, что setTimeout получил функцию sayHi отдельно от объекта user (именно здесь функция и потеряла контекст).
}
// bind - который позволяет зафиксировать this.
{
    /*
        let boundFunc = func.bind(context);


        Результатом вызова func.bind(context) является особый «экзотический объект»,
        который вызывается как функция и прозрачно передаёт вызов в func, при этом устанавливая this=context.

        вызов boundFunc подобен вызову func с фиксированным this.
     */

    let user = {
        firstName: "Вася"
    };

    function func() {
        console.log(this.firstName);
    }

    let funcUser = func.bind(user);
    funcUser(); // Вася
}
{
    let user = {
        firstName: "Вася"
    };

    function func(phrase) {
        console.log(phrase + ', ' + this.firstName);
    }

    // привязка this к user
    let funcUser = func.bind(user);

    funcUser("Привет"); // Привет, Вася (аргумент "Привет" передан, при этом this = user)
}
{
    let user = {
        firstName: "Вася",
        sayHi() {
            console.log(`Привет, ${this.firstName}!`);
        }
    };

    let sayHi = user.sayHi.bind(user); // (*)

    sayHi(); // Привет, Вася!

    setTimeout(sayHi, 1000); // Привет, Вася!
}
{
    let user = {
        firstName: "Вася",
        say(phrase) {
            console.log(`${phrase}, ${this.firstName}!`);
        }
    };

    let say = user.say.bind(user);

    say("Привет"); // Привет, Вася (аргумент "Привет" передан в функцию "say")
    say("Пока"); // Пока, Вася (аргумент "Пока" передан в функцию "say")
}
{
    function partial(func, ...argsBound) {
        return function(...args) { // (*)
            return func.call(this, ...argsBound, ...args);
        }
    }

    // использование:
    let user = {
        firstName: "John",
        say(time, phrase) {
            console.log(`[${time}] ${this.firstName}: ${phrase}!`);
        }
    };

    // добавляем частично применённый метод с фиксированным временем
    user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

    user.sayNow("Hello");
    // Что-то вроде этого:
    // [10:00] John: Hello!
}
{
    function askPassword(ok, fail) {
        let password = prompt("Password?", '');
        if (password == "rockstar") ok();
        else fail();
    }

    let user = {
        name: 'Вася',

        loginOk() {
            console.log(`${this.name} logged in`);
        },

        loginFail() {
            console.log(`${this.name} failed to log in`);
        },

    };

    askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
}