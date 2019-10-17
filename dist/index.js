"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myExpress_1 = require("./myExpress");
const app = new myExpress_1.default();
app.listen(8001, (cb) => {
    console.log('listen to 0.0.0.0:8001');
});
app.get('/', (req, res) => {
    res.writeHead(200);
    res.write('test ');
    res.end();
});
app.get('/testos', (req, res) => {
    res.writeHead(200);
    res.write('test ');
    res.end();
});
app.get('/test/test', (req, res) => {
    res.writeHead(200);
    res.write('test ');
    res.end();
});
//# sourceMappingURL=index.js.map