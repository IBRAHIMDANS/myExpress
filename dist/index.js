"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myExpress_1 = require("./myExpress");
const app = myExpress_1.express;
const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log(`listen to 0.0.0.0:${port}`);
});
app.get('/', (req, res) => {
    res.writeHead(200);
    res.write('get ');
    res.end();
});
app.post('/post', (req, res) => {
    res.writeHead(200);
    res.write('post ');
    res.end();
});
app.put('/put', (req, res) => {
    res.writeHead(200);
    res.write('put ');
    res.end();
});
app.delete('/delete', (req, res) => {
    res.writeHead(200);
    res.write('delete ');
    res.end();
});
app.all('/all', (req, res) => {
    res.writeHead(200);
    res.write('all ');
    res.end();
});
//# sourceMappingURL=index.js.map