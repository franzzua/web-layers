import {Container} from "@decorators/di";
import {Application} from "../app/application";

Container.get<Application>(Application).Start();
