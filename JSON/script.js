// JSON.stringify - для преобразования объектов в JSON.
{

}
// JSON.parse - для преобразования JSON обратно в объект.
{
    let student = {
        name: 'John',
        age: 30,
        isAdmin: false,
        courses: ['html', 'css', 'js'],
        wife: null
    };

    let json = JSON.stringify(student);

    console.log(typeof json); // мы получили строку!

    console.log(json);
    /* выведет объект в формате JSON:
    {
      "name": "John",
      "age": 30,
      "isAdmin": false,
      "courses": ["html", "css", "js"],
      "wife": null
    }
    */
}