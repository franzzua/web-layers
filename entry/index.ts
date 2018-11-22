import {Container} from "@decorators/di";
import {Application} from "../app/application";
import '../ui';

Container.get<Application>(Application).Start();
