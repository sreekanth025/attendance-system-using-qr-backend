const app = require('./app'); 
const http = require('http'); 

const server = http.createServer(app); 
server.listen(3000, () => {
    console.log('Listening on port 3000');
}); 