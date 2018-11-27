import {wire} from "hyperhtml";
import {FreeActionsCreator} from "../../../app/stores/free/free-actions-creator.service";
import {IFreeSettingsSpace} from "./free-settings";
import {Level} from "@gm/isomorphic-domain";
import {foreach} from "@so/ui";


module.exports = (html, state: IFreeSettingsSpace, events: FreeActionsCreator) => {

    return html`
        <div spaces>
            ${foreach(state.Spaces, spaceRender)}
        </div>
        <div templates layout vertical center-center>
            ${foreach(state.Templates, templateRender)}
        </div>
        <div levels layout vertical center-center>
            ${foreach(state.Levels, levelRender)}
        </div>
        <div timeline style="background: #FFF">
            <date-range ptime="${state.Prediction/60}"
                        onchange-ptime="${e => events.ChangeMapSettings({pTime: e.value*60})}"
                        onchange-obstime="${e => events.ChangeMapSettings({obsTime: e.value})}"/>
        </div>
    `;

    function spaceRender(space) {
        return wire()`
            <button disabled="${state.current.space.Name == space}"
                    onclick="${_ => events.ChangeSpace(space)}">
                ${space.split('_').pop()}
            </button>
            `;
    }

    function levelRender(level) {
        return wire()`
            <button disabled="${Level.Compare(state.current.level, level)}"
                    onclick="${_ => events.ChangeMapSettings({levelType: level.Type, levelValue: level.Value})}">
                ${Level.ToString(level)}
            </button>
            `;
    }

    function templateRender(template) {
        return wire()`
            <button disabled="${state.current.template == template.template}"
                    onClick="${_ => events.ChangeMapSettings({template: template.template})}">
                ${template.label}
            </button>
        `;
    }
};