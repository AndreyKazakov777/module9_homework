// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, 
// который будет преобразовывать XML в JS-объект и выводить его в консоль.

// XML, который мы будем парсить
const xmlString  = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

function transformXml (xmlString) {
// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, 'text/html');

const listNode = xmlDOM.querySelector('list');
const studentNode = listNode.querySelectorAll('student');
 
const result = {list: []};
studentNode.forEach((listNode) => {

    const student = new Object();
// Получение всех DOM-нод
const firstNode = listNode.querySelector('first');
const secondNode = listNode.querySelector('second');
const ageNode = listNode.querySelector('age');
const profNode= listNode.querySelector('prof');
const nameNode = listNode.querySelector('name');

const langAttr = nameNode.getAttribute('lang');

   student.name = firstNode.textContent + ' ' + secondNode.textContent;
   student.age = ageNode.textContent;
   student.prof = profNode.textContent;
   student.lang = langAttr;

    result.list.push(student);
});
console.log(result);
}
transformXml(xmlString);









