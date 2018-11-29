import {Container} from "@so/di";
import {init} from "@so/ui";
import {UIProviders} from "./container";
import '../components/slider';
import './components/date-range/date-range';

export function RegisterUI(container: Container) {
    container.provide(UIProviders);
    init(container);
}