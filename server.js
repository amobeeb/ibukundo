const http =require('http');

const server=http.createServer((req, res)=>{
console.log(req.url);
console.log(res.on);
}); 

server.listen(8000, 'localhost', ()=>{
    console.log('listening for requests on port 3000');
});