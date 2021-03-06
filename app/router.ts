import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'
import {from, Observable, startWith, tap} from "rx";

const routes = [
    {name: 'home', path: '/wl/'},
    {name: 'free', path: '/wl/free'},
    {name: 'profile', path: '/wl/profile'}
];

const router = createRouter(routes, {
    defaultRoute: 'free'
}).usePlugin(browserPlugin());

router.start();

export class Router {

    public State$ = new Observable(subscr => {
        router.subscribe(change => subscr.next(change.route))
    }).pipe(
        startWith(router.getState()),
        tap(console.warn)
    );

    public Actions: {
        [K in keyof IRouteActions]: (...args: any[]) => void;
    } = {
        navigate(route) {
            console.log(route)
            router.navigate(route);
        }
    }
}

export interface IRouteActions {
    navigate(route: string);
}