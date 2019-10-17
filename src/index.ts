import myExpress from './myExpress';
import { IncomingMessage, ServerResponse } from 'http';

const app = new myExpress();
app.listen(8001, () => {
    console.log('listen to 0.0.0.0:8001')
});
app.get('/', (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.write('get ');
    res.end();
});
app.post('/post', (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.write('post ');
    res.end();
});
app.put('/put', (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.write('put ');
    res.end();
});
app.delete('/delete', (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.write('delete ');
    res.end();
});
app.all('/all', (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.write('all ');
    res.end();
});
