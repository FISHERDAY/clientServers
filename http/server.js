/* The following program contains source code for server with rest api rules.
It handles GET, POST, PUT, DELETE and PATCH requests*/

const http = require('http');
const url = require('url');
let students = require('./students.json');

const HOST = 'localhost';
const PORT = 3000;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      getReq(req, res);
      break;
    case 'POST':
      postReq(req, res);
      break;
    case 'PUT':
      putReq(req, res);
      break;
    case 'DELETE':
      deleteReq(req, res);
      break;
    case 'PATCH':
      patchReq(req, res);
      break;
    default:
      res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
      break;
  }
});

server.listen(PORT, HOST, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

function getReq(req, res) {
  console.log('GET request');
  if (url.parse(req.url).pathname === '/students') {
    res.end(JSON.stringify(students));
  } else res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
}

function postReq(req, res) {
  console.log('POST request');
  if (url.parse(req.url).pathname === '/student') {
    let body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      students.push(JSON.parse(body))
    });
    res.end();
  } else res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
}

function putReq(req, res) {
  console.log('PUT request');
  if (url.parse(req.url).pathname === '/student' ) {
    const id = url.parse(req.url).query.split('=')[1];
    let body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      let newStudent = JSON.parse(body);
      students = students.map(student => {
        if (id == student.id) {
            student = {id: student.id, ...newStudent};
        } else res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
        return student;
      })
    });
    res.end();
  }
}

function patchReq(req, res) {
  console.log('PATCH request');
  if (url.parse(req.url).pathname === '/student' ) {
    const id = parseInt(url.parse(req.url).query.split('=')[1]);
    let body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      students[students.indexOf(students.find(student => student.id === id))].email = JSON.parse(body).email;
    });
    res.end();
  } else res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
}

function deleteReq(req, res) {
  if (url.parse(req.url).pathname === '/student' ) {
    console.log('DELETE request');
    students = students.filter(student => student.id !== parseInt(url.parse(req.url).query.split('=')[1], 10));
    res.end();
  } else res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
}
