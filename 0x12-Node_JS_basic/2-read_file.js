const fs = require('fs');

const countStudents = (path) => {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }
  const data = fs.readFileSync(path, 'utf-8');

  const dataSet = data.split('\n').slice(1);

  const normalized = dataSet.map((line) => line.split(','))
    .filter((student) => student.length === 4);

  const students = normalized.map((student) => ({
    firstname: student[0],
    lastname: student[1],
    age: student[2],
    field: student[3],
  }));

  const csStudents = students.filter((s) => s.field === 'CS')
    .map((s) => s.firstname);
  const sweStudents = students.filter((s) => s.field === 'SWE')
    .map((s) => s.firstname);

  console.log(`Number of students: ${students.length}`);
  console.log(`Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}`);
  console.log(`Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`);
};

module.exports = countStudents;
