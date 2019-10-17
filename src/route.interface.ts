import { RequestListener } from 'http';
import Method from './Method';

export class Route {
    public method: string;
    public path: string;
    public cb: RequestListener;

    constructor(path: string, method: Method, callback: RequestListener) {
        this.path = path;
        this.cb = callback;
        this.method = method;
    }

}
