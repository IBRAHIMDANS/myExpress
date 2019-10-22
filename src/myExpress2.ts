import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import * as nodeUrl from 'url'

export interface MyHttpResponse extends http.ServerResponse {
    json: (item: any) => void
    send: (content: string) => void
}

export interface MyHttpRequest extends http.IncomingMessage {
    params: (item: any) => void
    query: (item: any) => void
}

class Express {
    // You HAVE TO replace any by the real signature
    [x: string]: any

    private server: any;
    private routes: any = {};

    private readonly WWW_DIRECTORY = 'www';
    private readonly TEMPLATE_PAGE_DIRECTORY = 'templates';
    private readonly TEMPLATE_EXTENSION = '.html.mustache';

    constructor() {
        this._initialize();
    }

    listen(port: number, callback: () => void): void {
        this.server.listen(port, callback);
    }

    render(
        fileName: string,
        values: any,
        callback: (error: Error | null, html: string | null) => void
    ) {
        // set template filename
        const pathName = path.join(
            process.cwd(),
            //    this.WWW_DIRECTORY,
            this.TEMPLATE_PAGE_DIRECTORY,
            `${fileName}${this.TEMPLATE_EXTENSION}`
        );
        // check if exist
        if (!fs.existsSync(pathName)) {
            callback(new Error(`404 Page ${fileName} doesn't exist`), null);
            return;
        }

        // read data mustache
        const content = fs.readFileSync(pathName, 'utf-8');

        // search by regex and return new string with data
        const processContent = content.replace(
            /{{\s?(\w+)((\s?[|]\s?)((\w+)(\:([0-9]+))?))?\s?}}/gi,
            (item: string, ...args: any[]): string => {

                // get founded mustache
                const [key, pipe, , transform] = args;
                // return new value if exist on our object
                const v = values[key];
                if (transform.toString().match(/((\w*)(\:([0-9]+)?))/gi)) {
                    console.log(transform.toString().split(':'));
                }
                // if not founded
                if (!v) {
                    return 'undefined';
                }

                // ...else apply transform method
                if (pipe && transform) {
                    const func = this[`_${transform}`];
                    if (func) {
                        return func(v);
                    }
                } else {
                    return v;
                }
            }
        );

        // call with new content
        callback(null, processContent);
    }

    /**
     * PRIVATE
     */
    private _initialize() {
        for (const verb of ['GET', 'POST', 'PUT', 'DELETE']) {
            this.routes[verb] = [];
            // You HAVE TO replace any by the real signature
            this[verb.toLowerCase()] = (url: string, callback: any) => {
                this.routes[verb].push({ url, callback });
            };
        }

        this.server = http.createServer(
            (req: http.IncomingMessage, res: http.ServerResponse): void => {
                const { method, url } = req;

                const response: MyHttpResponse = this._overrideReponse(res);

                const route = this.routes[method].find((item: { url: string; }) => item.url === url);
                if (!route) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.write('Error 404, Page not found');
                    res.end();
                    return;
                }

                route.callback(req, response);
            }
        );
    }

    private _overrideReponse(res: http.ServerResponse): MyHttpResponse {
        let response: MyHttpResponse = res as MyHttpResponse;

        response.json = (item: any): void => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(item));
            res.end();
        };
        response.send = (content: string): void => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(content);
            res.end();
        };

        return response;
    }

    private _upper(str: string): string {
        return str.toUpperCase();
    }

    private _lower(str: string): string {
        return str.toLowerCase();
    }

    private _fixed(str: string, limit: string): string {
        if (isNaN(parseInt(limit, 10))) {
            return str;
        }
        if (isNaN(parseFloat(str))) {
            return str;
        }
        return parseFloat(str).toFixed(parseInt(limit, 10));
    }
}

export default () => new Express()
