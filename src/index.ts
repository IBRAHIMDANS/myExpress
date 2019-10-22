import express, { MyHttpRequest, MyHttpResponse } from './myExpress2';
// import { express } from './myExpress';


const app = express();
const port = Number(process.env.PORT) || 8001;

app.listen(port, () => {
    console.log(`listen to 0.0.0.0:${port}`);
});
app.get('/', (req: MyHttpRequest, res: MyHttpResponse) => {
    res.statusCode = 200;
    res.send('app');
    res.end();
    // console.log(res);
});
app.get('/home', (req: MyHttpRequest, res: MyHttpResponse) => {
    const value = {
        firstName: 'ib',
        name: 'Ibrahima',
        weight: 33.1337,
        age: 2
    };
    app.render('app', value, (error: Error, html: string) => {
        res.send(html);
        res.end()
    });
});
app.post('/post', (req: MyHttpRequest, res: MyHttpResponse) => {
    //  res.writeHead(200);
    //   res.write('post ');
    //   res.end();
    console.log('post');
});
app.put('/put', (req: MyHttpRequest, res: MyHttpResponse) => {
    // res.writeHead(200);
    // res.write('put ');
    // res.end();
    console.log('put');
});
app.delete('/delete', (req: MyHttpRequest, res: MyHttpResponse) => {
    // res.writeHead(200);
    // res.write('delete ');
    // res.end();
    console.log('delete');
});
// app.all('/all', (req: MyHttpRequest, res: MyHttpResponse) => {
//     res.writeHead(200);
//     res.write('all ');
//     res.end();
// });
