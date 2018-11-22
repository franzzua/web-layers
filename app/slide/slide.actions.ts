import {ICurrentState} from './slide.state';
import {ActionsCreator} from "store-rxjs";

export class SlideActions extends ActionsCreator<ICurrentState> {
    public SLIDE_LOADED = 'slide_loaded';
    public SLIDE_SELECT = 'slide_selected';
    public SLIDE_LOAD = 'slide_load';
    public CREATE_SLIDE = 'create_slide';

    public MAP_CHANGE = 'change_map';
    public SPACE_CHANGE = 'change_space';
    public LAYER_CHANGE = 'change_layer';

    public LoadSlide(id: number) {
        this.Action({
            type: this.SLIDE_LOAD,
            payload: id
        });
        this.Action({
            type: this.SLIDE_SELECT,
            payload: id
        });
    }
    public CreateSlide() {
        this.Action({
            type: this.CREATE_SLIDE,
        });
    }

    public ChangeSpace(space: string) {
        this.Action({
            type: this.SPACE_CHANGE,
            payload: space
        });
    }

    public ChangeMapSettings(settings) {
        this.Action({
            type: this.MAP_CHANGE,
            payload: {
                Settings: settings
            }
        });
    }
    public ChangeLayerSettings(settings) {
        this.Action({
            type: this.LAYER_CHANGE,
            payload: {
                Settings: settings
            }
        });
    }

    public ChangeLayerTemplate(template) {
        this.Action({
            type: this.LAYER_CHANGE,
            payload: {
                Template: template
            }
        });
    }
}
