"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myExpress2_1 = require("./myExpress2");
const app = myExpress2_1.default();
const port = Number(process.env.PORT) || 8001;
app.listen(port, () => {
    console.log(`listen to 0.0.0.0:${port}`);
});
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.write('get ');
    res.end();
    console.log('get');
});
app.post('/post', (req, res) => {
    console.log('post');
});
app.put('/put', (req, res) => {
    console.log('put');
});
app.delete('/delete', (req, res) => {
    console.log('delete');
});
//# sourceMappingURL=index.js.map