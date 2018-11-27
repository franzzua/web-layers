import {FreeLayout} from "./gm/free-layout/free-layout";
import {FreeSettings} from "./gm/free-settings/free-settings";
import {GmSlide} from "./gm/gm-slide/gm-slide";
import {AppRoot} from "./root/app-root.component";
import {MapComponent} from "./gm/gm-map/map.component";
import {LayerComponent} from "./gm/gm-layer/layer.component";
import {SimpleElement} from "./simple-element/simple-element";
import {Domain} from "@gm/isomorphic-domain";
import {SlideStore} from "../app/stores/slide/slide.store";
import {FreeStore} from "../app/stores/free/free.store";
import {RouterStore} from "../app/stores/router/router.store";

export const UIProviders = [
    {provide: SimpleElement, multiple: true, deps: [Domain]},
    {provide: FreeLayout, multiple: true, deps: [Domain, SlideStore, RouterStore]},
    {provide: FreeSettings, multiple: true, deps: [FreeStore]},
    {provide: GmSlide, multiple: true, deps: [Domain]},
    {provide: MapComponent, multiple: true, deps: [SlideStore]},
    {provide: LayerComponent, multiple: true, deps: [SlideStore]},
    {provide: AppRoot, multiple: true, deps: []},
];