import {Application} from "../app/application";
import {AppContainer} from "../app/container";

AppContainer.get<Application>(Application).Start();
