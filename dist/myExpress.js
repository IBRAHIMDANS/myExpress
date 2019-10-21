"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const route_interface_1 = require("./route.interface");
const Method_1 = require("./Method");
class myExpress {
    constructor() {
        this.routes = [];
        this.server = http_1.createServer((req, res) => {
            const searchRoute = this.routes.find(route => (route.path === req.url && (route.method === req.method || route.method === Method_1.default.ALL)));
            console.log(searchRoute);
            if (searchRoute) {
                searchRoute.cb(req, res);
            }
            else {
                res.writeHead(404);
                res.write('route not found');
                res.end();
            }
        });
    }
    getterRoute(path, cb, method) {
        const searchRoute = this.routes.find(route => route.path === path && route.method === method);
        !searchRoute ? this.routes.push(new route_interface_1.Route(path, method, cb)) : searchRoute.cb = cb;
    }
    get(path, cb) {
        this.getterRoute(path, cb, Method_1.default.GET);
    }
    post(path, cb) {
        this.getterRoute(path, cb, Method_1.default.POST);
    }
    delete(path, cb) {
        this.getterRoute(path, cb, Method_1.default.DELETE);
    }
    put(path, cb) {
        this.getterRoute(path, cb, Method_1.default.PUT);
    }
    all(path, cb) {
        this.getterRoute(path, cb, Method_1.default.ALL);
    }
    render(path, cb) {
        console.log('render');
    }
    listen(port = 8001, cb) {
        this.server.listen(port, cb);
    }
}
exports.express = new myExpress;
//# sourceMappingURL=myExpress.js.map