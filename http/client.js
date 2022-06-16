/* The following program contains source code for client with rest api rules.
It sends GET, POST, PUT, DELETE and PATCH requests using test data*/

const http = require('http');

const postData = JSON.stringify({id: 5, name: "Tolya", lastName: "Chernov", email: "tolya_c@gmail.com"}); //data for testing post method
const putData = JSON.stringify({id: 3, name: "John", lastName: "Roberts", email: "tolya_r@gmail.com"}); //data for testing put method
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
    break;
  case 'POST':
    options.method = 'POST',
    options.path = '/student';
    break;
  case 'PUT':
    options.method = 'PUT',
    options.path = '/student?id=3'
  break;
  case 'DELETE':
    options.method = 'DELETE',
    options.path = '/student?id=2';
    break;
  case 'PATCH':
    options.method = 'PATCH',
    options.path = '/student?id=1';
    break;
  default:
    console.log('Unsupported method');
    break;
}

const req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  if (options.method === 'GET') { //getting data from server
    let body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function() {
      console.log(JSON.parse(body));
    })
  }
});
if (options.method === 'POST') { // post request with test data 
  req.write(postData);
}
if (options.method === 'PUT') { // put request with test data 
  req.write(putData);
}
if (options.method === 'PATCH') { // patch request with test data 
  req.write(patchData);
}
req.end();
