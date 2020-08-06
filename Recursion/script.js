//
{
    function pow(x, n) {
        if (n === 1) {
            return x;
        } else {
            return x * pow(x, n - 1);
        }
    }

    console.log( pow(2, 3) ); // 8

    /*
    Максимальная глубина рекурсии ограничена движком JavaScript. Точно можно рассчитывать на 10000 вложенных вызовов,
    некоторые интерпретаторы допускают и больше, но для большинства из них 100000 вызовов – за пределами возможностей.
    */
}
{
    function pow(x, n) {
        return (n === 1) ? x : (x * pow(x, n - 1));
    }

    console.log( pow(2, 3) ); // 8
}
// Контекст выполнения, стек
{
    /*
    Контекст выполнения – специальная внутренняя структура данных, которая содержит информацию о вызове функции.
    Она включает в себя конкретное место в коде, на котором находится интерпретатор, локальные переменные функции,
    значение this (мы не используем его в данном примере) и прочую служебную информацию.

    Один вызов функции имеет ровно один контекст выполнения, связанный с ним.

    Когда функция производит вложенный вызов, происходит следующее:

    Выполнение текущей функции приостанавливается.
    Контекст выполнения, связанный с ней, запоминается в специальной структуре данных – стеке контекстов выполнения.
    Выполняются вложенные вызовы, для каждого из которых создаётся свой контекст выполнения.
    После их завершения старый контекст достаётся из стека, и выполнение внешней функции возобновляется с того места, где она была остановлена.
     */

    let company = { // тот же самый объект, сжатый для краткости
        sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
        development: {
            sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
            internals: [{name: 'Jack', salary: 1300}]
        }
    };

    // Функция для подсчёта суммы зарплат
    function sumSalaries(department) {
        if (Array.isArray(department)) { // случай (1)
            return department.reduce((prev, current) => prev + current.salary, 0); // сумма элементов массива
        } else { // случай (2)
            let sum = 0;
            for (let subdep of Object.values(department)) {
                sum += sumSalaries(subdep); // рекурсивно вызывается для подотделов, суммируя результаты
            }
            return sum;
        }
    }

    console.log(sumSalaries(company)); // 6700
}
// Связанный список
{
    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

    console.log(list);

    // Or

    let list1 = { value: 1 };
    list1.next = { value: 2 };
    list1.next.next = { value: 3 };
    list1.next.next.next = { value: 4 };

    console.log(list1);
}
// sumTo()
{
    function sumToCycle(n) {
        let result = 0;

        while (n) {
            result += n--;
        }

        return result;
    }

    function sumToRecursion(n) {
        if (n === 1){
            return  1;
        } else {
            return n + sumToRecursion(n - 1);

        }
    }

    function sumToArifmetProgression(n) {
        return n * (n + 1) / 2;
    }

    console.log( sumToCycle(100) ); // 5050
    console.log( sumToRecursion(100) ); // 5050
    console.log( sumToArifmetProgression(100) ); // 5050
}
// Factorial
{
    function factorial(n) {
    return (n !== 1) ? n * factorial(n - 1) : 1;
}

    console.log( factorial(5) ); // 120
}
// Числа Фибоначчи
{
    function fib(n) {
        return n <= 1 ? n : fib(n - 1) + fib(n - 2);
    }

    console.log( fib(3) ); // 2
    console.log( fib(7) ); // 13
}
// Вывод односвязного списка
{
    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };

    function printList(list) {
        while(list) {
            console.log(list.value);
            list = list.next;
        }
    }

    printList(list);
}