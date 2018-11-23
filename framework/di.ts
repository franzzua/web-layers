import {Type} from "typescript";

const Store: Provider[] = [];

export type Provider = ValueProvider | ClassProvider | FactoryProvider

export interface ValueProvider {
    provide: any;
    useValue?: any;
}

export interface ClassProvider {
    provide: Type;
    useClass?: any;
    deps: Provider[];
    multiple?: boolean;
}

export interface FactoryProvider {
    provide: Type;
    useFactory?: any;
    deps: Provider[];
    multiple?: boolean;
}

type CommonProvider = ValueProvider & ClassProvider & FactoryProvider;

function resolve(provider: CommonProvider) {
    if (provider.useValue)
        return provider.useValue;
    if (!provider.useClass) {
        provider.useClass = provider.provide;
    }
    if (provider.useClass) {
        if (!provider.deps){
            console.warn('no deps in provider', provider.provide, provider.useClass);
            provider.deps = [];
        }
        const deps = provider.deps.map(Container.get);
        const instance = new provider.useClass(...deps);
        if (!provider.multiple) {
            provider.useValue = instance;
        }
        return instance;
    }
    throw new Error('need useClass or useValue')
}

function register(provider: Provider): Provider {
    Store.push(provider);
    return provider;
}


export const Container = {
    get<T>(target): T {
        let existing = Store.find(p => p.provide == target);
        if (!existing) {
            console.warn('should register', target);
            existing = register({provide: target, useClass: target, deps: []});
        }
        return resolve(existing as CommonProvider);
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