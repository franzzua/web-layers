import {Type} from "typescript";

const Store: Provider[] = [];

export interface Provider {
    provide: Type;
    useClass?: any;
    useValue?: any;
    instance?: any;
    deps: Provider[];
}

function resolve(provider: Provider) {
    if (provider.useValue)
        return provider.useValue;
    if (provider.useClass){
        const deps = provider.deps.map(Container.get);
        return provider.useValue = new provider.useClass(...deps);
    }
    throw new Error('neew useClass or useValue')
}

function register(provider: Provider): Provider {
    Store.push(provider);
    return provider;
}


export const Container = {
    get: target => {
        let existing = Store.find(p => p.provide == target);
        if (!existing) {
            console.warn('should register', target);
            existing = register({provide: target, useClass: target, deps: []});
        }
        return resolve(existing);
    },
    provide(providers: Provider[]) {
        providers.forEach(p => Store.push(p));
    }
};

export function Injectable() {
    return target => {
        // register({
        //     provide: target,
        //     useClass: target,
        //     deps: []
        // });
        return target;
    };
}


export function Inject() {
    return (target, propery, index) => {

    };
}

export class InjectionToken {
    constructor(private name) {

    }

}

export class Reflector {
    static paramTypes(target) {
        return [];
    }
}