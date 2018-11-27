import {Container} from "@so/di";
import {init} from "@so/ui";
import {UIProviders} from "./container";

export function RegisterUI(container: Container) {
    container.provide(UIProviders);
    init(container);
}