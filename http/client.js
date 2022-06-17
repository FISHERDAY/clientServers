/* The following program contains source code for client with rest api rules.
It sends GET, POST, PUT, DELETE and PATCH requests using test data*/

const http = require('http');

const postData = JSON.stringify({id: 5, name: "Tolya", lastName: "Chernov", email: "tolya_c@gmail.com"}); //data for testing post method
const putData = JSON.stringify({id: 3, name: "John", lastName: "Roberts", email: "john_r@gmail.com"}); //data for testing put method
const patchData = JSON.stringify({email: "ivanov_p@gmail.com"}); //data for testing patch method

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/students',
  method: 'GET',
};

switch (process.argv[2]) {
  case 'GET':
    options.method = 'GET',
    options.path = '/students';
    getReq();
    break;
  case 'POST':
    options.method = 'POST',
    options.path = '/student';
    postReq();
    break;
  case 'PUT':
    options.method = 'PUT',
    options.path = '/student?id=3'
    putReq();
  break;
  case 'DELETE':
    options.method = 'DELETE',
    options.path = '/student?id=2';
    deleteReq();
    break;
  case 'PATCH':
    options.method = 'PATCH',
    options.path = '/student?id=1';
    patchReq();
    break;
  default:
    console.log('Unsupported method');
    break;
}

/* get request */
function getReq() {
  const req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    let body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function() {
      console.log(JSON.parse(body));
    })
  });
  req.end();
}

/* post request with test data */
function postReq() {
  const req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
  });
  req.write(postData);
  req.end();
}

/* put request with test data */
function putReq() {
  const req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
  });
  req.write(putData);
  req.end();
}

/* delete request */
function deleteReq() {
  const req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
  });
  req.end();
}

/* patch request with test data */
function patchReq() {
  const req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
  });
  req.write(patchData);
  req.end();
}