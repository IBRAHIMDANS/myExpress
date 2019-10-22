import { createServer, IncomingMessage, RequestListener, ServerResponse } from 'http';
import { readFileSync } from 'fs';
import { Route } from './route.interface';
import Method from './Method';

class myExpress {
    private server: any;
    private routes: Route [];

    constructor() {
        this.routes = [];
        this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
            const searchRoute: any = this.routes.find(route =>
                (route.path === req.url && (route.method === req.method || route.method === Method.ALL)
                ));
            if (searchRoute) {
                searchRoute.cb(req, res);
            } else {
                res.writeHead(404);
                res.write('route not found');
                res.end();
            }
        });
    }

    public getterRoute(path: string, cb: RequestListener, method: Method) {
        const searchRoute = this.routes.find(route => route.path === path && route.method === method);
        !searchRoute ? this.routes.push(new Route(path, method, cb)) : searchRoute.cb = cb;
    }

    public get(path: string, cb: RequestListener): void {
        this.getterRoute(path, cb, Method.GET);
    }

    public post(path: string, cb: RequestListener): void {
        this.getterRoute(path, cb, Method.POST);
    }

    public delete(path: string, cb: RequestListener): void {
        this.getterRoute(path, cb, Method.DELETE);
    }

    public put(path: string, cb: RequestListener): void {
        this.getterRoute(path, cb, Method.PUT);
    }

    public all(path: string, cb: RequestListener): void {
        this.getterRoute(path, cb, Method.ALL);
    }

    public render(path: string, params?: object, cb?: Function): void {
        const file = readFileSync(`./templates/${path}`, 'utf8');
        console.log(file);

    }

    public listen(port: number | string = 8001, cb: Function): void {
        this.server.listen(port, cb);
    }

}

export  const express = new myExpress;
